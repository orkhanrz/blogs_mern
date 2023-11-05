import { createContext, useEffect, useState } from "react";

const blogsContext = createContext();

function BlogsContextProvider({ children }) {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData(options) {
    let url = `/blogs?page=${page}&limit=9`;
    
    if (options?.featured){
      url = `/blogs?page=${page}&limit=9&featured=true`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async function reloadBlogs() {
    try {
      const data = await loadData();
      setBlogs(data.blogs);
      setTotalPages(Math.ceil(data.length / 9));
    } catch (err) {
      setError(err.message);
    }
  }

  function setCurrentPage(p) {
    if (p >= 1 && p <= totalPages) {
      setPage(p);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const data = await loadData({featured: true});

        setIsLoading(false);
        setFeatured(data.featured);
        setBlogs(data.blogs);
        setTotalPages(Math.ceil(data.length / 9));
      } catch (err) {
        setError(err.message);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const data = await loadData();
        setIsLoading(false);
        setBlogs(data.blogs);
      } catch (err) {
        setError(err.message);
      }
    }

    getData();
  }, [page]);

  return (
    <blogsContext.Provider
      value={{
        blogs,
        isLoading,
        error,
        totalPages,
        page,
        featured,
        reloadBlogs,
        setCurrentPage,
      }}
    >
      {children}
    </blogsContext.Provider>
  );
}

export { BlogsContextProvider, blogsContext };
