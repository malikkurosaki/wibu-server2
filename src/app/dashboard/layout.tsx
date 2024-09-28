import { pages } from "@/lib/routes";
import { ActionIcon, Flex, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Flex align={"center"} p={"md"}>
        <Flex align={"center"}>
          <ActionIcon bg={"transparent"} component={Link} href={pages["/dashboard"]}>
            <FaHome />
          </ActionIcon>
          <Title order={4}>Dashboard</Title>
        </Flex>
      </Flex>
      {children}
    </Stack>
  );
}
