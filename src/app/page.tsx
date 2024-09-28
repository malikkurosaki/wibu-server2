import { pages } from "@/lib/routes";
import { Button, Flex, Stack } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Stack>
      <Flex justify={"end"} p={"md"}>
        <Button
          variant="subtle"
          size="compact-xs"
          component={Link}
          href={pages["/dashboard"]}
        >
          dashboard
        </Button>
      </Flex>
    </Stack>
  );
}
