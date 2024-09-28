import { EnvClient } from "@/lib/client/EnvClient";
import { forkSync } from "@/lib/client/git/fork_sync";
import { branchSyncLoading } from "@/lib/state/branch_sync_loading";
import { branchSyncLog } from "@/lib/state/branch_sync_log";
import { OctoBranch } from "@/types/OctoBranch";
import { useHookstate } from "@hookstate/core";
import { ActionIcon, Card, Flex, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { FaSync } from "react-icons/fa";

export function DisplayBranchItem({
  repo,
  data
}: {
  repo: string;
  data: OctoBranch | null;
}) {
  const { value: loading, set: setLoading } = useHookstate(branchSyncLoading);
  const { value: dataLog, set: setDataLog } = useHookstate(branchSyncLog);
  const [localLoading, setlocalLoading] = useState(false);
  async function onSync() {
    setLoading(true);
    setLoading(true);
    const sync = await forkSync(EnvClient.env.WIBU_SERVER2_GITHUB_KEY, {
      repo,
      branch: data?.name as string
    });

    setDataLog({
      status: sync!.status || 0,
      text: sync?.text || "",
      json: sync!.json || []
    });
    setLoading(false);
    setLoading(false);
  }

  useShallowEffect(() => {
      
  }, [dataLog, setLoading, setlocalLoading])
  return (
    <Card>
      <Flex justify={"space-between"}>
        <Text>{data?.name}</Text>
        <ActionIcon
          loading={localLoading}
          disabled={loading}
          onClick={onSync}
          variant="transparent"
          c={"gray"}
        >
          <FaSync />
        </ActionIcon>
      </Flex>
    </Card>
  );
}
