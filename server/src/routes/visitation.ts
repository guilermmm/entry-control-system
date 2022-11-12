import { Router } from 'express'
import { z } from 'zod'
import prisma from '../prisma'
import { authenticateUser } from '../util/auth'
import { idParam } from '../util/util'

const visitationRouter = Router()

const searchParams = z.object({
  finalized: z.boolean().optional(),
  visitorId: z.number().int().optional(),
  unitId: z.number().int().optional(),
  sectorId: z.number().int().optional(),
  userId: z.number().int().optional(),
})

visitationRouter.get('/', async (req, res) => {
  try {
    const params = searchParams.parse(req.body)

    const visitations = await prisma.visit.findMany({
      where: {
        finalized: params.finalized,
        visitorId: params.visitorId,
        unitId: params.unitId,
        sectorId: params.sectorId,
        userId: params.userId,
      },
    })

    res.status(200).json(visitations)
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.message })
    } else {
      console.log(err)
      res.sendStatus(500)
    }
  }
})

visitationRouter.get('/:id', async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)

    const visit = await prisma.visit.findUnique({
      where: { id },
    })
    if (visit) {
      res.status(200).json(visit)
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
  visitorId: z.number().int(),
  unitId: z.number().int().optional(),
  sectorId: z.number().int().optional(),
  userId: z.number().int(),
})

visitationRouter.post('/', authenticateUser, async (req, res) => {
  try {
    const params = createParams.parse(req.body)

    const visit = await prisma.visit.create({
      data: params,
    })

    res.status(201).json(visit)
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
  sectorId: z.number().int().optional(),
  unitId: z.number().int().optional(),
  userId: z.number().int().optional(),
})

visitationRouter.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)
    const params = updateParams.parse(req.body)

    const visit = await prisma.visit.update({
      where: { id },
      data: params,
    })

    res.status(200).json(visit)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

const finalizeParams = z.object({
  finalized: z.boolean(),
})

visitationRouter.patch('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)
    const params = updateParams.parse(req.body)

    const visit = await prisma.visit.update({
      where: { id },
      data: params,
    })

    res.status(200).json(visit)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

visitationRouter.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)

    await prisma.visit.delete({
      where: { id },
    })

    res.sendStatus(204)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

export default visitationRouter
