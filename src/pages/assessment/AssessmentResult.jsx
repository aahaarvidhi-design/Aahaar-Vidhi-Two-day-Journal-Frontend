import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getLatestAssessment
} from "../../api/assessmentApi";


import Navbar
from "../../components/common/Navbar";

const AssessmentResult =
() => {

  const navigate =
    useNavigate();

  const [result,setResult] =
    useState(null);


    useEffect(() => {

    const fetchResult = async () => {

        try {

        const response =
            await getLatestAssessment();

        setResult(
            response.data
        );

        } catch (error) {

        console.error(error);

        }
    };

    fetchResult();

    }, []);

  if (!result) {

    return (
      <h3>
        No Result Found
      </h3>
    );
  }

  return (

    <>
      <Navbar />

      <div
        className="container mt-5"
      >

        <div
          className="card shadow"
        >

          <div
            className="card-body text-center"
          >

            <h2>
              Your Body Constitution
            </h2>

            <hr />

            <h4>
              Primary Constitution
            </h4>

            <h1
              className="text-primary"
            >
              {
                result.primary
              }
            </h1>

            {
              result.secondary &&
              <>
                <h4
                  className="mt-4"
                >
                  Secondary Constitution
                </h4>

                <h2
                  className="text-success"
                >
                  {
                    result.secondary
                  }
                </h2>
              </>
            }

            <hr />

            <div
              className="row"
            >

              <div
                className="col-md-4"
              >
                <h5>
                  Vata
                </h5>

                <h3>
                  {
                    result.vata_score
                  }
                </h3>
              </div>

              <div
                className="col-md-4"
              >
                <h5>
                  Pitta
                </h5>

                <h3>
                  {
                    result.pitta_score
                  }
                </h3>
              </div>

              <div
                className="col-md-4"
              >
                <h5>
                  Kapha
                </h5>

                <h3>
                  {
                    result.kapha_score
                  }
                </h3>
              </div>

            </div>

            <button
              className="btn btn-success mt-4"
              onClick={() =>
                navigate(
                  "/journal"
                )
              }
            >
              Start Journal
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default AssessmentResult;