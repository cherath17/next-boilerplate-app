// PrimeReact
import { ProgressSpinner } from "primereact/progressspinner";

// Styles
import styles from "./GlobalLoader.module.scss";

export const GlobalLoader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderBox}>
        <ProgressSpinner className={styles.spinner} />
      </div>
    </div>
  );
};
