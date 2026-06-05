import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar
from "../../components/common/Navbar";

import {
  getCurrentJournal
} from "../../api/journalApi";

const JournalHome = () => {

  const navigate =
    useNavigate();

  const [journal,setJournal] =
    useState(null);

  const [loading,setLoading] =
    useState(true);

  useEffect(() => {

    loadJournal();

  }, []);

  const loadJournal =
    async () => {

      try {

        const res =
          await getCurrentJournal();

        setJournal(
          res.data
        );

      } catch {

        setJournal(null);

      } finally {

        setLoading(false);
      }
    };

  if (loading)
    return <h3>Loading...</h3>;

  return (

    <>
      <Navbar />

      <div className="container mt-5">

        <h2>
          Make Your Journal
        </h2>

        {
          !journal ?

          (

            <div
              className="alert alert-warning mt-4"
            >
              No Journal Available Today
            </div>

          )

          :

          (

            <div
              className="card shadow mt-4"
            >

              <div
                className="card-body"
              >

                <h3>
                  {
                    journal.journal_name
                  }
                </h3>

                <p>
                  Date:
                  {" "}
                  {
                    journal.journal_date
                  }
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(
                      `/journal/questions/${journal._id}`
                    )
                  }
                >
                  Start Journal
                </button>

              </div>

            </div>

          )
        }

      </div>

    </>
  );
};

export default JournalHome;