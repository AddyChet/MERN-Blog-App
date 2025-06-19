import React, { useEffect } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import blogBanner from "../assets/blogBanner.png";
import { useContext } from "react";
import { EditorContext } from "../context/EditorContext";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../config/tools";

const BlogEditor = () => {
  const { blogState, setBlogState, textEditor, setTextEditor, uploadBanner } =
    useContext(EditorContext);

  useEffect(() => {
    if(!textEditor.isReady){
      setTextEditor(
      new EditorJS({
        holder: "textEditor",
        data: "",
        tools: EDITOR_JS_TOOLS,
        placeholder: "Write your amazing story....",
      })
    );
    }
  }, []);

  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await uploadBanner(file)

  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlogState({ ...blogState, title: input.value });
  };

  return (
    <AnimationWrapper>
      <section className="">
        <div className="mx-auto md:max-w-xl sm:max-w-lg max-w-[350px] mt-6 lg:max-w-2xl">
          <div className="relative aspect-video bg-white hover:opacity-80  border-4 border-gray-100 ">
            <label htmlFor="banner">
              <img src={blogState.banner === null ? blogBanner : blogState.banner} className="z-20" />
              <input
                id="banner"
                type="file"
                accept=".png, .jpg, .jpeg"
                hidden
                onChange={handleBannerUpload}
              />
            </label>
          </div>

          <textarea
            name=""
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            placeholder="Blog Title"
            className="text-3xl overflow-hidden font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
          >
            {blogState.title}
          </textarea>

          <hr className="w-full opacity-10 " />

          <div id="textEditor" className="mt-4 "></div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default BlogEditor;
