import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchSnippets = async (lang) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/snippet/get?language=${lang}`
    );
    if (res.data.length === 0) {
      toast.info("No snippets available for the selected language");
    }
    return res.data;
  } catch (err) {
    throw new Error(err.response?.statusText || "Error fetching snippets");
  }
};

const Home = () => {
  const [language, setLanguage] = useState("");
  const isopen = useSelector((state) => state.side.isOpen);

  const {
    data: snippets,
    isError,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["snippets", language],
    queryFn: () => fetchSnippets(language),
    enabled: !!language,
  });

  if (isError) {
    toast.error(error.message);
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    refetch();
  };

  console.log(isopen);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
      <ToastContainer />
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Home Sweet Home</h1>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Language:
          </label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              -- Select a language --
            </option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
          </select>
        </div>
      </header>
      {language === "" ? (
        <div>
          <img
            src="/path/to/default/image.png"
            alt="Select a language to view snippets"
            className="w-full h-auto"
          />
          <p className="text-center text-gray-500 mt-4">
            Select a language to view snippets
          </p>
        </div>
      ) : isLoading ? (
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      ) : isError ? (
        <p className="text-center text-gray-500 mt-4">
          No snippets available for the selected language
        </p>
      ) : (
        snippets &&
        snippets.map((snippet) => (
          <div
            key={snippet._id}
            className="max-w-3xl mb-4 p-2 border border-gray-300 rounded-md cursor-pointer flex justify-between items-center"
          >
            <div className="">
              <ReactQuill
                value={snippet.header}
                readOnly={true}
                theme="bubble"
                className="bg-white -mb-12"
              />
              <ReactQuill
                value={snippet.description}
                readOnly={true}
                theme="bubble"
                className="bg-white"
              />
            </div>
            <Link to={`/snippet/${snippet._id}`}>
              <span>&#x2192;</span>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
