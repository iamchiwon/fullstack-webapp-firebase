'use client';

import { Box, Button, Checkbox, Flex, TextField } from '@radix-ui/themes';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ToDoItem } from '@/common/types/ToDoItem';
import TodoController from '@/controllers/TodoController';
import { useUserState } from '@/common/states/UserState';

export const ToDoList = () => {
  const { uid } = useUserState();
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState<ToDoItem[]>([]);

  useEffect(() => {
    if (!uid) {
      setTodoList([]);
      return;
    }
    fetchTodoList();
  }, [uid]);

  const handleAddTodo = async () => {
    await TodoController.addTodo(todo);
    setTodo('');
    fetchTodoList();
  };

  const fetchTodoList = async () => {
    const todos = await TodoController.getTodoList();
    setTodoList(todos);
  };

  const handleDeleteTodo = async (id: string) => {
    await TodoController.deleteTodo(id);
    fetchTodoList();
  };

  const handleToggleTodo = async (id: string) => {
    await TodoController.toggleTodo(id);
    fetchTodoList();
  };

  if (!uid) {
    return null;
  }

  return (
    <Box pt="4">
      <Box className="text-2xl font-bold">Todo List</Box>
      <Flex gap="2">
        <TextField.Root
          type="text"
          placeholder="Add new todo"
          className="border-gray-100 border-2 rounded-md p-2"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        >
          <TextField.Slot>
            <Pencil height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <Button onClick={handleAddTodo}>Add</Button>
      </Flex>
      <Box mt="4">
        {todoList.map((todo) => (
          <Flex gap="2" align="center" key={todo.id}>
            <Checkbox checked={todo.done} onClick={() => handleToggleTodo(todo.id)} />
            {todo.content}
            <Button variant="ghost" color="red" onClick={() => handleDeleteTodo(todo.id)}>
              DEL
            </Button>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
