import { Router } from 'express'
import CourseController from './controllers/CourseController'

import UserController from './controllers/UserController'

const router = Router()

router.post("/user", UserController.createUser)
router.post("/login", UserController.loginUser)
router.put("/user", UserController.changePassword)

router.post("/course", CourseController.createCourse)
router.get("/course", CourseController.getCourses)
router.delete("/course/:id", CourseController.DeleteCourse)
router.put("/course", CourseController.ChangeCourse)


export { router }