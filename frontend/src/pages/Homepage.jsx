import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import Pagenav from "./PageNav";
export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <Pagenav />
      <section>
        <h1>
          You love your child.
          <br />
          We will help you.
        </h1>
        <h2>ADHD bhagao.Jai Hind!!</h2>
        <button>
          <Link to="/login" className="cta">
            Start now
          </Link>
        </button>
      </section>
    </main>
  );
}
