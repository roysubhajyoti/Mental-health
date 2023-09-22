import { useState } from "react";
import "./Question.css";
import option1 from "./option1.jpg";
import option2 from "./option2.jpg";

const questions = [
  {
    question: "What should I do?",
    response: 1,
    answerimage: "riimage002",
  },
];
export default function Questionaire({ setstart }) {
  const [ans, selectans] = useState(-1);
  const [select, press] = useState(0);
  return (
    <div>
      <h2>
        Answer the following question by clicking on the appropriate image.
      </h2>
      <div className="riitem">
        <span> {questions[0].question}</span>
      </div>
      <table className="table riactivity" style={{ width: "100%" }}>
        <tr>
          <td
            className="td1"
            onClick={() => {
              selectans(0);
              press(1);
            }}
          >
            <div
              style={{
                background: `url(${option1})`,
                height: "420px",
                width: "700px",
              }}
            />
          </td>
          <td
            className="td2"
            onClick={() => {
              selectans(1);
              press(1);
            }}
          >
            <div
              style={{
                background: `url(${option2})`,
                height: "420px",
                width: "700px",
              }}
            />
          </td>
        </tr>
      </table>
      {console.log(select === 1 && ans === questions[0].response)}
      {select === 1 && ans === questions[0].response && (
        <div className="ricorrect">Yor answer is correct</div>
      )}
      {select === 1 && ans !== questions[0].response && (
        <div className="riincorrect">
          Your answer is wrong. Please select the correct answer.
        </div>
      )}
      {select === 1 && ans === questions[0].response && (
        <button className="ctax" onClick={() => setstart("finish")}>
          Continue
        </button>
      )}
    </div>
  );
}
