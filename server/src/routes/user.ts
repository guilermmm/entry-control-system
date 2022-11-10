import { PermitLevel } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import prisma from '../prisma'
import { authenticateUser } from '../util/auth'
import { hashPassword } from '../util/password'
import { idParam } from '../util/util'

const userRouter = Router()

const searchParams = z.object({
  register: z.string().optional(),
  name: z.string().optional(),
  sectorId: z.number().int().optional(),
  unitId: z.number().int().optional(),
})

userRouter.get('/', async (req, res) => {
  try {
    const params = searchParams.parse(req.body)

    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: params.name,
        },
        register: {
          contains: params.register,
        },
        sectorId: params.sectorId,
      },
    })

    res.status(200).json(users)
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.message })
    } else {
      console.log(err)
      res.sendStatus(500)
    }
  }
})

userRouter.get('/:id', async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)

    const user = await prisma.user.findUnique({
      where: { id },
    })
    if (user) {
      res.status(200).json(user)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

const createParams = z.object({
  name: z.string(),
  register: z.string(),
  password: z.string(),
  sectorId: z.number().int().optional(),
  unitId: z.number().int().optional(),
  permitLevel: z
    .string()
    .refine(
      value => Object.keys(PermitLevel).includes(value),
      'Invalid permit level',
    )
    .transform(value => value as PermitLevel),
})

userRouter.post('/', authenticateUser, async (req, res) => {
  try {
    const { name, register, sectorId, unitId, permitLevel, password } =
      createParams.parse(req.body)

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        name,
        register,
        sectorId,
        unitId,
        permitLevel,
        password: hashedPassword,
      },
    })

    res.status(201).json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

const updateParams = z.object({
  name: z.string().optional(),
  register: z.string().optional(),
  sectorId: z.number().int().optional(),
  unitId: z.number().int().optional(),
  permitLevel: z
    .string()
    .refine(
      value => Object.keys(PermitLevel).includes(value),
      'Invalid permit level',
    )
    .transform(value => value as PermitLevel),
})

userRouter.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)
    const params = updateParams.parse(req.body)

    const user = await prisma.user.update({
      where: { id },
      data: params,
    })

    if (!user) {
      res.sendStatus(404)
      return
    }

    res.status(200).json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

userRouter.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      res.sendStatus(404)
      return
    }

    await prisma.user.delete({
      where: { id },
    })

    res.status(204).json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

export default userRouter
