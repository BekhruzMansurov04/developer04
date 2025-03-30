import { useState } from "react";
import customAxios from "../api/CustomAxios";

const CreateDataApi = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (newData) => {
    setLoading(true);
    setError(null); 

    try {
      const token = localStorage.getItem("token");
      const response = await customAxios.post(url, newData, {
        headers: { "x-auth-token": token },
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error };
};

export default CreateDataApi;
