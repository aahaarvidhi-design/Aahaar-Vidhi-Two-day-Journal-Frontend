import {
  Link,
  useLocation
} from "react-router-dom";

const BottomNavigation = () => {

  const location =
    useLocation();

  return (

    <div
      className="
      d-md-none
      position-fixed
      bottom-0
      start-0
      end-0
      bg-white
      border-top
      shadow-sm
      "
      style={{
        zIndex: 999
      }}
    >

      <div className="row text-center py-2">

        <div className="col">

          <Link
            to="/home"
            className="text-decoration-none"
          >
            🏠
            <br />
            Home
          </Link>

        </div>

        <div className="col">

          <Link
            to="/assessment"
            className="text-decoration-none"
          >
            🧘
            <br />
            Assessment
          </Link>

        </div>

        <div className="col">

          <Link
            to="/journal"
            className="text-decoration-none"
          >
            📖
            <br />
            Journal
          </Link>

        </div>

      </div>

    </div>

  );
};

export default BottomNavigation;