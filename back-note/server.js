const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Task = require('./models/taskModel');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://217131:XrDwlJNIfzjcDjKe@cluster0.6vhukcg.mongodb.net/nodeAPI?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello jihan");
});

app.post("/tasks", async (req, res) => {
  try {
    const tasks = await Task.create(req.body);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: `This task with ID ${id} doesnt exist `  });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res.status(401).json({ message: `This task with ID ${id} doesn't exist`  });
    }
    const updatedTask = await Task.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(401).json({ message: `This task with ID ${id} doesn't exist`  });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));