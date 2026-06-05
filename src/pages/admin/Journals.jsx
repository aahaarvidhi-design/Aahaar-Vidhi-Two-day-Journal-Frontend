import { useEffect, useState } from "react";

import AdminSidebar
from "../../components/common/AdminSidebar";

import {
  getJournals,
  createJournal
} from "../../api/adminApi";

const Journals = () => {

  const [journals,setJournals] =
    useState([]);

  const [form,setForm] =
    useState({
      journal_name:"",
      journal_date:""
    });

  useEffect(() => {

    loadJournals();

  }, []);

  const loadJournals =
    async () => {

      const res =
        await getJournals();

      setJournals(
        res.data
      );
    };

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
        e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      await createJournal(
        form
      );

      setForm({
        journal_name:"",
        journal_date:""
      });

      loadJournals();
    };

  return (

    <div className="container-fluid">

      <div className="row">

        <div className="col-md-2">
          <AdminSidebar />
        </div>

        <div className="col-md-10">

          <h2 className="mt-3">
            Journals
          </h2>

          <div className="card">

            <div className="card-body">

              <form
                onSubmit={
                  handleSubmit
                }
              >

                <div className="row">

                  <div className="col-md-5">

                    <input
                      className="form-control"
                      name="journal_name"
                      placeholder="Journal Name"
                      value={
                        form.journal_name
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      type="date"
                      className="form-control"
                      name="journal_date"
                      value={
                        form.journal_date
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-3">

                    <button
                      className="btn btn-success w-100"
                    >
                      Create Journal
                    </button>

                  </div>

                </div>

              </form>

            </div>

          </div>

          <div className="card mt-4">

            <div className="card-body">

              <table className="table">

                <thead>

                  <tr>

                    <th>Name</th>
                    <th>Date</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    journals.map(
                      journal => (

                        <tr
                          key={
                            journal._id
                          }
                        >

                          <td>
                            {
                              journal.journal_name
                            }
                          </td>

                          <td>
                            {
                              journal.journal_date
                            }
                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Journals;