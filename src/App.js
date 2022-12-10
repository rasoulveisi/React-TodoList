import { useEffect, useState, useCallback } from "react";
import TodoForm from "./components/TodoForm";
import TodoLists from "./components/TodoLists";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodoHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-741e4-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json"
      );

      if (!response.ok) {
        throw new Error("Something is wrong!!");
      }

      const data = await response.json();

      const loadedTodo = [];

      for (const key in data) {
        loadedTodo.push({
          key: key,
          task: data[key].task,
          date: data[key].date,
          // category: wdata[key].category,
        });
      }

      setTodos(loadedTodo);
    } catch (e) {
      setError("Somthing is wrong!");
    }
  }, []);

  useEffect(() => {
    fetchTodoHandler();
  }, [fetchTodoHandler]);

  async function addTodoHandler(todo) {
    console.log("addTodoHandler");
    setTodos((prevTodo) => prevTodo.concat(todo));
  }

  return (
    <>
      <TodoForm onAddTodo={addTodoHandler} />
      <TodoLists onFetch={fetchTodoHandler} todos={todos} />
    </>
  );
}

export default App;
