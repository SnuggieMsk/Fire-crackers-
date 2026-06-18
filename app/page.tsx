import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CountdownTimer } from "@/components/CountdownTimer";
import { TrustBar } from "@/components/TrustBar";
import { About } from "@/components/About";
import { Catalogue } from "@/components/Catalogue";
import { Offers } from "@/components/Offers";
import { Bulk } from "@/components/Bulk";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Safety } from "@/components/Safety";
import { Testimonials } from "@/components/Testimonials";
import { LeadForm } from "@/components/LeadForm";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CountdownTimer />
        <TrustBar />
        <About />
        <Catalogue />
        <Offers />
        <Bulk />
        <WhyChooseUs />
        <Safety />
        <Testimonials />
        <LeadForm />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
