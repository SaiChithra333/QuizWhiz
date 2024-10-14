import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Quizqn() {
    const [questions, setQuestions] = useState([]); 
    const [qn,setQn] = useState("");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
    const [options, setOptions] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [correctAns, setCorrectAns] = useState([]);
    const [explanation, setExplanation] = useState("");
    const [multipleQn, setMultipleQn] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [submitMsg, setSubmitMsg] = useState("");
    const [idx,setindex] = useState(1);
    const [Category,setCategory] = useState("");
    const location = useLocation();
    const {category,diff,rndm} = location.state || {};

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=rszEihblE2D3klAf3T9eqImShGQxDGvP0bP6q8WX&difficulty=${diff}&tags=${category}`);
            console.log(response.data);
            setQuestions(response.data); 
            loadQuestion(0); 
        } catch (error) {
            console.error('Error fetching the quiz questions:', error);
        }
    }

    // Load a question based on the index
    const loadQuestion = (index) => {
        const data = questions[index];
        setQn(data.question);

        const optionsArray = Object.entries(data.answers).filter(([key, value]) => value !== null);
        setOptions(optionsArray);

        const correctAnswersArray = Object.entries(data.correct_answers)
            .filter(([key, value]) => value === "true")
            .map(([key]) => key.replace("_correct", ""));
        setCorrectAns(correctAnswersArray);

        setMultipleQn(data.multiple_correct_answers === "true");
        setDifficulty(data.difficulty);
        setExplanation(data.explanation || "");
        setCategory(data.category);
        setSelectedOptions([]); // Reset selected options for the new question
        setSubmitMsg(""); // Reset the submit message for the new question
        setShowAnswer(false); // Hide the answer for the new question
    };

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;

        if (multipleQn) {
            if (checked) {
                setSelectedOptions((prev) => [...prev, value]);
            } else {
                setSelectedOptions((prev) => prev.filter((option) => option !== value));
            }
        } else {
            setSelectedOptions([value]);
        }
    };

    const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((value) => arr2.includes(value));
    };

    const submitAnswer = () => {
        if (arraysEqual(correctAns, selectedOptions)) {
            setSubmitMsg("Correct Answer! See explanation below.");
        } else {
            setSubmitMsg("Wrong Answer. Try again!");
        }
    };

    const handleNextQuestion = () => {
        const nextIndex = currentQuestionIndex + 1;
        setindex(nextIndex);

        // If there are more questions, load the next one
        if (nextIndex < questions.length) {
            setCurrentQuestionIndex(nextIndex);
            loadQuestion(nextIndex);
        } else {
            setSubmitMsg("You've reached the end of the quiz.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Start Quiz</button>
            </form>

            {questions.length > 0 && qn && (
                <div>
                    {multipleQn && <p>This is a multichoice question</p>}
                    <p>Difficulty: {difficulty}</p>
                  {Category && (
                    <p>Category: {Category}</p>
                  )
                  }  
                    <h2>Q{idx}: {qn}</h2>
                    <ul>
                        {options.map(([key, value]) => (
                             <li key={key} style={{ listStyleType: "none" }}>
                                <label>
                                    <input
                                        type={multipleQn ? "checkbox" : "radio"}
                                        name="options"
                                        value={key}
                                        onChange={handleOptionChange}
                                        checked={selectedOptions.includes(key)}
                                    />
                                    {value}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={submitAnswer}>Submit</button>
                    <button onClick={() => setShowAnswer(!showAnswer)}>
                        {showAnswer ? "Hide answer" : "Show answer"}
                    </button>

                    <p>{submitMsg}</p>

                    {showAnswer && (
                        <div>
                            <p>Correct Answers: {correctAns.join(", ")}</p>
                            <p>Explanation: {explanation}</p>
                        </div>
                    )}

                    <button onClick={handleNextQuestion} disabled={currentQuestionIndex >= questions.length - 1 }>
                        Next Question
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quizqn;
