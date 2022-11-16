import { PermitLevel } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'
import prisma from '../../prisma'
import { authenticateUser, signUserJWT, UserJWT } from '../../util/auth'
import { hashPassword, verifyPassword } from '../../util/password'

const userAuthRouter = Router()

const registerParams = z.object({
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

userAuthRouter.post('/register', async (req, res) => {
  try {
    const { name, register, sectorId, unitId, permitLevel, password } =
      registerParams.parse(req.body)

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

const loginParams = z.object({
  register: z.string(),
  password: z.string(),
})

userAuthRouter.post('/login', async (req, res) => {
  try {
    const { register, password } = loginParams.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { register },
    })

    if (!user) {
      res.sendStatus(401)
    } else if (!(await verifyPassword(password, user.password))) {
      res.sendStatus(401)
    } else {
      const token = signUserJWT(user)
      res.status(200).json({ token })
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.message })
    } else {
      console.log(err)
      res.sendStatus(500)
    }
  }
})

userAuthRouter.post('/me', authenticateUser, async (_, res) => {
  try {
    const user = res.locals['user'] as UserJWT

    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default userAuthRouter
