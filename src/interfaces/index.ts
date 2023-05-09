export default interface SignUpBody {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  createdAt: Date
}
export default interface Plant {
  name?: string
  symptoms?: string
  setting?: string
  location?: string
  createdAt: Date
  userId: string
  imageSource?: string
}
