import { appConfig } from "@/lib/app_config";
import { ButtonCopy } from "@/lib/ButtonCopy";
import { ButtonLogout } from "@/lib/ButtonLogout";
import { Card, Divider, Flex, Group, Stack, Text, Title } from "@mantine/core";
import { cookies } from "next/headers";

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get(appConfig.sessionKey);
  return (
    <Stack p={"md"}>
      <Flex justify="space-between">
        <Title order={3}>user page</Title>
        <ButtonLogout />
      </Flex>
      <Divider />
      <Card>
        <Stack>
          <Group>
            {token && <Text>{token.value.substring(0, 60)}...</Text>}
            <ButtonCopy text={token?.value || ""} />
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
