import { Request, Response, NextFunction } from "express";
import supabase from "../config/supabase";
import { CreateTaskDTO, UpdateTaskDTO } from "../models/task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
    
    if (error) throw error;

    res.status(200).json(data)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title }: CreateTaskDTO = req.body
    
    if (!title) {
      res.status(400).json({ error: 'Title is required' })
      return
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title }])
      .select()

    if (error) throw error

    res.status(201).json(data[0])
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title }: UpdateTaskDTO = req.body
    
    const { data, error } = await supabase 
      .from('tasks')
      .update({ title })
      .eq('id', id)
      .select()

    if (error) throw error

    if (data.length === 0) {
      res.status(404).json({ error: "Task not found" })
      return
    }

    res.status(200).json(data[0])
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) throw error

    res.status(200).json({ message: "Task deleted successfully" })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

