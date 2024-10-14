import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after login

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 
  const navigate = useNavigate(); // For redirecting

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload
  
    // Prepare the data object
    const data = {
      email: email,  // Ensure you're sending the correct field
      password: password,
    };
  
    try {
      // Send the POST request to your server
      const response = await axios.post("http://localhost:5000/login", data);
      
      // Check if login is successful
      if (response.status === 200) {
        console.log("Login successful!");
        // Redirect to a different page after successful login
        navigate("/UserPage"); // Redirecting to dashboard page or any other page
      } 
    } catch (error) {
      setErrorMsg("Invalid email or password");
      console.error("Error during login:", error);
    }
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />

        <label>Email: </label>
        <input 
          type="email" 
          name="username" 
          placeholder="example@gmail.com" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        /><br /><br />

        <label>Password: </label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        /><br /><br />

       {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>} {/* Show error message if login fails */}

        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default Login;
