import axios from 'axios';
import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
      await axios.post("http://localhost:5000/Signup", data);
      console.log("Signup successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setDob("");
      setErrorMsg("");
    } catch (error) {
      if (error.response) {
        console.error("Error during signup:", error.response.data);
        setErrorMsg(error.response.data);
      } else {
        console.error("Error during signup:", error);
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

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        <input type="submit" />
      </form>
    </div>
  );
}

export default Signup;
