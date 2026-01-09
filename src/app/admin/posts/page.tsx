'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { api } from '@/app/_components/lib/api';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  slug: string;
  tags: string;
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
}

const categories = ['all', 'Berita', 'Prestasi', 'Kegiatan', 'Pengumuman'];
const statuses = ['all', 'published', 'draft'];

export default function PostListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/blog');
        setPosts(response.data.data.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Gagal memuat data posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = () => {
    router.push('/admin/posts/post');
  };

  const handleEditPost = (postId: string) => {
    router.push(`/admin/posts/${postId}`);
  };

  const handleDeletePost = async (postId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus post ini?')) {
      try {
        await api.delete(`/blog/${postId}`);
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Gagal menghapus post');
      }
    }
  };

  // Pagination
  const totalPages = Math.ceil(posts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="mb-2 font-bold text-gray-900 text-3xl">Posts</h1>
            <p className="text-gray-600">Kelola semua posts sekolah</p>
          </div>
          <button
            onClick={handleCreatePost}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-medium text-white transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Post
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 mb-6 px-4 py-3 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white shadow-sm mb-6 p-6 rounded-lg">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-red-500 w-full"
              >
                <option value="all">Semua Kategori</option>
                {categories.filter((c: string) => c !== 'all').map((category: string) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 focus:border-transparent rounded-lg outline-none focus:ring-2 focus:ring-red-500 w-full"
              >
                <option value="all">Semua Status</option>
                {statuses.filter((s: string) => s !== 'all').map((status: string) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-gray-200 border-b">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-xs text-left uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-xs text-left uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-xs text-left uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-xs text-left uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-xs text-left uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-xs text-left uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-xs text-left uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPosts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-gray-500 text-center">
                      <ImageIcon className="mx-auto mb-3 w-12 h-12 text-gray-400" />
                      <p className="mb-2 text-lg">Belum ada posts</p>
                      <p className="text-sm">Klik tombol "Add Post" untuk membuat post baru</p>
                    </td>
                  </tr>
                ) : (
                  currentPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center bg-gray-200 rounded-lg w-16 h-16 overflow-hidden">
                          {post.thumbnail ? (
                            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900 text-sm line-clamp-2">{post.title}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">{post.tags || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">{post.author.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600 text-sm">
                          {new Date(post.updated_at).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditPost(post.slug)}
                            className="hover:bg-blue-50 p-2 rounded text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="hover:bg-red-50 p-2 rounded text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {posts.length > 0 && (
            <div className="flex justify-between items-center px-6 py-4 border-gray-200 border-t">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">
                  {startIndex + 1}-{Math.min(endIndex, posts.length)} of {posts.length}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="hover:bg-gray-50 disabled:opacity-50 px-3 py-1 border border-gray-300 rounded text-sm disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="hover:bg-gray-50 disabled:opacity-50 px-3 py-1 border border-gray-300 rounded text-sm disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}