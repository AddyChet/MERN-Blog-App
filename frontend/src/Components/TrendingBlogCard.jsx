import React from "react";
import { Link } from "react-router";
import DateFormat from "../common/DateFormat";

const TrendingBlogCard = ({ blog, index }) => {
  const { firstName, lastName, profile_pic } = blog.author;
  const { title, publishedAt } = blog;
  return (
    <Link className="flex gap-5 mb-8">
      <h1 className="text-4xl sm:text-3xl lg:text-5xl font-bold text-gray-300 leading-none;">
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </h1>

      <div>
        <div className="flex gap-2 items-center mb-4">
          <img src={profile_pic} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1 md:text-md text-sm">
            {firstName + " " + lastName}
          </p>
          <p className="min-h-fit md:text-md text-sm">
            <DateFormat key={index} date={publishedAt} />
          </p>
        </div>

        <h1 className="md:text-2xl text-xl font-medium leading-7 line-clamp-3 sm:line-clamp-2">{title}</h1>
        
      </div>
    </Link>
  );
};

export default TrendingBlogCard;
