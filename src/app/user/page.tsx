import { appConfig } from "@/lib/app_config";
import { ButtonCopy } from "@/lib/ButtonCopy";
import { ButtonLogout } from "@/lib/ButtonLogout";
import { pages } from "@/lib/routes";
import { Button, Card, Divider, Flex, Group, Stack, Text, Title } from "@mantine/core";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Page() {
  const cookieStore = cookies();
  const token = cookieStore.get(appConfig.sessionKey);
  return (
    <Stack p={"md"}>
      <Flex justify="space-between">
        <Title order={3}>user page</Title>
        <Flex gap={"md"}>
          <Button variant="subtle" size="compact-xs" radius={"xl"} component={Link} href={pages["/dashboard"]} >dashboard</Button>
          <ButtonLogout />
        </Flex>
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
