// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import { EnvProvider } from "@/lib/EnvProvider";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import dotenv from "dotenv";
dotenv.config();

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully"
};

const env = JSON.stringify(process.env);

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <EnvProvider env={env} />
        <MantineProvider defaultColorScheme="dark">
          <Notifications position="top-center" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
