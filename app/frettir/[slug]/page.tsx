import { client } from "../../../lib/datocms";
import { GET_SINGLE_FRETT } from "../../../lib/queries";
import { StructuredText } from "react-datocms";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

interface SingleFrettResponse {
    news: {
      id: string;
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
    };
  }  

export default async function FrettPage({ params }: Props) {
  const { slug } = params;

  const data = await client.request<SingleFrettResponse>(GET_SINGLE_FRETT, { slug });

  if (!data?.news) return notFound();

  const frett = data.news;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{frett.title}</h1>
      <p><strong>Höfundur:</strong> {frett.hofundur}</p>
      <p><strong>Dagsetning:</strong> {new Date(frett.date).toLocaleDateString("is-IS")}</p>

      {frett.image?.url && (
        <Image
          src={frett.image.url}
          alt={frett.image.alt || frett.title}
          width={800}
          height={500}
        />
      )}

      <div style={{ marginTop: "2rem" }}>
        <StructuredText data={frett.content} />
      </div>
    </main>
  );
}
