import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Routes, Route } from "react-router";
import BlogEditor from "../Components/BlogEditor";
import PublishBlog from "../Components/PublishBlog";

const Editor = () => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;

  return (
    <Routes>
      <Route path="create" element={<BlogEditor />} />
      <Route path="publish" element={<PublishBlog />} />
    </Routes>
  );
};

export default Editor;
