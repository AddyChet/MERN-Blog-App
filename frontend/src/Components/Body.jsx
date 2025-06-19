import React, { useState } from "react";
import SideBar from "./SideBar";
import NavigationInline from "../common/NavigationInline";

const con = ["Home", "Trending"];
const Body = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex w-full border-b border-gray-200">
        {con.map((e, i) => (
          <NavigationInline
            key={i}
            text={e}
            index={i}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>

      {con[activeIndex] === "Home" ? (
        <>
          <div className="px-4 py-8 pt-0 flex flex-col lg:flex-row gap-8 mt-8">
            {/* Blog Content */}

            <div className="flex-1 flex flex-col gap-10">
              <div className="flex flex-col gap-8">
                {/* Blog Card */}
                <div className="flex flex-col md:flex-row gap-6 border-b border-gray-300 pb-8">
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <img
                      className="w-full h-64 md:h-full object-cover rounded-md"
                      src="https://cdn.pixabay.com/photo/2025/05/30/17/15/mountain-9631829_1280.jpg"
                      alt="The Himalayas"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-800">
                      The Himalayas were formed billions of years ago
                    </h1>
                    <div className="text-sm text-gray-500 flex gap-3">
                      <span>Adarsh</span>
                      <span>11/02/2025 11:30 PM</span>
                    </div>
                    <p className="text-base text-gray-700">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Hic deserunt aut corrupti possimus a sint illum eos,
                      minima doloremque assumenda eligendi repellendus velit
                      alias ipsa maxime dolor dolorem cumque dicta.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3 hidden lg:block">
              <SideBar />
            </div>
          </div>
        </>
      ) : (
        <div>Trneing post</div>
      )}
    </div>
  );
};

export default Body;
