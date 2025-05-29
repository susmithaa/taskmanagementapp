
const express = require ('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const userModel = mongoose.model('User', userSchema);


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
}


const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ email: username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne(
            { email: username }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

app.post('/login', login);
app.post('/signup', signup);

app.post('/task', authenticateToken, async (req,res) => {
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

app.get('/task',authenticateToken, async (req,res) => {
    try {
        const tasks = await taskModel.find();
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error fetching tasks'});
    }
})

app.put('/task/:id', authenticateToken, async (req,res) => {
    const {id} = req.params;
    const {taskName, description, dueDate} = req.body;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            id, {taskName, description, dueDate}, {new:true}     )
        if (!updatedTask) {
            return res.status(404).json({message: 'Task not found'});
        }   
        res.json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error updating task'});
    }   
})

app.delete('/task/:id', authenticateToken, async (req,res) => {
    const {id} = req.params;
    try {
        const deletedTask = await taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({message: 'Task not found'});
        }
        res.json({message: 'Task deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error deleting task'});
    }
})

const port = 3000;
app.listen(port, () => {
    console.log("server is listening to port"+port);
})