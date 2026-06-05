import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Promo from "./components/Promo";
import Footer from "./components/Footer";
import { sections } from "./data";

// Главная страница. Секции идут в том же порядке, что и в макете.
export default function HomePage() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-[100px] px-5 pb-[150px] pt-[60px] md:px-10 xl:px-[90px] max-[1279px]:gap-[64px] max-[1279px]:pb-[80px] max-[1279px]:pt-[40px] max-[767px]:gap-[24px] max-[767px]:pb-[28px] max-[767px]:pt-[16px]">
          {sections.map((section) => (
            <ProductSection key={section.title} title={section.title} products={section.products} />
          ))}
          <Promo />
        </div>
      </main>
      <Footer />
    </>
  );
}
