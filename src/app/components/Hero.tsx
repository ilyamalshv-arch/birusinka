"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Container from "./Container";

// Слайды героя. Макет дал один баннер — дублируем для демонстрации слайдера;
// реальные баннеры просто добавляются в массив.
const SLIDES = Array.from({ length: 4 }, () => ({
  main: "/assets/hero-mk.png",
  promo: "/assets/hero-akciya.png",
}));

const AUTOPLAY_MS = 5000;

const Hero = () => {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count]);

  return (
    <section className="pt-[30px] max-md:pt-[16px] md:pb-[39px]">
      <Container>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {SLIDES.map((slide, i) => (
                <div key={i} className="flex w-full shrink-0 gap-[32px] max-md:gap-0">
                  <div className="relative h-[525px] flex-1 overflow-hidden max-md:aspect-[335/125] max-md:h-auto max-md:rounded-[8px]">
                    <Image
                      src={slide.main}
                      alt="Мастер-классы"
                      fill
                      sizes="(max-width: 767px) 100vw, 75vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>

                  {/* Акция: сырой ассет горизонтальный (маска справа) — показываем маску фоном
                      (object-right) и реконструируем оверлей карточки. */}
                  <div className="relative h-[525px] shrink-0 basis-[303px] overflow-hidden max-md:hidden">
                    <Image
                      src={slide.promo}
                      alt="Акция: фигурка «Маска»"
                      fill
                      sizes="303px"
                      className="object-cover object-right"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end gap-[14px] bg-gradient-to-t from-brand/95 via-brand/35 to-transparent p-[24px] text-white">
                      <span className="text-[26px] font-bold leading-[1.1]">ФИГУРКА «МАСКА»</span>
                      <div className="flex items-baseline gap-[10px]">
                        <span className="text-[28px] font-bold">690₽</span>
                        <span className="text-[20px] text-white/60 line-through">800₽</span>
                      </div>
                      <button
                        type="button"
                        className="w-fit rounded-[8px] bg-ink px-[18px] py-[10px] text-[15px] font-medium text-white transition hover:brightness-125"
                      >
                        Перейти в раздел акций
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Предыдущий слайд"
            onClick={() => go(index - 1)}
            className="absolute left-[-20px] top-1/2 flex -translate-y-1/2 transition-transform hover:scale-110 max-md:hidden"
          >
            <Image
              src="/assets/hero-arrow.svg"
              width={40}
              height={40}
              alt=""
              className="h-[40px] w-[40px]"
            />
          </button>
          <button
            type="button"
            aria-label="Следующий слайд"
            onClick={() => go(index + 1)}
            className="absolute right-[-20px] top-1/2 flex -translate-y-1/2 transition-transform hover:scale-110 max-md:hidden"
          >
            <Image
              src="/assets/hero-arrow.svg"
              width={40}
              height={40}
              alt=""
              className="h-[40px] w-[40px] -scale-x-100"
            />
          </button>
        </div>

        <div className="mt-[20px] flex justify-center gap-[14px] max-md:mt-[10px] max-md:gap-[8px]">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Слайд ${i + 1}`}
              onClick={() => go(i)}
              className={`h-[3px] w-[78px] transition-colors max-md:h-[2px] max-md:w-[29px] ${
                i === index ? "bg-brand" : "bg-tag/20"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
