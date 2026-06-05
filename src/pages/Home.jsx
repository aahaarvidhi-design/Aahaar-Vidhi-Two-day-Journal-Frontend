import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import BottomNavigation from "../components/common/BottomNavigation";

import { getLatestAssessment } from "../api/assessmentApi";
import { getCurrentJournal } from "../api/journalApi";

const Home = () => {

  const navigate = useNavigate();

  const [assessment, setAssessment] =
    useState(null);

  const [journal, setJournal] =
    useState(null);

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

      const assessmentRes =
        await getLatestAssessment();

      setAssessment(
        assessmentRes.data
      );

    } catch {}

    try {

      const journalRes =
        await getCurrentJournal();

      setJournal(
        journalRes.data
      );

    } catch {}
  };

  return (

    <>
      <Navbar />

      <div
        className="container py-3"
        style={{
          paddingBottom: "80px"
        }}
      >

        <h3>
          Hello 👋
        </h3>

        <div className="card mt-3 shadow-sm">

          <div className="card-body">

            <h5>
              Body Constitution
            </h5>

            {

              assessment ?

              <>

                <p>
                  Primary:
                  {" "}
                  {assessment.primary}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/result")
                  }
                >
                  View Result
                </button>

              </>

              :

              <button
                className="btn btn-success"
                onClick={() =>
                  navigate("/assessment")
                }
              >
                Start Assessment
              </button>

            }

          </div>

        </div>

        <div className="card mt-3 shadow-sm">

          <div className="card-body">

            <h5>
              Today's Journal
            </h5>

            {

              journal ?

              <>

                <p>
                  {
                    journal.journal_name
                  }
                </p>

                <button
                  className="btn btn-warning"
                  onClick={() =>
                    navigate(
                      `/journal/questions/${journal._id}`
                    )
                  }
                >
                  Start Journal
                </button>

              </>

              :

              <p>
                No Journal Available
              </p>

            }

          </div>

        </div>

      </div>

      <BottomNavigation />

    </>
  );
};

export default Home;