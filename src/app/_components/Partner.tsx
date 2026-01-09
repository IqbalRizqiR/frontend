'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Partner = () => {
  // Data partner/sponsor - Partner resmi SMK Telkom Malang
  const partners = [
    {
      id: 1,
      name: 'Telkom Indonesia',
      logo: 'https://logo.clearbit.com/telkom.co.id'
    },
    {
      id: 2,
      name: 'Telkom University',
      logo: 'https://logo.clearbit.com/telkomuniversity.ac.id'
    },
    {
      id: 3,
      name: 'Telkomsel',
      logo: 'https://logo.clearbit.com/telkomsel.com'
    },
    {
      id: 4,
      name: 'Indico',
      logo: 'https://logo.clearbit.com/indico.co.id'
    },
    {
      id: 5,
      name: 'MitraTel',
      logo: 'https://logo.clearbit.com/mitratel.co.id'
    },
    {
      id: 6,
      name: 'Cisco',
      logo: 'https://logo.clearbit.com/cisco.com'
    },
    {
      id: 7,
      name: 'Fortinet',
      logo: 'https://logo.clearbit.com/fortinet.com'
    },
    {
      id: 8,
      name: 'Global Xtreme',
      logo: 'https://logo.clearbit.com/globalxtreme.net'
    },
    {
      id: 9,
      name: 'Box Hill Institute',
      logo: 'https://logo.clearbit.com/boxhill.edu.au'
    },
    {
      id: 10,
      name: 'Jagoan Hosting',
      logo: 'https://logo.clearbit.com/jagoanhosting.com'
    },
    {
      id: 11,
      name: 'Alibaba Cloud',
      logo: 'https://logo.clearbit.com/alibabacloud.com'
    },
    {
      id: 12,
      name: 'Lenovo',
      logo: 'https://logo.clearbit.com/lenovo.com'
    },
    {
      id: 13,
      name: 'DOT Indonesia',
      logo: 'https://logo.clearbit.com/dot.co.id'
    },
    {
      id: 14,
      name: 'SEVIMA',
      logo: 'https://logo.clearbit.com/sevima.com'
    },
    {
      id: 15,
      name: 'Wahana Komputer',
      logo: 'https://logo.clearbit.com/wahanakomputer.com'
    }
  ]

  // Duplikasi array untuk infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <section className='relative bg-white py-16 overflow-hidden'>
      <div className='mx-auto px-6 max-w-7xl container'>
        {/* Section Title */}
        <motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className='mb-3 font-bold text-gray-900 text-4xl'
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Partner & Sponsor Kami
          </motion.h2>
          <motion.p
            className='mx-auto max-w-2xl text-gray-600 text-lg'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Bersama mitra terpercaya, kami membangun masa depan pendidikan teknologi
          </motion.p>
          <motion.div
            className='bg-primary mx-auto mt-4 rounded-full w-24 h-1'
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>

        {/* Marquee Container */}
        <div className='relative'>
          {/* Gradient Overlays */}
          <div className='left-0 z-10 absolute inset-y-0 bg-gradient-to-r from-white via-white/50 to-transparent w-32 pointer-events-none'></div>
          <div className='right-0 z-10 absolute inset-y-0 bg-gradient-to-l from-white via-white/50 to-transparent w-32 pointer-events-none'></div>

          {/* Sliding Logos */}
          <div className='flex overflow-hidden'>
            <motion.div
              className='flex gap-16 pr-16'
              animate={{
                x: [0, -1000]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 20,
                  ease: 'linear'
                }
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${index}`}
                  className='group relative flex flex-shrink-0 justify-center items-center bg-white hover:bg-gray-50 shadow-md hover:shadow-xl p-6 border border-gray-200 rounded-2xl w-[200px] h-[120px] transition-all duration-300'
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={150}
                    height={80}
                    className='opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 max-w-[150px] max-h-[80px] object-contain transition-all duration-300'
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Text */}
        <motion.p
          className='mt-10 font-medium text-gray-500 text-sm text-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          Dipercaya oleh lebih dari 50+ institusi dan perusahaan terkemuka
        </motion.p>
      </div>
    </section>
  )
}

export default Partner