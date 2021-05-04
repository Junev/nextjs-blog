import { useReducer } from "react";

const ActionTypes = {
  TOOGLE_TODO: "TOOGLE_TODO",
};

const todosList = [
  { item: "get up", status: "todo" },
  { item: "read books", status: "done" },
  { item: "go to bed", status: "done" },
];

// reducer 1
const todosReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.TOOGLE_TODO:
      return state.map((todo) =>
        todo.item === action.item
          ? { ...todo, status: todo.status === "todo" ? "done" : "todo" }
          : { ...todo }
      );
    default:
      return state;
  }
};

const createReducer = (state, handlers) => (state, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};

// reducer 2
const todosReducer2 = createReducer(
  {},
  {
    [ActionTypes.TOOGLE_TODO](state, action) {
      return state.map((todo) =>
        todo.item === action.item
          ? { ...todo, status: todo.status === "todo" ? "done" : "todo" }
          : { ...todo }
      );
    },
  }
);

const TodoList = () => {
  const [todos, dispatch] = useReducer(todosReducer2, todosList);
  const handleTodo = (c) =>
    dispatch({ type: ActionTypes.TOOGLE_TODO, item: c });
  return (
    <ul>
      {todos.map((c) => (
        <li key={c.item} onClick={() => handleTodo(c.item)}>
          {c.status}:{c.item}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
