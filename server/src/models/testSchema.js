import Task from './tasksSchema.js'

const createTaskTest = async ()=>{
    try{
    const task = await Task.create({
        name: 'This is the first task',
        priority: 1,
        position:{
            type:'Point',
            coordinates: [27,35]
        }
    })
    
}
catch(e){
    console.error(e)
}

}

export default createTaskTest;