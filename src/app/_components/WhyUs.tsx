"use client";
import { motion } from "framer-motion";
import { Building2, Trees, Users2, Briefcase } from "lucide-react";

export default function WhyUs() {
  const whyUsData = [
    {
      id: 1,
      icon: <Building2 className="w-10 h-10 text-white" />,
      title: "Fasilitas Lengkap",
      description: "Penunjang belajar dengan kualitas premium.",
      delay: 0.1,
    },
    {
      id: 2,
      icon: <Trees className="w-10 h-10 text-white" />,
      title: "Lingkungan Nyaman",
      description: "Berada di lingkungan yang asri, aman, dan kondusif.",
      delay: 0.2,
    },
    {
      id: 3,
      icon: <Users2 className="w-10 h-10 text-white" />,
      title: "Pengajar Kompeten",
      description: "Guru yang up-to-date dengan perkembangan industri.",
      delay: 0.3,
    },
    {
      id: 4,
      icon: <Briefcase className="w-10 h-10 text-white" />,
      title: "Kerjasama Luas",
      description: "Memperbesar kesempatan bekerja sebelum lulus.",
      delay: 0.4,
    },
  ];

  return (
    <motion.div
      className="bg-white mx-auto mt-10 sm:mt-12 md:mt-16 pb-8 sm:pb-10 w-full max-w-[1280px]"
      id="why-us"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Judul */}
      <div className="px-4 sm:px-6 text-center">
        <motion.h4
          className="font-[500] text-gray-400 md:text-[15px] text-xs sm:text-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Why Us?
        </motion.h4>
        <motion.h2
          className="mt-2 font-[700] text-black md:text-[32px] lg:text-[40px] text-2xl sm:text-3xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Mengapa Harus Moklet ?
        </motion.h2>
        <motion.p
          className="mt-2 sm:mt-3 font-[400] text-black sm:text-[15px] text-sm leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Ini alasan mengapa anda harus memilih sekolah kami?
        </motion.p>
      </div>

      {/* Grid Card */}
      <motion.div
        className="gap-6 sm:gap-8 md:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8 sm:mt-10 px-4 sm:px-6 md:px-12 lg:px-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {whyUsData.map((item) => (
          <motion.div
            key={item.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item.delay }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            {/* ✅ Rounded Full Circle */}
            <div className="flex justify-center items-center bg-primary mb-4 sm:mb-5 rounded-full w-20 sm:w-24 h-20 sm:h-24">
              <div className="">
                {item.icon}
              </div>
            </div>

            <h3 className="font-bold text-[#333333] text-base sm:text-lg">{item.title}</h3>
            <p className="mt-2 px-2 text-gray-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
