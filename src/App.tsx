import React, { useState } from "react";
import klukica from "./photos/klukica.png";
import iks from "./photos/iks.png";
import "./App.css";

export default function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selectedDay, setSelectedDay] = useState<string | null>(null); // Dodano stanje za izbran dan

  const saveTodo = function (event: any) {
    setTodo(event.target.value);
  };

  const izpisiTodo = function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTodos([...todos, selectedDay + ": " + todo]); // Uporaba izbranega dneva
    setTodo("");
  };

  const izbrisiTodo = function (id: number) {
    const newTodos = todos.filter((item, index) => index !== id);
    setTodos(newTodos);
  };

  const handleDayClick = function (day: string) {
    // Dodana funkcija za izbiro dneva
    setSelectedDay(day);
  };

  const [selectedIds, setSelectedIds] = useState<{ [key: number]: boolean }>(
    {}
  );

  const potrdiToDo = function (id: number) {
    setSelectedIds((prejsnji) => ({
      ...prejsnji,
      [id]: !prejsnji[id],
    }));
  };

  return (
    <>
      <h1>TO-DO LIST</h1>

      <div className="weekDays">
        {day.map((dayName, i) => (
          <button
            key={i}
            onClick={() => handleDayClick(dayName)}
            className="button"
          >
            {dayName}
          </button>
        ))}
      </div>

      {
        <form onSubmit={izpisiTodo} className="Form">
          <p>{selectedDay}</p>
          <input
            type="text"
            placeholder="Your to-do..."
            onChange={saveTodo}
            value={todo}
          />

          <input type="submit" />
        </form>
      }

      {todos.map((item: string, index: number) => {
        const izpis = item.split(":");

        return (
          <div
            className="todos"
            style={{
              backgroundColor: selectedIds[index] ? "#00FF00" : "#FFFFFF",
            }}
            key={index}
          >
            <p key={index}>
              <span className="dan">{izpis[0]}: </span>
              {izpis[1]}
            </p>

            <div className="gumbi">
              <button className="kljukica" onClick={() => potrdiToDo(index)}>
                <img src={klukica} width={25} height={25} />
              </button>
              <button className="izbrisi" onClick={() => izbrisiTodo(index)}>
                <img src={iks} width={25} height={25} />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
