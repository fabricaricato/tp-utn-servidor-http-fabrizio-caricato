import { Task } from "../models/task.model.js";

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    
    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({
      title,
      description
      // creator: --> configurar luego con el middleware
    });

    return res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found or you do not have permission" });
    }

    return res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found or you do not have permission" });
    }

    return res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export { getTasks, createTask, updateTask, deleteTask };