import ComponentShowcase from "@/components/ComponentShowcase";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header />
      <main className="container mx-auto px-4 py-8 sm:py-16">
        <Hero />
        <ComponentShowcase />
      </main>
      <Footer />
    </div>
  );
}
