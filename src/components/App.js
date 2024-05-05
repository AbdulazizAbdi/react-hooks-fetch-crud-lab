import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(questionData => setQuestions(questionData))
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
    console.log(questions)
  }

  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    
    });

    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} onAddQuestion={handleAddQuestion} onUpdateQuestion={handleUpdateQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion}/>}
    </main>
  );
}

export default App;
