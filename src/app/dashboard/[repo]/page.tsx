"use client";
import { EnvClient } from "@/lib/client/EnvClient";
import { listBranches } from "@/lib/client/git/list_branch";
import { useOctokit } from "@/lib/client/useOctokit";
import { pages } from "@/lib/routes";
import { branchSyncLoading } from "@/lib/state/branch_sync_loading";
import { branchSyncLog } from "@/lib/state/branch_sync_log";
import { OctoBranch } from "@/types/OctoBranch";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Button,
  Card,
  Center,
  CloseIcon,
  Flex,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useLocalStorage, useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { DisplayBranchItem } from "./_ui/DisplayBranhItem";

export default function Page({ params }: { params: { repo: string } }) {
  const repo = params.repo;
  const [dataRepo, setDataRepo] = useOctokit<OctoBranch[] | null>(
    "list_branches",
    listBranches(EnvClient.env.WIBU_SERVER2_GITHUB_KEY, repo)
  );
  const { value: logLoading } = useHookstate(branchSyncLoading);
  const { value: logData, set: setLogData } = useHookstate(branchSyncLog);
  const [listSearch, setListSearch] = useState<OctoBranch[] | null>(null);
  const [textSearch, setTextSearch] = useLocalStorage({
    key: "branch_search",
    defaultValue: ""
  });

  useShallowEffect(() => {
    const search = dataRepo?.filter((branch) => {
      return branch.name.toLowerCase().includes(textSearch.toLowerCase());
    });

    setListSearch(search || null);
  }, [textSearch]);

  useShallowEffect(() => {}, [setLogData, setDataRepo]);
  return (
    <Flex gap={"md"} w={"100%"} px={"md"}>
      <Stack w={300} h={"80vh"}>
        <Card>
          <Flex>
            <Text flex={1}>{repo}</Text>
            <Button
              size="compact-xs"
              radius={"xl"}
              component={Link}
              href={pages["/dashboard/[repo]/project"]({ repo })}
              variant="transparent"
            >
              project
            </Button>
          </Flex>
        </Card>
        <TextInput
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          placeholder="search"
          leftSection={<FaSearch />}
          rightSection={
            <ActionIcon
              variant="transparent"
              onClick={() => {
                setListSearch(null);
                setTextSearch("");
              }}
            >
              <CloseIcon />
            </ActionIcon>
          }
        />
        <ScrollArea flex={1}>
          <Stack>
            {!dataRepo && (
              <Stack>
                {Array.from(Array(30).keys()).map((i) => (
                  <Skeleton key={i} h={40} />
                ))}
              </Stack>
            )}
            {(listSearch || dataRepo)?.map((branch, i) => (
              <DisplayBranchItem repo={repo} key={i} data={branch} />
            ))}
          </Stack>
        </ScrollArea>
      </Stack>
      <ScrollArea flex={1} h={"80vh"} bg={"gray"} p={"md"}>
        <Stack>
          <Text>log</Text>
          {logLoading && <Center>loading...</Center>}
          {!logLoading && logData && (
            <Stack>
              <Title>{logData.status}</Title>
              <Text>{logData.text}</Text>
            </Stack>
          )}
        </Stack>
      </ScrollArea>
    </Flex>
  );
}
