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

  const [
    journals,
    setJournals
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

    loadJournals();

  }, []);

  const loadJournals =
    async () => {

      try {

        const res =
          await getCurrentJournal();

        setJournals(
          res.data || []
        );

      } catch {

        setJournals([]);

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (

      <>
        <Navbar />

        <div className="container mt-5">
          <h3>Loading...</h3>
        </div>
      </>

    );
  }

  return (

    <>
      <Navbar />

      <div className="container mt-5">

        <h2>
          Make Your Journal
        </h2>

        {
          journals.length === 0 ?

          (

            <div
              className="alert alert-warning mt-4"
            >
              No Journal Available Today
            </div>

          )

          :

          (

            journals.map(
              journal => (

                <div
                  key={journal._id}
                  className="card shadow mt-4"
                >

                  <div
                    className="card-body"
                  >

                    <h4>
                      {journal.journal_name}
                    </h4>

                    <p>
                      Date:
                      {" "}
                      {journal.journal_date}
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
            )

          )
        }

      </div>

    </>
  );
};

export default JournalHome;