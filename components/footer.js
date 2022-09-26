import { Link } from "@mui/material";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Created by{" "}
      <Link
        href="https://twitter.com/qeesig"
        target="_blank"
        sx={{
          color: "white",
          textDecoration: "underline",
        }}
      >
        @qeesig
      </Link>
    </footer>
  );
}
