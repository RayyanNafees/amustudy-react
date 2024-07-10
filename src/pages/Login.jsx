import { useNavigate } from "react-router-dom";
import useLogin from "../utils/useLogin";
import { Link } from "react-router-dom";




const Auth = () => {
    const { email, setEmail, password, setPassword, login, handleSubmit } = useLogin();
    const navigate = useNavigate();


    if(login){
        navigate('/');
    }

    return(
        <div className="auth-container">
            <div className="form-container">
                <h1 className='title'>resolveX</h1>
                <h3 className='sub-title'>Login</h3>
                <form onSubmit={handleSubmit} className="form">
                    <input 
                    type="text" 
                    className='input'
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Email"
                    />

                    <input 
                    type="password" 
                    className='input'
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Password"
                    />

                    <button type="submit" className='submit-btn'>Login</button>
                </form>
                <p>New to resolveX?</p>
                <Link to={"/signup"}> Sign up</Link>
            </div>
        </div>
    )
}
export default Auth;