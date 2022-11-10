import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { accessTokenSecret, tokenExpireTime } from './consts'

export interface UserJWT {
  id: number
  name: string
  registration: string
  iat: number
  exp: number
}

export const signUserJWT = ({ id, name, register }: User) => {
  const signedToken = sign({ id, name, register }, accessTokenSecret, {
    expiresIn: tokenExpireTime,
  })

  return signedToken
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')?.[1]

    if (!token) return res.sendStatus(401)

    const payload = verify(token, accessTokenSecret) as UserJWT

    if (!payload || !(payload as any).register) return res.sendStatus(401)

    res.locals['user'] = payload

    return next()
  } catch (err) {
    res.sendStatus(401)
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')?.[1]

    if (!token) return res.sendStatus(401)

    const payload = verify(token, accessTokenSecret)

    if (!payload) return res.sendStatus(401)

    return next()
  } catch (err) {
    res.sendStatus(401)
  }
}
