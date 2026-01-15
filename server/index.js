import express, { json } from 'express'
import connectDB  from './src/config/db.js'
import {createTaskController, updateTaskController} from './src/controllers/taskController.js'
const app = express();

connectDB();
const port = 4000;
app.use(express.json());



app.patch('/api/tasks/:taskId', (req,res)=>{
    updateTaskController(req,res);
});
app.post('/', (req,res)=>{
    console.log("hi")

    createTaskController(req,res)

    //return res.json({"msg":"it works"})
})
app.listen(port, ()=>{
    console.log(`server is working at port ${port}`)
})