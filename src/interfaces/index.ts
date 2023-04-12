export default interface SignUpBody {
  name?: string
  email?: string
  password?: string
  phoneNumber?: ''
  confirmPassword?: string
  matricule?: string
  role?: {}
  createdAt: Date
  IdCreateur?: string
}