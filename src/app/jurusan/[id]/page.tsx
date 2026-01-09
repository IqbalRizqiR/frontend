"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Network, Gamepad2, ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/app/_components/lib/api";

interface Expertise {
  id: number;
  name: string;
  major_id: number;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Major {
  id: number;
  name: string;
  thumbnail: string;
  short_description: string;
  long_description: string;
  created_at: string | null;
  updated_at: string | null;
  expertises: Expertise[];
}

// Helper function untuk mendapatkan ikon berdasarkan nama jurusan
const getJurusanIcon = (name: string) => {
  if (name.toLowerCase().includes("rpl") || name.toLowerCase().includes("perangkat lunak")) {
    return <Code className="w-16 h-16 text-white" />;
  } else if (name.toLowerCase().includes("tkj") || name.toLowerCase().includes("jaringan")) {
    return <Network className="w-16 h-16 text-white" />;
  } else if (name.toLowerCase().includes("game")) {
    return <Gamepad2 className="w-16 h-16 text-white" />;
  }
  return <Code className="w-16 h-16 text-white" />; // Default icon
};

// Helper function untuk mendapatkan warna gradient berdasarkan ID
const getJurusanColor = (id: number) => {
  const colors = [
    "from-slate-600 to-slate-800",
    "from-gray-700 to-gray-900",
    "from-zinc-600 to-zinc-800",
  ];
  return colors[(id - 1) % colors.length] || colors[0];
};

export default function DetailJurusan() {
  const router = useRouter();
  const { id } = useParams();
  const [jurusan, setJurusan] = useState<Major | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJurusan = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/major/${id}`);
        if (response.data.status) {
          setJurusan(response.data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching jurusan:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJurusan();
    }
  }, [id]);

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center bg-secondary min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="inline-block mb-4 border-4 border-white border-t-transparent rounded-full w-16 h-16 animate-spin"></div>
          <h1 className="font-bold text-white text-2xl">Memuat data...</h1>
        </div>
      </motion.div>
    );
  }

  if (error || !jurusan) {
    return (
      <motion.div
        className="flex justify-center items-center bg-secondary min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <h1 className="mb-4 font-bold text-white text-4xl">Jurusan tidak ditemukan</h1>
          <motion.button
            onClick={() => router.back()}
            className="bg-white hover:bg-gray-100 px-6 py-3 rounded-full font-semibold text-secondary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Kembali
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.section
      className="bg-white py-20 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto px-6 max-w-6xl container">
        {/* Back Button */}
        <motion.button
          onClick={() => router.back()}
          className="flex items-center mb-8 text-gray-700 hover:text-gray-900 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="mr-2 w-6 h-6" />
          Kembali
        </motion.button>

        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={`bg-gradient-to-br ${getJurusanColor(jurusan.id)} p-4 rounded-full`}>
              {getJurusanIcon(jurusan.name)}
            </div>
          </motion.div>
          <h1 className="mb-4 font-bold text-gray-900 text-5xl">{jurusan.name}</h1>
          <p className="mx-auto max-w-3xl text-gray-700 text-xl">{jurusan.short_description}</p>
        </motion.div>

        {/* Konten Utama */}
        <div className="items-start gap-10 grid md:grid-cols-2 mb-12">
          {/* Gambar */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={jurusan.thumbnail}
                alt={jurusan.name}
                width={600}
                height={400}
                className="shadow-2xl rounded-2xl object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Detail */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.h2
              className="mb-6 font-semibold text-gray-900 text-3xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Deskripsi Jurusan
            </motion.h2>
            <motion.p
              className="mb-8 text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {jurusan.long_description}
            </motion.p>
          </motion.div>
        </div>

        {/* Keahlian / Expertises */}
        {jurusan.expertises && jurusan.expertises.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.h2
              className="mb-8 font-bold text-gray-900 text-4xl text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Keahlian yang Dipelajari
            </motion.h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {jurusan.expertises.map((expertise, index) => (
                <motion.div
                  key={expertise.id}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg hover:shadow-xl p-6 border border-gray-200 rounded-xl transition-shadow"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      bounce: 0.4,
                      stiffness: 100
                    }
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <h3 className="mb-3 font-semibold text-gray-900 text-xl">{expertise.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{expertise.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <motion.a
            href="https://ppdb.telkomschools.sch.id/signup?lemdik=51"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 shadow-lg px-8 py-4 rounded-full font-bold text-white text-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Daftar Jurusan Ini
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
