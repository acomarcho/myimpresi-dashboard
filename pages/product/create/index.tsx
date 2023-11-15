import {
  Container,
  Stack,
  Title,
  TextInput,
  FileInput,
  NumberInput,
  Textarea,
  Select,
  Button,
  Text,
  Divider,
  Group,
  ColorPicker,
} from "@mantine/core";

import { useSubcategories } from "@/hooks/use-subcategories";
import { useState } from "react";

type CreateProductForm = {
  subcategory: string;
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
  colors: string[];
};

const defaultProductForm: CreateProductForm = {
  subcategory: "",
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
  colors: [],
};

export default function CreateProductPage() {
  const [form, setForm] = useState(defaultProductForm);
  const [color, setColor] = useState("#000000");
  const { subcategories } = useSubcategories();

  const subcategoriesData = subcategories
    ? subcategories.map((s) => {
        return {
          label: s.name,
          value: s.id,
        };
      })
    : [];

  return (
    <Container p={16}>
      <Stack>
        <Title order={1}>Buat produk</Title>
        <Divider />
        <Title order={2}>Detail produk</Title>
        <Select
          label="Subkategori"
          data={subcategoriesData}
          searchable
          clearable
          value={form.subcategory}
          onChange={(e) => {
            setForm({ ...form, subcategory: e ? e : "" });
          }}
          required
        />
        <TextInput
          label="SKU"
          value={form.sku}
          onChange={(e) => {
            setForm({
              ...form,
              sku: e.currentTarget.value,
            });
          }}
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
        <Divider />
        <Title order={2}>Warna produk</Title>
        {form.colors.length === 0 && (
          <Text>Anda belum memberikan data warna pada produk.</Text>
        )}
        {form.colors.length > 0 && (
          <Stack>
            {form.colors.map((c) => {
              return (
                <Group key={c}>
                  <TextInput disabled value={c} />
                  <div
                    className="shadow-md w-[16px] h-[16px] rounded-full"
                    style={{ background: c }}
                  />
                  <Button
                    onClick={() => {
                      setForm({
                        ...form,
                        colors: form.colors.filter((color) => color !== c),
                      });
                    }}
                  >
                    Hapus warna
                  </Button>
                </Group>
              );
            })}
          </Stack>
        )}
        <Title order={3}>Input warna</Title>
        <ColorPicker value={color} onChange={(e) => setColor(e)} />
        <Button
          onClick={() => {
            if (color) {
              setForm({
                ...form,
                colors: [...form.colors, color],
              });
              setColor("");
            }
          }}
        >
          Tambah warna
        </Button>
        <Divider />
        <Button>Buat produk</Button>
      </Stack>
    </Container>
  );
}
