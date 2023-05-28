import { Link } from "react-router-dom";

const NoRoute = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>
        Oops! Looks like you've stumbled upon a missing page. The page you are
        looking for may have been moved, renamed, or is temporarily unavailable.
        Return to the{" "}
        <Link to="/" style={{ marginTop: "20px" }}>
          homepage
        </Link>{" "}
        and navigate from there.
      </p>
    </div>
  );
};

export default NoRoute;
