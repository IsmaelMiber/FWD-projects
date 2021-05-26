import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./Redux/Actions";
import Navbar from "./Components/Navbar";
import Spinner from "react-bootstrap/Spinner";

export default function Root({ children }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    dispatch(getData);
  }, []);

  return (
    <div
      className={`d-flex flex-column ${
        loading ? "justify-content-center align-items-center" : ""
      }`}
      id="root-comp"
    >
      <Navbar />
      {loading ? <Spinner animation="border" role="status" /> : children}
    </div>
  );
}
