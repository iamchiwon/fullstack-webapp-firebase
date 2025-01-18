import {
  addTodoItemAction,
  deleteTodoItemAction,
  getTodoListAction,
  toggleTodoItemAction,
} from "../actions/TodoActions";

const getTodoList = async () => {
  return await getTodoListAction();
};

const addTodo = async (content: string) => {
  return await addTodoItemAction({ content, done: false });
};

const deleteTodo = async (id: string) => {
  return await deleteTodoItemAction(id);
};

const toggleTodo = async (id: string) => {
  return await toggleTodoItemAction(id);
};

const TodoController = {
  getTodoList,
  addTodo,
  deleteTodo,
  toggleTodo,
};

export default TodoController;
