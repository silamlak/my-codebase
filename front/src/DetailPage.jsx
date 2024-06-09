import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "@monaco-editor/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchSnippet = async (id) => {
  try {
    const res = await axios.get(
      `https://codebase-3.onrender.com/snippet/get/${id}`
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.statusText || "Error fetching snippet");
  }
};

const DetailPage = () => {
    const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: snippet,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["snippet", id],
    queryFn: () => fetchSnippet(id),
    enabled: !!id,
  });

  if (isError) {
    toast.error(error.message);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const handleDelete = async(id) => {
      try {
    const res = await axios.delete(
      `https://codebase-3.onrender.com/snippet/remove/${id}`
    );
        toast.success(res.data.message);
        navigate('/')
  } catch (err) {
    throw new Error("Error fetching snippet");
  }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
      <ToastContainer />
      <button onClick={() => handleDelete(id)}>Delete</button>
      {snippet && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Header
            </label>
            <ReactQuill
              value={snippet.header}
              readOnly={true}
              theme="bubble"
              className="bg-white mb-4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <ReactQuill
              value={snippet.description}
              readOnly={true}
              theme="bubble"
              className="bg-white mb-4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Code
            </label>
            <Editor
              height="200px"
              theme="vs-dark"
              defaultLanguage="javascript"
              value={snippet.code}
              options={{
                readOnly: true,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
