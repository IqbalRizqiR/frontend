'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import cn from '@/lib/clsx'

import HamburgerIcon from './icons/HamburgerIcon'
import { api } from './lib/api'
interface NavOption {
  title: string
  href?: string
  dropdown?: DropdownItem[]
}

interface DropdownItem {
  title: string
  href: string
}

export default function Navbar () {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null)
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

  const navOptions: NavOption[] = useMemo(
    () => [
      {
        title: 'Beranda',
        dropdown: [
          { title: 'Beranda', href: '/' },
          { title: 'Visi & Misi', href: '/#visi-misi' },
          { title: 'Berita', href: '/#berita' },
          { title: 'Sambutan Kepala Sekolah', href: '/#sambutan' },
          { title: 'Keunggulan Kami', href: '/#why-us' },
          { title: 'Statistik', href: '/#statistik' },
          { title: 'Program Jurusan', href: '/#jurusan' },
          { title: 'Video Profil', href: '/#video-profil' },
          { title: 'Alur Pendaftaran', href: '/#alur-pendaftaran' },
          { title: 'FAQ', href: '/#faq' },
          { title: 'Aspirasi', href: '/#aspirasi' }
        ]
      },
      {
        title: 'Akademik',
        dropdown: [
          {
            title: 'MokletApps',
            href: '/https://app.smktelkom-mlg.sch.id/login'
          },
          {
            title: 'Igracias',
            href: '/https://igracias.telkomschools.sch.id/ts/login/'
          },
          {
            title: 'Mylms',
            href: '/https://mylms.telkomschools.sch.id/course/index.php?categoryid=1008'
          }
        ]
      },
      {
        title: 'Program',
        dropdown: [
          { title: 'RPL (Rekayasa Perangkat Lunak)', href: '/jurusan/1' },
          { title: 'TKJ (Teknik Komputer dan Jaringan)', href: '/jurusan/2' },
          { title: 'PG (Pengembangan Game)', href: '/jurusan/3' }
        ]
      },
      { title: 'Alumni', href: '/alumni' },
      {
        title: 'Tentang Sekolah',
        dropdown: [
          { title: 'Berita Sekolah', href: '/posts' },
          { title: 'Ekstrakurikuler', href: '/ekstrakurikuler' },
          { title: 'Organisasi', href: '/organisasi' },
          { title: 'Sejarah', href: '/sejarah' }
        ]
      }
    ],
    []
  )

  useEffect(() => {
    function handleScroll () {
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (title: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setOpenDropdown(title)
  }

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null)
    }, 200)
    setCloseTimeout(timeout)
  }

  return (
    <nav
      className={`top-0 z-[999] xl:relative flex flex-col mx-auto w-full 2xl:text-xl ${
        pathname.startsWith('/admin') ? 'hidden' : ''
      }`}
    >
      <div className='z-[999] flex justify-between items-center bg-white xl:bg-transparent mx-auto px-5 py-4 xl:py-0 w-full 2xl:max-w-[1400px] xl:max-w-[1300px]'>
        <Link href={'/'} className='xl:mt-[36px]'>
          <span className='block bg-[url(/assets/image/logo.png)] bg-contain bg-no-repeat w-[130px] h-[39px] text-transparent pointer-events-none select-none'>
            SMK Telkom Malang
          </span>
        </Link>
        <div
          className={cn(
            `fixed hidden left-1/2 scale-[0.9] top-[24.5px] xl:flex xl:items-center justify-between w-full transition-all duration-300 ${
              scrolled
                ? pathname === '/post'
                  ? 'relative'
                  : 'max-w-[900px] 2xl:max-w-[1000px]'
                : '  max-w-[700px] 2xl:max-w-[800px]'
            } -translate-x-1/2 rounded-full border border-neutral-300 bg-white px-[50px] py-3 drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)]`
          )}
        >
          {scrolled && (
            <Link href='/'>
              <Image
                src={'/assets/image/logo.png'}
                alt='Moklet Organization: SMK Telkom Malang'
                width={120}
                height={50}
                className={cn(
                  ` h-[40px] object-contain transition-all duration-300 ${
                    scrolled ? 'w-[120px]' : 'w-0'
                  }`
                )}
              />
            </Link>
          )}
          {navOptions.map(navOption => (
            <div
              key={navOption.title}
              className='relative cursor-pointer'
              onMouseEnter={() =>
                navOption.dropdown && handleMouseEnter(navOption.title)
              }
              onMouseLeave={handleMouseLeave}
            >
              {navOption.href ? (
                <Link
                  href={navOption.href}
                  className={cn(
                    `py-2 rounded-full text-primary text-center transition-all duration-300 2xl:gap1-0`
                  )}
                >
                  {navOption.title}
                </Link>
              ) : (
                <button
                  className={cn(
                    `flex items-center gap-1 py-2 rounded-full text-primary text-center transition-all duration-300 cursor-pointer 2xl:gap1-0`
                  )}
                >
                  {navOption.title}
                  {navOption.dropdown && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={cn(
                        'w-3 h-3 transition-transform duration-300',
                        openDropdown === navOption.title && 'rotate-180'
                      )}
                    />
                  )}
                </button>
              )}

              {navOption.dropdown && (
                <div
                  className={cn(
                    'top-full left-0 absolute bg-white shadow-lg mt-2 border border-neutral-200 rounded-lg min-w-[180px] overflow-hidden origin-top transition-all duration-300',
                    openDropdown === navOption.title
                      ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  )}
                  onMouseEnter={() => handleMouseEnter(navOption.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  {navOption.dropdown.map((item, index) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className={cn(
                        'block hover:bg-primary/10 px-4 py-3 text-primary transition-all duration-200',
                        openDropdown === navOption.title && 'animate-fadeInUp'
                      )}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='hidden min-xl:flex gap-[9px] mt-[6px] min-xl:ml-[129px]'>
          <Link
            href={'https://ppdb.telkomschools.sch.id/signup?lemdik=51'}
            className='min-xl:mt-[36px]'
          >
            <div className='hidden xl:block bg-primary hover:bg-primary/90 px-4 py-2 rounded-full text-white transition-colors'>
              <h1 className='font-medium'>PPDB</h1>
            </div>
          </Link>
          <Link
            href={
              'https://www.tiktok.com/@smktelkommalang?is_from_webapp=1&sender_device=pc'
            }
            className='min-xl:mt-[36px]'
          >
            <div className='hidden xl:block bg-primary rounded-full text-transparent pointer-events-none select-none'>
              <FontAwesomeIcon icon={faTiktok} className='m-2 text-white' />
            </div>
          </Link>
          <Link
            href={
              'https://www.instagram.com/smktelkommalang?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
            }
            className='xl:mt-[36px]'
          >
            <div className='hidden xl:block bg-primary rounded-full text-transparent pointer-events-none select-none'>
              <FontAwesomeIcon icon={faInstagram} className='m-2 text-white' />
            </div>
          </Link>
        </div>
        <button
          className='xl:hidden block cursor-pointer'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <HamburgerIcon />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          `block xl:hidden w-full z-[800] bg-white transition-all duration-500 overflow-hidden ${
            isExpanded ? 'max-h-[500px]' : 'max-h-0'
          }`
        )}
      >
        <div className='flex flex-col justify-start items-start gap-6 my-[21px] ms-[20px] lg:ms-[52px] text-start'>
          {navOptions.map(navOption => (
            <div key={navOption.title} className='w-full'>
              {navOption.href ? (
                <Link
                  href={navOption.href}
                  className={
                    `rounded-full text-[16px] hover:text-primary-400 text-center transition-all duration-300 text-primary`
                  }
                  onClick={() => setIsExpanded(false)}
                >
                  {navOption.title}
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === navOption.title
                          ? null
                          : navOption.title
                      )
                    }
                    className='flex items-center gap-2 text-[16px] text-primary'
                  >
                    {navOption.title}
                    {navOption.dropdown && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={cn(
                          'w-3 h-3 transition-transform duration-300',
                          mobileDropdown === navOption.title && 'rotate-180'
                        )}
                      />
                    )}
                  </button>
                  {navOption.dropdown && (
                    <div
                      className={cn(
                        'flex flex-col gap-3 mt-3 ml-4 overflow-hidden transition-all duration-300',
                        mobileDropdown === navOption.title
                          ? 'max-h-[500px] opacity-100'
                          : 'max-h-0 opacity-0'
                      )}
                    >
                      {navOption.dropdown.map(item => (
                        <Link
                          key={item.title}
                          href={item.href}
                          className='text-[14px] text-primary/80 hover:text-primary transition-colors'
                          onClick={() => {
                            setIsExpanded(false)
                            setMobileDropdown(null)
                          }}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
