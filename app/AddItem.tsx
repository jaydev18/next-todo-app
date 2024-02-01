import { FormEvent, useRef } from "react";

interface AddItemProps {
  onClick: (e: FormEvent) => void;
  itemRef: React.RefObject<HTMLInputElement>;
}

function AddItem({ onClick, itemRef }: AddItemProps) {
  return (
    <div>
      <form onSubmit={onClick}>
        <div className="mb-3">
          <label htmlFor="addTodo" className="form-label">
            Todo
          </label>
          <input
            ref={itemRef}
            id="addTodo"
            type="text"
            className="form-control"
            placeholder="create todo"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add item
        </button>
      </form>
    </div>
  );
}

export default AddItem;
