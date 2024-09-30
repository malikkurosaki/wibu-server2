"use client";

import { apies, pages } from "@/lib/routes";
import { AnyType } from "@/types/ComplexRecord ";
import { VercelDevelopmentType } from "@/types/VercelDevelopmentType";
import {
  Button,
  Card,
  CloseButton,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

export function VercelDevelopments({
  params
}: {
  params: { repo: string; projectId: string };
}) {
  const [developments, setDevelopments] =
    useState<VercelDevelopmentType | null>(null);

  async function loadData() {
    const res = await fetch(
      apies["/api/vercel/deploy/by/[projectId]"]({
        projectId: params.projectId
      })
    );
    const data = await res.text();
    if (res.ok) {
      const dataJson = JSON.parse(data);
      setDevelopments(dataJson);
    }
  }

  // async function loadHook() {
  //   const res = await fetch(apies["/api/vercel/v1/webhooks"]);
  //   const data = await res.text();
  //   if (res.ok) {
  //     const dataJson = JSON.parse(data);
  //     console.log(dataJson);
  //   }
  // }

  useShallowEffect(() => {
    loadData();
    // loadHook();
  }, []);

  if (!developments) return <LocalLoader />;
  return (
    <Stack p={"md"}>
      <CloseButton
        component={Link}
        href={pages["/dashboard/[repo]/project"]({ repo: params.repo })}
      />
      <Group align="start">
        {developments.deployments.map((d, i) => (
          <Card key={i} w={300}>
            <Stack>
              <Stack align="start" gap={0}>
                <DevelopmentItem name="Name" data={d.name} />
                <DevelopmentItem name="Id" data={d.uid} />
                <DevelopmentItem name="Alias" data={d.aliasAssigned} />
                <DevelopmentItem
                  name="Build At"
                  data={moment(d.buildingAt).format("DD MMM YYYY HH:mm")}
                />
                <DevelopmentItem
                  name="Created At"
                  data={moment(d.created).format("DD MMM YYYY HH:mm")}
                />
                <DevelopmentItem
                  name="Ready"
                  data={moment(d.ready).format("DD MMM YYYY HH:mm")}
                />
                <DevelopmentItem name="Target" data={d.target} />
              </Stack>
              <Flex justify={"end"}>
                <Button
                  variant="subtle"
                  size="compact-xs"
                  component={Link}
                  href={pages[
                    "/dashboard/[repo]/project/[projectId]/deployments/[deployId]"
                  ]({
                    repo: params.repo,
                    projectId: params.projectId,
                    deployId: d.uid
                  })}
                >
                  deployments
                </Button>
              </Flex>
            </Stack>
          </Card>
        ))}
      </Group>
      {JSON.stringify(developments.pagination)}
    </Stack>
  );
}

function DevelopmentItem({ name, data }: { name: string; data: AnyType }) {
  return (
    <Flex>
      <Text w={100}>{name}</Text>
      <Text
        flex={1}
        style={{
          lineBreak: "anywhere"
        }}
      >
        {JSON.stringify(data)}
      </Text>
    </Flex>
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
