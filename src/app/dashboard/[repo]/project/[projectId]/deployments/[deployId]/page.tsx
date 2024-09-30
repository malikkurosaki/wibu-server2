"use client";
import { apies, pages } from "@/lib/routes";
import { VercelDeploy } from "@/types/VercelDeploy";
import { CloseButton, Skeleton, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Link from "next/link";
import { useState } from "react";

export default function Page({
  params
}: {
  params: { repo: string; projectId: string; deployId: string };
}) {
  const [deployments, setDeployments] = useState<VercelDeploy[] | null>(null);
  async function loadDeployment() {
    const res = await fetch(
      apies["/api/vercel/deploy/[deployId]/event"]({
        deployId: params.deployId
      })
    );
    const data = await res.text();
    if (res.ok) {
      const dataJson = JSON.parse(data);
      setDeployments(dataJson);
    }
  }

  useShallowEffect(() => {
    loadDeployment();
  }, []);

  if (!deployments) return <LocalLoader />;
  const dataText = deployments.map((dep) => dep.text).join("\n");
  return (
    <Stack p={"md"}>
      <CloseButton
        component={Link}
        href={pages["/dashboard/[repo]/project/[projectId]/deployments"]({
          repo: params.repo,
          projectId: params.projectId
        })}
      />
      <MarkdownPreview source={"\`\`\`log\n" + dataText + "\n\`\`\`"} />
    </Stack>
  );
}

function LocalLoader() {
  return (
    <Stack p={"md"}>
      {Array.from(Array(30).keys()).map((i) => (
        <Skeleton key={i} h={20} />
      ))}
    </Stack>
  );
}
