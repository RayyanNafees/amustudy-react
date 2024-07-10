import { useState } from "react";

const Navbar = () => {
    const [inputText, setInputText] = useState('');
    const handleTextChange = (e) => {
        setInputText(e.target.value);
      };
    
    return(
        <div className="h-[10vh] w-[100%] flex justify-between items-center bg-[#0e1113] fixed px-10 font-medium">
            <h1 className="text-[1.2rem]">
                AMUStudy
            </h1>
            <input
                type="text"
                className="styled-input w-[500px] py-2 pl-10 bg-[#2b3336] rounded-full focus:outline-none"
                placeholder="Search AMUStudy"
                value={inputText}
                onChange={handleTextChange}
            />
            <span>
                Login
            </span>
            {/* <Link href={'/login'}>
                Login
            </Link> */}
        </div>
    )
}

export default Navbar;