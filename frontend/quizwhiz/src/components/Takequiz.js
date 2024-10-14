import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

function Takequiz() {
  const [diff, setdiff] = useState("");
  const [category, setCategory] = useState("");
  const [rndm,setrndm] = useState(0);
  
    const navigate = useNavigate();
  // Handler for category select
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Handler for diff select
  const handlediffChange = (event) => {
    setdiff(event.target.value);
  };


  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/Quizqn',{
        state:{category,diff}
    })
    console.log("Category:", category);
    console.log("diff:", diff);
   

  };
  function handleRandom(){
    setdiff("");
    setCategory("");
    navigate('/Quizqn',{
        state:{category,diff}
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select id="category" onChange={handleCategoryChange} value={category}>
          <option value="Linux">Linux</option>
          <option value="DevOps">DevOps</option>
          <option value="BASH">BASH</option>
          <option value="PHP">PHP</option>
          <option value="HTML">HTML</option>
          <option value="Docker">Docker</option>
          <option value="MySQL">MySQL</option>
          <option value="WordPress">WordPress</option>
          <option value="Kubernetes">Kubernetes</option>
          <option value="Laravel">Laravel</option>
          <option value="JavaScript">JavaScript</option>
        </select>

        <select onChange={handlediffChange} value={diff}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

       

      <button type="submit">Take Quiz</button> 
      </form>

      <button onClick={handleRandom}>Random Quiz</button>
    </div>
  );
}

export default Takequiz
