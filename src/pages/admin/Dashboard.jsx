import {
  useEffect,
  useState
} from "react";

import AdminSidebar
from "../../components/common/AdminSidebar";

import {
  getDashboard
} from "../../api/adminApi";

const Dashboard = () => {

  const [
    stats,
    setStats
  ] = useState(null);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      const res =
        await getDashboard();

      setStats(
        res.data
      );
    };

  if (!stats)
    return <h3>Loading...</h3>;

  return (

    <div className="container-fluid">

      <div className="row">

        <div className="col-md-2">
          <AdminSidebar />
        </div>

        <div className="col-md-10">

          <h2 className="mt-3">
            Dashboard
          </h2>

          <div className="row mt-4">

            <div className="col-md-4">

              <div className="card">

                <div className="card-body">

                  <h4>
                    Users
                  </h4>

                  <h2>
                    {
                      stats.total_users
                    }
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card">

                <div className="card-body">

                  <h4>
                    Assessments
                  </h4>

                  <h2>
                    {
                      stats.total_assessments
                    }
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card">

                <div className="card-body">

                  <h4>
                    Journals
                  </h4>

                  <h2>
                    {
                      stats.total_journal_entries
                    }
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

export default Dashboard;