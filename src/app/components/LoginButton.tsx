'use client';

import { useUserState } from '@/common/states/UserState';
import AuthController from '@/controllers/AuthController';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export const LoginButton = () => {
  const { isLogin } = useUserState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginAvailable, setIsLoginAvailable] = useState(false);

  useEffect(() => {
    setIsLoginAvailable(email.includes('@') && password.length >= 8);
  }, [email, password]);

  if (isLogin) return null;

  const login = async () => {
    await AuthController.login(email, password);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Login</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Log in</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Log in with your email and password.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              type="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={login} disabled={!isLoginAvailable}>
              Login
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
