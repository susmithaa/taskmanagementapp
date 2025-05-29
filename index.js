
const express = require ('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())



mongoose.connect('mongodb://localhost:27017/taskmanagement-app')
.then(() => {
    console.log('DB Connected!')
})
.catch((err) => {
    console.log(err)
})

const taskSchema = new mongoose.Schema({
taskName: { type: String, required: true },
description: { type: String },
dueDate: { type: Date, required: true },
createdAt: { type: Date, default: Date.now }
})

const taskModel = mongoose.model('task', taskSchema);

app.post('/task', async (req,res) => {
    const {taskName, description, createdAt, dueDate} = req.body;
    try {
        const newTask =  new taskModel({taskName, description, createdAt, dueDate});
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Error creating task'});
    }

})

app.get('/task', async (req,res) => {
    try {
        const tasks = await taskModel.find();
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error fetching tasks'});
    }
})


const port = 3000;
app.listen(port, () => {
    console.log("server is listening to port"+port);
})