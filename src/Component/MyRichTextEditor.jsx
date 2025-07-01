import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

const MyRichTextEditor = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <ReactQuill
        value={value} 
        onChange={onChange} 
        theme="snow"

        placeholder={placeholder || "Enter long description"}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"], 
          ],
        }}
      />
    </div>
  );
};

export default MyRichTextEditor;