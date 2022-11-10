import { Router } from 'express'
import { z } from 'zod'
import prisma from '../prisma'
import { authenticateUser } from '../util/auth'
import { idParam } from '../util/util'

const unitRouter = Router()

const searchParams = z.object({
  name: z.string().optional(),
})

unitRouter.get('/', async (req, res) => {
  try {
    const params = searchParams.parse(req.body)

    const units = await prisma.unit.findMany({
      where: {
        name: {
          contains: params.name,
        },
      },
    })

    res.status(200).json(units)
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.message })
    } else {
      console.log(err)
      res.sendStatus(500)
    }
  }
})

unitRouter.get('/:id', async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)

    const unit = await prisma.unit.findUnique({
      where: { id },
    })
    if (unit) {
      res.status(200).json(unit)
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
})

unitRouter.post('/', authenticateUser, async (req, res) => {
  try {
    const params = createParams.parse(req.body)

    const unit = await prisma.unit.create({
      data: params,
    })

    res.status(201).json(unit)
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
  name: z.string(),
})

unitRouter.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)
    const params = updateParams.parse(req.body)

    const unit = await prisma.unit.update({
      where: { id },
      data: params,
    })

    res.status(200).json(unit)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

export default unitRouter
