"use client";

import { useState } from "react";

// Баннер cookie: фиксирован снизу, закрывается по «Принять».
const CookieBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Использование cookie"
      className="fixed bottom-[20px] left-1/2 z-[100] flex w-[min(335px,calc(100%_-_40px))] -translate-x-1/2 flex-col items-center gap-[10px] rounded-[10px] bg-brand/90 p-[20px] text-center text-white lg:left-auto lg:right-[40px] lg:w-[657px] lg:max-w-[calc(100%_-_80px)] lg:translate-x-0 lg:flex-row lg:gap-[24px] lg:text-left xl:right-[90px]"
    >
      <p className="text-[14px] font-normal leading-[17px]">
        Этот сайт использует файлы cookie для сохранения данных. Продолжая использовать сайт, вы
        даете согласие на работу с этими файлами.
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="rounded-[8px] bg-white px-[24px] py-[8px] text-[14px] font-medium leading-[17px] text-brand lg:shrink-0"
      >
        Принять
      </button>
    </div>
  );
};

export default CookieBanner;
