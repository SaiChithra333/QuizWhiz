import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // State for success message

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    const data = {
      username: username,
      password: password,
      dob: dob,
      email: email
    };

    try {
      const response = await axios.post("http://localhost:5000/register", data);

      // Assuming a successful response means the signup is successful
      if (response.status === 200) {
        console.log("Signup successful!");
        setSuccessMsg("Signup successful!"); // Set success message

        // Clear input fields after successful signup
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDob("");
        setErrorMsg("");  // Clear any error messages
      }
    } catch (error) {
      console.error("Error during signup:", error);

      if (error.response) {
        console.error("Error details:", error.response.data);
        setErrorMsg(error.response.data);
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /><br /><br />

        <label>Email: </label>
        <input
          type="email"
          name="email"
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

        <label>Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        /><br /><br />

        <label>DOB: </label>
        <input
          type="date"
          name="dob"
          value={dob}
          onChange={e => setDob(e.target.value)}
        /><br /><br />

        <Link to="http://localhost:5000/auth/google">Sign Up with Google</Link>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>} {/* Display success message */}

        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
