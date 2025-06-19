const NavigationInline = ({ text, setActiveIndex, activeIndex, index }) => {
  return (
    <div className="relativ flex flex-nowrap overflow-x-auto ">
      <button
        onClick={() => setActiveIndex(index)}
        className={`px-4 pt-4 pb-2 border-b cursor-pointer ${
          index > 0 ? "lg:hidden" : "inline"
        } transition-colors duration-500 ease-in-out ${
          activeIndex === index
            ? "border-gray-400 text-gray-900"
            : "border-gray-200 text-gray-500"
        }`}
      >
        {text}
      </button>
    </div>
  );
};

export default NavigationInline;
