"use client";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { AiFillCopy } from "react-icons/ai";

export function ButtonCopy({ text }: { text: string }) {
  function copyToClipboard() {
    navigator.clipboard.writeText(text);

    notifications.show({
      title: "Success",
      message: "Copied to clipboard",
      color: "green",
      autoClose: 500
    });
  }
  return (
    <ActionIcon variant="transparent" onClick={copyToClipboard}>
      <AiFillCopy />
    </ActionIcon>
  );
}
