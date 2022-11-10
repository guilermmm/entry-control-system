import { z } from 'zod'

export const idParam = z.object({ id: z.string().transform(s => parseInt(s)) })
