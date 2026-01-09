'use client'
import { useState } from 'react'
import { api } from './lib/api'

export default function AspirasiPage () {
  const [body, setAspirasi] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!body.trim()) {
      setMessage('Harap isi aspirasi terlebih dahulu!')
      return
    }

    setIsLoading(true)
    try {
      api.post('/aspirasi', { body })
      setMessage('Terima kasih! Aspirasi Anda telah dikirim.')
      setAspirasi('')
    } catch (error) {
      setMessage('Terjadi kesalahan, coba lagi nanti.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div id="aspirasi" className='flex flex-col justify-center items-center px-4 py-20'>
      <div className='bg-white shadow-lg p-8 rounded-3xl w-full max-w-lg hover:scale-[1.01] transition-transform duration-300'>
        <h1 className='mb-6 font-extrabold text- text-3xl text-center'>
          Form Aspirasi
        </h1>

        <textarea
          value={body}
          onChange={e => setAspirasi(e.target.value)}
          placeholder='Tulis aspirasi Anda di sini...'
          className='p-4 border border-secondary rounded-2xl focus:outline-none focus:ring- focus:ring-2secondary w-full h-40 transition-all duration-300 resize-none'
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className='bg-secondary hover:bg-secondary-dark disabled:opacity-60 shadow-md mt-6 py-3 rounded-2xl w-full font-semibold text-white transition-colors duration-300'
        >
          {isLoading ? 'Mengirim...' : 'Kirim Aspirasi'}
        </button>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes('Terima') ? 'text-primary' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
