"use client";
import { apies, pages } from "@/lib/routes";
import {
  Button,
  Card,
  CloseButton,
  Container,
  PinInput,
  Stack,
  Title
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }: { params: { phone: string } }) {
  const router = useRouter();
  const [pin, setPin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    try {
      if (!pin)
        return notifications.show({
          title: "Error",
          message: "Pin is required",
          color: "red"
        });

      const res = await fetch(
        apies["/api/login/[phone]/verify/[code]"]({
          phone: params.phone,
          code: pin
        }),
        {
          method: "POST"
        }
      );

      if (!res.ok)
        return notifications.show({
          title: "Error",
          message: "Something went wrong, try again",
          color: "red"
        });

      router.push(pages["/user"]);
    } catch (error) {
      setLoading(false);
      return notifications.show({
        title: "Error",
        message: "Something went wrong, try again",
        color: "red"
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Stack>
      <Container maw={720}>
        <Card>
          <Stack>
            <CloseButton onClick={() => router.back()} />
            <Title order={3}>Verification</Title>
            <PinInput onChange={setPin} />
            <Button onClick={onSubmit} loading={loading}>
              Verify
            </Button>
          </Stack>
        </Card>
      </Container>
    </Stack>
  );
}
