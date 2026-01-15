import { createTask, updateTask } from "../models/taskModel.js";
export const createTaskController = async (req, res) => {
  const name = req.body.name;
  const priority = req.body.priority;
  const position = req.body.position;
  try {
    const result = await createTask({ name, priority, position });
    return res.status(201).json({ message: "Task created!", task: result });
  } catch (e) {
    console.error("Failed due to:", e);
    res.status(500).json({ message: "server Error", error: e.message });
  }
};

export const updateTaskController = async (req, res) => {
  const {taskId} = req.params;
  const fieldsToUpdate = req.body;
  try{
  const updatedTask = await updateTask({taskId, fieldsToUpdate});
  if(!updatedTask) {
    const msg = "Task not found";
    const err = new Error(msg)
    err.status = 404
    throw err;
    }
  return res.status(200).json({ message: "Task updated", updatedTask });
  }
  catch(e){
    const statusCode = e.status || 500;
    return res.status(statusCode).json({error:e.message})
  }
};
