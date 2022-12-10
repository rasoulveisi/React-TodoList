import react, { useRef } from "react";
import classes from "./TodoForm.module.css";
import Box from "./UI/Box";

const TodoForm = (props) => {
  const taskTodo = useRef("");
  const dateTodo = useRef("");
  // const catTodo = useRef("");

  const sendTodo = async (todo) => {
    const response = await fetch(
      "https://react-741e4-default-rtdb.asia-southeast1.firebasedatabase.app/todos.json",
      {
        method: "POST",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
  };

  const addTodoHandler = (event) => {
    event.preventDefault();

    const todo = {
      task: taskTodo.current.value,
      date: dateTodo.current.value,
      // category: catTodo.current.value,
    };

    sendTodo(todo);

    props.onAddTodo(todo);
    taskTodo.current.value = "";
    dateTodo.current.value = "";
  };
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  return (
    <>
      <Box className={classes["todo-title"]}>Todo List</Box>
      <Box className={classes["todo-form"]}>
        <form onSubmit={addTodoHandler}>
          <label htmlFor="Task">Task</label>
          <input
            type="text"
            id="Task"
            placeholder="Add Task +"
            ref={taskTodo}
          />
          <label htmlFor="Date">Date</label>
          <input
            type="date"
            id="Date"
            ref={dateTodo}
            defaultValue={`${year}-${day}-${month}`}
          />
          {/* <label htmlFor="Category">Category</label>
          <select id="Category" ref={catTodo}>
            <option value="One">One</option>
            <option value="Two">Two</option>
          </select> */}
          <input type="submit" value="Submit" />
        </form>
      </Box>
    </>
  );
};

export default TodoForm;
