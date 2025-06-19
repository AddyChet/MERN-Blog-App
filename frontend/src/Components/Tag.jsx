import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { EditorContext } from "../context/EditorContext";

const Tag = ({tag, tagIndex}) => {
const {blogState, setBlogState} = useContext(EditorContext)
    const handleDeleteTag = (t) =>{
        const modifiedTag = blogState.tags.filter((tag) => tag !== t)
        setBlogState({...blogState, tags : modifiedTag})
    }

    const editTag = (e)=> {
        e.target.setAttribute("contentEditable", true)
        e.target.focus();
    }

    const handleUpdateTag = (e) =>{
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.preventDefault()
            const currentTag = e.target.innerText;
            const updatedTags = [...blogState.tags];
            updatedTags[tagIndex] = currentTag;

            setBlogState({ ...blogState, tags: updatedTags });
            e.target.setAttribute("contentEditable", false)
        }
    }
  return (
    <div className="inline-block relative p-2 mr-2 mt-2 px-5 bg-white rounded-full hover:bg-white/50 pr-7">
      <p className="outline-none" onKeyDown={handleUpdateTag} 
        onClick={editTag}
        >{tag}</p>
      <RxCross1 
        onClick={()=>handleDeleteTag(tag)}
        className="absolute right-2 top-[54%] -translate-y-1/2 cursor-pointer"/>
    </div>
  );
};

export default Tag;
