import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  registerUser
} from "../../api/authApi";

const Register = () => {

  const navigate =
    useNavigate();

  const [form,setForm] =
    useState({

      name:"",
      email:"",
      password:"",

      age:"",
      gender:"",
      phone:"",
      city:""
    });

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

        await registerUser(
          form
        );

        alert(
          "Registration successful"
        );

        navigate(
          "/login"
        );

      } catch {

        alert(
          "Registration failed"
        );
      }
    };

  return (

    <div className="container">

      <div
        className="row justify-content-center mt-4"
      >

        <div
          className="col-md-6"
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
                Register
              </h2>

              <form
                onSubmit={
                  handleSubmit
                }
              >

                <input
                  className="form-control mb-2"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />

                <input
                  type="password"
                  className="form-control mb-2"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  name="gender"
                  placeholder="Gender"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-2"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                />

                <input
                  className="form-control mb-3"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                />

                <button
                  className="btn btn-success w-100"
                >
                  Register
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;