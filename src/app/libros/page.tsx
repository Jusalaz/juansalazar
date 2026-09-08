import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";
import { getPublishedBooks } from "@/lib/data/books";

export const metadata: Metadata = {
  title: "Libros",
  description: "Reseñas y recomendaciones de libros sobre negocio, plata e IA.",
};

export const revalidate = 0;

export default async function LibrosPage() {
  const books = await getPublishedBooks();

  return (
    <>
      <section className="border-b-2 border-ink bg-surface-alt py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Libros"
              title="Lo que voy leyendo"
              description="Reseñas honestas de los libros que más me han ayudado a pensar mejor sobre negocio, plata e IA."
            />
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          {books.length > 0 ? (
            <RevealGroup className="grid gap-6 lg:grid-cols-2">
              {books.map((book) => (
                <RevealItem key={book.slug}>
                  <BookCard book={book} />
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <p className="text-center text-muted">
              Todavía no hay reseñas publicadas. Vuelve pronto.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
