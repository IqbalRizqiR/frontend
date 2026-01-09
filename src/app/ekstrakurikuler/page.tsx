'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../_components/lib/api'
import Image from 'next/image'
import { Users } from 'lucide-react'

interface Organisation {
  id: number
  name: string
  description: string
  logo: string
  image?: string
}

// Array warna gradient untuk variasi
const gradientColors = [
  'from-primary to-primary-secondary',
 
]

export default function EkstrakurikulerPage () {
  const [orgs, setOrganisations] = useState<Organisation[]>([])
  const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  console.log(' ')
  api.get('/ekstrakulikuler')
    .then(response => {
      console.log('Response:', response)
      console.log('Response data:', response.data)
      console.log('Response data.data:', response.data.data)
      setOrganisations(response.data.data)
    })
    .catch(error => {
      console.error('Error fetching ekskul:', error)
      console.error('Error response:', error.response)
    })
    .finally(() => {
      setIsLoading(false)
    })
}, [])

console.log('Current orgs:', orgs)


  useEffect(() => {
    api.get('/ekstrakulikuler').then(response => {
      setOrganisations(response.data.data)
    }).catch(err => {
      console.error('Error fetching ekstrakurikuler:', err)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-white min-h-screen">
        <div className="border-4 border-gray-200 border-t-secondary rounded-full w-16 h-16 animate-spin"></div>
      </div>
    )
  }

  return (
    <main className='bg-white min-h-screen'>
      {/* Header Section */}
      <section className='relative bg-secondary mt-10 py-20 overflow-hidden'>
        {/* Decorative elements */}
        <div className='absolute inset-0 opacity-10'>
          <div className='top-0 left-1/4 absolute bg-white blur-3xl rounded-full w-96 h-96'></div>
          <div className='right-1/4 bottom-0 absolute bg-white blur-3xl rounded-full w-96 h-96'></div>
        </div>

        <div className='relative mx-auto px-6 max-w-7xl container'>
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className='mb-6 font-bold text-white text-5xl md:text-6xl'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ekstrakurikuler
            </motion.h1>
            <motion.p
              className='mx-auto mb-8 max-w-3xl text-white/90 text-xl'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Temukan berbagai ekstrakurikuler yang bisa kamu ikuti untuk
              mengembangkan bakat, minat, dan karakter di SMK Telkom Malang
            </motion.p>
            <motion.div
              className='bg-white/30 mx-auto rounded-full w-24 h-1'
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ekstrakurikuler Cards */}
      <section className='mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12 sm:py-16 md:py-20 max-w-7xl'>
        <div className='gap-6 sm:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
             {orgs.map((org, index) => (
                      <motion.div
                        key={org.id}
                        className="group relative bg-gray-100 rounded-2xl h-80 sm:h-96 overflow-hidden transition-all cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            duration: 0.1,
                          }
                        }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.1 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Decorative glow on hover */}
                        <div className="z-10 absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        
                        {/* Corner decoration */}
                        <div className='top-0 right-0 z-10 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                          <div className='bg-gradient-to-br from-primary to-secondary blur-2xl rounded-full w-32 h-32 -translate-y-1/2 translate-x-1/2'></div>
                        </div>

                        {/* Image penuh atas */}
                        <motion.div 
                          className="relative w-full h-[70%] aspect-h-9 aspect-w-16 overflow-hidden"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Image
                            src={org.logo}
                            alt={`Logo ${org.name}`}
                            fill
                            className="object-cover"
                          />
                          {/* Dark overlay on hover */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                        </motion.div>
          
                        {/* Box putih bawah */}
                        <div className="z-20 relative bg-secondary pl-2 h-[30%] transition-colors duration-300">
                          <motion.h2 
                            className="mb-1 sm:mb-2 px-2 py-1.5 sm:py-2 font-bold text-white text-lg sm:text-xl"
                            initial={{ y: 0 }}
                            whileHover={{ y: -2 }}
                          >
                            {org.name}
                          </motion.h2>
                          <p className="mt-[-4px] sm:mt-[-8px] px-2 text-white text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                            {org.description}
                          </p>
                          
                          {/* Animated underline */}
                          <motion.div
                            className="bottom-2 left-4 absolute bg-white rounded-full w-0 group-hover:w-12 h-1 transition-all duration-300"
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
        </div>

        {/* Empty State */}
        {orgs.length === 0 && (
          <motion.div
            className='py-20 text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className='inline-flex justify-center items-center bg-gray-100 mb-4 rounded-full w-20 h-20'>
              <Users className='w-10 h-10 text-gray-400' />
            </div>
            <h3 className='mb-2 font-semibold text-gray-900 text-xl'>
              Belum ada ekstrakurikuler
            </h3>
            <p className='text-gray-600'>
              Data ekstrakurikuler akan segera ditampilkan
            </p>
          </motion.div>
        )}
      </section>

      {/* Bottom CTA Section */}
      <section className='bg-secondary py-16'>
        <div className='mx-auto px-6 max-w-7xl text-center'>
          <motion.h2
            className='mb-4 font-bold text-white text-3xl'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Siap Bergabung?
          </motion.h2>
          <motion.p
            className='mb-8 text-white/90 text-lg'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Pilih ekstrakurikuler yang sesuai dengan minat dan bakatmu!
          </motion.p>
          <motion.a
            href='https://ppdb.telkomschools.sch.id/signup?lemdik=51'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block bg-white hover:bg-gray-100 shadow-lg px-8 py-4 rounded-full font-bold text-primary text-xl transition-colors'
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
  )
}
