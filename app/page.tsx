"use client";
import { FormEvent, useState, useRef } from "react";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import "bootstrap/dist/css/bootstrap.css";
export default function Home() {
  const [itemList, setItemList] = useState([
    { id: 1, todo: "item1", checked: false },
    { id: 2, todo: "item2", checked: false },
    { id: 3, todo: "item3", checked: false },
  ]);

  const itemRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (itemRef.current !== null && itemRef.current.value.trim() !== "") {
      const newItem = {
        id: itemList.length + 1,
        todo: itemRef.current.value.trim(),
        checked: false,
      };

      setItemList((prev) => [...prev, newItem]);
      if (itemRef.current !== null) {
        itemRef.current.value = "";
      }
    }
  };

  const handleDelete = (id: number) => {
    const updatedItems = itemList.filter((item) => item.id !== id);
    setItemList(updatedItems);
  };

  const handleToggleCheckbox = (id: number) => {
    setItemList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <main className="mb-3 p-5">
      <AddItem onClick={handleSubmit} itemRef={itemRef} />
      <ItemList
        itemList={itemList}
        handleToggleCheckbox={handleToggleCheckbox}
        handleDelete={handleDelete}
      />
    </main>
  );
}
