/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToDoItem } from "@/common/types/ToDoItem";
import {
  databaseCreateItem,
  databaseDeleteItem,
  databaseGetItem,
  databaseGetList,
  databaseUpdateItem,
} from "@/backend/database";

const getTodoList = async () => {
  const todos = await databaseGetList("todos");
  return todos.map(
    (todo: any) =>
      ({
        id: todo.id,
        content: todo.content,
        done: todo.done,
      } as ToDoItem)
  );
};

const addTodo = async (content: string) => {
  return await databaseCreateItem("todos", { content, done: false });
};

const deleteTodo = async (id: string) => {
  return await databaseDeleteItem("todos", id);
};

const toggleTodo = async (id: string) => {
  const item = (await databaseGetItem("todos", id)) as ToDoItem;
  return await databaseUpdateItem("todos", id, { done: !item.done });
};

const TodoController = {
  getTodoList,
  addTodo,
  deleteTodo,
  toggleTodo,
};

export default TodoController;
