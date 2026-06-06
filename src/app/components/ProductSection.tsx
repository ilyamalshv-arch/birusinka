import Image from "next/image";
import ProductCard from "./ProductCard";

type Product = { image: string; title: string; price: string; tag: string; size: string };

// Секция товаров: заголовок со стрелкой + сетка 4→3→2 колонки.
const ProductSection = ({ title, products }: { title: string; products: Product[] }) => {
  return (
    <section className="flex flex-col gap-[40px] max-[767px]:gap-[12px]">
      <h2 className="flex items-center gap-[10px] text-[48px] font-medium leading-[59px] text-brand max-[767px]:gap-[4px] max-[767px]:text-[18px] max-[767px]:leading-[22px]">
        <span>{title}</span>
        <Image
          src="/assets/icon-section-arrow.svg"
          width={40}
          height={40}
          className="h-[40px] w-[40px] max-[767px]:h-[16px] max-[767px]:w-[16px]"
          alt=""
        />
      </h2>

      <div className="grid grid-cols-4 gap-[20px] max-[1279px]:grid-cols-3 max-[1023px]:grid-cols-2 max-[1023px]:gap-[14px]">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
