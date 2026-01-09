'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { api } from '../_components/lib/api'

interface OrganisasiPageProps {
  name: string
  short_description: string
  id: number
  logo: string
  visi: string
  misi: string
  is_organization: boolean | number
}

export default function OrganisasiPage () {
  const [organizationData, setOrganizationData] = useState<
    OrganisasiPageProps[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      api.get('/organization').then(response => {
        console.log(response.data.data)
        setOrganizationData(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching organization:', error)
      })
      .finally(() => {
        setIsLoading(false)
      })
    }

    fetch()
  }, [])

  const organizations = organizationData.filter(org => org.is_organization == 1)
  const subOrganisations = organizationData.filter(
    org => org.is_organization == 0
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-white min-h-screen">
        <div className="border-4 border-gray-200 border-t-secondary rounded-full w-16 h-16 animate-spin"></div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-b from-gray-50 to-white min-h-screen'>
      {/* Header Section */}
      <section className='relative bg-secondary mt-10 py-20 overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='top-0 left-1/4 absolute bg-white blur-3xl rounded-full w-96 h-96'></div>
          <div className='right-1/4 bottom-0 absolute bg-white blur-3xl rounded-full w-96 h-96'></div>
        </div>

        <div className='relative mx-auto px-6 max-w-7xl'>
          <div className='text-center'>
            <h1 className='mb-4 font-bold text-white text-5xl md:text-6xl'>
              Organisasi Sekolah
            </h1>
            <p className='mx-auto max-w-3xl text-white/90 text-xl'>
              Kenali struktur organisasi dan berbagai komunitas siswa di SMK
              Telkom Malang
            </p>
          </div>
        </div>
      </section>

      {/* Container */}
    <div className="bg-white py-10 sm:py-12 md:py-16 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl">
        
        {/* ========== ORGANISASI SECTION ========== */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          {/* Header */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex justify-center items-center bg-black rounded-full w-12 sm:w-14 h-12 sm:h-14">
              <svg
                className="w-6 sm:w-8 h-6 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl">Organisasi</h1>
          </div>

          {/* Description */}
          <p className="mx-auto mb-6 sm:mb-8 px-4 max-w-3xl text-gray-600 text-sm sm:text-base text-center leading-relaxed">
            Struktur organisasi siswa, berbagai kegiatan yang dijalankan,
            serta peran penting Organisasi dalam membentuk kepemimpinan siswa
            di SMK Telkom Malang.
          </p>

          {/* OSIS & MPK Cards - Grid 2 Kolom */}
          <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2">
            {organizations.map((org) => (
              <Link
                key={org.id}
                href={`/organisasi/${org.id}`}
                className="group block bg-white hover:shadow-lg p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-1 items-center gap-3 sm:gap-4">
                    <div className="flex flex-shrink-0 justify-center items-center bg-gray-100 rounded-full w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 overflow-hidden">
                      <Image
                        src={org.logo}
                        alt={`Logo ${org.name}`}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 font-semibold text-black group-hover:text-primary text-base sm:text-lg md:text-xl truncate sm:whitespace-normal transition-colors">
                        {org.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
                        {org.short_description}
                      </p>
                    </div>
                  </div>
                  <svg
                    className="flex-shrink-0 ml-2 sm:ml-4 w-5 sm:w-6 h-5 sm:h-6 text-primary transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========== SUB-ORGANISASI SECTION ========== */}
        <div className="">
          {/* Header */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex justify-center items-center bg-black rounded-full w-12 sm:w-14 h-12 sm:h-14">
              <svg
                className="w-6 sm:w-8 h-6 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl text-center">Sub-organisasi</h2>
          </div>
          {/* Description */}
          <p className="mx-auto mb-6 sm:mb-8 px-4 max-w-4xl text-gray-600 text-sm sm:text-base text-center leading-relaxed">
            Sub-Organisasi adalah bagian penting dari organisasi siswa di SMK
            Telkom Malang, yang menampilkan beragam kegiatan dan inovasi yang
            dijalankan di bawah pengawasan OSIS dan MPK.
          </p>


          {/* Sub-organ Cards - Grid 2 Kolom */}
          <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2">
            {subOrganisations.map((suborg) => (
              <Link
                key={suborg.id}
                href={`/organisasi/${suborg.id}`}
                className="group block bg-white hover:shadow-lg p-4 sm:p-6 border border-gray-200 rounded-xl sm:rounded-2xl transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-1 items-center gap-3 sm:gap-4">
                    <div className="flex flex-shrink-0 justify-center items-center bg-gray-100 rounded-full w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 overflow-hidden">
                      <Image
                        src={suborg.logo}
                        alt={`Logo ${suborg.name}`}
                        width={50}
                        height={50}
                        className="object-contain"
              
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 font-semibold text-black group-hover:text-primary text-base sm:text-lg md:text-xl truncate sm:whitespace-normal transition-colors">
                        {suborg.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
                        {suborg.short_description}
                      </p>
                    </div>
                  </div>
                  <svg
                    className="flex-shrink-0 ml-2 sm:ml-4 w-5 sm:w-6 h-5 sm:h-6 text-primary transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>

    </div>
  )
}
