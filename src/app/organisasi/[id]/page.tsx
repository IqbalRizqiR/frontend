'use client'
import { api } from '@/app/_components/lib/api'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

interface Organisasi {
  id: number
  name: string
  long_description: string
  logo: string
  image: string
  visi: string
  misi: string[] | string
}

export default function OrganisasiDetailPage () {
  const { id } = useParams()
  const router = useRouter()
  const [organisasiData, setOrganisasiData] = useState<Organisasi | null>(null)
  
  useEffect(() => {
    const fetchOrganisasi = async () => {
      try {
        const response = await api.get(`/organization/${id}`)
        console.log('Organization response:', response.data)
        
        // Handle both response.data and response.data.data structures
        const data = response.data.data || response.data
        setOrganisasiData(data)
      } catch (error) {
        console.error('Error fetching organization:', error)
      }
    }

    if (id) {
      fetchOrganisasi()
    }
  }, [id])

  return (
    <div className='bg-white min-h-screen'>
      {/* Hero Section - Logo, Title, Description */}
      <section className='mx-auto px-6 py-16 max-w-7xl'>
        <div className='flex flex-col items-center mx-auto text-center'>
          {/* Logo */}
          <div className='mb-8 w-32 h-32'>
            {organisasiData?.logo ? (
              <Image
                src={organisasiData.logo}
                alt={organisasiData.name || 'Logo'}
                width={128}
                height={128}
                className='w-full h-full object-contain'
              />
            ) : (
              <div className='flex justify-center items-center bg-gray-200 rounded-full w-full h-full text-gray-500'>
                No Image
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className='mb-6 font-bold text-black text-4xl lg:text-5xl'>
            {organisasiData?.name}
          </h1>

          {/* Description */}
          <p className='text-gray-600 text-lg leading-relaxed'>
            <div dangerouslySetInnerHTML={{ __html: organisasiData?.long_description || '' }} />
          </p>
        </div>
      </section>

      {/* Visi Misi Section - Red Background */}
      <section className='bg-secondary py-16'>
        <div className='mx-auto px-6 max-w-7xl'>
          <div className='gap-12 grid grid-cols-1 lg:grid-cols-2'>
            {/* Visi */}
            <div className='text-white'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='flex flex-shrink-0 justify-center items-center bg-white rounded-full w-12 h-12'>
                  <svg
                    className='w-6 h-6 text-primary'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                </div>
                <h2 className='font-bold text-3xl'>Visi</h2>
              </div>
              <p className='text-white/90 text-lg leading-relaxed'>
               <span dangerouslySetInnerHTML={{ __html: organisasiData?.visi || '' }}></span>
              </p>
            </div>

            {/* Misi */}
            <div className='text-white'>
              <div className='flex items-center gap-4 mb-6'>
                <div className='flex flex-shrink-0 justify-center items-center bg-white rounded-full w-12 h-12'>
                  <svg
                    className='w-6 h-6 text-primary'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
                    />
                  </svg>
                </div>
                <h2 className='font-bold text-3xl'>Misi</h2>
              </div>
              <ol className='space-y-3'>
                <span dangerouslySetInnerHTML={{ __html: Array.isArray(organisasiData?.misi) ? organisasiData?.misi.map(item => `<li>${item}</li>`).join('') : organisasiData?.misi || '' }}></span>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
