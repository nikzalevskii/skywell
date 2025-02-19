import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p>Загрузка...</p>
      </div>
    </div>
  );
};

export default Loader;
