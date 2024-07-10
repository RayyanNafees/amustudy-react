import { useState } from "react";
import UserContext from "../utils/UserContext";
import { useContext } from "react";
import useLogout from "../utils/useLogout";

const Navbar = () => {
  const [inputText, setInputText] = useState("");

  const logout = useLogout();

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const { loggedinUser } = useContext(UserContext);

  return (
    <div className="h-[10vh] w-[100%] flex justify-between items-center bg-[#18181b] fixed px-10 font-medium">
      <h1 className="text-[1.2rem] font-bold text-white">AMUStudy</h1>
      <div className="flex gap-10 items-center">
        <input
          type="text"
          className="styled-input w-[30vw] py-2 pl-3 bg-[#fafbfb] rounded-md focus:outline-none"
          placeholder="Search AMUStudy"
          value={inputText}
          onChange={handleTextChange}
        />
        {loggedinUser !== "" ? (
          <button
            type="button"
            className="text-red-400 logout-btn hover:border-red-400"
            onClick={() => logout()}
          >
            Logout
          </button>
        ) : (
          <a href={"/login"} className="text-white hover:text-white/90">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
