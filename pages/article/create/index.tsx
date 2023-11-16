import {
  Box,
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
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
          placeholder="Produk kami adalah produk yang berkualitas tinggi"
          required
          onChange={(e) => {
            setForm({
              ...form,
              name: e.currentTarget.value,
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
        <Textarea
          label="Konten artikel (dalam Markdown)"
          placeholder={`Untuk mengetahui lebih lanjut, klik link berikut:
          
<a href="https://www.google.com">Link!</a>`}
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
        <Divider />
        <Title order={2}>Preview konten</Title>
        <Box className="shadow-md" p={16}>
          <Markdown
            rehypePlugins={[rehypeRaw]}
            components={{
              a(props) {
                const { children, ...rest } = props;

                return (
                  <a className="text-blue-500 underline" {...rest}>
                    {children}
                  </a>
                );
              },
            }}
          >
            {form.content || "Anda belum memasukkan konten."}
          </Markdown>
        </Box>
        <Divider />
        <Button disabled={!form.content || !form.name || !form.image}>
          Buat artikel
        </Button>
      </Stack>
    </Container>
  );
}
