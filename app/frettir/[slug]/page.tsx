// app/frettir/[slug]/page.tsx
import { client } from "../../../lib/datocms";
import { GET_SINGLE_FRETT } from "../../../lib/queries";
import { StructuredText } from "react-datocms";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Frett {
  title: string;
  hofundur: string;
  date: string;
  content: {
    value: any;
  };
  image?: {
    url: string;
    alt?: string;
  };
}

interface SingleFrettResponse {
  news: Frett;
}

interface Props {
  params: { slug: string };
}

export default async function FrettPage({ params }: Props) {
  const { slug } = params;

  const data = await client.request<SingleFrettResponse>(GET_SINGLE_FRETT, { slug });

  if (!data?.news) return notFound();

  const frett = data.news;

  return (
    <main style={{ padding: "2rem" }}>
      <h2>{frett.title}</h2>
      <p><strong>Höfundur:</strong> {frett.hofundur}</p>
      <p><strong>Dagsetning:</strong> {new Date(frett.date).toLocaleDateString("is-IS")}</p>

      {frett.image?.url && (
        <div className="imageWrapper">
          <Image
            src={frett.image.url}
            alt={frett.image.alt || frett.title}
            width={800}
            height={500}
          />
        </div>
      )}

      <div className="content">
        <StructuredText data={frett.content} />
      </div>
      
      <div className="back-button-wrapper">
        <Link href="/frettir">
          <button className="back-button">Aftur á forsíðu</button>
        </Link>
      </div>
    </main>
  );
}
