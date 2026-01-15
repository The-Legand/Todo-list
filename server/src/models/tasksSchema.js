import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const taskSchema = new Schema({
    name: {type: String, required: true},
    createdAt: {type:Date,default: Date.now},
    priority: {type: Number, required: true},
    position: {
        type: {
            type: String,
            enum: ['Point'],
            required: true

        },
        coordinates:{
            type:[Number],
            required: true
        }
    }
});

const Task = mongoose.model('tasks', taskSchema)
export default Task;