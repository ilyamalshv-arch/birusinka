"use client";

import Image from "next/image";
import { useState } from "react";

// Аккордеон категорий. Используется в мобильном меню (Header) и в подвале (Footer) —
// раньше эта логика была скопирована в оба компонента.
// variant подбирает цвета/плотность под окружение:
//   "menu"   — тёмный текст на светлом фоне меню, просторнее (py-12);
//   "footer" — белый текст на бордовом фоне подвала, плотнее (py-9), стрелка инвертируется.
type AccordionItem = { title: string; links: string[] };

const Accordion = ({
  items,
  variant,
  className = "",
}: {
  items: AccordionItem[];
  variant: "menu" | "footer";
  className?: string;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const footer = variant === "footer";

  return (
    <nav className={`w-full flex-col ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.title}
            className={`border-b-[0.5px] ${footer ? "border-white/40" : "border-black/15"}`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`flex w-full items-center justify-between text-left text-[18px] font-medium leading-[22px] ${
                footer ? "py-[9px] text-white" : "py-[12px] text-black"
              }`}
            >
              <span>{item.title}</span>
              <Image
                src="/assets/icon-section-arrow.svg"
                width={16}
                height={16}
                alt=""
                className={`h-[16px] w-[16px] transition-transform ${footer ? "brightness-0 invert" : ""} ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>
            {isOpen && (
              <ul className="flex flex-col gap-[12px] pb-[14px] pt-[2px]">
                {item.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className={`text-[16px] font-normal leading-[20px] ${footer ? "" : "text-black"}`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Accordion;
