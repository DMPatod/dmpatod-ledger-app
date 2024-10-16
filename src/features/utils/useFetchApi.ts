import axios from "axios";
import { useEffect, useState } from "react";

function useFetchApi<T>(
  url: string,
  initialState: T,
): [T, boolean, string | null] {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get<T>(url);
        if (request.status < 200 || request.status >= 400) {
          setError("Error fetching data");
          return;
        }
        setData(request.data);
      } catch (error) {
        setError("Error fetching data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
}

export default useFetchApi;
