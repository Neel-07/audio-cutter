import { Stack, Button } from '@mantine/core';

export default function LeftSideButtons() {
  return (
    <Stack>
      <Button variant="outline">Trim</Button>
      <Button variant="outline">Fade In</Button>
      <Button variant="outline">Fade Out</Button>
      <Button variant="outline">Normalize</Button>
    </Stack>
  );
}