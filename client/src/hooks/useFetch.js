import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function refetch(){
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }

  useEffect(() => {
      refetch();
  }, []);

  return {data, isLoading, error, refetch};
}

export default useFetch;
