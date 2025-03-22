import Clients from "@/ui/home/clients";
import CTA from "@/ui/home/cta";
import CTA1 from "@/ui/home/cta1";
import CTA2 from "@/ui/home/cta2";
import Exp from "@/ui/home/exp";
import FAQ from "@/ui/home/faq";
import Hero from "@/ui/home/hero";
import Services from "@/ui/home/services";
import Value from "@/ui/home/value";
import Works from "@/ui/home/works";

export default function Home() {
  return (
    <>
      <Hero />
      <Value withButton />
      <CTA />
      <Exp />
      <Services />
      <CTA1 />
      <Works />
      <FAQ />
      <CTA2 />
      <Clients />
    </>
  );
}
