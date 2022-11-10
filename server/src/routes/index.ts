import { Router } from 'express'
import sectorRouter from './sector'
import unitRouter from './unit'
import userRouter from './user'
import visitationRouter from './visitation'
import visitorRouter from './visitor'

const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use('/sector', sectorRouter)
appRouter.use('/unit', unitRouter)
appRouter.use('/visitation', visitationRouter)
appRouter.use('/vititor', visitorRouter)

export default appRouter
