'use client';

import { Box, Button } from '@radix-ui/themes';
import { useState } from 'react';
import { FileList } from './FileList';
import { ToDoList } from './ToDoList';

export default function Home() {
  const [greeting, setGreeting] = useState('');

  const handleGreeting = async () => {
    const response = await fetch('/api/hello');
    const data = await response.json();
    setGreeting(data.message);
  };

  return (
    <Box p="4">
      <Button onClick={handleGreeting}>Greeting</Button>
      <Box>{greeting}</Box>

      <ToDoList />
      <FileList />
    </Box>
  );
}
