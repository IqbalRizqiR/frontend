"use client";
import Image from "next/image";

import { motion } from "framer-motion";

export default function VisiMisi() {
  return (
    <section id="visi-misi" className="relative bg-[#D65C5C] mt-10 overflow-hidden text-white">
      {/* Wave atas */}
      <motion.div 
        className="-top-4 sm:-top-6 left-0 absolute w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <svg viewBox="0 0 1440 60" className="w-full h-[40px] sm:h-[60px]">
          <path
            d="M0 20 Q720 50 1440 20 L1440 0 Q720 10 0 0 Z"
            fill="#d1d1d1"
          />
        </svg>
      </motion.div>

      <motion.div 
        className="z-10 relative items-center gap-6 sm:gap-8 grid md:grid-cols-2 mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 max-w-7xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Teks */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="mb-3 sm:mb-4 font-bold text-xl sm:text-2xl md:text-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Visi
          </motion.h2>
          <motion.p 
            className="mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Mencetak lulusan berakhlak, ahli, dan berkebhinekaan global.
          </motion.p>

          <motion.h2 
            className="mb-3 sm:mb-4 font-bold text-xl sm:text-2xl md:text-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            Misi
          </motion.h2>
          <motion.ol 
            className="space-y-2 pl-4 sm:pl-5 text-sm sm:text-base leading-relaxed list-decimal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <li>Mengasuh MOKLETER menjadi pribadi yang religius dan tangguh</li>
            <li>
              Mengasah MOKLETER menjadi pribadi pembelajar sepanjang hayat di
              bidang teknologi Informasi dan Komunikasi
            </li>
            <li>
              Membekali MOKLETER dengan kompetensi berstandar internasional
            </li>
          </motion.ol>
        </motion.div>

        {/* Dekorasi kanan */}
        <motion.div 
          className="relative flex justify-center md:justify-end mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Logo besar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/assets/image/tsp.png"
              alt="Logo TS"
              width={250}
              height={250}
              className="opacity-80 w-40 sm:w-52 md:w-60 lg:w-64 h-40 sm:h-52 md:h-60 lg:h-64"
            />
          </motion.div>
          {/* Badge */}
          <motion.span 
            className="bottom-12 sm:bottom-16 md:bottom-20 left-28 sm:left-36 md:left-40 absolute bg-white/30 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-white text-sm sm:text-base md:text-lg lg:text-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
          >
            Visi & Misi
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
