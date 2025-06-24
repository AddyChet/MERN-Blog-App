import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { GiFeather } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { EditorContext } from "../context/EditorContext";
import { toast } from "react-toastify";
import { LuPenLine } from "react-icons/lu";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const {
    editorState,
    blogState: { title, banner, des, tags },
    textEditor,
    setBlogState,
    blogState,
    setEditorState,
    publishDraft,
    fetchBlogByCategory,
  } = useContext(EditorContext);
  
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  console.log(user);
  const navCondition =
    (editorState === "editor" || editorState === "publish") &&
    window.location.pathname === "/editor/create";

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
  };

  const handlePublish = () => {
    if (banner === null) {
      return toast.error("Banner needed");
    }

    if (!title.length) {
      return toast.error("Title needed");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length > 0) {
            setBlogState({ ...blogState, content: data });
            setEditorState("publish");
            navigate("/editor/publish");
          } else {
            return toast.error("Write something in your blog to publish it");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDraft = () => {
    if (!title.length) {
      return toast.error("Title needed");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          const obj = {
            title,
            banner,
            des,
            content: data.blocks,
            tags,
            draft: true,
          };
          publishDraft(obj)
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleProfileClick = () => {
    setProfileOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      await fetchBlogByCategory(e.target.value.toLowerCase());
      navigate(`/search/${e.target.value}`);
    }
  };

  return (
    <div className="shadow-lg fixed w-screen bg-white  z-50">
      <div className="max-w-7xl mx-auto p-4">
        <nav className="flex justify-between items-center">
          {/* Logo & Search */}
          <div className="flex gap-8 items-center">
            <p className="text-sm md:text-lg cursor-pointer">
              <GiFeather size={30} onClick={() => navigate("/")} />
            </p>
            <div className="relative">
              {navCondition ? (
                <>
                  <p className=" text-black line-clamp-1 w-full max-md:hidden">
                    {title.length > 0 ? title : "New Post"}
                  </p>{" "}
                </>
              ) : (
                <>
                  <MdOutlineSearch className="absolute left-2 top-5 transform -translate-y-1/2 text-gray-500" />
                  <input
                    onKeyDown={handleSearch}
                    type="text"
                    placeholder="search..."
                    className="w-38 md:w-52 pl-8 font-light text-sm rounded-2xl border border-gray-300 p-2 outline-none focus:border-slate-500 bg-gray-100"
                  />
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          {navCondition ? (
            <div className="flex  gap-3 md:gap-8 items-center">
              <button
                onClick={handlePublish}
                className="rounded-4xl text-xs border sm:text-sm lg:text-md py-2 px-4 md:py-2 md:px-5 bg-black text-white cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-white hover:text-black ease-in-out"
              >
                Publish
              </button>
              <button
                onClick={handleDraft}
                className="rounded-4xl text-xs border py-2 px-4 md:py-2 sm:text-sm lg:text-md md:px-5 bg-white text-black cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-black hover:text-white ease-in-out"
              >
                Save Draft
              </button>
            </div>
          ) : (
            <>
              <div className="hidden sm:flex gap-8 items-center">
                <button
                  onClick={() => navigate("/editor/create")}
                  className="hover:text-blue-500 text-sm md:text-lg text-gray-500 cursor-pointer hover:scale-102 transition duration-150 ease-in flex items-center gap-2"
                >
                  <LuPenLine /> <p className="text-sm">Start Writing</p>
                </button>

                {user ? (
                  <>
                    <div className="relative" ref={profileRef}>
                      <button
                        className="cursor-pointer"
                        onClick={handleProfileClick}
                      >
                        <img
                          src={user.profile_pic}
                          className="h-6 w-6 hover:scale-110 transition duration-200"
                        />
                      </button>
                      {/* profileSetting */}

                      {profileOpen && (
                        <div className="w-40 absolute bg-white top-8 right-3 rounded-lg border border-gray-200 shadow-2xl">
                          <div
                            className="w-full"
                            onClick={() => setProfileOpen(false)}
                          >
                            <Link to="/profile">
                              <p className="border-b text-md text-gray-500 border-gray-200 px-7 py-2 cursor-pointer hover:bg-gray-200">
                                Profile
                              </p>
                            </Link>

                            <Link to="/dashboard">
                              <p className="border-b text-md text-gray-500 border-gray-200 px-7 py-2 cursor-pointer hover:bg-gray-200">
                                Dashboard
                              </p>
                            </Link>
                            <Link to="/settings">
                              <p className="border-b text-md text-gray-500 border-gray-200 px-7 py-2 cursor-pointer hover:bg-gray-200">
                                Settings
                              </p>
                            </Link>
                            <p className="border-b text-md text-gray-500 border-gray-200 px-7 py-3 hover:bg-gray-200">
                              <button
                                onClick={handleLogout}
                                className="flex flex-col text-left gap-2  cursor-pointer"
                              >
                                <span className="hover:text-black ">
                                  {" "}
                                  Logout{" "}
                                </span>
                                <span className="text-xs text-semibold  text-blue-400">
                                  @{user.firstName + " " + user.lastName}
                                </span>
                              </button>
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/signup")}
                      className="rounded-4xl border py-1 px-4 md:py-2 md:px-5 bg-black text-white cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-white hover:text-black ease-in-out"
                    >
                      Signup
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="rounded-4xl border py-1 px-4 md:py-2 md:px-5 bg-white text-black cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-black hover:text-white ease-in-out"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="sm:hidden text-2xl"
                onClick={() => setIsOpen(true)}
              >
                <HiOutlineMenuAlt3 />
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Modal (Sidebar) */}
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <button
              className="absolute right-4 top-4 text-lg"
              onClick={() => setIsOpen(false)}
            >
              <RxCross1 size={20} />
            </button>
            <p className="text-lg font-bold mb-4">Menu</p>
            <p
              className="hover:text-blue-500 cursor-pointer mb-2"
              onClick={() => setIsOpen(false)}
            >
              Publish
            </p>
            {user ? (
              <>
                <p
                  className="hover:text-blue-500 cursor-pointer mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </p>
                <p
                  className="hover:text-blue-500 cursor-pointer mb-2"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </p>
              </>
            ) : (
              <>
                <p
                  className="hover:text-blue-500 cursor-pointer mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </p>
                <p
                  className="hover:text-blue-500 cursor-pointer mb-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
