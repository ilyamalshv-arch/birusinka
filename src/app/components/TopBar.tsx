import Image from "next/image";
import { topBarLinks } from "../data";
import Container from "./Container";

// Верхняя утилитарная полоса (только полный десктоп ≥1600).
const TopBar = () => {
  return (
    <div className="hidden border-b-[0.5px] border-black min-[1600px]:block">
      <Container className="flex h-[50px] items-center justify-between">
        <nav className="flex gap-[30px]">
          {topBarLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-[18px] font-light leading-[22px]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[10px]">
          <span className="text-[18px] font-light leading-[22px]">Подписывайтесь на нас</span>
          <a href="#" aria-label="ВКонтакте">
            <Image src="/assets/icon-vk.svg" width={34} height={34} className="h-[34px] w-[34px]" alt="" />
          </a>
          <a href="#" aria-label="Telegram">
            <Image src="/assets/tg.png" width={34} height={34} className="h-[34px] w-[34px]" alt="" />
          </a>
        </div>
      </Container>
    </div>
  );
};

export default TopBar;
