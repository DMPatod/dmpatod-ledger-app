import { useEffect, useState } from "react";

function useFetchApi<T>(
  url: string,
  initialState: T,
  fetchOptions?: RequestInit
): [T, boolean, string | null] {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(url, fetchOptions);
        const response = await request.json();

        setData(response);
      } catch (error) {
        setError("Error fetching data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [data, loading, error];
}

export default useFetchApi;
