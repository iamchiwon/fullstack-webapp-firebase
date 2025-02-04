/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { ActionResponseError, ActionResponseSuccess } from '@/common/types/ActionResponse';
import { ToDoItem } from '@/common/types/ToDoItem';
import { getUserIdFromToken } from '@/libs/firebase/auth';
import {
  databaseCreateItem,
  databaseDeleteItem,
  databaseGetItem,
  databaseGetList,
  databaseUpdateItem,
} from '@/libs/firebase/database';

export const todoServiceGetList = async (token: string) => {
  try {
    const uid = await getUserIdFromToken(token);
    const list = await databaseGetList<ToDoItem>(`userdata/todos/${uid}`);
    return ActionResponseSuccess<ToDoItem[]>(list);
  } catch (error) {
    return ActionResponseError<ToDoItem[]>(error);
  }
};

export const todoServiceAddTodo = async (token: string, content: string) => {
  try {
    const uid = await getUserIdFromToken(token);
    const data = await databaseCreateItem(`userdata/todos/${uid}`, {
      content,
      done: false,
    });
    return ActionResponseSuccess<string>(data);
  } catch (error) {
    return ActionResponseError<string>(error);
  }
};

export const todoServiceDeleteTodo = async (token: string, id: string) => {
  try {
    const uid = await getUserIdFromToken(token);
    await databaseDeleteItem(`userdata/todos/${uid}`, id);
    return ActionResponseSuccess();
  } catch (error) {
    return ActionResponseError(error);
  }
};

export const todoServiceToggleTodo = async (token: string, id: string) => {
  try {
    const uid = await getUserIdFromToken(token);
    const item: ToDoItem = await databaseGetItem(`userdata/todos/${uid}`, id);
    await databaseUpdateItem(`userdata/todos/${uid}`, id, {
      done: !item.done,
    });
    return ActionResponseSuccess();
  } catch (error) {
    return ActionResponseError(error);
  }
};
