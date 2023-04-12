import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import userRoutes from './routes/users'
import morgan from 'morgan'
import createHttpError, { isHttpError } from 'http-errors'
import { requiresAuth } from './middleware/auth'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import env from './util/validEnv'

import cors from 'cors'

const app = express()
const port = env.PORT || 8080
app.use(express.json())

app.use(
	cors({
		origin: ['http://localhost:3000', 'https://comptabilite-dijital.vercel.app'], // Replace with your frontend URL
		credentials: true,
	})
)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req: any, res, next) {
	if (
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.split(' ')[0] === env.NEXT_PUBLIC_JWT_KEY
	) {
		jwt.verify(
			req.headers.authorization.split(' ')[1],
			'RESTFULAPIs',
			function (err: any, decode: any) {
				if (err) req.user = undefined
				req.user = decode
				next()
			}
		)
	} else {
		req.user = undefined
		next()
	}
})

app.use('/api/users', userRoutes)


app.use((req, res, next) => {
	next(createHttpError(404, 'Endpoint not found'))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.error(error)
	let errorMessage = 'An unknown error occurred'
	let statusCode = 500
	if (isHttpError(error)) {
		statusCode = error.status
		errorMessage = error.message
	}
	res.status(statusCode).json({ error: errorMessage })
})

mongoose
	.connect(env.MONGO_CONNECTION_STRING)
	.then(() => {
		console.log('Mongoose connected')
		app.listen(port, () => {
			console.log('Server listening on port: ' + port)
		})
	})
	.catch(console.error)