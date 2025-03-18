import React from "react";

export default function RegisterPage() {
  return (
    <div>
      <h1>Nýskráning</h1>
      <p>Hér getur þú búið til nýjan aðgang.</p>
      <form>
        <input type="text" placeholder="Notandanafn" required />
        <input type="password" placeholder="Lykilorð" required />
        <button type="submit">Stofna aðgang</button>
      </form>
    </div>
  );
}
