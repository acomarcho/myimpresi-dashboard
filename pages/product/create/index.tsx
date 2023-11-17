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
  Checkbox,
} from "@mantine/core";

import { useSubcategories } from "@/hooks/use-subcategories";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import axios from "axios";

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

const pageStatus = {
  normal: "NORMAL",
  loading: "LOADING",
};

export default function CreateProductPage() {
  const [form, setForm] = useState(defaultProductForm);
  const [color, setColor] = useState("#000000");
  const { subcategories } = useSubcategories();
  const [status, setStatus] = useState(pageStatus.normal);

  const subcategoriesData = subcategories
    ? subcategories.map((s) => {
        return {
          label: s.name,
          value: s.id,
        };
      })
    : [];

  const saveProduct = async () => {
    try {
      setStatus(pageStatus.loading);
      const formData = new FormData();
      formData.append("mainImage", form.mainImage!);
      form.additionalImages.forEach((img) => {
        formData.append("additionalImages", img);
      });
      formData.append(
        "product",
        JSON.stringify({
          name: form.name,
          price: form.price,
          soldAmount: form.soldAmount,
          minimumOrder: form.minimumQuantity,
          description: form.description,
          subcategoryId: form.subcategory,
          isFeaturedAtCategory: false,
          colors: form.colors,
          material: form.material,
          size: form.size,
          sku: form.sku,
        })
      );
      await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/product`, formData, {
        headers: {
          "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      setForm(defaultProductForm);
      notifications.show({
        title: "Sukses",
        message: "Produk berhasil ditambahkan ke dalam sistem.",
        color: "green",
      });
    } catch (error) {
      console.log("Gagal menambahkan produk:", error);
      notifications.show({
        title: "Gagal",
        message: " Produk gagal ditambahkan ke dalam sistem.",
        color: "red",
      });
    } finally {
      setStatus(pageStatus.normal);
    }
  };

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
          placeholder="Pilih subkategori"
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
          placeholder="JKCPU4021007"
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
          placeholder="LEITI"
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
          placeholder="210000"
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
          placeholder="200"
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
          placeholder="20"
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
          minRows={3}
          placeholder="Jam dinding dengan diameter besar ini mampu menjadi pusat perhatian yang menarik untuk ruangan anda. Selain sebagai penunjuk waktu, jam dinding LEITI juga mampu sebagai penambah dekorasi yang manis"
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
          placeholder="Frame plastik polytyrene, tutup kaca"
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
          placeholder="40 cm"
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
          placeholder="Pilih file gambar utama"
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
          placeholder="Pilih file gambar pelengkap (bisa lebih dari satu)"
        />
        <Divider />
        <Title order={2}>Warna produk</Title>
        {form.colors.length === 0 && (
          <Text>Anda belum memberikan data warna pada produk.</Text>
        )}
        {form.colors.length > 0 && (
          <Stack>
            {form.colors.map((c, i) => {
              return (
                <Group key={i}>
                  <TextInput disabled value={c} />
                  <div
                    className="shadow-md w-[16px] h-[16px] rounded-full"
                    style={{
                      background:
                        c !== "MIX"
                          ? c
                          : `conic-gradient(
                      from 90deg,
                      violet,
                      indigo,
                      blue,
                      green,
                      yellow,
                      orange,
                      red,
                      violet
                    )`,
                    }}
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
        <Checkbox
          checked={form.colors.includes("MIX")}
          onChange={(e) => {
            if (e.currentTarget.checked) {
              setForm({
                ...form,
                colors: [...form.colors, "MIX"],
              });
            } else {
              setForm({
                ...form,
                colors: form.colors.filter((c) => c !== "MIX"),
              });
            }
          }}
          label="Bisa custom warna?"
        />
        <Divider />
        <Button
          disabled={
            !form.subcategory ||
            !form.sku ||
            !form.name ||
            !form.price ||
            !form.soldAmount ||
            !form.minimumQuantity ||
            !form.description ||
            !form.material ||
            !form.size ||
            !form.mainImage ||
            status === pageStatus.loading
          }
          onClick={() => {
            saveProduct();
          }}
        >
          {pageStatus.normal ? "Buat produk" : "..."}
        </Button>
      </Stack>
    </Container>
  );
}
