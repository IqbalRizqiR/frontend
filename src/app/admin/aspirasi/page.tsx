'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { api } from '@/app/_components/lib/api';

interface Aspirasi {
  id: string;
  body: string;
}

export default function AspirasiListPage() {
  const router = useRouter();
  const [aspirasi, setAspirasi] = useState<Aspirasi[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterAspirasi, setFilterAspirasi] = useState('all');
  const [filterYear, setFilterYear] = useState('all');


  useEffect(() => {
    const ekskul = api.get('/aspirasi').then((res: { data: { data: Aspirasi[]; }; }) => {
      setAspirasi(res.data.data);
    });
  }, []);

  const handleCreateEkskul = () => {
    router.push('/admin/ekskul/new');
  };

  const handleEditEkskul = (ekskulId: string) => {
    router.push(`/admin/ekskul/${ekskulId}`);
  };

  const handleDeleteEkskul = (ekskulId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus ekstrakurikuler ini?')) {
      api.delete(`/ekstrakurikuler/${ekskulId}`).then(() => {
        setAspirasi(aspirasi.filter(aspiras => aspiras.id !== ekskulId));
      });
    }
  };

  // Filter aspirasi
  const filteredAspirasi = aspirasi.filter(aspira => {
    if (filterAspirasi !== 'all' && aspira.body !== filterAspirasi) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAspirasi.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentAspirasi = filteredAspirasi.slice(startIndex, endIndex);

  // Get unique names
  const aspirasiBodies = ['all', ...Array.from(new Set(aspirasi.map(a => a.body)))];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aspirasi
              </label>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Aspirasi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentAspirasi.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-lg mb-2">Belum ada aspirasi</p>
                      <p className="text-sm">Klik tombol "Add Aspirasi" untuk menambahkan aspirasi baru</p>
                    </td>
                  </tr>
                ) : (
                  currentAspirasi.map((aspirasi) => (
                    <tr key={aspirasi.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 font-medium">{aspirasi.body}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredAspirasi.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, filteredAspirasi.length)} of {filteredAspirasi.length}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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