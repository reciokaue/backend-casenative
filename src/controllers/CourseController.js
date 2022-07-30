import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

export default {
  async createCourse(request, response){
    const { name, owner, category, about, image } = request.body

    await prisma.course.create({
      data: {
        name, owner, category, about, image
      }
    })
    return response.json({message: "Course created successful"}).status(200)
  },
  async getCourses(request, response){
    const data = await prisma.course.findMany()
    
    return response.json(data).status(200)
  },
  async DeleteCourse(request, response){
    const { id } = request.params

    await prisma.course.delete({
      where: {id}
    })
    return response.json({message: "Course deleted"}).status(200)
  },
  async ChangeCourse(request, response){
    const { id, name, owner, category, about, image } = request.body

    await prisma.course.update({
      where: {id},
      data: { id, name, owner, category, about, image }
    })
    return response.json({message: "Course changed"}).status(200)
  },
}