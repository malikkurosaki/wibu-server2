export const pages = {
  "/": "/",
  "/user": "/user",
  "/login": "/login",
  "/login/verify/[phone]": ({ phone }: { phone: string }) =>
    `/login/verify/${phone}`,
  "/dashboard": "/dashboard",
  "/dashboard/repos": "/dashboard/repos",
  "/dashboard/[repo]": ({ repo }: { repo: string }) => `/dashboard/${repo}`,
  "/admin": "/admin",
};

export const apies = {
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
