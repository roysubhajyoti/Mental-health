import "./index.css";
import { motion } from "framer-motion";
function Start({ setstart }) {
  return (
    <div
      className="design "
      onClick={() => {
        setstart("ready");
      }}
      // style={{
      //   background:
      //     "url(watercolor-children-s-day-spanish-background_23-2149341654.png)",
      // }}
    >
      <motion.div
        className="startpanda"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      ></motion.div>
      <h1 style={{ color: "black" }}>
        hello I am a panda.
        <br /> Today i will be your guide .
      </h1>
      <h2
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        style={{ color: "black" }}
      >
        Click Anywhere to Start
      </h2>
    </div>
  );
}
export default Start;
