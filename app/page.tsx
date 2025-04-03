import { client } from "../lib/datocms";
import { GET_FORSIDA } from "../lib/queries";
import { StructuredText } from "react-datocms";
import Link from "next/link";
import "../styles/globals.scss";



interface ForsidaData {
  allHomepages: {
    title: string;
    content: {
      value: string;
    };
  }[];
}

export default async function HomePage() {
    const data = await client.request<ForsidaData>(GET_FORSIDA);
    const forsida = data.allHomepages[0];
  
    return (
        <div>
          <div className="centeredContent">
            <main>
              <h1>{forsida.title}</h1>
              <StructuredText data={forsida.content} />
              <p>
                <Link
                  href="/frettir"
                  className="btn"
                >
                  Skoða fréttir →
                </Link>
              </p>
            </main>
            <div>
            </div>
          </div>
        </div>
    );
  }
  