import react, { useState, useEffect } from "react";
import classes from "./TodoLists.module.css";
import Box from "./UI/Box";

const TodoLists = (props) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(props.todos);
  }, []);

  const onDeleteTask = async (event) => {
    const id = event.target.id;
    const response = await fetch(
      `https://react-741e4-default-rtdb.asia-southeast1.firebasedatabase.app/todos/${id}.json`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    props.onFetch();
  };
  return (
    <Box className={classes.task}>
      <ul>
        <button onClick={props.onFetch}>Refresh List</button>
        {props.todos.map((todo) => (
          <div key={todo.key}>
            <li>Task: {todo.task}</li>
            <div className={classes["task-span"]}>
              <span>Date: {todo.date}</span>
              <span
                id={todo.key}
                onClick={onDeleteTask}
                className={classes.delete}
              >
                Delete Task
              </span>
            </div>
          </div>
        ))}
      </ul>
    </Box>
  );
};

export default TodoLists;
