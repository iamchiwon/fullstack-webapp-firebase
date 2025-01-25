/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToDoItem } from "@/common/types/ToDoItem";
import {
  databaseCreateItem,
  databaseDeleteItem,
  databaseGetItem,
  databaseGetList,
  databaseUpdateItem,
} from "@/backend/database";
import { useUserState } from "@/common/states/UserState";

const userState = useUserState;

const getTodoList = async () => {
  const { uid } = userState.getState();
  const todos = await databaseGetList(`userdata/todos/${uid}`);
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
  const { uid } = userState.getState();
  return await databaseCreateItem(`userdata/todos/${uid}`, {
    content,
    done: false,
  });
};

const deleteTodo = async (id: string) => {
  const { uid } = userState.getState();
  return await databaseDeleteItem(`userdata/todos/${uid}`, id);
};

const toggleTodo = async (id: string) => {
  const { uid } = userState.getState();
  const item = (await databaseGetItem(`userdata/todos/${uid}`, id)) as ToDoItem;
  return await databaseUpdateItem(`userdata/todos/${uid}`, id, {
    done: !item.done,
  });
};

const TodoController = {
  getTodoList,
  addTodo,
  deleteTodo,
  toggleTodo,
};

export default TodoController;
