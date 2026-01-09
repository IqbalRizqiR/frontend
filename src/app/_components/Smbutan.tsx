'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const Sambutan = () => {
  return (
    <>
    <section id="sambutan" className='relative bg-gradient-to-br from-secondary via-secondary to-primary/20 py-12 sm:py-16 md:py-20 overflow-hidden'>
     
        
            <motion.div
              className='-top-[15px] left-0 absolute w-full overflow-hidden leading-none'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <svg
                style={{ marginTop: '-20px' }}
                width='1440'
                height='60'
                viewBox='0 0 1440 60'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-full h-auto'
              >
                <path
                  d='M0 20 Q720 50 1440 20 L1440 0 Q720 10 0 0 Z'
                  fill='url(#gradienName)'
                />
                <defs>
                  <linearGradient
                    id='gradienName'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='100%'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#E9E2EA' />
                    <stop offset='1' stopColor='#F5F5F5' />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
      <div className='relative mx-auto px-4 sm:px-6 md:px-8 max-w-7xl container'>
        {/* Section Title */}
        <motion.div
          className='mb-10 sm:mb-12 md:mb-16 text-center'
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className='mb-3 sm:mb-4 px-4 font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Sambutan Kepala Sekolah
          </motion.h2>
          <motion.div
            className='bg-white/30 mx-auto rounded-full w-16 sm:w-20 md:w-24 h-1'
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>

        {/* Main Content */}
        <div className='items-center gap-8 sm:gap-10 md:gap-12 grid lg:grid-cols-2'>
          {/* Photo Section */}
          <motion.div
            className='relative'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className='relative'>
              {/* Photo Container */}
              <motion.div
                className='z-10 relative shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden'
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4,
                  type: "spring",
                  bounce: 0.3
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src='https://res.cloudinary.com/dvpb6z2oj/image/upload/image1001_ftixjo' // Ganti dengan path foto kepala sekolah
                  alt='Kepala Sekolah SMK Telkom Malang'
                  width={600}
                  height={700}
                  className='w-full h-auto object-cover'
                />
                
                {/* Name Card Overlay */}
                <motion.div
                  className='bottom-0 left-0 absolute bg-gradient-to-t from-primary/95 to-transparent backdrop-blur-sm px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 w-full'
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className='mb-1 font-bold text-white text-lg sm:text-xl md:text-2xl'>
                    Rahmat Dwi Djatmiko, S.Kom
                  </h3>
                  <p className='text-white/90 text-sm sm:text-base md:text-lg'>Kepala Sekolah</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Message Section */}
          <motion.div
            className='relative mt-8 lg:mt-0'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Quote Icon */}
            <motion.div
              className='mb-4 sm:mb-6'
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Quote className='w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 text-white/40' />
            </motion.div>

            {/* Message Content */}
            <motion.div
              className='space-y-4 sm:space-y-5 md:space-y-6'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <p className='font-medium text-white/95 text-base sm:text-lg md:text-xl leading-relaxed'>
                Assalamu'alaikum Warahmatullahi Wabarakatuh,
              </p>
              
              <p className='text-white/90 text-sm sm:text-base md:text-lg leading-relaxed'>
                Puji syukur kehadirat Allah SWT yang telah memberikan rahmat dan karunia-Nya kepada kita semua. 
                Selamat datang di <span className='font-semibold text-white'>SMK Telkom Malang</span>, sekolah 
                yang berkomitmen mencetak generasi unggul di bidang teknologi informasi dan komunikasi.
              </p>

              <p className='text-white/90 text-sm sm:text-base md:text-lg leading-relaxed'>
                Kami terus berinovasi dalam memberikan pendidikan berkualitas dengan memadukan 
                <span className='font-semibold text-white'> kurikulum akademis yang solid</span>, 
                <span className='font-semibold text-white'> pelatihan keterampilan praktis</span>, dan 
                <span className='font-semibold text-white'> pembentukan karakter</span> yang kuat. 
                Dengan dukungan tenaga pengajar profesional, fasilitas modern, dan kerja sama industri, 
                kami siap mengantarkan siswa meraih prestasi gemilang dan karir cemerlang.
              </p>

              <p className='text-white/90 text-sm sm:text-base md:text-lg leading-relaxed'>
                Mari bersama-sama kita wujudkan visi menjadi lembaga pendidikan teknologi terdepan 
                yang menghasilkan lulusan kompeten, berkarakter, dan siap bersaing di era digital global.
              </p>

              <motion.p
                className='pt-3 sm:pt-4 font-semibold text-white text-base sm:text-lg md:text-xl'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                Wassalamu'alaikum Warahmatullahi Wabarakatuh
              </motion.p>
            </motion.div>

            {/* Signature */}
            <motion.div
              className='flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              viewport={{ once: true }}
            >
              <div className='flex-1 bg-white/30 rounded h-0.5'></div>
              <div className='text-right'>
                <p className='font-bold text-white text-sm sm:text-base md:text-lg'>Rahmat Dwi Djatmiko, S.Kom</p>
                <p className='text-white/80 text-xs sm:text-sm md:text-base'>Kepala Sekolah</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
   
    </section>
        <motion.div
              className='block bg-[#E9E2EA] h-5'
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            ></motion.div>
    </>
    
  )
}

export default Sambutan