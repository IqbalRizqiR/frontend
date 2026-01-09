'use client'

import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import { api } from './lib/api'
import Link from 'next/link'
import { motion } from "framer-motion";

interface Jurusan {
  id: number;
  name: string
  thumbnail: string
  short_description: string
}

export default function JurusanSection () {
  const [data, setData] = useState<Jurusan[]>([])

  useEffect(() => {
    api.get('/major').then(response => {
      setData(response.data.data)
    })
  }, [])
  return (
    <motion.section
      className='relative bg-gradient-to-b py-12 sm:py-16 md:py-20'
      id='jurusan'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className='mx-auto px-4 sm:px-6 md:px-8 text-center container'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h2 
          className='mb-3 sm:mb-4 font-bold text-black text-2xl sm:text-3xl md:text-4xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Jurusan Kami
        </motion.h2>
        <motion.p 
          className='mx-auto mb-8 sm:mb-10 md:mb-12 px-4 max-w-2xl text-black text-sm sm:text-base md:text-lg'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Pilih jurusan sesuai passion kamu! Semua jurusan di SMK Telkom Malang
          dirancang untuk mempersiapkan kamu jadi profesional muda di dunia
          teknologi.
        </motion.p>
      </motion.div>
      <motion.div 
        className='items-start'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {data.map((item, index) => (
          <motion.div
            className={`flex flex-col lg:flex-row items-center my-6 sm:my-8 rounded-2xl mx-4 sm:mx-8 md:mx-12 lg:mx-20 gap-4 sm:gap-6 ${
              index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            }`}
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className='flex justify-center w-full lg:w-auto'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={`${item.thumbnail}`}
                alt={item.name}
                width={400}
                height={150}
                className='flex-shrink-0 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] h-auto'
              />
            </motion.div>
            <motion.div
              className={`flex flex-col gap-4 sm:gap-6 md:gap-8 w-full ${
                index % 2 === 0
                  ? 'lg:ml-6 items-center lg:items-start text-center lg:text-left'
                  : 'lg:mr-6 items-center lg:items-end text-center lg:text-right'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              >
                {item.name}
              </motion.h3>
              <motion.p 
                className='px-4 lg:px-0 max-w-4xl text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                viewport={{ once: true }}
              >
                {item.short_description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/jurusan/${item.id}`}
                  className='inline-block hover:bg-primary mt-2 sm:mt-4 px-5 sm:px-6 py-2 border border-primary rounded-lg w-fit font-semibold text-primary hover:text-white text-sm sm:text-base transition-colors duration-300'
                >
                  Lihat Detail
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
