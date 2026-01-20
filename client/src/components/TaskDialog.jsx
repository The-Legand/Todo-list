import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm, Controller } from "react-hook-form";
import MapView from "../components/MapView"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { triggerTaskRefreshAtom } from "../helpers/atoms";
import {useSetAtom} from "jotai"
export default function FormDialog() {
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [open, setOpen] = useState(false);
  const triggerRefresh = useSetAtom(triggerTaskRefreshAtom);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createTask = async (data) => {
    try {
      const createTask = await fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          position: {
            type: "Point",
            coordinates: clickedCoordinates,
          },
        }),
      });
    if (createTask.ok){
        setOpen(false)
        triggerRefresh()
    }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create new Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new Task</DialogTitle>
        <DialogContent>
          <form id="task-form" onSubmit={handleSubmit(createTask)}>
            <TextField
              className="form-fields"
              label="Task name"
              fullWidth
              autoFocus
              variant="standard"
              {...register("name", {
                minLength: {
                  value: 4,
                  message: "Task name must be at least 4 chars",
                },
                required: "name is required",
              })}
            />
            <p className="errors">{errors.name?.message}</p>              
            <InputLabel id="priority-label">Priority</InputLabel>
              <Controller
              name="priority"
              control={control}
              rules={{required: "priority is required"}}
              defaultValue=""
              render={({field})=>(
              <Select
              {...field}
                labelId="priority-label"
                id="priority"
                label="Priority"
                fullWidth
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>

              </Select>
  )}/>
            <span className="errors">{errors.priority?.message}</span>

      <MapView onMapClick={setClickedCoordinates}/>
          </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="task-form" >Create</Button>
      </DialogActions>
      </Dialog>


    </>
  );
}
