import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const {setUser} = useUser();


   async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
  
 
    try {
        const response = await axios.post("http://localhost:3000/auth/login", {
          email,
          password,
        });
        

        console.log(response.data)
        if(response.data.success===true){
          setUser(response.data.user);
          if(response.data.role==="admin"){
            navigate('/admin')
          }
          if(response.data.role==="user"){
            navigate('/user')
          }
            else {
              setError("Invalid login credentials.");
            }
        }
      } catch (error:any) {
        if(error.response){
            setError(error.response.data.message)
        }else{
            setError('an error during login')
        }
        console.log("error durring login",error)
        
      }
    };

  function handleclick(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Login form</h2>
        <label>Email</label>
        <input 
          type="email" 
          name="email"  
          value={email} 
          onChange={handleclick} 
          required 
        />
      </div>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          name="password"  
          value={password} 
          onChange={handleclick} 
          required 
        />
      </div>
      <br></br>
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
