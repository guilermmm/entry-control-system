import { Router } from 'express'
import userAuthRouter from './auth/user'
import sectorRouter from './sector'
import unitRouter from './unit'
import userRouter from './user'
import visitationRouter from './visitation'
import visitorRouter from './visitor'

const appRouter = Router()

appRouter.use('/user', userRouter)
appRouter.use('/user_auth', userAuthRouter)
appRouter.use('/sector', sectorRouter)
appRouter.use('/unit', unitRouter)
appRouter.use('/visitation', visitationRouter)
appRouter.use('/vititor', visitorRouter)

export default appRouter
