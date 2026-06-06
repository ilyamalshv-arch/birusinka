// Контейнер контента: центрирует, ограничивает шириной 1920 и задаёт боковые отступы
// (20 / 40 / 90px по брейкпоинтам) как в макете. Раньше эта строка дублировалась в каждой секции.
const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mx-auto w-full max-w-[1920px] px-5 md:px-10 xl:px-[90px] ${className}`}>
    {children}
  </div>
);

export default Container;
