import Image from "next/image";

// Промо по макету: заголовок (40px) + абзац (24px, ширина 1104) выровнены ПО ЛЕВОМУ КРАЮ
// на ~25% от левого края контента (контент 1740 задаёт родительский контейнер каталога).
// Левая звезда ниже-слева, правая выше-справа, выходят за контент на 40/111px (как в макете).
// Полная раскладка со звёздами — на широких экранах (≥1700, где она помещается); ниже — текст
// влево без звёзд, чтобы ничего не наезжало.
const Promo = () => {
  return (
    <section className="relative py-[120px] max-xl:py-[64px] max-md:py-[24px]">
      <div className="relative w-full">
        <Image
          src="/assets/star.png"
          width={505}
          height={505}
          alt=""
          className="pointer-events-none absolute left-[-40px] top-1/2 hidden h-[505px] w-[505px] -translate-y-[41%] 4xl:block"
        />
        <Image
          src="/assets/star.png"
          width={505}
          height={505}
          alt=""
          className="pointer-events-none absolute right-[-111px] top-1/2 hidden h-[505px] w-[505px] -translate-y-[66%] 4xl:block"
        />

        <div className="relative z-[1] max-w-[1104px] text-left 4xl:ml-[25%]">
          <h2 className="text-[40px] font-medium leading-[49px] max-md:text-[18px] max-md:leading-[22px]">
            ЕЛОЧНЫЕ ИГРУШКИ “БИРЮСИНКА”
          </h2>
          <p className="mt-[30px] whitespace-pre-line text-[24px] font-normal leading-[29px] max-md:mt-[12px] max-md:text-[14px] max-md:leading-[17px]">
            {`Фабрика “Бирюсинка” уже более 90 лет создаёт ёлочные игрушки ручной работы. Каждое изделие выдувается из стекла и расписывается мастерами,
сохраняя традиции сибирского ремесла.
В интернет-магазине вы найдёте новинки, ретро-коллекции и эксклюзивные наборы, которые станут украшением вашего праздника.`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Promo;
