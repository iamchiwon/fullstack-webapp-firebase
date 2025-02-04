'use client';

import { useUserState } from '@/common/states/UserState';
import AuthController from '@/controllers/AuthController';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export const SignupButton = () => {
  const { isLogin } = useUserState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isSignupAvailable, setIsSignupAvailable] = useState(false);

  useEffect(() => {
    setIsSignupAvailable(
      name.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        passwordAgain.length > 0 &&
        password === passwordAgain
    );
  }, [name, email, password, passwordAgain]);

  if (isLogin) {
    return null;
  }

  const signup = async () => {
    if (password !== passwordAgain) {
      alert('Password and password again are not the same');
      return;
    }
    AuthController.signup(name, email, password);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">Signup</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Sign up</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Sign up with your email and password.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password Again
            </Text>
            <TextField.Root
              type="password"
              placeholder="Confirm your password"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
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
            <Button onClick={signup} disabled={!isSignupAvailable}>
              Signup
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
