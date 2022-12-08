import react, { useState, useEffect } from "react";
import classes from "./TodoLists.module.css";
import Box from "./UI/Box";

const TodoLists = (props) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(props.todos);
  }, []);

  return (
    <Box className={classes.task}>
      <ul>
        <button onClick={props.onFetch}>Refresh List</button>
        {props.todos.map((todo) => (
          <li key={todo.id}>
            <div>{todo.task}</div>
            <span>Date: {todo.date}</span>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default TodoLists;
