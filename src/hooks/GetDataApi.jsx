import { useState, useEffect } from "react";
import customAxios from "../api/CustomAxios";

const GetDataApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token"); 
    setLoading(true);
    setError(null);

    try {
      const response = await customAxios.get(url, {
        headers: { "x-auth-token": token },
      });
      setData(response.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

export default GetDataApi;
