import React from "react";
import Header from "@/components/Header.tsx";
import Hero from "@/components/Hero.tsx";
import Footer from "@/components/Footer.tsx";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
  auth?: boolean;
};

const layout = ({ children, showHero = false, auth=false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      <div className={`${!auth ? 'container mx-auto flex-1 py-10' : ''}`}>{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
