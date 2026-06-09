import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "JKA-Berlin Vereinsbekleidung: Trainingsanzug, Hoodie, T-Shirts, Sporttasche und Base Caps.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="Vereinsbekleidung"
        title="Shop"
        subtitle="Kleidung und Ausrüstung mit JKA-Berlin-Logo – mehrere Artikel wählen und direkt bestellen."
        image="/slider_6.jpg"
      />
      <ShopClient />
    </>
  );
}
