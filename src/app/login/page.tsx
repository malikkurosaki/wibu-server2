"use client";
import { apies, pages } from "@/lib/routes";
import {
  Button,
  Card,
  Container,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [phone, setPhone] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      if (!phone)
        return notifications.show({
          title: "Error",
          message: "Phone number is required",
          color: "red"
        });

      const res = await fetch(
        apies["/api/login/[phone]"]({ phone: "62" + phone }), {
            method: "POST"
        }
      );

      if (!res.ok)
        return notifications.show({
          title: "Error",
          message: "Something went wrong",
          color: "red"
        });

      notifications.show({
        title: "Success",
        message: "Please check your whatsapp",
        color: "green",
      },);

      router.push(pages["/login/verify/[phone]"]({ phone: "62" + phone }));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Stack>
      <Container maw={720}>
        <Card>
          <Stack>
            <Title order={3}>Login</Title>
            <TextInput
              label="Phone number"
              placeholder="Your phone number"
              onChange={(e) => setPhone(e.target.value)}
              leftSection="+62"
            />
            <Button loading={loading} onClick={onSubmit}>
              Login
            </Button>
          </Stack>
        </Card>
      </Container>
    </Stack>
  );
}
