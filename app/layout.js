import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, Orbitron } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

// Fonts con variables
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "JACANA - Web Developer",
  description:
    "Este es el portafolio de JACANA. Somos desarrolladores full stack y autodidactas. Nos encanta aprender cosas nuevas y siempre estamos abiertos a colaborar. Aprendemos rápido y buscamos nuevos retos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${orbitron.variable} ${inter.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/icon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </head>
      <body className="font-orbitron bg-[#0d1224] text-white">
        <ToastContainer />
        {/* Navbar con posición fija y alto z-index */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        {/* Main content con padding-top para compensar el navbar */}
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] pt-20">
          <div className="font-inter">
            {children}
          </div>
          <ScrollToTop />
        </main>
        <Footer />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      </body>
    </html>
  );
}