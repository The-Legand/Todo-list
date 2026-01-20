import React,{ useEffect, useState, Suspense } from "react";
import {useAtomValue, useSetAtom} from "jotai";
import {tasksAtom, triggerTaskRefreshAtom} from "../helpers/atoms";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack"
import TaskDialog from '../components/TaskDialog'
import TaskEdit from '../components/TaskEdit'



function TasksList(){
    const tasks = useAtomValue(tasksAtom)
   

    const refreshTasks = useSetAtom(triggerTaskRefreshAtom);
    const deleteTask = async(id)=>{
    try{
    const response = await fetch(`http://localhost:4000/api/tasks/delete/${id}`,{
        method:"DELETE",
    })
    if (!response.ok) throw new Error("Delete failed");
    refreshTasks();
   
}
catch(e){
    console.error(e)
}
}

return (
    <>
    <div className="todoapp">
      <h1>Task List</h1>
      <TaskDialog/>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Task name</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Created on</TableCell>
             <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task._id}
              
            >
              <TableCell component="th" >
                {task.name}
              </TableCell>
              <TableCell align="right">{task.priority}</TableCell>
              <TableCell align="right">{new Date(task.createdAt).toLocaleString()}</TableCell>
              <TableCell align="right" >
              <Stack spacing={2}  >
              
              <TaskEdit taskId={task._id}/>
              <Button  onClick={()=>deleteTask(task._id)} variant="outlined" startIcon={<DeleteIcon/>}>
                DELETE
              </Button>
              </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}

export default function Tasks() {
    return(
    <Suspense fallback={<p>Loading tasks...</p>}>
        <TasksList/>
    </Suspense>
  
    )
}
