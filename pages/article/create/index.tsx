import {
  Button,
  Container,
  Divider,
  FileInput,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useState } from "react";

type CreateArticleForm = {
  name: string;
  content: string;
  image: File | null;
};

const defaultArticleForm: CreateArticleForm = {
  name: "",
  content: "",
  image: null,
};

export default function CreateArticlePage() {
  const [form, setForm] = useState<CreateArticleForm>(defaultArticleForm);

  return (
    <Container p={16}>
      <Stack>
        <Title order={1}>Buat artikel</Title>
        <Divider />
        <TextInput
          label="Judul artikel"
          required
          onChange={(e) => {
            setForm({
              ...form,
              name: e.currentTarget.value,
            });
          }}
        />
        <Textarea
          label="Konten artikel"
          required
          autosize
          minRows={2}
          onChange={(e) => {
            setForm({
              ...form,
              content: e.currentTarget.value,
            });
          }}
        />
        <FileInput
          label="Gambar artikel"
          clearable
          placeholder="Pilih gambar artikel"
          required
          onChange={(e) => {
            setForm({
              ...form,
              image: e,
            });
          }}
        />
        <Divider />
        <Button>Buat artikel</Button>
      </Stack>
    </Container>
  );
}
