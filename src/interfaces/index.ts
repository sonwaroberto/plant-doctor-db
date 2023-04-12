export default interface SignUpBody {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  createdAt: Date
}