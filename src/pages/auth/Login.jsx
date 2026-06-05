import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  loginUser
} from "../../api/authApi";

import {
  useAuth
} from "../../context/AuthContext";

const Login = () => {

  const navigate =
    useNavigate();

  const {
    login
  } = useAuth();

  const [form,setForm] =
    useState({
      email:"",
      password:""
    });

  const [error,setError] =
    useState("");

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

      try {

        const res =
          await loginUser(form);

        login(
          res.data.token,
          res.data.role
        );

        if (
          res.data.role ===
          "admin"
        ) {

          navigate(
            "/admin/dashboard"
          );

        } else {

          navigate(
            "/home"
          );
        }

      } catch {

        setError(
          "Invalid credentials"
        );
      }
    };

  return (

    <div className="container">

      <div
        className="row justify-content-center mt-5"
      >

        <div
          className="col-md-5"
        >

          <div
            className="card shadow"
          >

            <div
              className="card-body"
            >

              <h2
                className="text-center mb-4"
              >
                Login
              </h2>

              {error && (

                <div
                  className="alert alert-danger"
                >
                  {error}
                </div>

              )}

              <form
                onSubmit={
                  handleSubmit
                }
              >

                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  onChange={
                    handleChange
                  }
                />

                <input
                  type="password"
                  name="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  onChange={
                    handleChange
                  }
                />

                <button
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

              <p
                className="mt-3 text-center"
              >

                Don't have account?

                <Link
                  to="/register"
                >
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;