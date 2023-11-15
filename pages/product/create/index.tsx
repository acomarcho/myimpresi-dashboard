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

import { useState } from "react";

type CreateProductForm = {
  sku: string;
  name: string;
  price: string | number;
  soldAmount: string | number;
  minimumQuantity: string | number;
  description: string;
  material: string;
  size: string;
  mainImage: File | null;
  additionalImages: File[];
};

const defaultProductForm: CreateProductForm = {
  sku: "",
  name: "",
  price: "",
  soldAmount: "",
  minimumQuantity: "",
  description: "",
  material: "",
  size: "",
  mainImage: null,
  additionalImages: [],
};

export default function CreateProductPage() {
  const [form, setForm] = useState(defaultProductForm);

  return (
    <Container p={16}>
      <Stack>
        <Title order={1}>Buat produk</Title>
        <NativeSelect label="Subkategori" data={["a", "b", "c"]} />
        <TextInput
          label="SKU"
          value={form.sku}
          onChange={(e) => {
            setForm({
              ...form,
              sku: e.currentTarget.value,
            });
          }}
        />
        <TextInput
          label="Nama"
          value={form.name}
          onChange={(e) => {
            setForm({
              ...form,
              name: e.currentTarget.value,
            });
          }}
        />
        <NumberInput
          label="Harga"
          min={0}
          value={form.price}
          onChange={(e) => {
            setForm({
              ...form,
              price: e,
            });
          }}
        />
        <NumberInput
          label="Banyak terjual"
          min={0}
          value={form.soldAmount}
          onChange={(e) => {
            setForm({
              ...form,
              soldAmount: e,
            });
          }}
        />
        <NumberInput
          label="Minimum pembelian (dalam pcs)"
          min={0}
          value={form.minimumQuantity}
          onChange={(e) => {
            setForm({
              ...form,
              minimumQuantity: e,
            });
          }}
        />
        <Textarea
          label="Deskripsi"
          autosize
          value={form.description}
          onChange={(e) => {
            setForm({
              ...form,
              description: e.currentTarget.value,
            });
          }}
        />
        <TextInput
          label="Material"
          value={form.material}
          onChange={(e) => {
            setForm({
              ...form,
              material: e.currentTarget.value,
            });
          }}
        />
        <TextInput
          label="Ukuran"
          value={form.size}
          onChange={(e) => {
            setForm({
              ...form,
              size: e.currentTarget.value,
            });
          }}
        />
        <FileInput
          label="Gambar utama"
          clearable
          value={form.mainImage}
          onChange={(e) => {
            setForm({
              ...form,
              mainImage: e,
            });
          }}
        />
        <FileInput
          label="Gambar pelengkap"
          multiple
          clearable
          value={form.additionalImages}
          onChange={(e) => {
            setForm({
              ...form,
              additionalImages: e,
            });
          }}
        />
        <Button>Buat produk</Button>
      </Stack>
    </Container>
  );
}
