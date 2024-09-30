export const pages = {
  "/": "/",
  "/user": "/user",
  "/login": "/login",
  "/login/verify/[phone]": ({ phone }: { phone: string }) =>
    `/login/verify/${phone}`,
  "/dashboard": "/dashboard",
  "/dashboard/repos": "/dashboard/repos",
  "/dashboard/[repo]": ({ repo }: { repo: string }) => `/dashboard/${repo}`,
  "/dashboard/[repo]/project": ({ repo }: { repo: string }) =>
    `/dashboard/${repo}/project`,
  "/dashboard/[repo]/project/[projectId]/deployments": ({
    repo,
    projectId,
  }: {
    repo: string;
    projectId: string;
  }) => `/dashboard/${repo}/project/${projectId}/deployments`,
  "/dashboard/[repo]/project/[projectId]/deployments/[deployId]": ({
    repo,
    projectId,
    deployId,
  }: {
    repo: string;
    projectId: string;
    deployId: string;
  }) => `/dashboard/${repo}/project/${projectId}/deployments/${deployId}`,
  "/admin": "/admin",
};

export const apies = {
  "/api/vercel/project/[name]": ({ name }: { name: string }) =>
    `/api/vercel/project/${name}`,
  "/api/vercel/hook": "/api/vercel/hook",
  "/api/vercel/deploy/by/[projectId]": ({ projectId }: { projectId: string }) =>
    `/api/vercel/deploy/by/${projectId}`,
  "/api/vercel/deploy/[deployId]": ({ deployId }: { deployId: string }) =>
    `/api/vercel/deploy/${deployId}`,
  "/api/logout": "/api/logout",
  "/api/login/[phone]": ({ phone }: { phone: string }) => `/api/login/${phone}`,
  "/api/login/[phone]/verify/[code]": ({
    phone,
    code,
  }: {
    phone: string;
    code: string;
  }) => `/api/login/${phone}/verify/${code}`,
};
