import styles from "../../../styles/styles.module.css";
export default function ParallaxSection() {
  return (
    <div className={styles.parallax}>
      <div className={styles.parallaxContent}>
        <h1 style={{ fontSize: "100px", fontWeight: "900" }}>
          Explore With Us
        </h1>
      </div>
    </div>
  );
}
