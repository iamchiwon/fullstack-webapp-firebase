/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ToDoItem } from "../common/types/ToDoItem";
import {
  databaseCreateItem,
  databaseDeleteItem,
  databaseGetItem,
  databaseGetList,
  databaseUpdateItem,
} from "../infra/database";

export const getTodoListAction = async () => {
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

export const getTodoItemAction = async (id: string) => {
  const item: any = await databaseGetItem("todos", id);
  return {
    id: item.id,
    content: item.content,
    done: item.done,
  } as ToDoItem;
};

export const addTodoItemAction = async (todo: Omit<ToDoItem, "id">) => {
  return await databaseCreateItem("todos", todo);
};

export const deleteTodoItemAction = async (id: string) => {
  return await databaseDeleteItem("todos", id);
};

export const toggleTodoItemAction = async (id: string) => {
  const item = await getTodoItemAction(id);
  return await databaseUpdateItem("todos", id, { done: !item.done });
};
