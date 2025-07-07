export const Footer = () => {
  return (
    <footer className="flex border-t p-6 justify-between font-medium">
      <span>
        MarketVerse, <span>{new Date().getFullYear()}</span>
      </span>
    </footer>
  );
};
