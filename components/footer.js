import { Box, Link } from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Box sx={{ color: "white", marginTop: "30px", textAlign: "right" }}>
        Made by{" "}
        <Link
          href="https://twitter.com/qeesig"
          target="_blank"
          sx={{
            color: "#c775ff",
            fontWeight: "bold",
            textDecoration: "none",
            "&:hover": { color: "#dba6ff" },
          }}
        >
          qeesig
        </Link>{" "}
        🦇
      </Box>
    </footer>
  );
}
