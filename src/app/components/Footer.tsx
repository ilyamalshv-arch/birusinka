import Image from "next/image";
import { footerColumns, footerLegal, mobileMenu } from "../data";
import Container from "./Container";
import Accordion from "./Accordion";

// Подвал. Десктоп (≥1600): логотип + колонки ссылок + карточка «Личный кабинет».
// Мобайл (≤1599): логотип, аккордеон-меню, карточка ЛК — стопкой.
const Footer = () => {
  return (
    <footer className="bg-brand text-white">
      <Container className="flex items-start justify-between py-[80px] pb-[60px] max-[1599px]:flex-col max-[1599px]:items-center max-[1599px]:gap-[28px] max-[1599px]:py-[32px]">
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

          <Accordion items={mobileMenu} variant="footer" className="hidden max-[1599px]:flex" />

          <div className="flex w-[478px] shrink-0 flex-col gap-[28px] rounded-[10px] bg-brand-dark p-[28px_37px] max-[1599px]:w-full max-[1599px]:gap-[24px] max-[1599px]:p-[20px]">
            <h3 className="text-[24px] font-semibold leading-[29px] max-[1599px]:text-[18px] max-[1599px]:leading-[22px]">
              ЛИЧНЫЙ КАБИНЕТ
            </h3>

            <div className="flex flex-col gap-[8px]">
              <span className="text-[32px] font-bold leading-none tracking-[-0.02em] max-[1599px]:text-[24px]">OZON</span>
              <span className="text-[20px] leading-[24px] max-[1599px]:text-[14px] max-[1599px]:leading-[17px]">
                Мы на маркетплейсе
              </span>
            </div>

            <div className="flex flex-col gap-[8px]">
              <a href="#" className="flex items-center gap-[10px] self-start">
                <Image
                  src="/assets/icon-vk-white.svg"
                  width={34}
                  height={34}
                  className="h-[34px] w-[34px] max-[1599px]:h-[26px] max-[1599px]:w-[26px]"
                  alt=""
                />
                <span className="text-[28px] font-medium leading-none max-[1599px]:text-[20px]">ВКонтакте</span>
              </a>
              <span className="text-[20px] leading-[24px] max-[1599px]:text-[14px] max-[1599px]:leading-[17px]">
                Следите за новостями в нашей группе
              </span>
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
      </Container>
    </footer>
  );
};

export default Footer;
