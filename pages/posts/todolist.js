import { useReducer } from "react";

const todosList = [
  { item: "get up", status: "todo" },
  { item: "read books", status: "done" },
  { item: "go to bed", status: "done" },
];

const todosReducer = (state, action) => {
  switch (action.type) {
    case "toggleTodo":
      return state.map((todo) =>
        todo.item === action.item
          ? { ...todo, status: todo.status === "todo" ? "done" : "todo" }
          : { ...todo }
      );
    default:
      return state;
  }
};

const TodoList = () => {
  const [todos, dispatch] = useReducer(todosReducer, todosList);
  const handleTodo = (c) => dispatch({ type: "toggleTodo", item: c });
  return (
    <ul>
      {todos.map((c) => (
        <li key={c} onClick={() => handleTodo(c.item)}>
          {c.status}:{c.item}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
