import { pages } from "@/lib/routes";
import { Card, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";

const listRepo = ["hipmi", "sistem-desa-mandiri"];
export default function Page() {
  return (
    <Stack p={"md"}>

      <Group>
        {listRepo.map((repo, i) => (
          <Card component={Link} href={pages['/dashboard/[repo]']({repo: repo})} key={i} w={200}>
            <Stack>
              <Text>{repo}</Text>
            </Stack>
          </Card>
        ))}
      </Group>
    </Stack>
  );
}
