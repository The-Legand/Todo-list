import { useForm } from "react-hook-form";

export default function NewTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        <label>priority</label>
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
        <span className="errors">{errors.priority?.message}</span>

        <div id="map" style="width: 100%; height: 400px"></div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
