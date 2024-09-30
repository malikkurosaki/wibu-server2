import { pages } from "@/lib/routes";
import { ActionIcon, Avatar, Flex, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack gap={0}>
      <Flex align={"center"} p={"md"} bg={"dark"} pos={"sticky"} top={0} style={{
        zIndex: 999
      }}>
        <Flex align={"center"} justify={"space-between"} w={"100%"}>
          <Flex>
            <ActionIcon
              bg={"transparent"}
              component={Link}
              href={pages["/dashboard"]}
            >
              <FaHome />
            </ActionIcon>
            <Title order={4}>Dashboard</Title>
          </Flex>
          <Flex>
            <Avatar color="blue" component={Link} href={pages["/user"]}>
              P
            </Avatar>
          </Flex>
        </Flex>
      </Flex>
      {children}
    </Stack>
  );
}
