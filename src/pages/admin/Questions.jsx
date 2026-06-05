import { useEffect, useState } from "react";
import AdminSidebar from "../../components/common/AdminSidebar";

import {
  getQuestions,
  addQuestion,
  deleteQuestion
} from "../../api/adminApi";

const Questions = () => {

  const [questions, setQuestions] = useState([]);

  const [form, setForm] = useState({
    question_no: "",
    question: "",
    group: "Vata"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {

      const res = await getQuestions();

      setQuestions(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addQuestion({
        question_no: Number(form.question_no),
        question: form.question,
        group: form.group
      });

      setForm({
        question_no: "",
        question: "",
        group: "Vata"
      });

      fetchQuestions();

      alert("Question Added");

    } catch (error) {

      alert("Failed to add question");

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this question?"
      );

    if (!confirmDelete) return;

    try {

      await deleteQuestion(id);

      fetchQuestions();

    } catch {

      alert("Delete failed");

    }
  };

  return (

    <div className="container-fluid">

      <div className="row">

        <div className="col-md-2">
          <AdminSidebar />
        </div>

        <div className="col-md-10">

          <h2 className="mt-3">
            Assessment Questions
          </h2>

          <div className="card mt-4">

            <div className="card-body">

              <h4>Add Question</h4>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-2">

                    <input
                      type="number"
                      name="question_no"
                      className="form-control"
                      placeholder="Question No"
                      value={form.question_no}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6">

                    <input
                      type="text"
                      name="question"
                      className="form-control"
                      placeholder="Question"
                      value={form.question}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-2">

                    <select
                      name="group"
                      className="form-control"
                      value={form.group}
                      onChange={handleChange}
                    >

                      <option value="Vata">
                        Vata
                      </option>

                      <option value="Pitta">
                        Pitta
                      </option>

                      <option value="Kapha">
                        Kapha
                      </option>

                    </select>

                  </div>

                  <div className="col-md-2">

                    <button
                      className="btn btn-primary w-100"
                    >
                      Add
                    </button>

                  </div>

                </div>

              </form>

            </div>

          </div>

          <div className="card mt-4">

            <div className="card-body">

              <h4>Questions List</h4>

              {
                loading ?

                <p>Loading...</p>

                :

                <table className="table table-bordered">

                  <thead>

                    <tr>

                      <th>No</th>
                      <th>Question</th>
                      <th>Group</th>
                      <th>Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      questions.map((q) => (

                        <tr key={q._id}>

                          <td>
                            {q.question_no}
                          </td>

                          <td>
                            {q.question}
                          </td>

                          <td>
                            {q.group}
                          </td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDelete(q._id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))
                    }

                  </tbody>

                </table>
              }

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Questions;