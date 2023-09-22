import { useState } from "react";
import "./Gameapp.css";
// import { useNavigate } from "react-router-dom";
function Gameinterface({
  setcount,
  setstart,
  info,
  setcdata,
  update,
  ar,
  setpc,
  setx,
}) {
  const [change1, handlechange1] = useState(false);
  const [change2, handlechange2] = useState(false);

  // const nav = useNavigate();
  if (info.length === 6) setstart("end");
  return (
    <>
      <div className="interface">
        {ar[0] === true && (
          <div
            className={`sidebar ${change1 && `select`}`}
            onClick={() => {
              setcount(1);
              update((ar) => [...ar, (ar[0] = false)]);
            }}
            onMouseOver={() => handlechange1(true)}
            onMouseLeave={() => handlechange1(false)}
          >
            <div className="par">
              <h1>Game 1</h1>
              <h3>
                Rearrange the pieces to form an approriate figure.
                <br />
                Try to use minimum number of steps and be fast!!
                <br />
              </h3>
            </div>
          </div>
        )}
        {ar[1] === true && (
          <div
            className={`side ${change2 && `select`}`}
            onClick={() => {
              setcount(2);
              update((ar) => [...ar, (ar[1] = false)]);
            }}
            onMouseOver={() => handlechange2(true)}
            onMouseLeave={() => handlechange2(false)}
          >
            <div className="par">
              <h1>Game 2</h1>
              <h3>
                Try to remember the cards which u picked to match the other ones
                <br />
                Focus on the game!!
                <br />
              </h3>
            </div>
          </div>
        )}
      </div>
      <button
        style={{ marginTop: "30px" }}
        className="ctax"
        onClick={() => {
          setcdata([...info]);
          setpc(1);
          setstart("ready");
          setx(10);
        }}
      >
        Go back
      </button>
    </>
  );
}
export default Gameinterface;
