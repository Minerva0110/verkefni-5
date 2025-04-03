import { client } from "../../lib/datocms";
import { GET_ALL_FRETTIR } from "../../lib/queries";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer";

interface Frett {
  id: string;
  slug: string;
  title: string;
  description: string;
  hofundur: string;
  date: string;
  image?: {
    url: string;
    alt?: string;
  };
}

interface FrettirData {
  allNews: Frett[];
}

export default async function FrettirPage() {
  const data = await client.request<FrettirData>(GET_ALL_FRETTIR);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Fréttir</h1>
      <div style={{ display: "grid", gap: "2rem" }}>
        {data.allNews.map((frett) => (
          <div key={frett.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <h2>
              <Link href={`/frettir/${frett.slug}`}>{frett.title}</Link>
            </h2>
            <p>{frett.description}</p>
            <p><strong>Höfundur:</strong> {frett.hofundur}</p>
            <p><strong>Dagsetning:</strong> {new Date(frett.date).toLocaleDateString("is-IS")}</p>
            {frett.image && (
              <Image
                src={frett.image.url}
                alt={frett.image.alt || frett.title}
                width={600}
                height={400}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
