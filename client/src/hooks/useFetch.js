import { useEffect, useState } from "react";

function useFetch(url) {
  const [response, setResponse] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResponse((prevState) => ({ ...prevState, data, isLoading: false }));
      })
      .catch((error) => {
        setResponse((prevState) => ({ ...prevState, error, isLoading: false }));
      });
  }, []);

  return response;
}

export default useFetch;
