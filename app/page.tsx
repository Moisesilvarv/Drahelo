"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform
} from "framer-motion";
import { gsap } from "gsap";
import Lenis from "lenis";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Cat,
  Check,
  ChevronDown,
  ClipboardCheck,
  Dog,
  HeartPulse,
  Instagram,
  Microscope,
  PawPrint,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Trophy,
  UsersRound,
  Waves
} from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

const whatsapp = "https://wa.me/5511999999999";
const appointment = "#agendar";

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Resultados", href: "#resultados" },
  { label: "Avaliações", href: "#avaliacoes" },
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

const stats = [
  { value: 1200, suffix: "+", label: "pacientes atendidos" },
  { value: 8, suffix: "+", label: "anos de experiência" },
  { value: 98, suffix: "%", label: "taxa de satisfação" },
  { value: 3500, suffix: "+", label: "consultas realizadas" }
];

const testimonials = [
  {
    name: "Mariana e Thor",
    pet: "Dermatite alergica controlada",
    image: "/dra-heloisa-consultorio.png",
    text: "A Dra. Heloisa investigou tudo com calma, explicou cada etapa e montou um tratamento que finalmente trouxe conforto para o Thor."
  },
  {
    name: "Camila e Nina",
    pet: "Coceira recorrente",
    image: "/dra-heloisa-paciente.png",
    text: "O atendimento foi muito cuidadoso. Senti segurança porque não foi uma consulta apressada, foi um plano completo para acompanhar a Nina."
  },
  {
    name: "Fernanda e Bento",
    pet: "Pele sensível",
    image: "/dra-heloisa-editorial.png",
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

function CountUp({
  value,
  suffix
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: "easeOut",
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest).toLocaleString("pt-BR")}${suffix}`;
        }
      }
    });
    return () => controls.stop();
  }, [inView, suffix, value]);

  return <span ref={ref}>0{suffix}</span>;
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);

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

  useEffect(() => {
    gsap.to(".ambient-glow", {
      scale: 1.1,
      opacity: 0.78,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.8
    });
  }, []);

  return (
    <main className="relative overflow-hidden">
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
          scrolled
            ? "border-ink/8 bg-white/76 shadow-[0_18px_70px_rgba(23,33,43,0.10)] backdrop-blur-3xl"
            : "border-white/60 bg-white/50 backdrop-blur-xl"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1520px] items-center justify-between px-5 transition-all duration-500 md:px-10",
            scrolled ? "h-[72px]" : "h-[92px]"
          )}
        >
          <a href="#" className="group flex items-center gap-4">
            <span className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-ink text-base font-semibold text-white shadow-[0_16px_40px_rgba(23,33,43,0.20)] transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-clinic">
              HP
              <span className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.28),transparent)] opacity-0 transition duration-500 group-hover:opacity-100" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold text-ink md:text-lg">
                Dra. Heloisa Pavanello
              </span>
              <span className="block text-xs font-medium uppercase tracking-[0.18em] text-ink/48">
                Dermatologia Veterinária
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-ink/6 bg-white/56 p-1.5 text-sm font-semibold text-ink/62 shadow-sm backdrop-blur-xl lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2.5 transition duration-300 hover:bg-ink hover:text-white"
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

      <section ref={heroRef} className="relative min-h-screen overflow-hidden px-4 pb-20 pt-32 md:pt-40">
        <div className="absolute inset-0 premium-grid opacity-80" />
        <motion.div
          style={{ y: glowY }}
          className="ambient-glow absolute -left-32 top-16 h-[34rem] w-[34rem] rounded-full bg-sand/42 blur-3xl"
        />
        <div className="ambient-glow absolute right-[-12rem] top-16 h-[42rem] w-[42rem] rounded-full bg-clinic/18 blur-3xl" />
        <div className="ambient-glow absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-aureate/16 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-14 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-clinic/10 bg-white/72 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-clinic shadow-[0_14px_50px_rgba(23,33,43,0.08)] backdrop-blur-2xl"
            >
              <PawPrint className="h-4 w-4 text-aureate" />
              Dermatologia veterinaria premium
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-ink sm:text-6xl lg:text-[5.85rem]"
            >
              Cuidado especializado para a saúde da pele do seu pet.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-2xl text-xl leading-9 text-ink/66 md:text-2xl"
            >
              Diagnóstico preciso, tratamento personalizado e acompanhamento
              especializado para cães e gatos com doenças dermatológicas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {heroBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/72 px-4 py-2.5 text-sm font-semibold text-ink shadow-[0_12px_34px_rgba(23,33,43,0.07)] backdrop-blur-2xl"
                  >
                    <Icon className="h-4 w-4 text-clinic" />
                    {badge.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button href={appointment} className="h-14 px-7 text-base">
                <CalendarDays className="h-5 w-5" />
                Agendar Consulta
              </Button>
              <Button href={whatsapp} variant="secondary" target="_blank" rel="noreferrer" className="h-14 px-7 text-base">
                <Phone className="h-5 w-5" />
                Falar no WhatsApp
              </Button>
            </motion.div>
          </div>

          <motion.div style={{ y: portraitY }} className="relative z-10 mx-auto w-full max-w-[680px]">
            <div className="absolute -inset-7 rounded-[3.2rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(216,195,170,0.18),rgba(29,92,115,0.16))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[3rem] border border-white/80 bg-white/58 p-3 shadow-[0_34px_120px_rgba(23,33,43,0.18)] backdrop-blur-2xl">
              <div className="relative aspect-[0.92] overflow-hidden rounded-[2.35rem] bg-ivory">
                <Image
                  src="/dra-heloisa-consultorio.png"
                  alt="Dra. Heloisa Pavanello em consultório veterinario"
                  fill
                  priority
                  className="object-cover object-[50%_44%]"
                  sizes="(max-width: 1024px) 94vw, 48vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/42 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/30 bg-white/18 p-4 text-white shadow-soft backdrop-blur-2xl">
                  <div>
                    <p className="text-sm font-semibold">Dra. Heloisa Pavanello</p>
                    <p className="mt-1 text-xs text-white/72">CRMV-SP 74108</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold">
                    <Dog className="h-3.5 w-3.5" />
                    <Cat className="h-3.5 w-3.5" />
                    Cães e gatos
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-12 hidden rounded-[1.7rem] border border-white/70 bg-white/74 p-5 shadow-[0_22px_70px_rgba(23,33,43,0.12)] backdrop-blur-2xl md:block">
              <p className="text-3xl font-semibold text-ink">98%</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink/48">
                satisfação
              </p>
            </div>
            <div className="absolute -left-5 bottom-16 hidden rounded-[1.7rem] border border-white/70 bg-white/78 p-5 shadow-[0_22px_70px_rgba(23,33,43,0.12)] backdrop-blur-2xl md:block">
              <div className="flex items-center gap-2 text-aureate">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold text-ink">Nota Google 5.0</p>
            </div>
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

      <section id="resultados" className="relative px-4 py-28">
        <div className="absolute inset-x-0 top-1/2 h-[30rem] -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(29,92,115,0.12),transparent_62%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <SectionLabel>Autoridade em números</SectionLabel>
            <h2 className="text-balance text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Dados que reforçam experiência, consistência e confiança.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06}>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/72 bg-white/68 p-7 text-center shadow-[0_20px_70px_rgba(23,33,43,0.07)] backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:shadow-glow">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-aureate/70 to-transparent" />
                  <p className="text-5xl font-semibold tracking-normal text-ink">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink/46">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
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
                <p className="mt-4 text-4xl font-semibold">5.0 Google</p>
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
                <Button href={appointment} variant="secondary" className="h-14 px-8 text-base">
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
            <a href={whatsapp} className="mt-3 inline-flex items-center gap-2 text-sm text-ink/62 transition hover:text-clinic">
              <Phone className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <div>
            <p className="font-semibold text-ink">Atendimento</p>
            <p className="mt-3 text-sm leading-7 text-ink/62">
              Dermatologia veterinaria para cães e gatos mediante agendamento.
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink">Redes sociais</p>
            <a href="#" className="mt-3 inline-flex items-center gap-2 text-sm text-ink/62 transition hover:text-clinic">
              <Instagram className="h-4 w-4" />
              Instagram
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

