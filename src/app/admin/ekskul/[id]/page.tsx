'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, Upload, X } from 'lucide-react';

interface EkskulForm {
  id: string;
  name: string;
  year: string;
  Ekskul: string;
  description: string;
  photo: string | null;
  photoDescription: string;
  pembimbing: string;
  updated: string;
}

export default function EkskulFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params?.id;

  const [formData, setFormData] = useState<EkskulForm>({
    id: '',
    name: '',
    year: '',
    Ekskul: '',
    description: '',
    photo: null,
    photoDescription: '',
    pembimbing: '',
    updated: ''
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Ekstrakurikuler list
  const ekskulList = [
    'Artificial Intelligence',
    'Bola Basket',
    'Bola Voli',
    'Cloud Computing',
    'Cyber Security',
    'Drone Pilot',
    'English Conversation & Debate',
    'Fotografi',
    'Futsal',
    'Graphic Design',
    'Informatic Network Cabling',
    'IT Network Systems Administration',
    'IT Software Solution for Bussiness',
    'Karawitan',
    'Marketing Online',
    'Palang Merah Remaja',
    'Paskibra',
    'Pencak Silat',
    'Pramuka',
    'Robotik',
    'Seni Tari',
    'Seni Vokal',
    'Teater',
    'Web Design'
  ];

  // Years
  const currentYear = new Date().getFullYear();
  const years = [`${currentYear}/${currentYear + 1}`];



  // Load ekskul data if editing
  useEffect(() => {
    if (isEdit) {
      const savedEkskuls = localStorage.getItem('ekskuls');
      if (savedEkskuls) {
        const ekskuls = JSON.parse(savedEkskuls);
        const ekskul = ekskuls.find((e: EkskulForm) => e.id === params.id);
        if (ekskul) {
          setFormData(ekskul);
          if (ekskul.photo) setPhotoPreview(ekskul.photo);
        }
      }
    }
  }, [isEdit, params?.id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset sub-ekskul when name changes
    if (field === 'name') {
      setFormData(prev => ({
        ...prev,
        subEkskul: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setFormData(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, photo: null }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.year || !formData.description || !formData.pembimbing) {
      alert('Ekstrakurikuler, Year, Description, dan Pembimbing harus diisi!');
      return;
    }

    const now = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const savedEkskuls = localStorage.getItem('ekskuls');
    const ekskuls = savedEkskuls ? JSON.parse(savedEkskuls) : [];

    if (isEdit) {
      // Update existing ekskul
      const updatedEkskuls = ekskuls.map((e: EkskulForm) =>
        e.id === formData.id
          ? { ...formData, updated: now }
          : e
      );
      localStorage.setItem('ekskuls', JSON.stringify(updatedEkskuls));
    } else {
      // Create new ekskul
      const newEkskul = {
        ...formData,
        id: Date.now().toString(),
        updated: now
      };
      ekskuls.push(newEkskul);
      localStorage.setItem('ekskuls', JSON.stringify(ekskuls));
    }

    alert('Ekstrakurikuler berhasil disimpan!');
    router.push('/admin/ekskul');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isEdit ? 'Edit Ekstrakurikuler' : 'Tambah Ekstrakurikuler'}
        </h1>
        <p className="text-gray-600 mb-8">Kelola informasi ekstrakurikuler sekolah</p>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Ekstrakurikuler & Year */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Ekstrakurikuler<span className="text-red-500">*</span>
              </label>
              <select
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              >
                <option value="">Pilih</option>
                {ekskulList.map(ekskul => (
                  <option key={ekskul} value={ekskul}>{ekskul}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Tahun<span className="text-red-500">*</span>
              </label>
              <select
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              >
                <option value="">Pilih</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Deskripsi ekstrakurikuler"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Photo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            {photoPreview ? (
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <img src={photoPreview} alt="Photo preview" className="w-full h-full object-cover" />
                <button
                  onClick={removePhoto}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 text-sm"
            />
          </div>

          {/* Photo Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo Description
            </label>
            <input
              type="text"
              value={formData.photoDescription}
              onChange={(e) => handleInputChange('photoDescription', e.target.value)}
              placeholder="Foto kegiatan/Foto anggota/Lain-lain"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Pembimbing */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pembimbing<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.pembimbing}
              onChange={(e) => handleInputChange('pembimbing', e.target.value)}
              placeholder="Nama pembimbing ekstrakurikuler"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}