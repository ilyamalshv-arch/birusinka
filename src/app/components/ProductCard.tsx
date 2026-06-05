import Image from "next/image";
import { montserratAlt } from "../fonts";

type Product = { image: string; title: string; price: string; tag: string; size: string };

// Карточка товара. Текучая: на 1920 совпадает с макетом, ≤767 — мелкий вариант.
const ProductCard = ({ product }: { product: Product }) => {
  const { image, title, price, tag, size } = product;

  return (
    <article className="group relative mx-auto flex w-full max-w-[420px] cursor-pointer flex-col items-center gap-[7px] rounded-[30px] bg-white transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)] min-[768px]:pb-[27px] max-[767px]:gap-[3px] max-[767px]:rounded-[8px]">
      <div className="relative aspect-[410/392] w-[calc(100%_-_10px)] overflow-hidden rounded-[30px] max-[767px]:aspect-[140/141] max-[767px]:w-[calc(100%_-_20px)] max-[767px]:rounded-[11px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1023px) 45vw, 22vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-[20px] top-0 flex h-[89px] items-center justify-between max-[767px]:inset-x-[8px] max-[767px]:h-[40px]">
          <span className="relative block h-[69px] w-[48px] max-[767px]:h-[40px] max-[767px]:w-[28px]">
            <Image src="/assets/badge-size.png" alt="" fill sizes="48px" className="object-contain" />
            <span className="absolute inset-x-0 top-[64%] -translate-y-1/2 text-center text-[13px] font-medium leading-none text-white max-[767px]:text-[7px]">
              {size}
            </span>
          </span>
          {tag && (
            <span className="flex h-[28px] items-center rounded-[5px] bg-[#6f1417] px-[20px] text-[16px] font-medium leading-[156%] text-white max-[767px]:h-[11px] max-[767px]:rounded-[2px] max-[767px]:px-[7px] max-[767px]:text-[6px]">
              {tag}
            </span>
          )}
        </div>
      </div>

      <div className="flex w-[calc(100%_-_50px)] items-start justify-between gap-[10px] min-[768px]:min-h-[64px] max-[767px]:w-[calc(100%_-_20px)] max-[767px]:gap-[4px]">
        <p
          className={`${montserratAlt.className} flex-1 whitespace-pre-line text-[24px] font-medium leading-[104%] text-[#193b64] max-[767px]:text-[12px] max-[767px]:leading-[15px]`}
        >
          {title}
        </p>
        <Image
          src="/assets/icon-info.svg"
          width={24}
          height={24}
          alt="Подробнее"
          className="h-[24px] w-[24px] shrink-0 cursor-pointer transition-opacity hover:opacity-60 max-[767px]:h-[9px] max-[767px]:w-[9px]"
        />
      </div>

      <div className="flex w-[calc(100%_-_10px)] items-center justify-between px-[20px] max-[767px]:w-[calc(100%_-_20px)] max-[767px]:px-0">
        <button
          type="button"
          aria-label="Купить"
          className="flex items-center gap-[9px] rounded-[8px] bg-[#193b64] p-[10px] text-[24px] font-medium leading-[29px] text-white transition hover:brightness-125 max-[767px]:gap-[3px] max-[767px]:rounded-[4px] max-[767px]:px-[5px] max-[767px]:py-[4px] max-[767px]:text-[10px]"
        >
          <span>{price}</span>
          <Image
            src="/assets/icon-cart.svg"
            width={20}
            height={20}
            alt=""
            className="h-[20px] w-[20px] brightness-0 invert max-[767px]:h-[10px] max-[767px]:w-[10px]"
          />
        </button>
        <button
          type="button"
          aria-label="Добавить в корзину"
          className="flex rounded-[8px] transition hover:bg-black/[0.04]"
        >
          <Image
            src="/assets/icon-cart-outline.svg"
            width={61}
            height={49}
            alt=""
            className="h-[49px] w-[61px] max-[767px]:h-[22px] max-[767px]:w-[28px]"
          />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
