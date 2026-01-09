'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Prestasi {
  title: string
  target: number
  suffix?: string
}

interface murid {
  title: string
  target: number
  suffix?: string
}

const prestasiData: Prestasi[] = [
  {
    title: 'Alumni bekerja di perusahaan IT ternama',
    target: 150, // Ganti dengan angka sebenarnya
    suffix: '+'
  },
  {
    title: 'Alumni melanjutkan kuliah di universitas unggulan',
    target: 200, // Ganti dengan angka sebenarnya
    suffix: '+'
  },
  {
    title: 'Prestasi lomba tingkat nasional',
    target: 50, // Ganti dengan angka sebenarnya
    suffix: '+'
  },
  {
    title: 'Mitra industri aktif',
    target: 30, // Ganti dengan angka sebenarnya
    suffix: '+'
  }
]

const murid = [
  {
    title: 'RPL (Rekayasa Perangkat Lunak) ',
    target: 500,
    suffix: '+'
  },
  {
    title: 'TKJ (Teknik Komputer dan Jaringan) ',
    target: 500,
    suffix: '+'
  },
  {
    title: 'TKJ (Teknik Komputer dan Jaringan) ',
    target: 500,
    suffix: '+'
  }
]

const CounterCard: React.FC<{ prestasi: Prestasi }> = ({ prestasi }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const duration = 2000 // Durasi animasi dalam ms
    const increment = prestasi.target / (duration / 50)
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= prestasi.target) {
          clearInterval(timer)
          return prestasi.target
        }
        return Math.ceil(prev + increment)
      })
    }, 50)
    return () => clearInterval(timer)
  }, [prestasi.target])
  return (
    <motion.div
      className='relative bg-white shadow-2xl backdrop-blur-sm mx-auto p-8 sm:p-12 md:p-16 lg:p-18 border-2 border-gray-300/50 sm:border-3 md:border-4 rounded-full w-[200px] sm:w-[250px] md:w-[280px] lg:w-[300px] h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] text-center hover:scale-110 transition-all duration-500 transform'
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          type: 'spring',
          bounce: 0.5,
          stiffness: 100
        }
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      animate={{ y: [0, -10, 0] }} // Constant bouncing animation
      transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
    >
      {/* Decorative inner ring */}
      <div className='absolute inset-3 sm:inset-4 border-2 border-gray-400/30 rounded-full'></div>
      {/* Icon placeholder - replace with actual icon */}
      <div className='top-2 sm:top-3 md:top-4 left-1/2 absolute text-primary text-xl sm:text-2xl md:text-3xl -translate-x-1/2 transform'>
        🎓 {/* Example icon, replace with relevant ones */}
      </div>
      <div className='flex flex-col justify-center items-center px-2 h-full'>
        <div className='drop-shadow-lg font-bold text-primary text-3xl sm:text-4xl md:text-5xl'>
          {count}
          {prestasi.suffix}
        </div>
        <h3 className='drop-shadow-md mt-1 sm:mt-2 font-bold text-gray-800 text-xs sm:text-sm md:text-base lg:text-xl leading-tight'>{prestasi.title}</h3>
      </div>
      {/* Sparkle effects */}
      <motion.div
        className='top-2 right-2 absolute text-yellow-400 text-xl'
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>
      <motion.div
        className='bottom-2 left-2 absolute text-yellow-400 text-xl'
        animate={{ scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        ✨
      </motion.div>
    </motion.div>
  )
}

const CounterCard2: React.FC<{ murid: murid }> = ({ murid }) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const duration = 2000 // Durasi animasi dalam ms
    const increment = murid.target / (duration / 50)
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev >= murid.target) {
          clearInterval(timer)
          return murid.target
        }
        return Math.ceil(prev + increment)
      })
    }, 50)
    return () => clearInterval(timer)
  }, [murid.target])
  return (
    <motion.div
      className='relative bg-white shadow-2xl backdrop-blur-sm mx-auto p-8 sm:p-12 md:p-16 lg:p-18 border-2 border-gray-300/50 sm:border-3 md:border-4 rounded-full w-[200px] sm:w-[250px] md:w-[280px] lg:w-[300px] h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px] text-center hover:scale-110 transition-all duration-500 transform'
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          type: 'spring',
          bounce: 0.5,
          stiffness: 100
        }
      }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, rotate: -5 }}
      animate={{ y: [0, -10, 0] }} // Constant bouncing animation
      transition={{ y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
    >
      {/* Decorative inner ring */}
      <div className='absolute inset-3 sm:inset-4 border-2 border-gray-400/30 rounded-full'></div>
      {/* Icon placeholder - replace with actual icon */}
      <div className='top-2 sm:top-3 md:top-4 left-1/2 absolute text-primary text-xl sm:text-2xl md:text-3xl -translate-x-1/2 transform'>
        👨‍🎓 {/* Example icon, replace with relevant ones */}
      </div>
      <div className='flex flex-col justify-center items-center px-2 h-full'>
        <div className='drop-shadow-lg font-bold text-primary text-3xl sm:text-4xl md:text-5xl'>
          {count}
          {murid.suffix}
        </div>
        <h3 className='drop-shadow-md mt-1 sm:mt-2 font-bold text-gray-800 text-xs sm:text-sm md:text-base lg:text-xl leading-tight'>{murid.title}</h3>
      </div>
      {/* Sparkle effects */}
      <motion.div
        className='top-2 right-2 absolute text-yellow-400 text-xl'
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>
      <motion.div
        className='bottom-2 left-2 absolute text-yellow-400 text-xl'
        animate={{ scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        ✨
      </motion.div>
    </motion.div>
  )
}

const Statistic: React.FC = () => {
  return (
    <motion.div
      className='relative bg-secondary mt-31 w-full overflow-hidden'
      id='statistik'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Ornamen wave di atas */}
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

      {/* Judul */}
      <motion.div
        className='px-4 pt-[40px] sm:pt-[50px] md:pt-[60px] pb-[20px] sm:pb-[25px] md:pb-[30px] text-center'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.h4
          className='font-medium text-white/60 md:text-[15px] text-xs sm:text-sm'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Statistik Murid Kami
        </motion.h4>
        <motion.h1
          className='font-bold text-white lg:text-[45px] text-2xl sm:text-3xl md:text-4xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Statistik Murid & Alumni
        </motion.h1>
      </motion.div>

      <div className='py-6 sm:py-8 md:py-10'>
        <motion.div
          className='flex xl:flex-row flex-col items-center my-6 sm:my-8 md:my-10 pb-[20px] sm:pb-[25px] md:pb-[30px] w-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className='justify-center mx-auto px-4 sm:px-6 w-full'>
            <motion.div
              className='justify-center gap-4 sm:gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {prestasiData.map((prestasi, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <CounterCard prestasi={prestasi} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className='flex xl:flex flex-col justify-center items-center gap-10 sm:gap-15 md:gap-20 pb-[20px] sm:pb-[25px] md:pb-[30px]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className='justify-between'>
            <motion.div
              className='flex xl:flex-row flex-col justify-center gap-6 sm:gap-8 md:gap-10 2xl:gap-80 xl:gap-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {murid.map((murid, index) => (
                <motion.div
                  className='flex justify-center items-center'
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <CounterCard2 murid={murid} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Garis bawah */}
      <motion.div
        className='block bg-[#E9E2EA] h-5'
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      ></motion.div>
    </motion.div>
  )
}

export default Statistic
