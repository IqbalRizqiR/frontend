'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer () {
  const pathname = usePathname()
  return (
    <footer className='bg-white mt-5'>
      <div className='mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12 max-w-7xl'>
        {/* Bagian atas */}
        <div className='gap-6 sm:gap-8 md:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
          {/* Kiri */}
          <div className='sm:col-span-2 lg:col-span-1'>
            <Image
              src='/assets/image/logo.png'
              alt='Logo Metic'
              width={150}
              height={75}
              className='mb-4 sm:mb-5'
            />
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Pelopor SMK Bidang Teknologi dan Informatika di Indonesia.
            </p>
            <p className='mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm'>
              © 2025 SMK Telkom Malang & BebasDeh. All rights reserved.
            </p>
          </div>

          {/* Aplikasi Moklet */}
          <div>
            <h3 className='mb-4 font-semibold text-gray-500 text-sm uppercase'>
              Aplikasi Moklet
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='https://mylms.telkomschools.sch.id/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-800 hover:text-primary transition'
                >
                  MyLMS
                </Link>
              </li>
              <li>
                <Link
                  href='https://igracias.telkomuniversity.ac.id/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-800 hover:text-primary transition'
                >
                  iGracias
                </Link>
              </li>
              <li>
                <Link
                  href='https://play.google.com/store/apps/details?id=com.moklet.app'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Moklet Apps
                </Link>
              </li>
              <li>
                <Link
                  href='https://api-moklet.vercel.app/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-800 hover:text-primary transition'
                >
                  API Moklet
                </Link>
              </li>
            </ul>
          </div>

          {/* SMK Telkom Malang */}
          <div>
            <h3 className='mb-4 font-semibold text-gray-500 text-sm uppercase'>
              SMK Telkom Malang
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/structure'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link
                  href='/organisasi'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Organisasi Sekolah
                </Link>
              </li>
              <li>
                <Link
                  href='/ekstrakurikuler'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Ekstrakurikuler
                </Link>
              </li>
              <li>
                <Link
                  href='/alumni'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Alumni
                </Link>
              </li>
              <li>
                <Link
                  href='https://vtour.smktelkom-mlg.sch.id/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Virtual Tour 360°
                </Link>
              </li>
            </ul>
          </div>


          {/* Menu Utama */}
          <div>
            <h3 className='mb-4 font-semibold text-gray-500 text-sm uppercase'>
              Menu Utama
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href='/posts'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Berita & Artikel
                </Link>
              </li>
              <li>
                <Link
                  href='/#jurusan'
                  className='text-gray-800 hover:text-primary transition'
                >
                  Jurusan
                </Link>
              </li>
              <li>
                <Link
                  href='https://ppdb.telkomschools.sch.id/signup?lemdik=51'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-800 hover:text-primary transition'
                >
                  PPDB
                </Link>
              </li>
            </ul>
          </div>

         

          {/* Kenali Kami */}
          <div>
            <h3 className='mb-4 font-semibold text-gray-500 text-sm uppercase'>
              Kenali Kami Lebih Dekat
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='https://www.instagram.com/smktelkommalang'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-gray-800 hover:text-primary text-sm transition'
                >
                  <Image
                    src='/assets/image/instagram.svg'
                    alt='Instagram'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                  @smktelkommalang
                </Link>
              </li>
              <li>
                <Link
                  href='https://www.youtube.com/@smktelkommalang'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-gray-800 hover:text-primary text-sm transition'
                >
                  <Image
                    src='/assets/image/youtube.svg'
                    alt='YouTube'
                    width={20}
                    height={20}
                    className='mr-2'
                  />
                  <span className='leading-tight'>
                    SMK Telkom Malang
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href='https://smktelkom-mlg.sch.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-800 hover:text-primary text-sm transition'
                >
                  Website Resmi
                </Link>
              </li>
              <li>
                <Link
                  href='mailto:info@smktelkom-mlg.sch.id'
                  className='text-gray-800 hover:text-primary text-sm transition'
                >
                  Email Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bagian alamat */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 text-gray-700">
          <h3 className="mb-3 sm:mb-4 font-semibold text-sm sm:text-base">Alamat:</h3>
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5098.506090439917!2d112.65644107500694!3d-7.976861992048307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6285c5c1b44e3%3A0xf6c889ac7452dc3a!2sSMK%20Telkom%20Malang!5e1!3m2!1sid!2sid!4v1761701406710!5m2!1sid!2sid" 
           className="rounded-lg w-full h-[250px] sm:h-[300px] md:h-[350px]"
           loading="lazy"
         ></iframe>
        </div>
       

        {/* Partners Section */}
        <div className='mt-8 sm:mt-10 pt-6 sm:pt-8 border-gray-200 border-t'>
          <div className='flex justify-center items-center'>
            <Image
              src='/assets/image/partner.png'
              alt='Our Partners'
              width={600}
              height={80}
              className='w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-auto object-contain'
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
