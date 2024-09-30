"use client";

import { apies, pages } from "@/lib/routes";
import { AnyType } from "@/types/ComplexRecord ";
import { VercelProject } from "@/types/VercelProject";
import {
  Button,
  CloseButton,
  Flex,
  ScrollArea,
  Skeleton,
  Stack,
  Table,
  Text,
  Title
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import Link from "next/link";
import { useState } from "react";

// const funItem = (project: VercelProject) => {
//   return {
//     // name: project.name,

//     latestDeployments: project.latestDeployments.map((d) => ({
//       // id: d.id,
//       // aliasAssigned: d.aliasAssigned,
//       createdAt: moment(d.createdAt).format("DD MMM YYYY"),
//       githubCommitMessage: d.meta.githubCommitMessage
//     })),
//     target: [
//       {
//         target: "Production",
//         creator: project.targets.production?.meta.githubCommitAuthorName,
//         message: project.targets.production?.meta.githubCommitMessage,
//         ref: project.targets.production?.meta.githubCommitRef,
//         createdAt: moment(project.targets?.production?.createdAt).format(
//           "DD MMM YYYY"
//         ),
//         host: project.targets.production.alias[1]
//       },
//       {
//         target: "Preview",
//         creator: project.targets.preview?.meta.githubCommitAuthorName,
//         message: project.targets.preview?.meta.githubCommitMessage,
//         ref: project.targets.preview?.meta.githubCommitRef,
//         createdAt: moment(project.targets?.preview?.createdAt).format(
//           "DD MMM YYYY"
//         ),
//         host: project.targets.production.alias[1]
//       }
//     ]
//   };
// };

export function VercelProjects({ params }: { params: { repo: string } }) {
  const [project, setProject] = useState<VercelProject | null>(null);
  useShallowEffect(() => {
    !project && loadProject();
  }, []);

  async function loadProject() {
    const res = await fetch(
      apies["/api/vercel/project/[name]"]({
        name: params.repo
      })
    );

    const dataText = await res.text();
    try {
      const dataJson = JSON.parse(dataText);
      setProject(dataJson);
    } catch (error) {
      console.log({ error, dataText, status: res.status });
    }
  }

  return (
    <Stack p={"md"}>
      <CloseButton
        component={Link}
        href={pages["/dashboard/[repo]"]({ repo: params.repo })}
      />
      <Flex gap={"md"} align={"center"}>
        <Title order={3}>{params.repo}</Title>
        {project && (
          <Button
            variant="subtle"
            size="compact-xs"
            radius={"xl"}
            component={Link}
            href={pages["/dashboard/[repo]/project/[projectId]/deployments"]({
              repo: params.repo,
              projectId: project!.id
            })}
          >
            developments
          </Button>
        )}
      </Flex>
      {!project && <LocalLoader />}
      {project && (
        <Stack pos={"relative"}>
          <Flex>
            <Text w={100}>Id</Text>
            <Text>{project.id}</Text>
          </Flex>
          <Flex>
            <Text w={100}>Created At</Text>
            <Text>{project.createdAt}</Text>
          </Flex>
          <Flex>
            <Text w={100}>Updated At</Text>
            <Text>{project.updatedAt}</Text>
          </Flex>
          <ScrollArea w={"100%"}>
            {/* <TableView data={funItem(project)} /> */}
          </ScrollArea>
        </Stack>
      )}
    </Stack>
  );
}

function TableView({ data }: { data: unknown }) {
  if (!data) return <LocalLoader />;
  return (
    <Table withColumnBorders withRowBorders withTableBorder>
      <Table.Thead bg={"dark"}>
        <Table.Tr>
          {_.keys(data).map((key) => (
            <Table.Th key={key}>{key}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          {_.values(data).map((value: AnyType, key) => (
            <Table.Td
              key={key}
              style={{
                alignContent: "start",
                alignItems: "start",
                textAlign: "start"
              }}
            >
              {Array.isArray(value) && value.length ? (
                <Stack>
                  {value.map((v: AnyType, i: number) => (
                    <TableView key={i} data={v} />
                  ))}
                </Stack>
              ) : (
                <Text miw={200}>{JSON.stringify(value)}</Text>
              )}
            </Table.Td>
          ))}
        </Table.Tr>
      </Table.Tbody>
    </Table>
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
