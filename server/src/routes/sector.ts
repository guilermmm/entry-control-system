import { Router } from 'express'
import { z } from 'zod'
import prisma from '../prisma'
import { authenticateUser } from '../util/auth'
import { idParam } from '../util/util'

const sectorRouter = Router()

const searchParams = z.object({
  name: z.string().optional(),
  unitId: z.number().int().optional(),
})

sectorRouter.get('/', async (req, res) => {
  try {
    const params = searchParams.parse(req.body)

    const sectors = await prisma.sector.findMany({
      where: {
        name: {
          contains: params.name,
        },
        unitId: params.unitId,
      },
    })

    res.status(200).json(sectors)
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: err.message })
    } else {
      console.log(err)
      res.sendStatus(500)
    }
  }
})

sectorRouter.get('/:id', async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)

    const sector = await prisma.sector.findUnique({
      where: { id },
    })
    if (sector) {
      res.status(200).json(sector)
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
  unitId: z.number().int(),
})

sectorRouter.post('/', authenticateUser, async (req, res) => {
  try {
    const params = createParams.parse(req.body)

    const sector = await prisma.sector.create({
      data: params,
    })

    res.status(201).json(sector)
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

sectorRouter.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)
    const params = updateParams.parse(req.body)

    const sector = await prisma.sector.update({
      where: { id },
      data: params,
    })

    res.status(200).json(sector)
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json(error)
    } else {
      console.log(error)
      res.sendStatus(500)
    }
  }
})

sectorRouter.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = idParam.parse(req.params)

    await prisma.sector.delete({
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

export default sectorRouter
