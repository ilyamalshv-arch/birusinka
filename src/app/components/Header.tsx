"use client";

import Image from "next/image";
import { useState } from "react";
import { montserratAlt } from "../fonts";
import { mainNav, mobileMenu, topBarLinks } from "../data";
import Container from "./Container";
import Accordion from "./Accordion";

// Шапка. Десктоп (≥1600): логотип + меню с ховер-выпадайками + иконки.
// Мобайл (≤1599): бургер открывает полноэкранное меню (аккордеон категорий + аккаунт).
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      <header>
        <Container className="flex h-[90px] items-center justify-between max-[1599px]:h-[50px]">
          <button
            type="button"
            aria-label="Открыть меню"
            onClick={() => setMenuOpen(true)}
            className="hidden flex-col justify-center gap-[5px] max-[1599px]:flex"
          >
            <span className="block h-[2px] w-[19px] bg-black" />
            <span className="block h-[2px] w-[19px] bg-black" />
          </button>

          <div className="flex items-center gap-[54px]">
            <a href="/" aria-label="Бирюсинка — на главную">
              <Image
                src="/assets/logo-red.png"
                width={237}
                height={28}
                priority
                className="h-[28px] w-[237px] max-[1599px]:h-[13px] max-[1599px]:w-[111px]"
                alt="Бирюсинка"
              />
            </a>
            <nav className="flex items-center gap-[30px] max-[1599px]:hidden">
              {mainNav.map((item) => (
                <div key={item.label} className="group relative flex h-[90px] items-center">
                  <a href={item.href} className={`${montserratAlt.className} text-[20px] font-medium leading-[24px]`}>
                    {item.label}
                  </a>
                  <div className="absolute left-0 top-full z-50 hidden min-w-[249px] flex-col gap-[16px] rounded-[10px] bg-white p-[20px_24px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] group-hover:flex">
                    {item.links.map((link) => (
                      <a key={link} href="#" className="whitespace-nowrap text-[18px] font-normal leading-[22px] text-black hover:text-brand">
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-[40px]">
            <a href="#" className="flex items-center gap-[10px] max-[1599px]:hidden">
              <span className="flex flex-col items-end gap-[2px]">
                <span className="text-[12.5px] leading-[15px]">Александр</span>
                <span className="text-[12.5px] leading-[15px] text-brand">0 баллов</span>
              </span>
              <Image src="/assets/icon-user.svg" width={26} height={26} className="h-[26px] w-[26px]" alt="" />
            </a>
            <a href="#" aria-label="Избранное" className="max-[1599px]:hidden">
              <Image src="/assets/icon-heart.svg" width={29} height={29} className="h-[29px] w-[29px]" alt="" />
            </a>
            <a href="#" aria-label="Корзина">
              <Image src="/assets/icon-cart.svg" width={29} height={29} className="h-[29px] w-[29px] max-[1599px]:h-[18px] max-[1599px]:w-[18px]" alt="" />
            </a>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col gap-[20px] overflow-y-auto bg-bg p-[16px_20px_40px]">
          <div className="flex items-center justify-between">
            <button type="button" aria-label="Закрыть меню" onClick={() => setMenuOpen(false)} className="text-[22px] leading-none text-black">
              ✕
            </button>
            <div className="flex gap-[20px]">
              <a href="#" aria-label="Избранное">
                <Image src="/assets/icon-heart.svg" width={22} height={22} className="h-[22px] w-[22px]" alt="" />
              </a>
              <a href="#" aria-label="Корзина">
                <Image src="/assets/icon-cart.svg" width={22} height={22} className="h-[22px] w-[22px]" alt="" />
              </a>
            </div>
          </div>

          <div className="border-b-[0.5px] border-black/20 pb-[12px]">
            {loggedIn ? (
              <div className="flex items-center gap-[10px]">
                <Image src="/assets/icon-user.svg" width={26} height={26} className="h-[26px] w-[26px]" alt="" />
                <span className="flex flex-col">
                  <span className="text-[12.5px] leading-[15px]">Александр</span>
                  <span className="text-[12.5px] leading-[15px] text-brand">0 баллов</span>
                </span>
                <button type="button" onClick={() => setLoggedIn(false)} className="rounded-[8px] bg-brand px-[20px] py-[8px] text-[14px] font-medium text-white">
                  Выйти
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-[16px]">
                <button type="button" onClick={() => setLoggedIn(true)} className="rounded-[8px] bg-brand px-[20px] py-[8px] text-[14px] font-medium text-white">
                  Войти
                </button>
                <a href="#" className="text-[14px] text-brand">
                  Регистрация
                </a>
              </div>
            )}
          </div>

          <Accordion items={mobileMenu} variant="menu" className="flex" />

          <div className="flex flex-col gap-[14px] pt-[8px]">
            {topBarLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-[18px] font-light leading-[22px]">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
