import React, { useContext, useState } from "react";
import AnimationWrapper from "../common/AnimationWrapper";
import { RxCross1 } from "react-icons/rx";
import { EditorContext } from "../context/EditorContext";
import Tag from "./Tag";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const PublishBlog = () => {
  const maxCharacterLength = 200;
  const maxTagsLength = 10;
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    blogState,
    setBlogState,
    publishBlog,
    blogState: { title, des, banner, tags, content },
  } = useContext(EditorContext);

  const handleTitleChange = (e) => {
    setBlogState({ ...blogState, title: e.target.value });
  };

  const handleTagChange = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      const tag = e.target.value.trim();

      if (
        tag && // prevents empty strings
        !blogState.tags.includes(tag) && // avoids duplicates
        blogState.tags.length < 10 // caps at 10 tags
      ) {
        setBlogState({ ...blogState, tags: [...blogState.tags, tag] });
        e.target.value = ""; // reset input after adding
      } else {
        toast.error(
          !tag
            ? "Tag cannot be empty"
            : blogState.tags.includes(tag)
            ? "Tag already exists"
            : "Maximum of 10 tags allowed"
        );
      }

      e.target.value = "";
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }

    setBlogState({ ...blogState, des: e.target.value });
  };

  const handlePublishBlog = async () => {

    if (!title || !title.trim()) {
      return toast.error("Title is required");
    }

    if (!des || !des.trim()) {
      return toast.error("Description is required");
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return toast.error("At least one tag is required");
    }

    setIsDisabled(true);
    
    const blogObj = {
      title,
      des,
      banner,
      tags,
      content: content.blocks,
      draft: false,
    };

    await publishBlog(blogObj)
      .then(() => {
        setIsDisabled(false);
        navigate("/");
      })
      .catch((err) => {
        setIsDisabled(false);
        console.error(err);
      });
  };

  return (
    <AnimationWrapper>
      <section className=" max-w-md sm:max-w-4xl p-4 mx-auto xl:max-w-6xl ">
        {/* publishHEading */}
        <div className="">
          <div className="flex justify-between px-2">
            <p className="text-gray-400">Preview</p>
            <RxCross1
              size={20}
              onClick={() => navigate("/editor/create")}
              className="cursor-pointer"
            />
          </div>

          {/* publishbody */}
          <div className="mt-6 sm:grid sm:grid-cols-2 gap-7 ">
            <img src={blogState.banner} className="rounded-3xl" />
            <div className="mt-5 w-full">
              <h1 className="font-semibold text-3xl">{blogState.title}</h1>
              <p className="mt-4 break-words whitespace-pre-wrap overflow-hidden">
                {blogState.des}
              </p>
            </div>
          </div>

          <div className="mt-7 sm:grid sm:grid-cols-2 gap-7">
            {/* gridlayout */}
            <div className="">
              {/* blogTitle */}
              <div className="flex flex-col gap-2 sm:max-w-lg md:max-w-2xl md:mx-auto lg:max-w-3xl xl:max-w-5xl">
                <label className="text-gray-500" htmlFor="blog-title">
                  Blog Title
                </label>
                <input
                  onChange={handleTitleChange}
                  type="text"
                  defaultValue={blogState.title}
                  id="blog-title"
                  className="w-[100%] rounded-md py-2 bg-gray-100 pl-7 border border-gray-100 focus:outline-none placeholder:text-black"
                />
              </div>

              {/* blogDescription*/}
              <div className="flex flex-col gap-2 mt-2 sm:max-w-lg md:max-w-2xl md:mx-auto lg:max-w-3xl xl:max-w-5xl ">
                <label className="text-gray-500" htmlFor="text-area">
                  Description
                </label>

                <textarea
                  maxLength={maxCharacterLength}
                  defaultValue={blogState.des}
                  onKeyDown={handleDescriptionChange}
                  id="text-area"
                  className="h-[170px] sm:h-40 lg:p-7 md:p-5 p-3 leading-7 resize-none w-[100%] rounded-md  bg-gray-100 border border-gray-100 focus:outline-none placeholder:text-black"
                ></textarea>
                <p className="text-right text-gray-400">
                  {maxCharacterLength - blogState.des.length} Characters left
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2 sm:max-w-lg md:max-w-2xl md:mx-auto lg:max-w-3xl xl:max-w-5xl ">
              <label className="text-gray-500" htmlFor="text-area">
                Tags : (helps others identify your topic using this)
              </label>

              <div className="border w-[100%] rounded-md  bg-gray-100 px-4 py-2 border-gray-100 focus:outline-none placeholder:text-black">
                <input
                  onKeyDown={handleTagChange}
                  type="text"
                  className="bg-white w-[100%] rounded-md py-2 pl-7 border border-gray-100 focus:outline-none placeholder:text-black mb-3"
                />
                {blogState.tags.map((tag, i) => (
                  <Tag key={i} tag={tag} tagIndex={i} />
                ))}

                <p className="text-right text-gray-400">
                  {maxTagsLength - blogState.tags.length} Tags Left
                </p>
              </div>
            </div>
          </div>

          <button
            disabled={isDisabled}
            onClick={handlePublishBlog}
            className={`cursor-pointer border px-3 py-1 rounded-3xl transition duration-300 
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed opacity-50"
                : "bg-black text-white hover:bg-white hover:text-black"
            }
          `}
          >
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishBlog;
