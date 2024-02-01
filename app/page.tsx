"use client";
import "bootstrap/dist/css/bootstrap.css";
import { MdDelete } from "react-icons/md";
import { FormEvent, useState, useRef } from "react";
import Hello from "./hello";

export default function Home() {
  const [itemList, setItemList] = useState<string[]>([
    "item1",
    "item2",
    "item3",
  ]);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    new Array(itemList.length).fill(false)
  );

  const itemRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (itemRef.current !== null && itemRef.current.value.trim() !== "") {
      setItemList((prev) => [...prev, itemRef.current!.value.trim()]);
      setCheckedItems((prev) => [...prev, false]);
    }
  };

  const handleDelete = (index: number) => {
    const updatedItems = itemList.filter((prev, i) => i !== index);
    const updatedCheckedItems = checkedItems.filter((prev, i) => i !== index);
    setItemList(updatedItems);
    setCheckedItems(updatedCheckedItems);
  };

  const handleToggleCheckbox = (index: number) => {
    setCheckedItems((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <main className="mb-3 p-5">
      <form onSubmit={handleSubmit}>
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
      <ul className="list-group mt-3">
        {itemList.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              textDecoration: checkedItems[index] ? "line-through" : "none",
            }}
          >
            <div className="d-flex align-items-center">
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => handleToggleCheckbox(index)}
              />
              <span className="ms-2">{item}</span>
            </div>
            <span
              onClick={() => handleDelete(index)}
              style={{ cursor: "pointer" }}
            >
              <MdDelete />
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
