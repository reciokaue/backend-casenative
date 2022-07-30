import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcrypt'
const prisma = new PrismaClient

export default {
  async createUser(request, response){
    const { name, email, password } = request.body
  
    let user = await prisma.user.findUnique({where: {email}})
    if(user)
      return response.json({error: "This email is already in use"}).status(400)
  
    bcrypt.hash(password, 3, async function(err, hash) {
      if(err)
        throw new Error
  
      await prisma.user.create({
        data: {
          name,
          email,
          password: hash
        }
      })
    });
     
    return response.status(200).json({message: "User created", userName: user.name})
  },

  async loginUser(request, response){
    const { email, password } = request.body

    const user = await prisma.user.findUnique({where: {email}})
    if(!user)
      return response.status(400).json({message: "Email not registred"}) 

    const hash = user.password
    
    bcrypt.compare(password, hash, (err, result) => {
      if(err)
        throw new Error

      if(result)
        return response.status(200).json({message: "Login successful", userName: user.name})
      else
        return response.status(400).json({message: "Wrong password"})
    })
  },

  async changePassword(request, response){
    const { email, password, newPassword } = request.body

    const user = await prisma.user.findUnique({where: {email}})
    const hash = user.password

    bcrypt.compare(password, hash, (err, result) => {
      if(err)
        throw new Error

      if(result){
        bcrypt.hash(newPassword, 3, async function(err, hash) {
          if(err)
            throw new Error
            
          await prisma.user.update({
            where: {email},
            data: {password: hash}
          })
        });
        return response.status(200).json({message: "Password changed successful", user})
      }
      else
        return response.status(400).json({message: "Wrong password"})
    })
  }
}