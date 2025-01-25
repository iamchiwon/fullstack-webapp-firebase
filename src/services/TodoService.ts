/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ToDoItem } from "@/common/types/ToDoItem";
import { getUserIdFromToken } from "@/libs/firebase/auth";
import {
  databaseCreateItem,
  databaseDeleteItem,
  databaseGetItem,
  databaseGetList,
  databaseUpdateItem,
} from "@/libs/firebase/database";

export const todoServiceGetList = async (token: string) => {
  try {
    const uid = await getUserIdFromToken(token);
    const list = await databaseGetList<ToDoItem>(`userdata/todos/${uid}`);
    return {
      result: "success",
      data: list,
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const todoServiceAddTodo = async (token: string, content: string) => {
  try {
    const uid = await getUserIdFromToken(token);
    const data = await databaseCreateItem(`userdata/todos/${uid}`, {
      content,
      done: false,
    });
    return {
      result: "success",
      data: data,
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const todoServiceDeleteTodo = async (token: string, id: string) => {
  try {
    const uid = await getUserIdFromToken(token);
    await databaseDeleteItem(`userdata/todos/${uid}`, id);
    return {
      result: "success",
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const todoServiceToggleTodo = async (token: string, id: string) => {
  try {
    const uid = await getUserIdFromToken(token);
    const item: ToDoItem = await databaseGetItem(`userdata/todos/${uid}`, id);
    await databaseUpdateItem(`userdata/todos/${uid}`, id, {
      done: !item.done,
    });
    return {
      result: "success",
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
