"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Plane,
  MapPin,
  Clock,
  AlertTriangle,
  Info,
  Calendar,
  Camera,
  CheckCircle2,
  Globe,
  ArrowDown
} from "lucide-react";
import { useRef } from "react";

// --- Sub-components ---

const Hero = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
        <Image
          src="https://i.pinimg.com/1200x/e0/57/cf/e057cf6f9fd99510434b05ea95556549.jpg"
          alt="Nepal Himalayas"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
      </motion.div>

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <span className="h-px w-12 bg-[#ea580c]" />
          <span className="text-[#ea580c] text-xs md:text-sm uppercase tracking-[0.5em] font-bold">Essential Travel Intel</span>
          <span className="h-px w-12 bg-[#ea580c]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-[var(--heading-font)] text-[clamp(2.5rem,10vw,6rem)] font-extrabold text-white leading-tight tracking-tighter"
        >
          Nepal <span className="text-[#ea580c] italic font-light">Visa Guide</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 text-lg md:text-2xl text-stone-200 font-light max-w-3xl mx-auto leading-relaxed"
        >
          Your gateway to the roof of the world starts here. Comprehensive details for a seamless entry into the Himalayas.
        </motion.p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-[10px] uppercase tracking-[0.3em]">Explore More</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </motion.div>
    </section>
  );
};

// const Intro = () => (
//   <section className="relative py-24 bg-stone-50 overflow-hidden">
//     <div className="container-max relative z-10">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
//         className="max-w-4xl mx-auto text-center"
//       >
//         <div className="flex items-center justify-center gap-4 mb-8">
//           <span className="h-px w-12 bg-secondary/30" />
//           <span className="text-secondary text-xs uppercase tracking-[0.4em] font-bold">The First Step</span>
//           <span className="h-px w-12 bg-secondary/30" />
//         </div>
//         <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold leading-tight text-stone-900 mb-8">
//           Navigating Your <span className="text-secondary italic font-light">Gateway</span> to the Himalayas
//         </h2>
//         <p className="text-stone-600 text-lg font-light leading-relaxed mb-10">
//           Embarking on a journey to Nepal is an invitation to witness the extraordinary.
//           Whether you are here to scale legendary peaks or find tranquility in ancient temples,
//           a seamless entry is where your story begins.
//         </p>
//         <div className="flex justify-center">
//           <div className="h-16 w-px bg-gradient-to-b from-secondary/40 to-transparent" />
//         </div>
//       </motion.div>
//     </div>
//   </section>
// );

const Requirements = ({ variants, itemVariants }: any) => (
  <section className="py-16 bg-stone-50">
    <div className="container-max">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 font-[var(--heading-font)] text-stone-900">Visa <span className="italic font-light">Requirements</span></h2>
        <p className="text-stone-500 tracking-widest uppercase text-[10px] font-bold">Who needs a visa to enter Nepal?</p>
      </div>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8"
      >
        <motion.div variants={itemVariants} className="group relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-10 shadow-md transition-all duration-500 hover:shadow-xl hover:border-[#ea580c]/30">
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#ea580c]/10 flex items-center justify-center mb-8">
              <ShieldCheck size={32} className="text-[#ea580c]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-[var(--heading-font)]">Visa Exempt</h3>
            <p className="text-stone-600 mb-8 leading-relaxed text-sm">Nationals of certain countries enjoy free movement to Nepal. Note that valid identification is still required.</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ea580c] text-white text-[10px] font-bold uppercase tracking-widest mb-6">
              <Globe size={12} /> Indian Nationals
            </div>
            <ul className="space-y-3">
              {["Unrestricted entry and movement", "Valid Passport or Voter ID required", "No visa fees or duration limits"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-700 text-sm">
                  <CheckCircle2 size={14} className="text-[#ea580c] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="group relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-10 shadow-md transition-all duration-500 hover:shadow-xl hover:border-[#b45309]/30">
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[#b45309]/10 flex items-center justify-center mb-8">
              <Plane size={32} className="text-[#b45309]" />
            </div>
            <h3 className="text-2xl font-bold mb-4 font-[var(--heading-font)]">Visa Required</h3>
            <p className="text-stone-600 mb-8 leading-relaxed text-sm">Most international travelers require a tourist visa, which is conveniently available through various methods.</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b45309] text-white text-[10px] font-bold uppercase tracking-widest mb-6">Global Citizens</div>
            <ul className="space-y-3">
              {["Visa on Arrival available at major ports", "Electronic Visa (e-Visa) recommended", "Multiple entry options available"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-700 text-sm">
                  <CheckCircle2 size={14} className="text-[#b45309] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Fees = () => (
  <section className="py-16 bg-stone-50">
    <div className="container-max">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 font-[var(--heading-font)] text-stone-900">Entry <span className="italic font-light">Fees</span></h2>
        <p className="text-stone-500 tracking-widest uppercase text-[10px] font-bold">Updated for 2025 • Rates in USD</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { days: 15, fee: 30, tag: "Express", icon: Clock },
          { days: 30, fee: 50, tag: "Classic", icon: Globe, popular: true },
          { days: 90, fee: 125, tag: "Expedition", icon: MapPin }
        ].map((v, i) => (
          <div key={i} className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 ${v.popular ? 'bg-[#ea580c] border-none scale-105 z-10 shadow-2xl' : 'bg-white border-stone-100 hover:border-[#ea580c]/30 shadow-sm'}`}>
            {v.popular && <div className="absolute top-6 right-6 bg-white/20 px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] text-white">Popular</div>}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${v.popular ? 'bg-white/20' : 'bg-[#ea580c]/10'}`}>
              <v.icon size={20} className={v.popular ? 'text-white' : 'text-[#ea580c]'} />
            </div>
            <h4 className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-2 ${v.popular ? 'text-white/80' : 'text-stone-400'}`}>{v.tag}</h4>
            <div className="flex items-baseline gap-2 mb-8">
              <span className={`text-5xl font-black ${v.popular ? 'text-white' : 'text-stone-900'}`}>{v.days}</span>
              <span className={`text-lg font-light opacity-60 ${v.popular ? 'text-white/60' : 'text-stone-500'}`}>Days</span>
            </div>
            <div className="flex items-center gap-4">
              <div className={`text-2xl font-bold ${v.popular ? 'text-white' : 'text-[#ea580c]'}`}>${v.fee}</div>
              <div className={`h-px flex-grow ${v.popular ? 'bg-white/20' : 'bg-stone-100'}`} />
              <Info size={14} className={v.popular ? "text-white/40" : "text-stone-300"} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Checkpoints = () => (
  <section className="py-16 bg-stone-50">
    <div className="container-max grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <h2 className="text-3xl font-bold mb-6 font-[var(--heading-font)] text-stone-900">Entry <span className="italic font-light">Checkpoints</span></h2>
        <p className="text-stone-600 leading-relaxed mb-8 text-sm">Nepal's border access is designed for convenience, with dedicated counters at all major international hubs.</p>
        <div className="p-6 rounded-3xl bg-[#b45309]/5 border border-[#b45309]/10">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle size={18} className="text-[#b45309]" />
            <span className="font-bold uppercase tracking-wider text-[10px] text-[#b45309]">Pro Tip</span>
          </div>
          <p className="text-stone-600 text-xs leading-relaxed">Carry exact USD cash and 2 recent passport photos to expedite the process.</p>
        </div>
      </div>
      <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <Plane className="text-[#ea580c]" size={24} />
            <h4 className="text-lg font-bold">Air Hubs</h4>
          </div>
          <ul className="space-y-4 text-stone-700">
            {["Tribhuvan Int'l, Kathmandu", "Gautam Buddha Int'l, Bhairahawa", "Pokhara International Airport"].map(a => (
              <li key={a} className="flex items-start gap-3 text-sm font-medium"><MapPin size={12} className="mt-1 text-[#ea580c] opacity-60" /> {a}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-6">
            <Globe className="text-[#b45309]" size={24} />
            <h4 className="text-lg font-bold">Land Borders</h4>
          </div>
          <div className="space-y-4">
            <div>
              <span className="text-[8px] font-bold uppercase text-stone-400 tracking-widest block mb-2">From India</span>
              <div className="flex flex-wrap gap-2">{["Belahiya", "Birgunj", "Kakarbhitta"].map(l => <span key={l} className="text-[10px] px-3 py-1 bg-stone-50 rounded-full border border-stone-100">{l}</span>)}</div>
            </div>
            <div>
              <span className="text-[8px] font-bold uppercase text-stone-400 tracking-widest block mb-2">From China</span>
              <div className="flex flex-wrap gap-2">{["Rasuwa Gadhi", "Kodari"].map(l => <span key={l} className="text-[10px] px-3 py-1 bg-stone-50 rounded-full border border-stone-100">{l}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const QuickInfo = () => (
  <section className="py-16 bg-stone-50">
    <div className="container-max grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { title: "Passport", desc: "6 Months validity", icon: Globe },
        { title: "Pages", desc: "2 Blank pages min", icon: Info },
        { title: "Photos", desc: "Digital/Print copy", icon: Camera },
        { title: "Validity", desc: "From entry date", icon: Calendar }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-white border border-stone-100 shadow-sm transition-all duration-500">
          <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center mb-4"><item.icon size={16} className="text-[#ea580c]" /></div>
          <h5 className="font-bold text-sm mb-1 text-stone-900">{item.title}</h5>
          <p className="text-stone-500 text-[10px]">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const VisaCTA = () => (
  <section className="py-24 bg-stone-50">
    <div className="container-max">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[3rem] bg-stone-900 border border-stone-800 p-12 md:p-20 text-center text-white shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-[var(--heading-font)] text-stone-50">Ready for your <span className="text-[#ea580c] italic font-light">Adventure?</span></h2>
          <p className="text-stone-400 text-lg mb-12 font-light">Visa regulations can evolve. For the most current protocols, visit the official portal.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="https://www.immigration.gov.np" target="_blank" rel="noopener noreferrer" className="group relative px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full overflow-hidden transition-all duration-500 hover:text-stone-50">
              <span className="relative z-10 flex items-center gap-2">Official Portal <Globe size={14} /></span>
              <div className="absolute inset-0 bg-[#ea580c] translate-y-full group-hover:translate-y-0 transition-transform duration-500 " />
            </a>
            <div className="flex items-center gap-3 text-stone-500 text-[10px] italic"><Info size={14} /> Updated as of Dec 2025</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// --- Main Component ---

const VisaInfo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div ref={containerRef} className="relative bg-stone-50 overflow-hidden">
      <Hero scrollYProgress={scrollYProgress} />
      {/* <Intro /> */}
      <div className="relative">
        <Requirements variants={containerVariants} itemVariants={itemVariants} />
        <Fees />
        <Checkpoints />
        <QuickInfo />
        <VisaCTA />
      </div>
    </div>
  );
};

export default VisaInfo;