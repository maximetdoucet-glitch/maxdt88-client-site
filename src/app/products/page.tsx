"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { SplitChars, SplitWords } from "@/components/ui/text-effects";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SignupForm } from "@/components/ui/signup-form";
import { TestimonialStack, Testimonial } from "@/components/ui/glass-testimonial-swiper";
import { Users, Calendar, ThumbsUp, ShieldCheck, Clock, Dumbbell, Timer, Flame, Target } from "lucide-react";
import dynamic from "next/dynamic";

const NeuralBackground = dynamic(() => import("@/components/ui/flow-field-background"), { ssr: false });

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

const products = [
  {
    title: "Adjustable Dumbbells",
    price: "$149.99",
    originalPrice: "$189.99",
    image: "/images/products/dumbbell.png",
    tag: "Best Seller",
    desc: "Adjustable weight system from 5–52.5 lbs. Replace an entire rack of dumbbells. Perfect for progressive overload in minimal space.",
    features: ["5–52.5 lbs range", "Quick-adjust mechanism", "Compact design"],
  },
  {
    title: "Cast Iron Kettlebell",
    price: "$44.99",
    originalPrice: "$59.99",
    image: "/images/products/kettlebell.png",
    tag: "Essential",
    desc: "Single-cast iron construction with powder-coated finish. Wide handle for two-hand swings. The core of any functional training routine.",
    features: ["35 lbs / 16 kg", "Powder-coated grip", "Flat base design"],
  },
  {
    title: "Calisthenics Parallettes",
    price: "$39.99",
    originalPrice: "$54.99",
    image: "/images/products/parallettes.png",
    tag: "Bodyweight",
    desc: "Heavy-duty steel parallettes with non-slip rubber feet. Ideal for L-sits, push-up variations, handstand training, and dips at home.",
    features: ["Steel construction", "Non-slip rubber feet", "Ergonomic grip"],
  },
  {
    title: "Ab Roller Wheel",
    price: "$24.99",
    originalPrice: "$34.99",
    image: "/images/products/abs-wheel.png",
    tag: "Core",
    desc: "Dual-wheel design for stability. Foam-padded handles for comfort. The most efficient core tool — 5 minutes is all you need.",
    features: ["Dual-wheel stability", "Foam grip handles", "Includes knee pad"],
  },
];

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    initials: 'MC',
    name: 'Marcus Cole',
    role: 'Software Engineer',
    quote: "The 15-minute routine changed how I approach discipline. No more 2-hour gym sessions — just simple, effective training that fits around my work schedule. Best investment I've made.",
    tags: [{ text: 'VERIFIED', type: 'featured' }, { text: '8-Week Plan', type: 'default' }],
    stats: [{ icon: Timer, text: '15 min/day' }, { icon: Flame, text: '8 weeks in' }],
    avatarGradient: 'linear-gradient(135deg, #0369a1, #0284c7)',
  },
  {
    id: 2,
    initials: 'SL',
    name: 'Sofia Laurent',
    role: 'Startup Founder',
    quote: "Replaced my 2-hour gym sessions with this system. Same physique, fraction of the time. The kettlebell and parallettes are all you need. No gimmicks, just results.",
    tags: [{ text: 'Equipment', type: 'default' }, { text: 'Home Gym', type: 'default' }],
    stats: [{ icon: Dumbbell, text: 'Home setup' }, { icon: ShieldCheck, text: 'Verified' }],
    avatarGradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    initials: 'JO',
    name: 'James Okafor',
    role: 'Finance Analyst',
    quote: "This program helped me stay consistent while building my career. The discipline plan removes all the friction — you just follow the system. Ab wheel + dumbbells. That's it.",
    tags: [{ text: 'Consistency', type: 'featured' }, { text: 'Discipline', type: 'default' }],
    stats: [{ icon: Target, text: 'Never missed' }, { icon: Calendar, text: '6 months' }],
    avatarGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 4,
    initials: 'AP',
    name: 'Aisha Patel',
    role: 'Medical Student',
    quote: "Finally a fitness routine that respects my time. 15 minutes and done. I'm in the best shape of my life while studying for exams. Discipline over motivation — this project gets it.",
    tags: [{ text: 'Student', type: 'default' }, { text: 'Time Saver', type: 'featured' }],
    stats: [{ icon: Clock, text: '15 min' }, { icon: ThumbsUp, text: 'Recommended' }],
    avatarGradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
  },
  {
    id: 5,
    initials: 'DK',
    name: 'David Kim',
    role: 'Creative Director',
    quote: "The calisthenics stand is built to last. Solid quality for the price. Love that the plan is free — the equipment is worth it though. Simple system, real results.",
    tags: [{ text: 'Equipment', type: 'default' }],
    stats: [{ icon: Users, text: '2,000+ community' }],
    avatarGradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
];


export default function Products() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-[#0369a1] selection:text-[#f4ebd0] pt-32 overflow-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
        <NeuralBackground className="absolute inset-0 z-0" color="#0369a1" trailOpacity={0.1} particleCount={450} speed={0.7} />

        <div className="container relative z-10 px-6 mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0369a1]/10 rounded-full border border-[#0369a1]/20 mb-12">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#0369a1]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0369a1]">Equipment</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-[#f4ebd0]">
              The{" "}
              <motion.span
                className="text-[#0369a1] inline-block"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Equipment
              </motion.span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-[#f4ebd0]/50 max-w-2xl mx-auto font-medium leading-relaxed">
              Simple, effective tools for the 15-minute discipline protocol. No gimmicks. Just equipment that works.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <NeuralBackground className="absolute inset-0 z-0" color="#0284c7" trailOpacity={0.08} particleCount={300} speed={0.6} />
        <DottedSurface className="opacity-10 relative z-10" />

        <div className="container relative z-20 px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {products.map((product, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  className="relative group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#0369a1]/30 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />

                  {/* Product Image */}
                  <div className="relative z-10 aspect-square overflow-hidden bg-[#111]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-[#0369a1] text-[#0a0a0a] text-[9px] font-black uppercase tracking-widest rounded-full">
                        {product.tag}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="relative z-10 p-6 md:p-8">
                    <div className="flex items-baseline justify-between mb-4">
                      <h3 className="text-xl md:text-2xl font-black text-[#f4ebd0] uppercase tracking-tight leading-tight">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-[#f4ebd0]/50 text-sm leading-relaxed mb-6">
                      {product.desc}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature, j) => (
                        <span
                          key={j}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#f4ebd0]/60"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-black text-[#f4ebd0]">{product.price}</span>
                        <span className="text-sm text-[#f4ebd0]/30 line-through">{product.originalPrice}</span>
                      </div>
                      <motion.button
                        className="px-5 py-2.5 bg-[#0369a1] text-[#f4ebd0] text-xs font-black uppercase tracking-widest rounded-full hover:bg-[#0284c7] transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GLASS TESTIMONIALS */}
      <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
        <div className="container relative z-10 px-6 mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0369a1]/10 rounded-full border border-[#0369a1]/20 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0369a1]">Community</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#f4ebd0] mb-4">
                What people <span className="text-[#0369a1]">say</span>
              </h2>
              <p className="text-[#f4ebd0]/40 text-lg max-w-xl mx-auto">
                Real feedback from people building discipline daily.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <TestimonialStack testimonials={testimonialsData} />
          </Reveal>
        </div>
      </section>

      {/* CTA EMAIL SECTION */}
      <section className="py-32 bg-[#0a0a0a] text-[#f4ebd0] relative overflow-hidden text-center border-t border-white/5">
        <NeuralBackground className="absolute inset-0 z-0 opacity-20" color="#0369a1" trailOpacity={0.05} particleCount={200} speed={0.5} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#f4ebd0] mb-6">
              Start with the <span className="text-[#0369a1]">free plan</span>
            </h2>
            <p className="text-lg md:text-xl text-[#f4ebd0]/40 max-w-2xl mx-auto mb-4 leading-relaxed">
              Equipment is optional. The 8-week discipline plan is free. Start there.
            </p>
            <p className="text-sm text-[#f4ebd0]/60 mb-12">
              Enter your email below to get the free 8-week discipline plan.
            </p>
            <div className="bg-[#111]/80 backdrop-blur-md border border-[#333] shadow-2xl shadow-black/50 rounded-[2.5rem] p-8 md:p-10 max-w-3xl mx-auto">
              <SignupForm buttonText="Get the Free Discipline Plan" />
              <p className="text-sm font-bold text-[#9ca3af] mt-4 tracking-wide">Join 2,000+ others building discipline daily.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-[#333] py-16 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Navigate</h4>
              <ul className="space-y-4">
                <li><Link href="/" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Home</Link></li>
                <li><Link href="/products" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Equipment</Link></li>
                <li><Link href="/about" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Mission</Link></li>
                <li><Link href="/about-us" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="https://instagram.com/max.dt88" target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@max.dt88?_r=1&_t=ZN-94mFUrNROJH" target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">TikTok</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><Link href="/#signup" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Free Program</Link></li>
                <li><Link href="/faq" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#6b7280] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-[#9ca3af] hover:text-[#f4ebd0] font-medium transition-colors text-sm">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#333] gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-[#f4ebd0] font-black text-sm">max</span>
                <TextShimmer baseColor="#0369a1" shimmerColor="#ffffff" className="text-sm font-black">.dt88</TextShimmer>
              </div>
              <span className="text-[#6b7280] text-xs">© 2026. All rights reserved.</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-[#f4ebd0]/20 uppercase font-black tracking-widest">
                INTERNAL DISTRIBUTION SYSTEM
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
