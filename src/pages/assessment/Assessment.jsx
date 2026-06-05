import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getQuestions,
  submitAssessment
} from "../../api/assessmentApi";

import QuestionCard from "../../components/assessment/QuestionCard";
import Navbar from "../../components/common/Navbar";

const Assessment = () => {

  const navigate = useNavigate();

  const [questions, setQuestions] =
    useState([]);

  const [answers, setAnswers] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [
    currentQuestion,
    setCurrentQuestion
  ] = useState(0);

  const isMobile =
    window.innerWidth < 768;

  useEffect(() => {

    fetchQuestions();

  }, []);

  const fetchQuestions =
    async () => {

      try {

        const res =
          await getQuestions();

        setQuestions(res.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }
    };

  const handleAnswer =
    (questionNo, value) => {

      const updatedAnswers = {
        ...answers,
        [questionNo]: value
      };

      setAnswers(updatedAnswers);

      localStorage.setItem(
        "assessment_answers",
        JSON.stringify(updatedAnswers)
      );
    };

  const handleSubmit =
    async () => {

      if (
        Object.keys(answers).length !==
        questions.length
      ) {

        alert(
          "Please answer all questions"
        );

        return;
      }

      const orderedAnswers =
        questions.map(
          q =>
            answers[q.question_no]
        );

      try {

        const res =
          await submitAssessment(
            orderedAnswers
          );

        localStorage.setItem(
          "assessmentResult",
          JSON.stringify(res.data)
        );

        navigate("/result");

      } catch {

        alert(
          "Failed to submit assessment"
        );

      }
    };

  if (loading) {

    return (
      <h3 className="m-5">
        Loading...
      </h3>
    );
  }

  const progress =
    (
      Object.keys(answers).length /
      questions.length
    ) * 100;

  return (

    <>
      <Navbar />

      <div
        className="container mt-4"
        style={{
          paddingBottom: "100px"
        }}
      >

        <h2 className="mb-4">
          Know Your Body Constitution
        </h2>

        <div className="progress mb-4">

          <div
            className="progress-bar"
            style={{
              width: `${progress}%`
            }}
          >
            {Math.round(progress)}%
          </div>

        </div>

        {isMobile ? (

          <>
            <h5 className="mb-3">

              Question

              {" "}

              {currentQuestion + 1}

              {" "}

              of

              {" "}

              {questions.length}

            </h5>

            <QuestionCard
              question={
                questions[currentQuestion]
              }
              answer={
                answers[
                  questions[
                    currentQuestion
                  ]?.question_no
                ]
              }
              onAnswer={
                handleAnswer
              }
            />

            <div
              className="
              d-flex
              justify-content-between
              mt-4
              "
            >

              <button
                className="btn btn-secondary"
                disabled={
                  currentQuestion === 0
                }
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion - 1
                  )
                }
              >
                Previous
              </button>

              <button
                className="btn btn-primary"
                disabled={
                  currentQuestion ===
                  questions.length - 1
                }
                onClick={() =>
                  setCurrentQuestion(
                    currentQuestion + 1
                  )
                }
              >
                Next
              </button>

            </div>

          </>

        ) : (

          questions.map(
            question => (

              <QuestionCard
                key={
                  question.question_no
                }
                question={
                  question
                }
                answer={
                  answers[
                    question.question_no
                  ]
                }
                onAnswer={
                  handleAnswer
                }
              />

            )
          )

        )}

        <button
          className="btn btn-success w-100 mt-4"
          onClick={handleSubmit}
        >
          Submit Assessment
        </button>

      </div>

    </>
  );
};

export default Assessment;