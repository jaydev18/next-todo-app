// TodoForm.jsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const schema = z.object({
  todo: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

interface TodoFormProps {
  onSubmit: (data: FormData) => void;
}

function AddItem({ onSubmit }: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-3">
          <label htmlFor="addTodo" className="form-label">
            Todo
          </label>
          <input
            {...register("todo")}
            id="addTodo"
            type="text"
            className={`form-control ${errors.todo ? "is-invalid" : ""}`}
            placeholder="Create todo"
          />
          {errors.todo && (
            <div className="invalid-feedback">{errors.todo.message}</div>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Add item
        </button>
      </form>
    </div>
  );
}

export default AddItem;
