import { Request, RequestHandler, Response, NextFunction } from "express";
import { tasks, Task } from "../models/task";

export const getTasks = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

export const createTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body
    const id = Date.now().toString()

    const newTask: Task = { id, title }

    tasks.push(newTask)
    res.status(201).json(newTask)
  } catch (error) {
    next(error)
  }
}

export const updateTask = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const id = req.params.id
    const { title } = req.body
    const taskIndex = tasks.findIndex((t) => t.id === id)

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" })
    }

    tasks[taskIndex] = { id, title }
    res.json(tasks[taskIndex])
  } catch (error) {
    next(error)
  }
}

export const deleteTask = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const id = req.params.id
    const taskIndex = tasks.findIndex((t) => t.id === id)

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" })
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0]
    res.json(deletedTask)
  } catch (error) {
    next(error)
  }
}

