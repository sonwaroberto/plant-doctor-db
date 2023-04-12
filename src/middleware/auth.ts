import { RequestHandler } from 'express'
import createHttpError from 'http-errors'

export const requiresAuth = async (req: any, res: any, next: any) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!!' })
  }
}
