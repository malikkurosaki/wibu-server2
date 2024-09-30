import { VercelDevelopments } from "./_ui/VercelDevelopment";

export default function Page({
  params
}: {
  params: { repo: string; projectId: string };
}) {
  return <VercelDevelopments params={params} />;
}
