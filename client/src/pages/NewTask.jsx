import { useForm } from "react-hook-form";
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js'
import ImageLayer from 'ol/layer/Image.js'
import View from 'ol/View.js'

export default function NewTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const map = new Map({
    target:'map',
    layers:[
        new ImageLayer({
            source: new OSM(),
        }),
    ],
    view: new View({
        center:[0,0],
        zoom:2,
    })
})

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
            coordinates: [35, 42],
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
        <label>
          Task name
          <input
            className="form fields"
            {...register("name", {
              minLength: {
                value: 4,
                message: "Task name must be at least 4 chars",
              },
              required: "name is required",
            })}
          />
          <p className="errors">{errors.name?.message}</p>
        </label>
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
      </form>
        

    </>
  );
}
