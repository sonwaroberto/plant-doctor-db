import { type InferSchemaType, Schema, model } from 'mongoose'
import validator from 'validator'

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Entrer votre mot de passe'],
    minLength: [6, 'Your password must be at least 6 characters long'],
    select: false
  },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  },
},
  { timestamps: true }
)
type User = InferSchemaType<typeof userSchema>

export default model<User>('User', userSchema)
