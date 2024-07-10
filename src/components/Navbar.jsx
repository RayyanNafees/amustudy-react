import { useState } from "react";

const Navbar = () => {
    const [inputText, setInputText] = useState('');
    const handleTextChange = (e) => {
        setInputText(e.target.value);
      };
    
    return(
        <div className="h-[10vh] w-[100%] flex justify-between items-center bg-[#18181b] fixed px-10 font-medium">
            <h1 className="text-[1.2rem] font-bold text-white">
                AMUStudy
            </h1>
            <div className="flex items-center gap-10">

                <input
                    type="text"
                    className="styled-input w-[30vw] py-2 pl-3 bg-[#fafbfb] rounded-md focus:outline-none"
                    placeholder="Search AMUStudy"
                    value={inputText}
                    onChange={handleTextChange}
                    />
                <span className="text-white">
                    Login
                </span>
            </div>
            {/* <Link href={'/login'}>
                Login
            </Link> */}
        </div>
    )
}

export default Navbar;