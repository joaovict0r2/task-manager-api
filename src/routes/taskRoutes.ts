import { Router } from "express";
import {
  createTask,
  updateTask,
  getTasks,
  deleteTask
} from '../controllers/taskController'

const router = Router()

router.get('/tasks', getTasks)
router.post('/tasks', createTask)
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)

export default router;