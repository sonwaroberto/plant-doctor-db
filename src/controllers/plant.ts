import { type RequestHandler } from 'express'
import type Plant from '../interfaces'
import createHttpError from 'http-errors'
import PlantModel from '../models/plant'
import bcrypt from 'bcrypt'
import { assertIsDefined } from '../util/assertIsDefined'
import jwt from 'jsonwebtoken'

export const addPlant: RequestHandler<
  unknown,
  unknown,
  Plant,
  unknown
> = async (req, res, next) => {
  const name = req.body.name
  const symptoms = req.body.symptoms
  const setting = req.body.setting
  const location = req.body.location
  const userId = req.body.userId
  const imageSource = req.body.imageSource

  try {
    if (!name || !symptoms || !setting || !location || !userId) {
      throw createHttpError(
        400,
        'All the parameters most be filled to create a new plant'
      )
    }
    const newPlant = await PlantModel.create({
      name,
      symptoms,
      setting,
      location,
      userId,
      imageSource,
    })
    res.status(201).send(newPlant)
  } catch (err) {
    next(err)
  }
}

export const getPlant: RequestHandler<
  unknown,
  unknown,
  Plant,
  unknown
> = async (req, res, next) => {
  const userId = req.body.userId
  try {
    if (!userId) {
      throw createHttpError(400, 'Parameters missing')
    }
    const plants = await PlantModel.find({ userId }).exec()
    if (!plants) {
      throw createHttpError(401, 'No plant added yet')
    }
    res.status(201).send(plants)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const hello: RequestHandler = (req, res, next) => {
  try {
    res.send('plant route')
  } catch (error) {
    next(error)
  }
}
