import MainHeader from "@/components/main-header/main-header";
import "./globals.css";
import Footer from "@/components/footer/footer";

export const metadata = {
  title: "Healthy High‑Protein Recipes for Active Lifestyles | NutriFit",
  description:
    "NutriFit provides healthy, high‑protein recipes designed for athletes and active lifestyles. Discover clean, energizing meals that support muscle growth, performance, and balanced nutrition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
