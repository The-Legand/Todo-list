import { useForm } from "react-hook-form";
import MapView from "../components/MapView"
import TextField from "@mui/material/TextField";
import {useState} from 'react'
export default function NewTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  

  async function createTask(data) {
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
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(createTask)}>
        
          <TextField
            className="form-fields"
            label="Task name"
            {...register("name", {
              minLength: {
                value: 4,
                message: "Task name must be at least 4 chars",
              },
              required: "name is required",
            })}
          />
          <p className="errors">{errors.name?.message}</p>
        <label>priority
        <select
          id="priority"
          defaultValue=""
          className="form fields"
          {...register("priority", {
            required: "Priority is required",
            valueAsNumber: true,
          })}
        >
          <option value="" disabled>
            select priority
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        </label>
        <span className="errors">{errors.priority?.message}</span>

        {/* <div id="map" ></div> */}
        
        <button type="submit">Submit</button>
      <MapView onMapClick={setClickedCoordinates}/>
      </form>


    </>
  );
}
