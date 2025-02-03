'use client';

import { useUserState } from '@/common/states/UserState';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

export const LogoutButton = () => {
  const { isLogin, logout } = useUserState();
  if (!isLogin) return null;

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="outline">Logout</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Log out</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to log out?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={logout}>
              Logout
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
