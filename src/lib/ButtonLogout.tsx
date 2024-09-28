"use client";
import { Button } from "@mantine/core";
import { apies, pages } from "./routes";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export function ButtonLogout() {
  const router = useRouter();
  async function onClick() {
    const res = await fetch(apies["/api/logout"], {
      method: "POST"
    });
    if (!res.ok) {
      return notifications.show({
        title: "Error",
        message: "Something went wrong, try again",
        color: "red"
      });
    }

    router.replace(pages["/login"]);
    notifications.show({
      title: "Success",
      message: "Logout success",
      color: "green",
      autoClose: 500
    });
  }
  return (
    <Button bg={"grape"} size="compact-xs" radius={"xl"} onClick={onClick}>
      Logout
    </Button>
  );
}
