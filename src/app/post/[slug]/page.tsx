'use client'
import { api } from '@/app/_components/lib/api'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Author {
  id: number
  name: string
  email: string
  role: string
  created_at: string
  updated_at: string
}

interface Post {
  id: number
  title: string
  author_id: number
  body: string
  short_body: string
  thumbnail: string
  tags: string
  slug: string
  is_published: number
  approval_status: string
  created_at: string
  updated_at: string
  author: Author
}

export default function News () {
  const { slug } = useParams()
  const [data, setData] = useState<Post | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch post by slug
        const response = await api.get(`/blog/${slug}`)
        setData(response.data.data)

        // Fetch related posts (all posts for now, you can filter by tags later)
        const relatedResponse = await api.get('/blog')
        const posts = relatedResponse.data.data.data || []
        // Filter out current post and limit to 3
        const filtered = posts
          .filter((post: Post) => post.slug !== slug)
          .slice(0, 3)
        setRelatedPosts(filtered)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug])

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center bg-white min-h-screen'>
        <div className='text-center'>
          <div className='inline-block mb-4 border-4 border-primary border-t-transparent rounded-full w-16 h-16 animate-spin'></div>
          <h1 className='font-bold text-gray-900 text-2xl'>Memuat berita...</h1>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className='flex justify-center items-center bg-white min-h-screen'>
        <div className='text-center'>
          <h1 className='mb-4 font-bold text-gray-900 text-4xl'>
            Berita tidak ditemukan
          </h1>
          <a
            href='/posts'
            className='inline-block bg-primary hover:bg-primary/90 px-6 py-3 rounded-full font-semibold text-white transition-colors'
          >
            Kembali ke Berita
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='bg-white mx-auto px-5 py-4 xl:py-0 2xl:max-w-[1400px] xl:max-w-[1300px]'>
        <div className='flex max-lg:flex-col gap-10 pt-20 pb-16'>
          {/* Main Content */}
          <motion.div
            className='w-full lg:w-[65%]'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <h1 className='mb-6 font-bold text-gray-900 text-4xl leading-tight'>
              {data.title}
            </h1>

            {/* Author Info */}
            <div className='flex items-center gap-4 mb-6 pb-6 border-gray-200 border-b'>
              <div className='flex items-center gap-3'>
                <div className='flex justify-center items-center bg-primary rounded-full w-12 h-12 font-bold text-white text-xl'>
                  {data.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className='font-semibold text-gray-900'>
                    {data.author.name}
                  </p>
                  <p className='text-gray-600 text-sm capitalize'>
                    {data.author.role}
                  </p>
                </div>
              </div>
              <span className='text-gray-400'>•</span>
              <p className='text-gray-600'>{formatDate(data.created_at)}</p>
            </div>

            {/* Featured Image */}
            <motion.div
              className='relative mb-8 rounded-2xl w-full h-[400px] overflow-hidden'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src={`${data.thumbnail}`}
                fill
                alt={data.title}
                className='object-cover'
              />
            </motion.div>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 mb-6'>
              {data.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className='bg-primary/10 hover:bg-primary/20 px-4 py-1.5 rounded-full font-medium text-primary text-sm transition-colors cursor-pointer'
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* Body Content */}
            <motion.div
              className='[&>figure]:my-8 [&>figcaption]:mt-2 max-w-none [&>em]:text-gray-700 [&>figcaption]:text-gray-600 [&>h1]:text-gray-900 [&>h2]:text-gray-900 [&>h3]:text-gray-900 [&>p]:text-gray-700 [&>strong]:text-gray-900 [&>figcaption]:text-sm [&>p]:leading-relaxed prose prose-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          </motion.div>

          {/* Sidebar - Related Posts */}
          <motion.div
            className='w-full lg:w-[35%]'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className='lg:top-24 lg:sticky'>
              <h2 className='mb-6 font-bold text-gray-900 text-2xl'>
                Berita Terkait
              </h2>

              <div className='flex flex-col gap-6'>
                {relatedPosts.map((post, index) => (
                  <motion.a
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className='group block bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all duration-300'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className='relative mb-3 rounded-lg w-full h-48 overflow-hidden'>
                      <Image
                        src={`${post.thumbnail}`}
                        fill
                        alt={post.title}
                        className='object-cover group-hover:scale-110 transition-transform duration-300'
                      />
                    </div>

                    <h3 className='mb-2 font-semibold text-gray-900 group-hover:text-primary text-lg line-clamp-2 transition-colors'>
                      {post.title}
                    </h3>

                    <p dangerouslySetInnerHTML={{ __html: post.short_body }} className='mb-3 text-gray-600 text-sm line-clamp-2'>
                  
                    </p>

                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        <div className='flex justify-center items-center bg-primary/10 rounded-full w-8 h-8 font-semibold text-primary text-xs'>
                          {post.author.name.charAt(0).toUpperCase()}
                        </div>
                        <span className='text-gray-700 text-sm'>
                          {post.author.name}
                        </span>
                      </div>
                      <span className='text-gray-500 text-xs'>
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {relatedPosts.length === 0 && (
                <p className='text-gray-500 text-center'>
                  Tidak ada berita terkait
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
