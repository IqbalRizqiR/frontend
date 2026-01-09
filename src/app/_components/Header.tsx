"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <>
      <motion.div 
        className='mt-16 sm:mt-20 md:mt-24 lg:mt-28 px-4 sm:px-6 lg:px-8'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className='mx-auto max-w-7xl text-center'>
          <motion.h1 
            className='font-bold text-primary 2xl:text-[60px] xl:text-[50px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The Real Informatics School!
          </motion.h1>
          <motion.h3 
            className='mt-2 sm:mt-3 font-semibold sm:font-bold text-primary 2xl:text-[40px] text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Pelopor SMK Bidang Teknologi dan Informatika di Indonesia
          </motion.h3>
          <motion.p 
            className='mx-auto mt-4 sm:mt-5 md:mt-6 max-w-4xl font-normal text-black text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl leading-relaxed'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <b className='text-primary'>Moklet Portal</b> adalah pusat informasi
            digital <b>SMK Telkom Malang</b> yang menyajikan berita, agenda,
            pengumuman, dan <br /> prestasi sekolah secara cepat dan mudah
            diakses oleh siswa, guru, orang tua, maupun masyarakat.
          </motion.p>
        </div>
        <motion.div 
          className='drop-shadow-[0_4px_25px_rgba(225,95,96,0.35)] mt-6 sm:mt-8 md:mt-10 text-center'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
         
            transition={{ duration: 0.3 }}
          >
            <Image
              src='/assets/image/bombi.png'
              alt='Bombi'
              width={400}
              height={400}
              className='z-[-1] relative mx-auto w-48 sm:w-56 md:w-72 lg:w-80 xl:w-[400px] duration-300'
            />
          </motion.div>
          <motion.a
            href="#berita"
            className="flex justify-center items-center bg-primary hover:bg-opacity-90 hover:shadow-lg mx-auto py-2.5 sm:py-3 md:py-4 xl:py-5 rounded-full w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[450px] font-bold text-white text-lg sm:text-xl md:text-2xl xl:text-4xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ikuti Kami!
          </motion.a>
        </motion.div>


        <div className='hidden lg:block'>
          <div className='2xl:top-[-820px] xl:top-[-700px] 2xl:left-[-100px] xl:left-[-150px] xl:relative xl'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src='/assets/image/server-rack.png'
                alt='Server Rack'
                width={72}
                height={72}
                className='top-[150px] left-[153px] absolute rotate-[-5deg]]'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotate: -127 }}
              whileInView={{ opacity: 1, rotate: -127 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
  
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src='/assets/image/Polygon21.png'
                alt='segitiga kiri'
                width={343.5}
                height={307.5}
                className='top-[359px] left-[200px] absolute'
              />
            </motion.div>
          </div>

          <div className='2xl:top-[-700px] xl:top-[-600px] 2xl:right-[100px] xl:right-[50px] xl:relative'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src='/assets/image/Polygon20.png'
                alt='triangle kanan'
                width={318}
                height={283.5}
                className='top-[377px] right-[100px] absolute'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src='/assets/image/laptop.png'
                alt='desktop'
                width={65}
                height={65}
                className='top-[400px] right-[350px] absolute'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: -5 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src='/assets/image/Group1395.png'
                alt='Server Rack'
                width={32}
                height={28}
                className='top-[183px] right-[295px] absolute rotate-[-5deg]'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src='/assets/image/Group1395.png'
                alt='triangle besar'
                width={90}
                height={81}
                className='top-[264px] right-[108px] absolute'
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src='/assets/image/vector40.png'
              alt='panah kiri'
              width={161}
              height={32}
              className='top-[640px] 2xl:top-[900px] xl:top-[700px] left-[320px] 2xl:left-[400px] xl:left-[400px] absolute'
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src='/assets/image/Vector39.png'
              alt='panah kanan'
              width={161}
              height={32}
              className='top-[485px] lg:top-[500px] 2xl:top-[650px] xl:top-[550px] right-[50px] 2xl:right-[500px] xl:right-[400px] absolute'
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Segitiga dekorasi atas */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <Image
          src="/assets/image/Group14556.png"
          alt="triangle top left"
          width={80}
          height={80}
          className="hidden md:block top-12 md:top-20 lg:top-59 left-6 md:left-12 lg:left-24 absolute"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <Image
          src="/assets/image/Group1395.png"
          alt="triangle top right"
          width={80}
          height={80}
          className="hidden md:block top-12 md:top-16 lg:top-59 right-6 md:right-12 lg:right-24 absolute"
        />
      </motion.div>
    </>
  );
}
