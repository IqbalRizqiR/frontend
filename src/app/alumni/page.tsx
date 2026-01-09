'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Quote, Award, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../_components/lib/api'
import Link from 'next/link'

interface Alumni {
  id: number
  name: string
  photo: string
  angkatan: string
  currentJob: string
  company: string
  quote: string
  slug: string
}

export default function AlumniSection () {
  const [alumniData, setAlumniData] = useState<Alumni[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await api.get('/alumni')
        console.log('Alumni response:', response.data)

        // Handle both response.data and response.data.data structures
        const data = response.data.data.data || response.data
        setAlumniData(data)
      } catch (error) {
        console.error('Error fetching alumni:', error)
        setAlumniData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchAlumni()
  }, [])
  return (
    <main className='bg-gradient-to-b from-gray-50 to-white min-h-screen'>
      {/* Header Section */}
      <section className='relative bg-secondary py-12 sm:py-16 md:py-20 overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='top-0 left-1/4 absolute bg-white blur-3xl rounded-full w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96'></div>
          <div className='right-1/4 bottom-0 absolute bg-white blur-3xl rounded-full w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96'></div>
        </div>

        <div className='relative mx-auto px-4 sm:px-6 md:px-8 max-w-7xl'>
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='inline-flex items-center gap-2 sm:gap-3 bg-white/20 shadow-lg backdrop-blur-sm mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Award className='w-5 sm:w-6 h-5 sm:h-6 text-white' />
              <span className='font-semibold text-white text-sm sm:text-base'>Success Stories</span>
            </motion.div>

            <motion.h1
              className='mb-4 sm:mb-6 px-4 font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Alumni Kami
            </motion.h1>
            <motion.p
              className='mx-auto px-4 max-w-3xl text-white/90 text-sm sm:text-base md:text-lg lg:text-xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Kisah inspiratif dari alumni SMK Telkom Malang yang telah sukses
              berkarir di berbagai perusahaan ternama
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Alumni Cards Section */}
      <section className='mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 max-w-7xl'>
        {isLoading ? (
          <div className='flex justify-center items-center py-12 sm:py-16 md:py-20'>
            <div className='border-4 border-gray-200 border-t-primary rounded-full w-12 sm:w-16 h-12 sm:h-16 animate-spin'></div>
          </div>
        ) : alumniData.length > 0 ? (
          <div className='gap-4 sm:gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {alumniData.map((alumni, index) => (
              <Link href={`/alumni/${alumni.slug}`}>
                <motion.div
                  key={alumni.id}
                  className='group relative bg-white shadow-lg hover:shadow-2xl border-2 border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300'
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Background Gradient on Hover */}
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

                  {/* Photo */}
                  <div className='relative w-full h-56 sm:h-64 md:h-72 overflow-hidden'>
                    <Image
                      src={alumni.photo}
                      alt={alumni.name}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                    {/* Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>

                    {/* Angkatan Badge */}
                    <div className='top-3 sm:top-4 right-3 sm:right-4 absolute flex items-center gap-1.5 sm:gap-2 bg-white/95 shadow-lg backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full'>
                      <GraduationCap className='w-3 sm:w-4 h-3 sm:h-4 text-primary' />
                      <span className='font-bold text-primary text-xs sm:text-sm'>
                        Angkatan {alumni.angkatan}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='relative p-4 sm:p-5 md:p-6'>
                    {/* Name */}
                    <h3 className='mb-2 sm:mb-3 font-bold text-gray-800 group-hover:text-primary text-lg sm:text-xl md:text-2xl line-clamp-2 transition-colors'>
                      {alumni.name}
                    </h3>

                    {/* Job Info */}
                    <div className='flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 pb-3 sm:pb-4 border-gray-200 border-b'>
                      <Briefcase className='flex-shrink-0 mt-0.5 sm:mt-1 w-4 sm:w-5 h-4 sm:h-5 text-secondary' />
                      <div className='min-w-0'>
                        <p className='font-semibold text-gray-900 text-sm sm:text-base line-clamp-1'>
                          {alumni.currentJob}
                        </p>
                        <p className='text-gray-600 text-xs sm:text-sm line-clamp-1'>
                          {alumni.company}
                        </p>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className='relative'>
                      <Quote className='-top-1 -left-3 sm:-left-4 absolute w-6 sm:w-8 h-6 sm:h-8 text-primary/20' />
                      <p className='pl-4 sm:pl-6 text-gray-600 text-xs sm:text-sm italic line-clamp-3 leading-relaxed'>
                        "{alumni.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className='right-0 bottom-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='bg-gradient-to-tl from-primary/20 to-transparent blur-2xl rounded-full w-32 h-32 translate-x-1/2 translate-y-1/2'></div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <motion.div
            className='py-20 text-center'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className='inline-flex justify-center items-center bg-gray-100 mb-4 rounded-full w-20 h-20'>
              <Users className='w-10 h-10 text-gray-400' />
            </div>
            <h3 className='mb-2 font-semibold text-gray-900 text-2xl'>
              Belum Ada Data Alumni
            </h3>
            <p className='text-gray-600'>Data alumni akan segera ditampilkan</p>
          </motion.div>
        )}

        {/* CTA Button */}
        {alumniData.length > 0 && (
          <motion.div
            className='mt-10 sm:mt-12 md:mt-16 text-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a href='#'>
              <motion.button
                className='inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-white text-base sm:text-lg md:text-xl transition-all'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Award className='w-5 sm:w-6 h-5 sm:h-6' />
                Lihat Semua Alumni
              </motion.button>
            </a>
          </motion.div>
        )}
      </section>
    </main>
  )
}
