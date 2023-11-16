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

export default function CreateArticlePage() {
  return (
    <Container p={16}>
      <Stack>
        <Title order={1}>Buat artikel</Title>
        <Divider />
        <TextInput label="Judul artikel" required />
        <Textarea label="Konten artikel" required autosize minRows={2} />
        <FileInput
          label="Gambar artikel"
          clearable
          placeholder="Pilih gambar artikel"
          required
        />
        <Divider />
        <Button>Buat artikel</Button>
      </Stack>
    </Container>
  );
}
