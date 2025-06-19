import Code from "@editorjs/code";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";


const uploadImageByUrl = (e) => {
  const img = new Promise((resolve, reject) => {
    try {
      resolve(e)
    } catch (error) {
      reject(error)
    }
  })

  return img.then(url => {
    return {
      success : 1, 
      file : {url}
    }
  })
}

//make it using cloudinary cause he has used AWS
// const uploadImageByFile = (e)=> {
 
// }

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true, // Enables inline formatting
  },

  code: Code,
  linkTool: LinkTool,
  image:{
    class : Image,
    config : {
      uploader : {
        uploadByUrl : uploadImageByUrl,
        uploadByFile : uploadImageByUrl
      }
    }
  },
   header: {
    class: Header,
    config: {
      placeholder: "Type Heading ....",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true, // Enables inline formatting
  },
  marker: Marker,
  inlineCode: InlineCode,
};
