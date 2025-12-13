
const Button = ({handleClick}:any) => {
  return (
    <button
      className="text-4xl font-normal p-3 m-4 mt-8 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer bg-white hover:bg-gray-200"
      onClick={handleClick}
    >
      +
    </button>
  );
};

export default Button;
