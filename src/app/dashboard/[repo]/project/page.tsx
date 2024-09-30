"use client"
import { Stack } from "@mantine/core";
import { VercelProjects } from "./_ui/VercelProjects";

export default function Page({ params }: { params: { repo: string } }) {
  return (
    <Stack p={"md"}>
      <VercelProjects params={params} />
    </Stack>
  );
}