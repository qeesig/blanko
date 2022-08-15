import { Link } from "@mui/material";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Made by{" "}
      <Link
        href="https://twitter.com/qeesig"
        target="_blank"
        sx={{
          color: "#4a9ff4",
          fontWeight: "bold",
          textDecoration: "none",
          "&:hover": { color: "#81c0ff" },
        }}
      >
        qeesig
      </Link>{" "}
      🦇
    </footer>
  );
}
