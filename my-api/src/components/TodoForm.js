import react, { useRef } from "react";
import classes from "./TodoForm.module.css";
import Box from "./UI/Box";

const TodoForm = (props) => {
  const taskTodo = useRef("");
  const dateTodo = useRef("");
  const catTodo = useRef("");

  const addTodoHandler = (event) => {
    event.preventDefault();

    const todo = {
      task: taskTodo.current.value,
      date: dateTodo.current.value,
      category: catTodo.current.value,
    };

    props.onAddTodo(todo);
    taskTodo.current.value = "";
    dateTodo.current.value = "";
  };

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
          <input type="date" id="Date" ref={dateTodo} />
          <label htmlFor="Category">Category</label>
          <select id="Category" ref={catTodo}>
            <option value="Propgram">Program</option>
            <option value="WorkOut">WorkOut</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </Box>
    </>
  );
};

export default TodoForm;
