"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Daftar Akun",
  "Pilih Gelombang",
  "Isi Identitas Diri",
  "Unggah Berkas",
  "Pilih Jurusan",
  "Bayar Pendaftaran",
  "Cetak Kartu Peserta",
];

// Detail langkah sesuai urutan di situs SMK Telkom Malang
const stepDetails: Record<number, string[]> = {
  0: [
    'Klik tombol "Daftar Sekarang" di atas',
    "Pilih tab Daftar",
    "Masukkan data awal pendaftaran",
    "Login menggunakan email dan password ketika daftar",
  ],
  1: ["Pilih gelombang pendaftaran yang tersedia sesuai jadwal."],
  2: ["Isi identitas diri lengkap sesuai data diri calon peserta didik."],
  3: ["Unggah berkas persyaratan pendaftaran sesuai petunjuk."],
  4: ["Pilih jurusan sesuai minat dan bakat Anda."],
  5: ["Lakukan pembayaran biaya pendaftaran melalui sistem yang disediakan."],
  6: ["Cetak kartu peserta dan simpan untuk keperluan tes masuk."],
};

export default function AlurPendaftaran() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <motion.section
      id="alur-pendaftaran"
      className="bg-white py-12 sm:py-16 md:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="items-center gap-6 sm:gap-8 md:gap-10 grid md:grid-cols-2 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 container">
        {/* Kiri: konten teks */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="mb-2 font-bold text-gray-900 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Alur Pendaftaran
          </motion.h2>
          <motion.p
            className="mb-4 sm:mb-6 font-light text-gray-600 text-2xl sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            bagaimana?
          </motion.p>
          <motion.p
            className="mb-6 sm:mb-8 max-w-lg text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Terdapat beberapa step pendaftaran yang harus dipenuhi agar semua
            rangkaian pendaftaran hingga seleksi berjalan dengan lancar.
          </motion.p>

          {/* Langkah-langkah */}
          <motion.div
            className="gap-2 sm:gap-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-6 sm:mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {steps.map((step, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`py-6 sm:py-8 md:py-10 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeStep === idx
                    ? "bg-secondary text-white shadow-md"
                    : "bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
                }`}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-1 font-semibold text-base sm:text-lg">{idx + 1}</div>
                {step}
              </motion.button>
            ))}
          </motion.div>

          {/* Detail langkah aktif */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={activeStep}
              className="space-y-2 sm:space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {stepDetails[activeStep]?.map((text, i) => (
                <motion.li
                  key={i}
                  className="flex items-start space-x-2 sm:space-x-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <CheckSquare className="flex-shrink-0 mt-0.5 w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
                  <span className="text-gray-700 text-sm sm:text-base">{text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </motion.div>

        {/* Kanan: ilustrasi */}
        <motion.div
          className="flex justify-center mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px]"
          >
            <Image
              src="https://res.cloudinary.com/dvpb6z2oj/image/upload/Telemedicine_01_1_ue0yor"
              alt="Ilustrasi pendaftaran siswa"
              width={500}
              height={400}
              className="drop-shadow-md w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
