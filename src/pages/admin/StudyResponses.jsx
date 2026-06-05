import {
  useEffect,
  useState
} from "react";

import AdminSidebar
from "../../components/common/AdminSidebar";

import {
  getStudyResponses
} from "../../api/adminApi";

const StudyResponses = () => {

  const [data,setData] =
    useState([]);

  useEffect(() => {

    loadResponses();

  }, []);

  const loadResponses =
    async () => {

      const res =
        await getStudyResponses();

      setData(
        res.data
      );
    };

  return (

    <div className="container-fluid">

      <div className="row">

        <div className="col-md-2">
          <AdminSidebar />
        </div>

        <div className="col-md-10">

          <h2 className="mt-3">
            Study Responses
          </h2>

          <table
            className="table table-bordered mt-4"
          >

            <thead>

              <tr>

                <th>Name</th>

                <th>Email</th>

                <th>Primary Constitution</th>

                <th>Secondary Constitution</th>

                <th>Journal Entries</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {
                data.map(
                  item => (

                    <tr
                      key={
                        item.user._id
                      }
                    >

                      <td>
                        {
                          item.user.name
                        }
                      </td>

                      <td>
                        {
                          item.user.email
                        }
                      </td>

                      <td>
                        {
                          item.assessment?.primary ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          item.assessment?.secondary ||
                          "-"
                        }
                      </td>

                      <td>
                        {
                          item.journal_count
                        }
                      </td>

                      <td>

                        {
                          item.journal_count >= 2 ?

                          (
                            <span
                              className="badge bg-success"
                            >
                              Completed
                            </span>
                          )

                          :

                          (
                            <span
                              className="badge bg-warning"
                            >
                              Pending
                            </span>
                          )
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
  );
};

export default StudyResponses;