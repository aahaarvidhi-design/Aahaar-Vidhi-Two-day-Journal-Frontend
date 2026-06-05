import {
  Link
} from "react-router-dom";

const AdminSidebar = () => {

  return (

    <div
      className="bg-dark text-white p-3"
      style={{
        minHeight:"100vh"
      }}
    >

      <h4>
        Admin Panel
      </h4>

      <hr />

      <div className="d-grid gap-2">

        <Link
          className="btn btn-outline-light"
          to="/admin/dashboard"
        >
          Dashboard
        </Link>

        <Link
          className="btn btn-outline-light"
          to="/admin/questions"
        >
          Questions
        </Link>

        <Link
          className="btn btn-outline-light"
          to="/admin/journals"
        >
          Journals
        </Link>

        <Link
          className="btn btn-outline-light"
          to="/admin/users"
        >
          Users
        </Link>

        <Link
          className="btn btn-outline-light"
          to="/admin/reports"
        >
          Reports
        </Link>

        <Link
        className="btn btn-outline-light"
        to="/admin/study-responses"
        >
        Study Responses
        </Link>

      </div>

    </div>
  );
};

export default AdminSidebar;