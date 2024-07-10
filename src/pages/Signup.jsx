import { useState } from 'react';
import useCreateUser from '../utils/useCreateUser';
import { Link } from 'react-router-dom';
// import Dashboard from './Dashboard';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const {createUser, userName} = useCreateUser();

  const handleSignup = async (e) => {
    e.preventDefault();
    if(password === passwordConfirm){
        try {

          createUser(email,username,password,passwordConfirm);

        } catch (error) {
            console.error('Signup error:', error.message);
          }
    }
    else{
        alert("Password did not match")
    }
    
  };

  return ( userName != null ? (
    
    // <Dashboard />
    <h1>Hello</h1>
  ) : (
    <div className='auth-container'>
      
      <div className='form-container'>
        <h1 className='title'>resolveX</h1>
        <h3 className='sub-title'>Register</h3>
        <form onSubmit= {handleSignup} className='form'>
          <input
            type="email"
            value={email}
            onChange= {(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
            className='input'
          />
          <input
            value={username}
            onChange= {(e) => setUsername(e.target.value)}
            required
            placeholder='Username'
            className='input'
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
            className='input'
          />
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            placeholder='Confirm Password'
            className='input'
          />
          <button type="submit" className='submit-btn'>Sign up</button>
        </form>
        <p>Already have an account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </div>
 ) 
  );
};

export default Signup;