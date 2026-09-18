import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import EmptyState from "@/components/EmptyState";
import BookCard from "@/components/BookCard";
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
      <PageIntro eyebrow="02 / La biblioteca" title="Buenas lecturas." accent="Nuevas perspectivas." description="Libros que me hacen pensar distinto. Reseñas honestas, aprendizajes y algunas ideas para llevar a la práctica." symbol="✳" />

      <section className="py-14 sm:py-20">
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
            <EmptyState title="La biblioteca está tomando forma." description="Pronto encontrarás aquí mis lecturas y reseñas. Mientras tanto, descubre recursos para seguir aprendiendo." />
          )}
        </Container>
      </section>
    </>
  );
}
