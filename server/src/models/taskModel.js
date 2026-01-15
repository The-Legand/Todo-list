import Task from "./tasksSchema.js";

export const createTask = async ({ name, priority, position }) => {
  const task = await Task.create({
    name,
    priority,
    position,
  });
  return task;
};

export const updateTask = async ({ taskId, fieldsToUpdate }) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, fieldsToUpdate,{new: true, runValidators: true});

  return updatedTask;
};
