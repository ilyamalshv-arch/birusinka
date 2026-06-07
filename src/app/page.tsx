import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Promo from "./components/Promo";
import Footer from "./components/Footer";
import Container from "./components/Container";
import { sections } from "./data";

// Главная страница. Секции идут в том же порядке, что и в макете.
export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Container className="flex flex-col gap-[100px] pb-[150px] pt-[60px] max-xl:gap-[64px] max-xl:pb-[80px] max-xl:pt-[40px] max-md:gap-[24px] max-md:pb-[28px] max-md:pt-[16px]">
          {sections.map((section) => (
            <ProductSection key={section.title} title={section.title} products={section.products} />
          ))}
          <Promo />
        </Container>
      </main>
      <Footer />
    </>
  );
}
