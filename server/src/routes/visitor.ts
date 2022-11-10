import { Router } from 'express'
import { z } from 'zod'
import prisma from '../prisma'
import { authenticateUser } from '../util/auth'
import { idParam } from '../util/util'

const visitorRouter = Router()

const searchParams = z.object({
  cpf: z.string().optional(),
})

visitorRouter.get('/', async (req, res) => {
  try {
    const params = searchParams.parse(req.body)

    const visitors = await prisma.visitor.findMany({
      where: {
        cpf: {
          contains: params.cpf,
        },
      },
    })

    res.status(200).json(visitors)
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.message })
    } else {
      console.log(err)
      res.sendStatus(500)
    }
  }
})

visitorRouter.get('/:id', async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)

    const visitor = await prisma.visitor.findUnique({
      where: { id },
    })
    if (visitor) {
      res.status(200).json(visitor)
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
  cpf: z.string(),
  phone: z.string(),
  rg: z.string(),
  photo: z.string(),
})

visitorRouter.post('/', authenticateUser, async (req, res) => {
  try {
    const params = createParams.parse(req.body)

    const visitor = await prisma.visitor.create({
      data: {
        name: params.name,
        cpf: params.cpf,
        phone: params.phone,
        rg: params.rg,
        photo: params.photo,
      },
    })

    res.status(201).json(visitor)
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.message })
    } else {
      console.log(err)
      res.sendStatus(500)
    }
  }
})

const updateParams = z.object({
  name: z.string().optional(),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  rg: z.string().optional(),
  photo: z.string().optional(),
})

visitorRouter.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)
    const params = updateParams.parse(req.body)

    const visitor = await prisma.visitor.update({
      where: { id },
      data: params,
    })

    if (!visitor) {
      res.sendStatus(404)
    }

    res.status(200).json(visitor)
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.message })
    } else {
      console.log(err)
      res.sendStatus(500)
    }
  }
})

export default visitorRouter
