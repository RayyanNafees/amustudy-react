import { useLocation } from "preact-iso";
import useLogin from "../utils/useLogin";

const Auth = () => {
  const { email, setEmail, password, setPassword, login, handleSubmit } =
    useLogin();
  const {route: navigate} = useLocation();

  if (login) {
    navigate("/");
  }

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-[#fafbfb] text-white">
      <div className="flex flex-col justify-center items-center gap-5 bg-[#18181b] px-5 py-10 rounded-md">
        {/* <h1 className='text-3xl font-bold'>AMUStudy</h1> */}
        <h3 className="text-2xl font-semibold">Login</h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center"
        >
          <input
            type="text"
            className="px-4 py-2 bg-transparent rounded-md focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Email"
          />

          <input
            type="password"
            className="px-4 py-2 bg-transparent rounded-md focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
          />

          <button
            type="submit"
            className="bg-green-500 w-[100%] py-2 mt-5 rounded-md text-white hover:border-transparent"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-slate-500">New to AMUStudy?</p>
        <a href="/signup" className="text-slate-300">
          Sign up
        </a>
      </div>
    </div>
  );
};
export default Auth;
