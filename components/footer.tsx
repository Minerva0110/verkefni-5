
import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#333", color: "#fff", padding: "1rem", textAlign: "center", marginTop: "2rem" }}>
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;