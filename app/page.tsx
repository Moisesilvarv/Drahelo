"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  HeartPulse,
  Instagram,
  Mail,
  Microscope,
  MapPin,
  MessageCircle,
  PawPrint,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Waves
} from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

const whatsapp = "https://wa.me/5511966199872";
const instagram = "https://www.instagram.com/draheloisapavanello";
const email = "heloisa.pavanello@gmail.com";
const appointment = "#agendar";
const officeLocation = "Moema - SP";
const mapQuery = "Dra.%20Heloisa%20Pavanello%20Dermatologia%20Veterin%C3%A1ria%20Moema%20SP";

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
  { label: "FAQ", href: "#faq" }
];

const heroBadges = [
  { label: "CRMV-SP 74108", icon: BadgeCheck },
  { label: "Dermatologia Veterinária", icon: Award },
  { label: "Atendimento para cães e gatos", icon: PawPrint }
];

const services = [
  {
    title: "Dermatologia Clinica",
    text: "Investigação de coceira, feridas, descamação, otites, queda de pelo e alterações da pele.",
    icon: Stethoscope
  },
  {
    title: "Alergias Cutaneas",
    text: "Avaliação de dermatites alérgicas, sensibilidades alimentares e gatilhos ambientais.",
    icon: Waves
  },
  {
    title: "Diagnóstico Dermatológico",
    text: "Condutas orientadas por exames, histórico clínico e acompanhamento da evolução.",
    icon: Microscope
  },
  {
    title: "Tratamento Personalizado",
    text: "Protocolos ajustados ao porte, rotina, idade, pele e resposta individual do pet.",
    icon: ClipboardCheck
  },
  {
    title: "Cuidado Preventivo",
    text: "Planejamento para reduzir crises, fortalecer a barreira cutanea e manter conforto.",
    icon: ShieldCheck
  },
  {
    title: "Acompanhamento Continuo",
    text: "Revisões estratégicas para ajustar tratamento e sustentar resultados com segurança.",
    icon: HeartPulse
  }
];

const credentials = [
  "Especialista em Dermatologia Veterinária",
  "Atendimento dedicado a cães e gatos",
  "Condutas baseadas em diagnóstico preciso",
  "Acompanhamento individualizado do tutor e do pet"
];

const differentials = [
  "Atendimento humanizado para tutor e paciente",
  "Exames e avaliação dermatológica detalhada",
  "Tratamentos personalizados e progressivos",
  "Foco em conforto, segurança e qualidade de vida",
  "Atualização científica constante",
  "Plano claro para casa e retornos"
];

const testimonials = [
  {
    name: "Mariana e Thor",
    pet: "Dermatite alergica controlada",
    image: "/testimonial-dog-dermatite.jpg",
    text: "A Dra. Heloisa investigou tudo com calma, explicou cada etapa e montou um tratamento que finalmente trouxe conforto para o Thor."
  },
  {
    name: "Camila e Nina",
    pet: "Coceira recorrente",
    image: "/testimonial-dog-coceira.jpg",
    text: "O atendimento foi muito cuidadoso. Senti segurança porque não foi uma consulta apressada, foi um plano completo para acompanhar a Nina."
  },
  {
    name: "Fernanda e Bento",
    pet: "Pele sensível",
    image: "/testimonial-dog-pele-sensivel.jpg",
    text: "A melhora veio com acompanhamento, ajustes e orientação clara. A experiência foi premium e muito humana."
  }
];

const faqs = [
  {
    question: "Quando devo procurar dermatologia veterinária?",
    answer:
      "Quando o pet apresenta coceira frequente, queda de pelo, feridas, vermelhidão, descamação, otites recorrentes, mau odor na pele ou lambedura excessiva."
  },
  {
    question: "A consulta atende cães e gatos?",
    answer:
      "Sim. O atendimento é voltado para cães e gatos, considerando espécie, idade, rotina, histórico clínico e necessidades individuais."
  },
  {
    question: "O tratamento costuma ser individualizado?",
    answer:
      "Sim. Cada plano é definido a partir da avaliação clínica, exames quando indicados e resposta do paciente ao acompanhamento."
  },
  {
    question: "Como funciona o acompanhamento?",
    answer:
      "Após a consulta, podem ser definidos retornos e ajustes de conduta para monitorar evolução, evitar recaídas e manter qualidade de vida."
  }
];

function Reveal({
  children,
  delay = 0,
  className
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-clinic/10 bg-white/72 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-clinic shadow-[0_12px_40px_rgba(23,33,43,0.06)] backdrop-blur-2xl">
      <Sparkles className="h-3.5 w-3.5 text-aureate" />
      {children}
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="loader-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="loader-card"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="loader-mark">
          <Image
            src="/dra-heloisa-logo-photo.png"
            alt="Dra. Heloisa Pavanello"
            width={96}
            height={96}
            priority
            className="h-full w-full object-cover object-[50%_38%]"
          />
        </div>
        <p className="loader-name">Dra. Heloisa Pavanello</p>
        <p className="loader-subtitle">Dermatologia Veterinária</p>
        <div className="loader-paws" aria-hidden="true">
          {[0, 1, 2].map((paw) => (
            <motion.span
              key={paw}
              animate={{ y: [0, -8, 0], opacity: [0.45, 1, 0.45] }}
              transition={{
                duration: 1.15,
                delay: paw * 0.18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <PawPrint className="h-5 w-5" />
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FaqItem({
  item,
  active,
  onClick
}: {
  item: (typeof faqs)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-ink/8 bg-white/72 shadow-[0_22px_70px_rgba(23,33,43,0.07)] backdrop-blur-2xl transition duration-300 hover:border-clinic/15 hover:bg-white/86">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left text-base font-semibold text-ink md:px-7"
      >
        <span>{item.question}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clinic/8 text-clinic">
          <ChevronDown
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              active && "rotate-180"
            )}
          />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-7 text-sm leading-7 text-ink/64 md:px-7">{item.answer}</p>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const finish = () => {
      window.setTimeout(() => {
        if (mounted) setLoading(false);
      }, 650);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const fallback = window.setTimeout(() => {
      if (mounted) setLoading(false);
    }, 2400);

    return () => {
      mounted = false;
      window.removeEventListener("load", finish);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative overflow-hidden">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <a
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Dra. Heloisa pelo WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 items-center gap-3 rounded-full border border-white/70 bg-clinic px-5 text-sm font-semibold text-white shadow-[0_22px_70px_rgba(29,92,115,0.32)] transition duration-300 hover:-translate-y-1 hover:bg-ink hover:shadow-[0_28px_90px_rgba(23,33,43,0.28)] focus:outline-none focus:ring-2 focus:ring-clinic/30 focus:ring-offset-2 sm:bottom-7 sm:right-7"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
          scrolled
            ? "border-ink/8 bg-white/76 shadow-[0_18px_70px_rgba(23,33,43,0.10)] backdrop-blur-3xl"
            : "border-white/10 bg-black/30 backdrop-blur-xl"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1520px] items-center justify-between px-5 transition-all duration-500 md:px-10",
            scrolled ? "h-[72px]" : "h-[92px]"
          )}
        >
          <a href="#" className="group flex items-center gap-4">
            <span
              className={cn(
                "relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl text-base font-semibold shadow-[0_16px_40px_rgba(23,33,43,0.20)] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-clinic group-hover:text-white",
                scrolled ? "bg-white text-white" : "bg-white/90 text-ink"
              )}
            >
              <Image
                src="/dra-heloisa-logo-photo.png"
                alt="Dra. Heloisa Pavanello"
                width={72}
                height={72}
                priority
                className="h-full w-full object-cover object-[50%_38%]"
              />
              <span className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.28),transparent)] opacity-0 transition duration-500 group-hover:opacity-100" />
            </span>
            <span className="leading-tight">
              <span className={cn("block text-base font-semibold md:text-lg", scrolled ? "text-ink" : "text-white")}>
                Dra. Heloisa Pavanello
              </span>
              <span className={cn("block text-xs font-medium uppercase tracking-[0.18em]", scrolled ? "text-ink/50" : "text-white/80")}>
                Dermatologia Veterinária
              </span>
            </span>
          </a>

          <div className={cn("hero-nav-links hidden items-center justify-center gap-7 text-sm font-semibold", scrolled ? "is-scrolled text-ink/70" : "text-white")}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-2 transition duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                  scrolled
                    ? "hover:text-ink after:bg-clinic"
                    : "hover:text-white after:bg-white/72"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <Button href={appointment} className="h-12 px-5 shadow-[0_16px_42px_rgba(23,33,43,0.18)]">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Agendar Consulta</span>
            <ArrowRight className="hidden h-4 w-4 transition group-hover:translate-x-0.5 md:block" />
          </Button>
        </div>
      </nav>

      <section ref={heroRef} className="hero-premium relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-32 text-center md:py-40">
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-video-poster.jpg"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 hero-video-overlay" />
        <div className="absolute inset-0 z-20 hero-video-grade" />
        <div className="absolute inset-0 z-30 hero-video-vignette" />
        <div className="hero-soft-divider" aria-hidden="true" />

        <div className="relative z-40 mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-6xl flex-col items-center justify-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-white sm:text-base"
            data-hero-text="light"
          >
            Dermatologia veterinária especializada para cães e gatos.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-normal text-white hero-title-shadow sm:text-7xl lg:text-[6.8rem]"
          >
            Dra. Heloisa Pavanello
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-3xl text-lg font-semibold leading-8 text-white hero-copy-shadow md:text-2xl md:leading-10"
            data-hero-text="light"
          >
            Diagnóstico preciso, cuidado acolhedor e acompanhamento individualizado
            para devolver conforto, saúde e qualidade de vida ao seu pet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row"
          >
            <a
              href={appointment}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-ink shadow-[0_24px_80px_rgba(255,255,255,0.18)] transition duration-300 hover:scale-[1.02] hover:bg-aureate hover:text-white hover:shadow-[0_28px_90px_rgba(181,154,98,0.34)] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-ink"
            >
              <CalendarDays className="h-5 w-5" />
              Agendar Consulta
            </a>
            <a
              href="#servicos"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-ink/72 px-8 text-base font-bold text-white shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:bg-clinic hover:shadow-[0_28px_90px_rgba(29,92,115,0.32)] focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-ink"
            >
              Conhecer Especialidades
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="mt-11 flex flex-wrap justify-center gap-3"
          >
            {heroBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/14 px-5 py-3 text-sm font-bold text-white shadow-[0_14px_46px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:text-base"
                >
                  <Icon className="h-4 w-4 text-aureate" />
                  {badge.label}
                </span>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="sobre" className="relative px-4 py-28 md:py-36">
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-clinic/8 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-5 rounded-[3rem] bg-[linear-gradient(135deg,rgba(181,154,98,0.18),rgba(29,92,115,0.12))] blur-2xl" />
              <div className="relative overflow-hidden rounded-[3rem] border border-white/72 bg-white/62 p-3 shadow-[0_34px_110px_rgba(23,33,43,0.12)] backdrop-blur-2xl">
                <Image
                  src="/dra-heloisa-paciente.png"
                  alt="Dra. Heloisa Pavanello em atendimento dermatológico veterinário"
                  width={1180}
                  height={900}
                  className="aspect-[4/4.35] w-full rounded-[2.35rem] object-cover object-[46%_50%]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <SectionLabel>Sobre a especialista</SectionLabel>
            <h2 className="max-w-3xl text-balance text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Uma abordagem precisa, acolhedora e altamente especializada.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-ink/66">
              A Dra. Heloisa Pavanello atua com foco em Dermatologia Veterinária,
              oferecendo avaliacao detalhada, explicação clara para o tutor e
              acompanhamento próximo para cães e gatos com alterações de pele,
              alergias, coceiras e quadros dermatologicos recorrentes.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {credentials.map((item) => (
                <div key={item} className="group flex min-h-28 items-start gap-4 rounded-[1.8rem] border border-white/70 bg-white/66 p-5 shadow-[0_18px_54px_rgba(23,33,43,0.07)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-clinic text-white shadow-soft transition duration-300 group-hover:scale-105 group-hover:bg-ink">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold leading-6 text-ink/74">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="servicos" className="relative px-4 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionLabel>Serviços</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Dermatologia veterinaria com método, tecnologia e sensibilidade.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/60">
              Uma experiência clinica pensada para entender a causa, aliviar sintomas
              e criar um plano sustentável para o bem-estar do pet.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <div className="premium-card group relative h-full overflow-hidden rounded-[2rem] border border-white/72 bg-white/58 p-7 shadow-[0_20px_70px_rgba(23,33,43,0.07)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-clinic/18 hover:bg-white/80 hover:shadow-[0_34px_110px_rgba(29,92,115,0.16)]">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-clinic/10 blur-2xl transition duration-500 group-hover:scale-125 group-hover:bg-aureate/16" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white shadow-soft transition duration-500 group-hover:scale-110 group-hover:bg-clinic">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="relative mt-8 text-2xl font-semibold text-ink">{item.title}</h3>
                    <p className="relative mt-4 text-sm leading-7 text-ink/62">{item.text}</p>
                    <div className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-clinic opacity-80 transition duration-300 group-hover:gap-3 group-hover:opacity-100">
                      Saiba mais
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-28">
        <div className="mx-auto max-w-7xl rounded-[3rem] border border-white/72 bg-white/48 p-6 shadow-[0_28px_110px_rgba(23,33,43,0.10)] backdrop-blur-2xl md:p-10 lg:p-12">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <Reveal>
              <SectionLabel>Diferenciais</SectionLabel>
              <h2 className="text-balance text-4xl font-semibold leading-tight text-ink md:text-5xl">
                Um atendimento desenhado para gerar confiança desde o primeiro contato.
              </h2>
              <p className="mt-6 text-base leading-8 text-ink/62">
                Da escuta inicial ao plano de tratamento, cada etapa foi pensada para
                reduzir incertezas e aumentar o conforto do pet e do tutor.
              </p>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {differentials.map((item, index) => (
                <Reveal key={item} delay={index * 0.04}>
                  <div className="group flex min-h-24 items-center gap-4 rounded-[1.8rem] border border-ink/8 bg-porcelain/78 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_80px_rgba(23,33,43,0.09)]">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-aureate/12 text-aureate transition duration-300 group-hover:bg-clinic group-hover:text-white">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="font-semibold leading-6 text-ink">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="localizacao" className="relative px-4 py-28">
        <div className="absolute inset-x-0 top-1/2 h-[32rem] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(29,92,115,0.12),transparent_62%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <Reveal>
              <SectionLabel>Localização</SectionLabel>
              <h2 className="text-balance text-4xl font-semibold leading-tight text-ink md:text-6xl">
                Atendimento dermatológico veterinário em Moema - SP.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-ink/62">
                Confirme a localização, disponibilidade e orientações para chegada
                diretamente pelos canais oficiais antes da consulta.
              </p>

              <div className="mt-9 grid gap-4">
                <div className="group flex items-start gap-4 rounded-[1.8rem] border border-white/72 bg-white/70 p-5 shadow-[0_20px_70px_rgba(23,33,43,0.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-clinic text-white shadow-soft transition duration-300 group-hover:bg-ink">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">Área de atendimento</h3>
                    <p className="mt-2 text-sm leading-7 text-ink/62">
                      Escritório em {officeLocation}. Dermatologia veterinaria para cães e gatos mediante agendamento.
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 rounded-[1.8rem] border border-white/72 bg-white/70 p-5 shadow-[0_20px_70px_rgba(23,33,43,0.08)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-aureate/14 text-aureate shadow-sm transition duration-300 group-hover:bg-aureate group-hover:text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">Contato oficial</h3>
                    <div className="mt-2 flex flex-col gap-2">
                      <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-clinic transition hover:text-ink">
                        (11) 96619-9872
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-clinic transition hover:text-ink">
                        {email}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="map-frame relative overflow-hidden rounded-[2.6rem] border border-white/72 bg-white/64 p-3 shadow-[0_34px_120px_rgba(23,33,43,0.13)] backdrop-blur-2xl">
                <div className="absolute left-8 top-8 z-10 hidden rounded-full border border-white/70 bg-white/82 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-clinic shadow-sm backdrop-blur-xl sm:inline-flex">
                  Mapa e rota
                </div>
                <iframe
                  title="Mapa para Dra. Heloisa Pavanello Dermatologia Veterinária em Moema - SP"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[420px] w-full rounded-[2rem] border-0 grayscale-[18%] md:h-[560px]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="avaliacoes" className="px-4 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.55fr]">
            <Reveal>
              <SectionLabel>Prova social</SectionLabel>
              <h2 className="max-w-4xl text-balance text-4xl font-semibold leading-tight text-ink md:text-6xl">
                Avaliações que traduzem cuidado, clareza e resultado.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/72 bg-ink p-6 text-white shadow-[0_28px_90px_rgba(23,33,43,0.18)]">
                <div className="flex items-center gap-1 text-aureate">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <motion.span
                      key={star}
                      initial={{ opacity: 0, scale: 0.5, rotate: -12 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: star * 0.08, duration: 0.35 }}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </motion.span>
                  ))}
                </div>
                <p className="mt-4 text-4xl font-semibold">Avaliações dos tutores</p>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Experiencia de atendimento percebida em detalhes: escuta, explicação,
                  acompanhamento e segurança.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.06}>
                <div className="group h-full overflow-hidden rounded-[2rem] border border-white/72 bg-white/72 p-4 shadow-[0_22px_76px_rgba(23,33,43,0.08)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-glow">
                  <div className="relative aspect-[1.25] overflow-hidden rounded-[1.5rem] bg-ivory">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 92vw, 30vw"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/76 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur-xl">
                      {item.pet}
                    </div>
                  </div>
                  <div className="p-4">
                    <Quote className="h-7 w-7 text-aureate" />
                    <p className="mt-4 text-sm leading-7 text-ink/66">"{item.text}"</p>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="font-semibold text-ink">{item.name}</p>
                      <div className="flex items-center gap-0.5 text-aureate">
                        {[0, 1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-tight text-ink md:text-5xl">
              Perguntas frequentes antes da consulta dermatologica.
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink/62">
              Informações essenciais para chegar ao atendimento com mais tranquilidade
              e entender como o plano pode ser conduzido.
            </p>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <Reveal key={item.question} delay={index * 0.04}>
                <FaqItem
                  item={item}
                  active={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="agendar" className="px-4 py-28">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3.4rem] border border-white/72 bg-ink px-6 py-16 text-center text-white shadow-[0_38px_130px_rgba(23,33,43,0.24)] md:px-12 md:py-24">
            <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-clinic/46 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-aureate/24 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.16] premium-grid" />
            <div className="relative mx-auto max-w-4xl">
              <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-ink shadow-soft">
                <PawPrint className="h-7 w-7" />
              </div>
              <h2 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
                Seu pet merece um diagnóstico claro e um cuidado que acompanha de verdade.
              </h2>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/68">
                Agende uma consulta com a Dra. Heloisa Pavanello e receba um plano
                especializado para a saúde da pele do seu cão ou gato.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href={appointment}
                  variant="secondary"
                  className="h-14 border-white/70 bg-transparent px-8 text-base text-white hover:bg-white hover:text-ink"
                >
                  <CalendarDays className="h-5 w-5" />
                  Agendar Consulta
                </Button>
                <Button href={whatsapp} target="_blank" rel="noreferrer" className="h-14 bg-clinic px-8 text-base hover:bg-white hover:text-ink">
                  <Phone className="h-5 w-5" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="px-4 pb-10 pt-16">
        <div className="mx-auto grid max-w-7xl gap-8 border-t border-ink/10 pt-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <p className="text-2xl font-semibold text-ink">Dra. Heloisa Pavanello</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-ink/60">
              Especialista em Dermatologia Veterinária. CRMV-SP 74108.
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink">Contato</p>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-ink/62 transition hover:text-clinic">
              <Phone className="h-4 w-4" />
              (11) 96619-9872
            </a>
            <a href={`mailto:${email}`} className="mt-3 inline-flex items-center gap-2 text-sm text-ink/62 transition hover:text-clinic">
              <Mail className="h-4 w-4" />
              {email}
            </a>
          </div>
          <div>
            <p className="font-semibold text-ink">Atendimento</p>
            <p className="mt-3 text-sm leading-7 text-ink/62">
              Escritório em {officeLocation}. Dermatologia veterinaria para cães e gatos mediante agendamento.
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink">Redes sociais</p>
            <a href={instagram} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm text-ink/62 transition hover:text-clinic">
              <Instagram className="h-4 w-4" />
              @draheloisapavanello
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 text-xs text-ink/44 sm:flex-row">
          <p>Â© 2026 Dra. Heloisa Pavanello. Todos os direitos reservados.</p>
          <p>Experiencia premium para tutores que buscam excelência clínica.</p>
        </div>
      </footer>
    </main>
  );
}

