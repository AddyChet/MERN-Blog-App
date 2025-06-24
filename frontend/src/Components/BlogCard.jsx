import { BsHeart } from "react-icons/bs";
import DateFormat from "../common/DateFormat";
import { Link } from "react-router";

const BlogCard = ({ blog, index }) => {
  const { firstName, lastName, profile_pic } = blog.author;
  const { title, des, tags, banner, publishedAt } = blog;
  const { total_likes } = blog.activity;
  return (
    <>
      <Link className="flex gap-8 relative items-center border-b border-gray-300 pb-7 mb-7 mt-4">
        <div className="w-full">
          <div className="flex gap-2 items-center mb-4">
            <img src={profile_pic} className="w-6 h-6 rounded-full" />
            <p className="line-clamp-1 md:text-md text-sm">
              {firstName + " " + lastName}
            </p>
            <p className="min-h-fit md:text-md text-sm">
              <DateFormat key={index} date={publishedAt} />
            </p>
          </div>

          <h1 className="md:text-xl text-md font-medium leading-7 line-clamp-3 sm:line-clamp-2">
            {title}
          </h1>
          <p className="m-3 ml-0 text-md leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
            {des}
          </p>

          <div className="flex gap-4 mt-4">
            <span className="whitespace-nowrap rounded-full text-sm capitalize hover:bg-opacity-80 bg-gray-200 text-black py-1 px-4">
              {tags[0]}
            </span>
            <span className="ml-3 flex items-center gap-2 text-gray-700">
              <BsHeart />
              {total_likes}
            </span>
          </div>
        </div>

        <div className="h-28 aspect-square sm:block hidden">
          <img
            src={banner}
            className="w-full h-full aspect-square  object-cover"
          />
        </div>
      </Link>
    </>
  );
};

export default BlogCard;

//   {/* Blog Content */}

//   <div className="flex-1 flex flex-col gap-10">
//     <div className="flex flex-col gap-8">
//       {/* Blog Card */}

//       <div
//         key={blog.blog_id}
//         className="flex flex-col md:flex-row gap-6 border-b border-gray-300 pb-8"
//       >
//         {/* Image */}
//         <div className="w-full md:w-1/2">
//           <img
//             className="w-full h-64 md:h-full object-cover rounded-md"
//             src={blog.banner}
//             alt=""
//           />
//         </div>

//         {/* Text Content */}
//         <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
//           <h1 className="text-xl font-semibold text-gray-800">
//             {blog.title}
//           </h1>
//           <div className="text-sm text-gray-500 flex gap-3">
//             <span>
//               {blog.author.firstName + " " + blog.author.lastName}
//             </span>
//             <DateFormat date={blog.publishedAt} />
//           </div>
//           <p className="text-base text-gray-700">{blog.des}</p>

//           <div className="flex gap-1 items-center text-gray-500">
//             <BsHeart className="" size={14} />{" "}
//             <span className="">{blog.activity.total_likes}</span>
//           </div>

//           <div className="flex gap-2 items-baseline">
//             {blog.tags.map((tag, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl bg-gray-200 px-4 py-1 flex gap-3"
//               >
//                 {tag}
//               </div>
//             ))}
//           </div>
//         </div>loading
//       </div>
//     </div>
//   </div>
