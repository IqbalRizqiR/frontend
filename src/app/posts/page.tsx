"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../_components/lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Calendar, User, Tag, Newspaper } from "lucide-react";

interface Posts {
  id: number;
  title: string;
  author: {
    name: string;
    role: string;
  };
  date: string;
  thumbnail: string;
  short_body: string;
  body: string;
  slug: string;
  tags?: string;
}

export default function BeritaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Posts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/blog');
        console.log("Posts response:", res.data);
        setPosts(res.data.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSelect = (slug: string) => {
    router.push(`/post/${slug}`);
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative bg-secondary mt-10 py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="top-0 left-1/4 absolute bg-white blur-3xl rounded-full w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96"></div>
          <div className="right-1/4 bottom-0 absolute bg-white blur-3xl rounded-full w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96"></div>
        </div>

        <div className="relative mx-auto px-4 sm:px-6 md:px-8 max-w-7xl container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 shadow-lg backdrop-blur-sm mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Newspaper className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              <span className="font-semibold text-white text-sm sm:text-base">Berita & Artikel</span>
            </motion.div>

            <motion.h1
              className="mb-4 sm:mb-6 px-4 font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Berita Sekolah
            </motion.h1>
            <motion.p
              className="mx-auto mb-6 sm:mb-8 px-4 max-w-3xl text-white/90 text-sm sm:text-base md:text-lg lg:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Informasi terkini seputar kegiatan dan prestasi SMK Telkom Malang
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-gray-50 py-6 sm:py-8">
        <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="relative mx-auto max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Search className="top-1/2 left-3 sm:left-4 absolute w-4 sm:w-5 h-4 sm:h-5 text-gray-400 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berita berdasarkan judul..."
              className="shadow-lg px-10 sm:px-12 py-3 sm:py-4 border-2 border-gray-200 focus:border-primary rounded-xl sm:rounded-2xl focus:outline-none w-full text-sm sm:text-base transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="top-1/2 right-3 sm:right-4 absolute text-gray-400 hover:text-gray-600 text-lg sm:text-xl -translate-y-1/2"
              >
                ✕
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 max-w-7xl">
        {isLoading ? (
          <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
            <div className="border-4 border-gray-200 border-t-primary rounded-full w-12 sm:w-16 h-12 sm:h-16 animate-spin"></div>
          </div>
        ) : (
          <>
            {filteredPosts.length > 0 ? (
              <>
                <motion.div
                  className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Menampilkan {filteredPosts.length} berita
                </motion.div>

                <div className="gap-4 sm:gap-6 md:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      className="group relative bg-white shadow-lg hover:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      onClick={() => handleSelect(post.slug)}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden">
                        <Image
                          src={`
                            ${post.thumbnail}`}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Tags */}
                        {post.tags && (
                          <div className="bottom-3 sm:bottom-4 left-3 sm:left-4 absolute flex flex-wrap gap-1.5 sm:gap-2">
                            {post.tags.split(',').slice(0, 2).map((tag, i) => (
                              <span
                                key={i}
                                className="flex items-center gap-1 bg-white/90 shadow-lg backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full font-medium text-[10px] text-primary sm:text-xs"
                              >
                                <Tag className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-5 md:p-6">
                        <h2 className="mb-2 sm:mb-3 font-bold text-gray-900 group-hover:text-primary text-base sm:text-lg md:text-xl line-clamp-2 transition-colors">
                          {post.title}
                        </h2>

                        <p dangerouslySetInnerHTML={{ __html: post.short_body }} className="mb-3 sm:mb-4 text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">

                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-gray-100 border-t text-[10px] text-gray-500 sm:text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                            <span>{post.date}</span>
                          </div>
                          {post.author && (
                            <div className="flex items-center gap-1 truncate">
                              <User className="w-3 sm:w-4 h-3 sm:h-4" />
                              <span className="truncate">{post.author.name}</span>
                            </div>
                          )}
                        </div>

                        {/* Read More */}
                        <div className="flex items-center gap-2 group-hover:gap-3 mt-3 sm:mt-4 font-semibold text-primary text-xs sm:text-sm transition-all">
                          Baca Selengkapnya
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                className="py-20 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="inline-flex justify-center items-center bg-gray-100 mb-4 rounded-full w-20 h-20">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 text-2xl">
                  Berita Tidak Ditemukan
                </h3>
                <p className="text-gray-600">
                  Coba gunakan kata kunci yang berbeda
                </p>
              </motion.div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
