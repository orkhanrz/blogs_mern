import { createContext, useEffect, useState } from "react";

const blogsContext = createContext();

function BlogsContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`/api/blogs?page=${page}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setBlogs(data.blogs);
        setTotalPages(Math.ceil(data.length / 9));
        setFeatured(data.featured);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    setIsLoading(true);

    fetch(`/api/blogs?page=${page}&limit=9`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setBlogs(data.blogs);
      })
      .catch((err) => setError(err.message));
  }, [page]);

  function setCurrentPage(p) {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  }

  return <blogsContext.Provider value={{blogs, isLoading, error, totalPages, page, featured, setCurrentPage}}>{children}</blogsContext.Provider>;
}

export { BlogsContextProvider, blogsContext };
