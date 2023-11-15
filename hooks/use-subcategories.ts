import useSWR from "swr";
import axios from "axios";

type Subcategory = {
  id: string;
  name: string;
  categoryId: string;
};

type SubcategoriesResponse = {
  data: Subcategory[];
};

export const useSubcategories = () => {
  const fetcher = (url: string) =>
    axios.get<SubcategoriesResponse>(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    `https://api.myimpresi.marchotridyo.com/subcategory`,
    fetcher
  );

  return {
    subcategories: data?.data,
    isLoading,
    isError: error,
  };
};
