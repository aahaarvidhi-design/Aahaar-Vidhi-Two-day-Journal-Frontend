import {
  useEffect,
  useState
} from "react";

import Navbar
from "../../components/common/Navbar";

import {
  getJournalHistory
} from "../../api/journalApi";

const JournalHistory =
() => {

  const [
    records,
    setRecords
  ] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory =
    async () => {

      const res =
        await getJournalHistory();

      setRecords(
        res.data
      );
    };

  return (

    <>
      <Navbar />

      <div className="container mt-4">

        <h2>
          Journal History
        </h2>

        {
          records.map(
            record => (

              <div
                key={record._id}
                className="card mb-3"
              >

                <div
                  className="card-body"
                >

                  <h5>
                    Journal:
                    {" "}
                    {
                      record.journal_id
                    }
                  </h5>

                  <p>
                    Submitted:
                    {" "}
                    {
                      new Date(
                        record.submitted_at
                      ).toLocaleString()
                    }
                  </p>

                </div>

              </div>

            )
          )
        }

      </div>

    </>
  );
};

export default JournalHistory;