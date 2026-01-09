"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/app/_components/lib/api";
import {
  Briefcase,
  GraduationCap,
  Quote,
  Mail,
  Linkedin,
  Instagram,
  MapPin,
  Calendar,
  Award,
  ArrowLeft,
  Building2,
} from "lucide-react";

interface AlumniDetail {
  id: number;
  name: string;
  slug: string;
  photo: string;
  angkatan: string;
  currentJob: string;
  company: string;
  quote: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  location?: string;
  graduationYear?: string;
  achievements?: string[];
  skills?: string[];
}

export default function AlumniDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [alumniData, setAlumniData] = useState<AlumniDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlumniDetail = async () => {
      try {
        const response = await api.get(`/alumni/${slug}`);
        console.log("Alumni detail response:", response.data);

        // Handle both response.data and response.data.data structures
        const data = response.data.data || response.data;
        setAlumniData(data);
      } catch (error) {
        console.error("Error fetching alumni detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchAlumniDetail();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-white min-h-screen">
        <div className="border-4 border-gray-200 border-t-primary rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (!alumniData) {
    return (
      <div className="flex flex-col justify-center items-center bg-white min-h-screen">
        <div className="mb-4 text-6xl">😕</div>
        <h2 className="mb-2 font-bold text-gray-800 text-2xl">
          Alumni Tidak Ditemukan
        </h2>
        <p className="mb-6 text-gray-600">
          Alumni yang Anda cari tidak tersedia
        </p>
        <button
          onClick={() => router.push("/alumni")}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-6 py-3 rounded-full font-semibold text-white transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Daftar Alumni
        </button>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Back Button */}
      <div className="mx-auto px-6 pt-8 max-w-7xl">
        <motion.button
          onClick={() => router.push("/alumni")}
          className="inline-flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-full font-medium text-gray-700 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="mx-auto px-6 py-12 max-w-7xl">
        <div className="gap-12 grid grid-cols-1 lg:grid-cols-3">
          {/* Left - Photo */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-white shadow-xl border-4 border-gray-100 rounded-3xl overflow-hidden">
              <div className="relative w-full h-96">
                <Image
                  src={alumniData.photo}
                  alt={alumniData.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Badge Angkatan */}
              <div className="top-6 left-6 absolute">
                <div className="flex items-center gap-2 bg-white/95 shadow-lg backdrop-blur-sm px-4 py-2 rounded-full">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary">
                    Angkatan {alumniData.angkatan}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Name & Title */}
              <div>
                <h1 className="mb-3 font-bold text-gray-800 text-4xl md:text-5xl">
                  {alumniData.name}
                </h1>
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase className="w-6 h-6 text-secondary" />
                  <p className="font-semibold text-gray-900 text-xl">
                    {alumniData.currentJob}
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-700 text-lg">{alumniData.company}</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4">
                {alumniData.location && (
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">
                      {alumniData.location}
                    </span>
                  </div>
                )}
                {alumniData.graduationYear && (
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm">
                      Lulus {alumniData.graduationYear}
                    </span>
                  </div>
                )}
              </div>

              {/* Quote */}
              <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 shadow-md p-6 border-2 border-primary/20 rounded-2xl">
                <Quote className="top-4 left-4 absolute w-10 h-10 text-primary/20" />
                <p className="pl-8 font-medium text-gray-700 text-lg italic leading-relaxed">
                  "{alumniData.quote}"
                </p>
              </div>

              {/* Bio */}
              {alumniData.bio && (
                <div className="bg-white shadow-md p-6 border border-gray-200 rounded-2xl">
                  <h3 className="flex items-center gap-2 mb-4 font-bold text-gray-800 text-xl">
                    <Award className="w-6 h-6 text-secondary" />
                    Tentang
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {alumniData.bio}
                  </p>
                </div>
              )}

              {/* Social Links */}
              {(alumniData.email ||
                alumniData.linkedin ||
                alumniData.instagram) && (
                <div className="bg-white shadow-md p-6 border border-gray-200 rounded-2xl">
                  <h3 className="mb-4 font-bold text-gray-800 text-xl">
                    Kontak & Media Sosial
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {alumniData.email && (
                      <a
                        href={`mailto:${alumniData.email}`}
                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full font-medium text-blue-700 text-sm transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                    )}
                    {alumniData.linkedin && (
                      <a
                        href={alumniData.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full font-medium text-blue-700 text-sm transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                    )}
                    {alumniData.instagram && (
                      <a
                        href={alumniData.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-full font-medium text-pink-700 text-sm transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills & Achievements Section */}
      <section className="bg-white py-16">
        <div className="mx-auto px-6 max-w-7xl">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
            {/* Skills */}
            {alumniData.skills && alumniData.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-primary/5 to-white shadow-lg p-8 border border-primary/20 rounded-3xl">
                  <h3 className="flex items-center gap-2 mb-6 font-bold text-gray-800 text-2xl">
                    <Award className="w-6 h-6 text-primary" />
                    Keahlian
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {alumniData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-white shadow-md px-4 py-2 rounded-full font-medium text-gray-700 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Achievements */}
            {alumniData.achievements && alumniData.achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-secondary/5 to-white shadow-lg p-8 border border-secondary/20 rounded-3xl">
                  <h3 className="flex items-center gap-2 mb-6 font-bold text-gray-800 text-2xl">
                    <Award className="w-6 h-6 text-secondary" />
                    Pencapaian
                  </h3>
                  <ul className="space-y-3">
                    {alumniData.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="flex flex-shrink-0 justify-center items-center bg-secondary/20 mt-1 rounded-full w-6 h-6 font-bold text-secondary text-xs">
                          ✓
                        </span>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16">
        <div className="mx-auto px-6 max-w-7xl text-center">
          <motion.h2
            className="mb-4 font-bold text-white text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ingin Bergabung dengan Alumni Sukses Lainnya?
          </motion.h2>
          <motion.p
            className="mb-8 text-white/90 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Mulai perjalanan kesuksesan Anda bersama SMK Telkom Malang
          </motion.p>
          <motion.a
            href="https://ppdb.telkomschools.sch.id/signup?lemdik=51"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white hover:bg-gray-100 shadow-lg px-8 py-4 rounded-full font-bold text-primary text-xl transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Daftar Sekarang
          </motion.a>
        </div>
      </section>
    </main>
  );
}
