import React from "react";
import PostForm from "../../../components/post-form";

const EditPage = () => {
  return (
    <div className="container">
      <PostForm isEditMode={true} />
    </div>
  );
};

export default EditPage;
