import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("loading");

  console.log("this is tasks: ", tasks);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/");
        if (!response.ok) {
          throw new Error(`error. status: ${response.status}`);
        }
        const result = await response.json();

        setTasks(result);
        setStatus("ready");
      } catch (err) {
        console.error("error:", err);
        setStatus("error");
      }
    };
    fetchData();
  }, []);

  const deleteTask = async(id)=>{
    console.log(id)
    try{
    const response = await fetch(`http://localhost:4000/api/tasks/delete/${id}`,{
        method:"DELETE",
    })
}
catch(e){
    console.error(e)
}
  }

  if (status === "loading") return <p>Loading</p>;
  if (status === "error") return <p>Error</p>;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Task name</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Created on</TableCell>
             <TableCell align="right">Action on</TableCell>
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
              <Button  onClick={()=>deleteTask(task._id)} variant="outlined" startIcon={<DeleteIcon/>}>
                DELETE
              </Button>
              <Button variant="outlined" startIcon={<EditIcon/>}
              >Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
