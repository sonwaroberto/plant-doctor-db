import { type InferSchemaType, Schema, model } from 'mongoose'

const plantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    symptoms: { type: String, required: true },
    setting: { type: String, required: true },
    location: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)
type Plant = InferSchemaType<typeof plantSchema>

export default model<Plant>('Plant', plantSchema)
