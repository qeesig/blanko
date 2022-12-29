import { Link } from "@mui/material";
import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        Created by{" "}
        <Link
          href="https://twitter.com/qeesig"
          target="_blank"
          rel="noopener noreferrer"
        >
          @qeesig
        </Link>
      </div>
    </footer>
  );
}
