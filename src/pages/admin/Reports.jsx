import { useEffect, useState } from "react";

import AdminSidebar
from "../../components/common/AdminSidebar";

import {
  getCompletionReport
} from "../../api/adminApi";

const Reports = () => {

  const [report,setReport] =
    useState(null);

  useEffect(() => {

    loadReport();

  }, []);

  const loadReport =
    async () => {

      const res =
        await getCompletionReport();

      setReport(
        res.data
      );
    };

  if (!report)
    return <h3>Loading...</h3>;

  return (

    <div className="container-fluid">

      <div className="row">

        <div className="col-md-2">
          <AdminSidebar />
        </div>

        <div className="col-md-10">

          <h2 className="mt-3">
            Study Report
          </h2>

          <div className="row mt-4">

            <div className="col-md-4">

              <div className="card">

                <div className="card-body">

                  <h5>
                    Total Users
                  </h5>

                  <h2>
                    {
                      report.total_users
                    }
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card">

                <div className="card-body">

                  <h5>
                    Completed Users
                  </h5>

                  <h2>
                    {
                      report.completed_users
                    }
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card">

                <div className="card-body">

                  <h5>
                    Completion %
                  </h5>

                  <h2>
                    {
                      report.completion_percentage
                    }%
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;