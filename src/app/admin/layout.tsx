'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, BuildingOfficeIcon, CalendarIcon, DocumentIcon, DocumentTextIcon, FlagIcon, HomeIcon, LinkIcon, PhotoIcon, UsersIcon, XMarkIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { Geist, Geist_Mono, Poppins } from "next/font/google"
import "../globals.css"
import ProtectedAdminClient from '../_components/lib/ProtectAdminRoute'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon},
  { name: 'Post', href: '/admin/posts', icon: DocumentTextIcon },
  { name: 'Info Organ Setup', href: '/admin/organisasi', icon: BuildingOfficeIcon },
  { name: 'Aspirasi', href: '/admin/aspirasi', icon: FlagIcon },
  { name: 'Ekskul', href: '/admin/ekskul', icon: TrophyIcon },
  { name: 'Users', href: '/admin/user', icon: UsersIcon },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <ProtectedAdminClient>
        <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
        <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-400 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-gray-800">Moklet Portal</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="mb-2 text-sm font-medium text-gray-500 uppercase">Menu</div>
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                {sidebarOpen ? (
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                ) : (
                  <Bars3Icon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <nav className="hidden md:flex items-center space-x-2 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <span className="text-gray-400">/</span>
                <span className="text-gray-900 font-medium">Admin</span>
              </nav>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
      </body>
    </html>
      </ProtectedAdminClient>
    </>
  )
}