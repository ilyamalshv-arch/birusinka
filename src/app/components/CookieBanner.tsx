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
      className="fixed bottom-[20px] left-1/2 z-[100] flex w-[min(335px,calc(100%_-_40px))] -translate-x-1/2 flex-col items-center gap-[10px] rounded-[10px] bg-brand/90 p-[20px] text-center text-white min-[1024px]:left-auto min-[1024px]:right-[40px] min-[1024px]:w-[657px] min-[1024px]:max-w-[calc(100%_-_80px)] min-[1024px]:translate-x-0 min-[1024px]:flex-row min-[1024px]:gap-[24px] min-[1024px]:text-left min-[1280px]:right-[90px]"
    >
      <p className="text-[14px] font-normal leading-[17px]">
        Этот сайт использует файлы cookie для сохранения данных. Продолжая использовать сайт, вы даете
        согласие на работу с этими файлами.
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="rounded-[8px] bg-white px-[24px] py-[8px] text-[14px] font-medium leading-[17px] text-brand min-[1024px]:shrink-0"
      >
        Принять
      </button>
    </div>
  );
};

export default CookieBanner;
