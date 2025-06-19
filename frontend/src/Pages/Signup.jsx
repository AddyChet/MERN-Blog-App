import AnimationWrapper from "../common/AnimationWrapper";

import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ImSpinner2 } from "react-icons/im";

const Signup = () => {
  const {signup, isSigningIn} = useContext(AuthContext)

  const handleSubmit = async (e)=> {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())
    console.log(userData)
    await signup(userData)
  }

  return (
    <AnimationWrapper>
      <div className="relative w-full h-[95vh] overflow-hidden">

        <div className="absolute inset-0 bg-black/10 z-10"></div>{" "}
        {/* Optional overlay */}
        <div className="relative z-20 flex justify-center items-center h-full">
          <div className="shadow-lg p-4 rounded-lg bg-white/30 backdrop-blur-lg">
            <form onSubmit={handleSubmit} className="flex flex-col items-center py-8 px-4 gap-6">
              {/* Input Fields */}
              <input
                className="py-3 border border-gray-300 px-4 rounded-lg"
                type="text"
                placeholder="First Name"
                name="firstName"
              />
              <input
                className="py-3 border border-gray-300 px-4 rounded-lg"
                type="text"
                placeholder="Last Name"
                name="lastName"
              />
              <input
                className="py-3 border border-gray-300 px-4 rounded-lg"
                type="email"
                placeholder="Email"
                name="email"
              />
              <input
                className="py-3 border border-gray-300 px-4 rounded-lg"
                type="password"
                placeholder="Password"
                name="password"
              />
              <button className="border w-full py-2 px-1 rounded-xl bg-black text-white cursor-pointer hover:bg-white/30 hover:text-black transition duration-300">
                {isSigningIn ? <div className="flex justify-center"><ImSpinner2 size={20}/></div> : "Sign up"}
              </button>

              <p>
                Already Signed Up?{" "}
                <Link to={"/login"}>
                  <span className="text-gray-500 pl-1">Login</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Signup;
