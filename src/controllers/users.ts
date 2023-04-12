import { type RequestHandler } from 'express'
import type SignUpBody from '../interfaces'
import createHttpError from 'http-errors'
import UserModel from '../models/user'
import bcrypt from 'bcrypt'
import { assertIsDefined } from '../util/assertIsDefined'
import jwt from 'jsonwebtoken'

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const passwordRaw = req.body.password
  const passwordConf = req.body.confirmPassword
  try {
    if (
      !username ||
      !email ||
      !passwordRaw ||
      !passwordConf
    ) {
      throw createHttpError(
        400,
        "Parameter 'username' or 'email' 'password' must be provided"
      )
    }
    const existingEmail = await UserModel.findOne({ email }).exec()
    if (existingEmail) {
      throw createHttpError(409, 'email already in use, please login instead')
    }
    const passwordHashed = await bcrypt.hash(passwordRaw, 10)
    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
    })
    res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
}

interface LoginBody {
  email?: string
  password?: string
}
export const getAuthenticatedUser: RequestHandler = async (
  req: any,
  res,
  next
) => {
  try {
    if (req.user) {
      res.status(201).json({
        ...req.user._doc
      })
    } else {
      return res.status(401).json({ message: 'Invalid token' })
    }
  } catch (err) {
    next(err)
  }
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  try {
    if (!email || !password) {
      throw createHttpError(400, 'Parameters missing')
    }
    const user = await UserModel.findOne({ email })
      .select('+password +email')
      .exec()
    if (!user) {
      throw createHttpError(401, 'Invalid credentials')
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials')
    }
    return res.json({ token: jwt.sign({ ...user }, 'RESTFULAPIs') })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const logout: RequestHandler = (req, res, next) => {
  try {
    res.clearCookie('token') // clear token cookie
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

const items = [
  {
    name: 'BITTER LEAF',
    description: 'Bitter leaf plant jdflsdlfj lfdsjfkdjsklfjsdl sdlfjsdlfkdsjfklds sdfljsdlfjdslkj flksdjflksd fslsdklfjdls ksjflksjdfl klsf klsdf sjklfjdsl sjfklsd f sdflsdj',
    image: '~/images/plant1.png',
    button: 'more details',
  },
  {
    name: 'Item 2',
    description: 'Description for Item 2',
    image: '~/images/plant2.png',
    button: 'see more',
  },
  {
    name: 'Item 3',
    description: 'Description for Item 3',
    image: '~/images/plant3.png',
    button: 'see more',
  },
  {
    name: 'Item 4',
    description: 'Description for Item 4',
    image: '~/images/plant4.png',
    button: 'see more',

  },
  {
    name: 'Item 5',
    description: 'Description for Item 5',
    image: '~/images/plant1.png',
  },
  {
    name: 'Item 2',
    description: 'Description for Item 2',
    image: '~/images/plant2.png',
    button: 'see more',
  },
  {
    name: 'Item 3',
    description: 'Description for Item 3',
    image: '~/images/plant3.png',
    button: 'see more',
  },
  {
    name: 'Item 4',
    description: 'Description for Item 4',
    image: '~/images/plant4.png',
    button: 'see more',

  },
  {
    name: 'Item 5',
    description: 'Description for Item 5',
    image: '~/images/plant1.png',
  }
]

export const hello: RequestHandler = (req, res, next) => {
  try {
    res.json(items)
  } catch (error) {
    next(error)
  }
}
