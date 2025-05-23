import * as bcrypt from "bcrypt"

export const generateHashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}
export const comparePassword = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword)
}