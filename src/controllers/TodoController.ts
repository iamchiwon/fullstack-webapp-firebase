'use client';

import { useUserState } from '@/common/states/UserState';
import {
  todoServiceAddTodo,
  todoServiceDeleteTodo,
  todoServiceGetList,
  todoServiceToggleTodo,
} from '@/services/TodoService';

const userState = useUserState;

const getTodoList = async () => {
  const { token } = userState.getState();
  const response = await todoServiceGetList(token);
  if (!response.ok) {
    console.error(response.message);
    return [];
  }
  const list = response.data;
  return list;
};

const addTodo = async (content: string) => {
  const { token } = userState.getState();
  const response = await todoServiceAddTodo(token, content);
  if (!response.ok) {
    console.error(response.message);
    return -1;
  }
  const id = response.data;
  return id;
};

const deleteTodo = async (id: string) => {
  const { token } = userState.getState();
  const response = await todoServiceDeleteTodo(token, id);
  if (!response.ok) {
    console.error(response.message);
    return false;
  }
  return true;
};

const toggleTodo = async (id: string) => {
  const { token } = userState.getState();
  const response = await todoServiceToggleTodo(token, id);
  if (!response.ok) {
    console.error(response.message);
    return false;
  }
  return true;
};

const TodoController = {
  getTodoList,
  addTodo,
  deleteTodo,
  toggleTodo,
};

export default TodoController;
