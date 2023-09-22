import "./index.css";

function End({ setcdata, info, setstart, setx, setpc }) {
  return (
    <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "100vh",
      // }}
      className="design"
    >
      <h1
        style={{
          color: "black",
        }}
      >
        Games had been completed successfully.
        <br />
        Please press the back button to go back.
      </h1>
      <button
        style={{ marginTop: "30px" }}
        className="ctax"
        onClick={() => {
          setcdata([...info]);
          setx(10);
          setpc(1);
          setstart("ready");
        }}
      >
        Go back
      </button>
    </div>
  );
}
export default End;
