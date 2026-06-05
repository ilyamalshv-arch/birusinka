import Image from "next/image";

// Промо-блок: звёзды по диагонали как в макете, текст в чистом коридоре между ними
// (горизонтально не пересекает их → без наложения). Большие звёзды видны ≥1850, ниже скрыты.
const Promo = () => {
  return (
    <section className="relative flex flex-col items-center py-[60px] max-[767px]:py-[24px]">
      <Image
        src="/assets/star.png"
        width={505}
        height={505}
        alt=""
        className="pointer-events-none absolute left-[-40px] top-[-33px] hidden h-[505px] w-[505px] min-[1850px]:block"
      />
      <Image
        src="/assets/star.png"
        width={505}
        height={505}
        alt=""
        className="pointer-events-none absolute right-[-110px] top-[-161px] hidden h-[505px] w-[505px] min-[1850px]:block"
      />

      <div className="relative z-[1] mx-auto flex max-w-[1104px] flex-col items-center gap-[48px] text-center min-[1850px]:max-w-[720px] max-[767px]:items-start max-[767px]:gap-[12px] max-[767px]:text-left">
        <h2 className="text-[40px] font-medium leading-[49px] max-[767px]:text-[14px] max-[767px]:leading-[17px]">
          ЕЛОЧНЫЕ ИГРУШКИ “БИРЮСИНКА”
        </h2>
        <p className="text-[24px] font-normal leading-[29px] max-[767px]:text-[14px] max-[767px]:leading-[17px]">
          Фабрика “Бирюсинка” уже более 90 лет создаёт ёлочные игрушки ручной работы. Каждое изделие
          выдувается из стекла и расписывается мастерами, сохраняя традиции сибирского ремесла. В
          интернет-магазине вы найдёте новинки, ретро-коллекции и эксклюзивные наборы, которые станут
          украшением вашего праздника.
        </p>
      </div>
    </section>
  );
};

export default Promo;
