"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Award, 
  Users, 
  Building2, 
  BookOpen, 
  Lightbulb,
  Trophy,
  GraduationCap,
  Rocket
} from "lucide-react";

export default function Sejarah() {
  const milestones = [
    {
      year: "1992",
      title: "Pendirian",
      description: "SMK Telkom Malang didirikan sebagai sekolah vokasi pertama di bidang TIK di bawah naungan Yayasan Pendidikan Telkom (YPT)",
      icon: <Building2 className="w-8 h-8" />,
      color: "from-primary to-secondary"
    },
    {
      year: "1995",
      title: "Akreditasi Pertama",
      description: "Mendapatkan akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M)",
      icon: <Award className="w-8 h-8" />,
      color: "from-primary to-secondary"
    },
    {
      year: "2000",
      title: "Kemitraan Industri",
      description: "Menjalin kerjasama dengan berbagai perusahaan teknologi nasional dan internasional",
      icon: <Users className="w-8 h-8" />,
      color: "from-primary to-secondary"
    },
    {
      year: "2010",
      title: "Pengembangan Kurikulum",
      description: "Implementasi kurikulum berbasis industri 4.0 dengan fokus pada teknologi terkini",
      icon: <BookOpen className="w-8 h-8" />,
      color: "from-primary to-secondary"
    },
    {
      year: "2015",
      title: "Prestasi Nasional",
      description: "Meraih berbagai penghargaan dalam kompetisi teknologi tingkat nasional dan internasional",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-primary to-secondary"
    },
    {
      year: "2020",
      title: "Era Digital",
      description: "Transformasi digital dengan learning management system modern dan fasilitas laboratorium canggih",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "from-primary to-secondary"
    },
    {
      year: "2025",
      title: "Masa Kini",
      description: "Menjadi pusat pendidikan vokasi unggulan dengan ribuan alumni sukses di industri teknologi",
      icon: <Rocket className="w-8 h-8" />,
      color: "from-primary to-secondary"
    }
  ];

  const achievements = [
    {
      number: "30+",
      label: "Tahun Pengalaman",
      icon: <Calendar className="w-10 h-10" />,
      color: "from-primary to-secondary"
    },
    {
      number: "5000+",
      label: "Alumni Sukses",
      icon: <GraduationCap className="w-10 h-10" />,
      color: "from-primary to-secondary"
    },
    {
      number: "100+",
      label: "Mitra Industri",
      icon: <Users className="w-10 h-10" />,
      color: "from-primary to-secondary"
    },
    {
      number: "50+",
      label: "Prestasi Nasional",
      icon: <Trophy className="w-10 h-10" />,
      color: "from-primary to-secondary"
    }
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative bg-secondary mt-10 py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="top-0 left-1/4 absolute bg-white blur-3xl rounded-full w-96 h-96"></div>
          <div className="right-1/4 bottom-0 absolute bg-white blur-3xl rounded-full w-96 h-96"></div>
        </div>

        <div className="relative mx-auto px-6 max-w-7xl container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="mb-6 font-bold text-white text-5xl md:text-6xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Sejarah SMK Telkom Malang
            </motion.h1>
            <motion.p
              className="mx-auto mb-8 max-w-3xl text-white/90 text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Perjalanan panjang pendidikan vokasi di bidang teknologi informasi dan komunikasi
            </motion.p>
            <motion.div
              className="bg-white/30 mx-auto rounded-full w-24 h-1"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Stats */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-6 max-w-7xl">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                className="group relative flex flex-col items-center bg-white shadow-lg hover:shadow-2xl p-8 rounded-3xl overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <motion.div
                  className={`bg-gradient-to-br ${item.color} shadow-lg mb-4 rounded-2xl p-4 text-white`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                
                <h3 className="mb-2 font-bold text-gray-900 text-4xl">{item.number}</h3>
                <p className="text-gray-600 text-center">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mx-auto px-6 py-20 max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 font-bold text-gray-900 text-4xl">Perjalanan Kami</h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Jejak langkah SMK Telkom Malang dari masa ke masa
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden lg:block top-0 bottom-0 left-1/2 absolute bg-secondary rounded-full w-1 -translate-x-1/2"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <motion.div
                    className="group relative bg-white shadow-lg hover:shadow-2xl p-8 rounded-3xl overflow-hidden transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    <div className="z-10 relative flex items-start gap-4">
                      <motion.div
                        className={`bg-gradient-to-br ${milestone.color} shadow-lg rounded-2xl p-3 text-white flex-shrink-0`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {milestone.icon}
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`bg-gradient-to-r ${milestone.color} bg-clip-text font-bold text-3xl text-transparent`}>
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="mb-3 font-bold text-gray-900 text-xl">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Center Dot (Desktop only) */}
                <div className="hidden lg:block z-10 relative flex-shrink-0">
                  <motion.div
                    className={`bg-gradient-to-br ${milestone.color} shadow-xl rounded-full w-6 h-6`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.5 }}
                  />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block flex-1 w-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-secondary py-16">
        <div className="mx-auto px-6 max-w-7xl text-center">
          <motion.h2
            className="mb-4 font-bold text-white text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Bergabunglah Dengan Sejarah Kami
          </motion.h2>
          <motion.p
            className="mb-8 text-white/90 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Jadilah bagian dari generasi penerus yang membawa nama SMK Telkom Malang ke tingkat yang lebih tinggi
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
