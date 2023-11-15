import { Container, Title, Stack, Button } from "@mantine/core";
import Router from "next/router";

export default function IndexPage() {
  return (
    <Container p={16}>
      <Stack align="flex-start">
        <Title order={1}>Dashboard Impresi</Title>
        <Title order={2}>Produk</Title>
        <Button
          onClick={() => {
            Router.push("/product/create");
          }}
        >
          Buat produk
        </Button>
      </Stack>
    </Container>
  );
}
