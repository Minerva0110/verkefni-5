import "../styles/globals.scss";
import Footer from "../components/footer"; 

export const metadata = {
  title: "Fréttavefur",
  description: "Verkefni 5 í vefforritun",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is">
      <head>

      </head>
      <body>
        {children} 
        <Footer /> 
      </body>
    </html>
  );
}

