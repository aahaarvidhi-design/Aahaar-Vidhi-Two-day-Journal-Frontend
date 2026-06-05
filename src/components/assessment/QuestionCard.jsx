const QuestionCard = ({
  question,
  answer,
  onAnswer
}) => {

  return (

    <div className="card shadow-sm mb-3">

      <div className="card-body">

        <h5>
          {question.question_no}.
          {" "}
          {question.question}
        </h5>

        <div className="mt-3">

          <button
            className={
              answer === 1
              ? "btn btn-success me-2"
              : "btn btn-outline-success me-2"
            }
            onClick={() =>
              onAnswer(
                question.question_no,
                1
              )
            }
          >
            Yes
          </button>

          <button
            className={
              answer === 0
              ? "btn btn-danger"
              : "btn btn-outline-danger"
            }
            onClick={() =>
              onAnswer(
                question.question_no,
                0
              )
            }
          >
            No
          </button>

        </div>

      </div>

    </div>

  );
};

export default QuestionCard;