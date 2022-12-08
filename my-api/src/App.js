import { useEffect, useState, useCallback } from "react";
import TodoForm from "./components/TodoForm";
import TodoLists from "./components/TodoLists";

function App() {
  const [todo, setTodo] = useState([]);

  const fetchTodoHandler = useCallback(async () => {
    const response = await fetch(
      "https://react-741e4-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json"
    );
    const data = await response.json();
    const loadedTodo = [];

    for (const key in data) {
      loadedTodo.push({
        id: key,
        task: data[key].task,
        date: data[key].date,
        category: data[key].category,
      });
    }

    setTodo(loadedTodo);
  }, []);

  useEffect(() => {
    fetchTodoHandler();
  }, [fetchTodoHandler]);

  async function addTodoHandler(todo) {
    const response = await fetch(
      "https://react-741e4-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json",
      {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    fetchTodoHandler();
  }

  return (
    <>
      <TodoForm onAddTodo={addTodoHandler} />
      <TodoLists onFetch={fetchTodoHandler} todos={todo} />
    </>
  );
}

export default App;
