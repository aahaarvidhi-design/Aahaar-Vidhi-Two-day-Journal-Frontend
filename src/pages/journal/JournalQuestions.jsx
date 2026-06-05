import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import Navbar from "../../components/common/Navbar";

import MCQQuestion from "../../components/journal/MCQQuestion";

import {
  getJournalQuestions,
  submitJournal
} from "../../api/journalApi";

const JournalQuestions = () => {

  const { journalId } =
    useParams();

  const navigate =
    useNavigate();

  const [
    questions,
    setQuestions
  ] = useState([]);

  const [
    answers,
    setAnswers
  ] = useState({});

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

      const res =
        await getJournalQuestions(
          journalId
        );

      setQuestions(
        res.data
      );
    };

  const handleAnswer =
    (
      questionId,
      answer
    ) => {

      setAnswers({
        ...answers,
        [questionId]: answer
      });
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

      const responses =
        Object.keys(answers)
          .map(key => ({
            question_id: key,
            answer: answers[key]
          }));

      try {

        await submitJournal({
          journal_id: journalId,
          responses
        });

        alert(
          "Journal Submitted Successfully"
        );

        navigate(
          "/journal/history"
        );

      } catch {

        alert(
          "Submission Failed"
        );
      }
    };

  return (

    <>
      <Navbar />

      <div
        className="container mt-4"
        style={{
          paddingBottom: "100px"
        }}
      >

        <h2>
          Journal Questions
        </h2>

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

            {
              questions.length > 0 &&

              <MCQQuestion
                question={
                  questions[
                    currentQuestion
                  ]
                }
                value={
                  answers[
                    questions[
                      currentQuestion
                    ]?._id
                  ]
                }
                onChange={
                  handleAnswer
                }
              />
            }

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

              <MCQQuestion
                key={
                  question._id
                }
                question={
                  question
                }
                value={
                  answers[
                    question._id
                  ]
                }
                onChange={
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
          Submit Journal
        </button>

      </div>

    </>
  );
};

export default JournalQuestions;