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
          throw Error("Failed to fetch data.");
        }
        setData(request.data);
      } catch (e) {
        if(e instanceof Error){
          setError(e.message);
        } else {
          setError("Uncaught exception occurred")
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
}

export default useFetchApi;
