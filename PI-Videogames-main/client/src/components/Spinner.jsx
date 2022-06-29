import logo from "../imagen/LoadingVG2.gif";
import styles from "./Spinner.module.css";
export default function Spinner() {
  return (
    <div className={styles.cntr}>
      <img src={logo} alt="Loading" />
    </div>
  );
}
