import React ,{ useContext,useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import { API_PATHS } from '../../utils/apiPaths.js';
import axiosInstance  from '../../utils/axiosInstance.js';
import {UserContext} from "../../context/userContext";


const Login = ()=>{
  const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    const {updateUser} = useContext(UserContext);

const navigate = useNavigate();

// handle login for submit
const handleLogin = async (e)=>{
  e.preventDefault();

  if(!validateEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if(!password) {
    setError("Please enter the password");
    return;
  }

  setError("");

  //Login Api Call
  try{
    // console.log(email, password)
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    }); 
    const {token , user} = response.data;
    console.log(response)

    if(token){
      localStorage.setItem("token",token);
      updateUser(user);
      navigate("/dashboard");
    }
  }catch(error){
    if(error.response && error.response.data.message){
      setError(error.response.data.message);
    }else{
      setError("Something went wrong. Please try again later.");
    }
  }
}




  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
         <h3 className="text-xl font-semisolid text-black">Welcome Back</h3>
             <p className="text-xs text-slate-700 mt-[5px] mb-6">
                  Please enter your details to log in
            </p>
        
        <form onSubmit={handleLogin}>
          <Input value={email}
          onChange={({target})=> setEmail(target.value)}
          label ="Email Address"
          placeholder='john@example.com'
          type="text"
          />

          <Input value={password}
          onChange={({target})=> setPassword(target.value)}
          label ="Password"
          placeholder='Min 8 Characters'
          type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type='submit'  className="cursor-pointer btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800 mt-3">Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">SignUp </Link>
          </p>
        </form>

        </div>
    </AuthLayout>
  );
};

export default Login;