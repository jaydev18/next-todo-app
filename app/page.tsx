"use client";
import React, { useEffect, useState } from "react";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { string } from "zod";
interface Todos {
  id: number;
  todo: string;
  checked: boolean;
}

export default function Home() {
  const [itemList, setItemList] = useState<Todos[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4000/gettodos")
      .then((res) => setItemList([...res.data.data]))
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = (data: { todo: string }) => {
    const originalTodo = [...itemList];
    const newItem = {
      id: itemList.length + 1,
      todo: data.todo,
      checked: false,
    };
    setItemList([...itemList, newItem]);
    axios
      .post("http://localhost:4000/createTodo", newItem)
      .then((res) => {
        const responseData = res.data.data;
        setItemList((prevItemList) => [...prevItemList, responseData]);
      })

      .catch((err) => {
        setError(err.message);
        setItemList(originalTodo);
      });
  };

  const handleDelete = (id: number) => {
    const originalTodo = [...itemList];
    const updatedItems = itemList.filter((item) => item.id !== id);
    setItemList(updatedItems);
    axios.delete(`http://localhost:4000/deleteTodo/${id}`).catch((err) => {
      setError(err.message);
      setItemList(originalTodo);
    });
  };
  const handleToggleCheckbox = (id: number) => {
    const originalTodo = [...itemList];
    setItemList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    const updatedTodo = {
      checked: !itemList.find((item) => item.id === id)?.checked,
    };

    axios
      .put(`http://localhost:4000/updateTodo/${id}`, updatedTodo)
      .catch((err) => {
        setError(err.message);
        setItemList(originalTodo);
      });
  };

  return (
    <main className="mb-3 p-5">
      <AddItem onSubmit={handleSubmit} />
      {error && <p className="text-danger">{error}</p>}
      <ItemList
        itemList={itemList}
        handleToggleCheckbox={handleToggleCheckbox}
        handleDelete={handleDelete}
      />
    </main>
  );
}
