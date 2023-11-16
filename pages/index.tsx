import { Container, Title, Stack, Button, Divider } from "@mantine/core";
import Router from "next/router";

export default function IndexPage() {
  return (
    <Container p={16}>
      <Stack align="flex-start">
        <Title order={1}>Dashboard Impresi</Title>
        <Divider />
        <Title order={2}>Produk</Title>
        <Button
          onClick={() => {
            Router.push("/product/create");
          }}
        >
          Buat produk
        </Button>
        <Title order={2}>Artikel</Title>
        <Button
          onClick={() => {
            Router.push("/article/create");
          }}
        >
          Buat artikel
        </Button>
      </Stack>
    </Container>
  );
}
