import {
  Container,
  Stack,
  Title,
  TextInput,
  FileInput,
  NumberInput,
  Textarea,
  NativeSelect,
  Button,
} from "@mantine/core";

export default function CreateProductPage() {
  return (
    <Container p={16}>
      <Stack>
        <Title order={1}>Buat produk</Title>
        <NativeSelect label="Subkategori" data={["a", "b", "c"]} />
        <TextInput label="SKU" />
        <TextInput label="Nama" />
        <NumberInput label="Harga" min={0} />
        <NumberInput label="Banyak terjual" min={0} />
        <NumberInput label="Minimum pembelian (dalam pcs)" min={0} />
        <Textarea label="Deskripsi" autosize />
        <TextInput label="Material" />
        <TextInput label="Ukuran" />
        <FileInput label="Gambar utama" clearable />
        <FileInput label="Gambar pelengkap" multiple clearable />
        <Button>Buat produk</Button>
      </Stack>
    </Container>
  );
}
