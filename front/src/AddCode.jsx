import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "@monaco-editor/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCode = () => {
  const initialState = {
    header: "",
    description: "",
    code: "",
    language: "javascript",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (field) => (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://codebase-3.onrender.com/snippet/add",
        formData
      );
      toast.success(res.data.message);
      setFormData(initialState); // Reset form data
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Header:
          </label>
          <ReactQuill
            style={{ height: "150px" }}
            value={formData.header}
            onChange={handleChange("header")}
            className="bg-white"
          />
        </div>
        <div className="mb-4 mt-12">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <ReactQuill
            style={{ height: "150px" }}
            value={formData.description}
            onChange={handleChange("description")}
            className="bg-white"
          />
        </div>
        <div className="mb-4 mt-12">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Language:
          </label>
          <select
            value={formData.language}
            onChange={(e) => handleChange("language")(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Code:
          </label>
          <Editor
            height="200px"
            language={formData.language}
            theme="vs-dark"
            value={formData.code}
            options={{
              fontSize: 16,
              formatOnType: true,
              autoClosingBrackets: true,
              minimap: { enabled: false },
            }}
            onChange={(value) => handleChange("code")(value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCode;
