import Children from "./Childrensec";
import Parents from "./Parents";
import styles from "./AppLayout.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Applayout({ data, cdata, username }) {
  function merge() {
    const ar = [username, ...data, ...cdata];
    console.log(ar);
    return ar;
  }
  const convertObjToDesiredStructure = (inputArray) => {
    const obj1 = {
      Username: inputArray[0],
      "Attentive Score": inputArray[2],
      "Hyperactivity Score": inputArray[3],
    };

    const gameIndex1 = inputArray[4];
    const gameIndex2 = inputArray[7];

    if (gameIndex1 === 1) {
      obj1["Game1 tries"] = inputArray[5];
      obj1["Game1 time"] = inputArray[6];
    } else if (gameIndex2 === 1) {
      obj1["Game1 tries"] = inputArray[8];
      obj1["Game1 time"] = inputArray[9];
    }

    if (gameIndex1 === 2) {
      obj1["Game2 tries"] = inputArray[5];
      obj1["Game2 time"] = inputArray[6];
    } else if (gameIndex2 === 2) {
      obj1["Game2 tries"] = inputArray[8];
      obj1["Game2 time"] = inputArray[9];
    }
    obj1["ADHD of blood relative?"] = inputArray[1];
    return obj1;
  };
  const sendObjToServer = () => {
    const obj = merge();
    const obj1 = convertObjToDesiredStructure(obj);

    axios
      .post("http://localhost:5000/send_obj_to_server", obj1)
      .then((response) => {
        // Handle the response from the server, if needed
        console.log("React prediction received is: ", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.app}>
      {data.length === 0 && <Parents />}
      {cdata.length === 0 && <Children />}
      {data.length !== 0 && cdata.length !== 0 && (
        <div
          style={{
            height: "100vh",
            width: "100%",

            textAlign: "center",
          }}
        >
          <h1 style={{ color: "black" }}>Thank you</h1>
          <button
            style={{
              backgroundColor: "var(--color-brand--2)",
              color: "var(--color-dark--1)",
              textTransform: "uppercase",
              textDecoration: "none",
              fontSize: "1.6rem",
              fontWeight: "600",
              padding: "1rem 3rem",
              borderRradius: "5px",
              width: "100px",
            }}
            onClick={() => sendObjToServer()}
          >
            <Link to="/">Go back</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Applayout;
