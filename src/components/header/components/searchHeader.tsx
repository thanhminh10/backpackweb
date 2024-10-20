import { Remove } from "@/constants";
import { useDebounce } from "@/constants/hooks/useDebounce";
import { GET_SEARCH } from "@/graphql/searchList/SearchList";
import client from "@/lib/apolloClient";
import { useEffect, useState } from "react";

async function SearchWithDebounce(slug: string) {
  const { data } = await client.query({
    query: GET_SEARCH,
    variables: {
      slug: Remove(slug),
      pageSize: 5,
    },
  });
  return data;
}
export const SearchHeader = (inputValue: string) => {
  const [loading, setLoading] = useState(false);
  const [autocomplete, getAutocomplete] = useState([]);
  // Tránh gửi nhiều request
  let debounce = useDebounce(inputValue, 500);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await SearchWithDebounce(debounce.toLowerCase());
      getAutocomplete(data?.products?.data || []);
      setLoading(false);
    };
    if (debounce) fetchData();
  }, [debounce]);
  return { autocomplete };
};
