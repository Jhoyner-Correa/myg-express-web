import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce la historia de MyG Express. Desde 2018 conectando la Selva Central del Perú con el resto del país a través de logística y entregas de confianza.",
  openGraph: {
    title: "Sobre Nosotros | MyG Express",
    description:
      "Conoce la historia de MyG Express. Desde 2018 conectando la Selva Central del Perú con el resto del país.",
  },
};

export default function NosotrosPage() {
  return (
    <>
      <div className="pt-20" />
      <AboutSection />
      <Footer />
    </>
  );
}
