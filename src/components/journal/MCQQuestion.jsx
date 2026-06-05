const MCQQuestion = ({
  question,
  value,
  onChange
}) => {

  return (

    <div className="card mb-3 shadow-sm">

      <div className="card-body">

        <h5>
          {question.question}
        </h5>

        {
          question.options.map(
            option => (

              <div
                key={option}
                className="form-check mt-2"
              >

                <input
                  className="form-check-input"
                  type="radio"
                  name={question._id}
                  checked={
                    value === option
                  }
                  onChange={() =>
                    onChange(
                      question._id,
                      option
                    )
                  }
                />

                <label
                  className="form-check-label"
                >
                  {option}
                </label>

              </div>

            )
          )
        }

      </div>

    </div>

  );
};

export default MCQQuestion;