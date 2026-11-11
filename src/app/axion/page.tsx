"use client";

import AxionLandingPage from "../components/axion-landing-page";
import TechShelf3D from "../components/tech-shelf-3d";
import Expertise from "../components/expertise";
import ContactForm from "../components/contact-form";
import Footer from "../components/footer";

export default function AxionPage() {
  return (
    <main className="w-full min-h-screen bg-[#EFEFEF] dark:bg-[#070709] overflow-x-clip transition-colors duration-300">
      <AxionLandingPage />
      <TechShelf3D />
      <Expertise />
      <ContactForm />
      <Footer />
    </main>
  );
}
