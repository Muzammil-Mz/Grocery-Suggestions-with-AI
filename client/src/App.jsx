import { response } from "express";
import React from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    console.log("loading...");
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDB9QyZunjlkLP6fZJ170EewGGmGKcsyIE",

      method: "post",
      data: {
        contents: [{ parts: [{ text: "Write a story about ai models" }] }],
      },
    });
    console.log(response);
  }

  return (
    <>
      <h1 className="text-6xl ">ChatBot</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols={50}rows={50}
      ></textarea>
      <button onClick={generateAnswer}>Submit</button>
      <p>{answer}</p>
    </>
  );
};

export default App;
