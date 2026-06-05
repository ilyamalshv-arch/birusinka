"use client";

import Image from "next/image";
import { useState } from "react";
import { footerColumns, footerLegal, mobileMenu } from "../data";

// Подвал. Десктоп (≥1600): логотип + колонки ссылок + карточка ЛК.
// Мобайл (≤1599): логотип, аккордеон-меню (раскрывается по тапу), карточка ЛК — стопкой.
const Footer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <footer className="bg-[#701518] text-white">
      <div className="mx-auto flex w-full max-w-[1920px] items-start justify-between px-5 py-[80px] pb-[60px] md:px-10 xl:px-[90px] max-[1599px]:flex-col max-[1599px]:items-center max-[1599px]:gap-[28px] max-[1599px]:py-[32px]">
        <a href="/" aria-label="Бирюсинка — на главную" className="mt-[28px] max-[1599px]:mt-0">
          <Image
            src="/assets/logo-white.png"
            width={326}
            height={78}
            className="h-[78px] w-[326px] max-[1599px]:h-[58px] max-[1599px]:w-[242px]"
            alt="Бирюсинка"
          />
        </a>

        <div className="flex flex-wrap items-start gap-[79px] max-[1599px]:w-full max-[1599px]:max-w-[600px] max-[1599px]:flex-col max-[1599px]:gap-[28px]">
          <div className="flex items-start gap-[79px] max-[1599px]:hidden">
            {footerColumns.map((col, index) => (
              <div key={index} className="flex flex-col" style={{ gap: col.gap }}>
                {col.groups.map((group) => (
                  <div key={group.title} className="flex flex-col gap-[30px]">
                    <h3 className="text-[24px] font-semibold leading-[29px]">{group.title}</h3>
                    <ul className="flex flex-col gap-[20px]">
                      {group.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-[20px] font-normal leading-[24px] hover:opacity-80">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <nav className="hidden w-full flex-col max-[1599px]:flex">
            {mobileMenu.map((cat, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={cat.title} className="border-b-[0.5px] border-white/40">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between py-[9px] text-left text-[18px] font-medium leading-[22px] text-white"
                  >
                    <span>{cat.title}</span>
                    <Image
                      src="/assets/icon-section-arrow.svg"
                      width={16}
                      height={16}
                      alt=""
                      className={`h-[16px] w-[16px] brightness-0 invert transition-transform ${isOpen ? "rotate-90" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <ul className="flex flex-col gap-[12px] pb-[14px] pt-[2px]">
                      {cat.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-[16px] font-normal leading-[20px]">
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

          <div className="flex w-[478px] shrink-0 flex-col gap-[28px] rounded-[10px] bg-[#681215] p-[28px_37px] max-[1599px]:w-full max-[1599px]:gap-[24px] max-[1599px]:p-[20px]">
            <h3 className="text-[24px] font-semibold leading-[29px] max-[1599px]:text-[18px] max-[1599px]:leading-[22px]">
              ЛИЧНЫЙ КАБИНЕТ
            </h3>

            <div className="flex flex-col gap-[10px] text-[20px] leading-[24px] max-[1599px]:text-[14px] max-[1599px]:leading-[17px]">
              <span>Мы на маркетплейсе</span>
              <a href="#" className="self-start rounded-[8px] bg-white px-[18px] py-[6px] text-[22px] font-bold text-[#005bff]">
                ozon
              </a>
            </div>

            <div className="flex flex-col gap-[10px] text-[20px] leading-[24px] max-[1599px]:text-[14px] max-[1599px]:leading-[17px]">
              <span>Следите за новостями в нашей группе</span>
              <a href="#" className="flex items-center gap-[8px] self-start rounded-[8px] bg-[#0077ff] px-[16px] py-[8px] text-[18px] text-white">
                <Image src="/assets/icon-vk.svg" width={24} height={24} className="h-[24px] w-[24px]" alt="" />
                ВКонтакте
              </a>
            </div>

            <div className="flex flex-col gap-[12px] text-[20px] leading-[24px] max-[1599px]:text-[14px] max-[1599px]:leading-[17px]">
              <span className="font-semibold">МАГАЗИН</span>
              <span>
                Дудинская, 12а
                <br />
                г. Красноярск
              </span>
              <a href="tel:+73912018713">+7 (391) 201-87-13</a>
            </div>

            <ul className="flex flex-col gap-[21px]">
              {footerLegal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-[14px] font-medium leading-[17px]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
