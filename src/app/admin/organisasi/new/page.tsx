'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, Upload, X, Image as ImageIcon } from 'lucide-react';

interface OrganizationForm {
  id: string;
  category: string;
  year: string;
  Organisasi: string;
  name: string;
  logo: string | null;
  description: string;
  photo: string | null;
  photoDescription: string;
  pembimbing: string;
  socialMedia: string;
  visi: string;
  misi: string;
  struktur: string;
  created: string;
  updated: string;
}

export default function OrganizationFormPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params?.id;

  // Refs for file inputs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<OrganizationForm>({
    id: '',
    category: '',
    year: '',
    Organisasi: '',
    name: '',
    logo: null,
    description: '',
    photo: null,
    photoDescription: '',
    pembimbing: '',
    socialMedia: '',
    visi: '',
    misi: '',
    struktur: '',
    created: '',
    updated: ''
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Organization categories
  const categories = [
    'OSIS', 'MPK', 'BDI', 'PALWAGA', 'PASKATEMA', 
    'TSBC', 'TSFC', 'TSVC', 'PMR', 'MEMO', 
    'MAC', 'METIC', 'COMET', 'PUSTEL', 'DA'
  ];

  // Years
  const currentYear = new Date().getFullYear();
  const years = [`${currentYear}/${currentYear + 1}`];

  // Sub-organizations based on category
  const getSubOrganizations = (category: string): string[] => {
    const subOrgMap: Record<string, string[]> = {
      'OSIS': ['Ketua OSIS', 'Wakil Ketua', 'Sekretaris'],
      'MPK': ['Ketua MPK', 'Anggota MPK'],
    };
    return subOrgMap[category] || [];
  };

  // Load organization data if editing
  useEffect(() => {
    if (isEdit) {
      const savedOrgs = localStorage.getItem('organizations');
      if (savedOrgs) {
        const orgs = JSON.parse(savedOrgs);
        const org = orgs.find((o: OrganizationForm) => o.id === params.id);
        if (org) {
          setFormData(org);
          if (org.logo) setLogoPreview(org.logo);
          if (org.photo) setPhotoPreview(org.photo);
        }
      }
    }
  }, [isEdit, params?.id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'category') {
      setFormData(prev => ({
        ...prev,
        subOrganization: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'photo') => {
    const file = e.target.files?.[0];
    
    if (!file) {
      console.log('No file selected');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file!');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB!');
      return;
    }

    console.log(`Processing ${type}:`, file.name, file.type, file.size);

    const reader = new FileReader();
    
    reader.onloadstart = () => {
      console.log(`Starting to read ${type}...`);
    };

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        console.log(`Loading ${type}: ${percent.toFixed(0)}%`);
      }
    };

    reader.onload = () => {
      const result = reader.result as string;
      console.log(`${type} loaded successfully, length:`, result.length);
      
      if (type === 'logo') {
        setLogoPreview(result);
        setFormData(prev => ({ ...prev, logo: result }));
      } else {
        setPhotoPreview(result);
        setFormData(prev => ({ ...prev, photo: result }));
      }
    };

    reader.onerror = (error) => {
      console.error(`Error reading ${type}:`, error);
      alert(`Failed to read ${type}. Please try again.`);
    };

    reader.readAsDataURL(file);

    // Reset input value to allow re-selecting the same file
    e.target.value = '';
  };

  const removeFile = (type: 'logo' | 'photo') => {
    if (type === 'logo') {
      setLogoPreview(null);
      setFormData(prev => ({ ...prev, logo: null }));
      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }
    } else {
      setPhotoPreview(null);
      setFormData(prev => ({ ...prev, photo: null }));
      if (photoInputRef.current) {
        photoInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = (type: 'logo' | 'photo') => {
    if (type === 'logo') {
      logoInputRef.current?.click();
    } else {
      photoInputRef.current?.click();
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.category || !formData.year || !formData.name) {
      alert('Category, Year, dan Organization Name harus diisi!');
      return;
    }

    const now = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const savedOrgs = localStorage.getItem('organizations');
    const orgs = savedOrgs ? JSON.parse(savedOrgs) : [];

    if (isEdit) {
      const updatedOrgs = orgs.map((o: OrganizationForm) =>
        o.id === formData.id
          ? { ...formData, updated: now }
          : o
      );
      localStorage.setItem('organizations', JSON.stringify(updatedOrgs));
    } else {
      const newOrg = {
        ...formData,
        id: Date.now().toString(),
        created: now,
        updated: now
      };
      orgs.push(newOrg);
      localStorage.setItem('organizations', JSON.stringify(orgs));
    }

    alert('Organisasi berhasil disimpan!');
    router.push('/admin/organisasi');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Information</h1>
        <p className="text-gray-600 mb-8">Introduce your organization's profile to the world!</p>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Category & Year */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih<span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              >
                <option value="">Pilih</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih<span className="text-red-500">*</span>
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

          {/* Sub Organization */}
          {formData.category && getSubOrganizations(formData.category).length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organ/Sub
              </label>
              <select
                value={formData.Organisasi}
                onChange={(e) => handleInputChange('Organisasi', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              >
                <option value="">Sub-Organisasi</option>
                <option value="">Organisasi</option>
              </select>
            </div>
          )}


          {/* Logo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo<span className="text-red-500">*</span>
            </label>
            {logoPreview ? (
              <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile('logo')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => triggerFileInput('logo')}
                className="w-32 h-32 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Click to upload</span>
              </button>
            )}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'logo')}
              className="hidden"
            />
            <p className="mt-2 text-xs text-gray-500">PNG, JPG up to 5MB</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Deskripsi organisasi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo<span className="text-red-500">*</span>
            </label>
            {photoPreview ? (
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                <img src={photoPreview} alt="Photo preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile('photo')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => triggerFileInput('photo')}
                className="w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload photo</span>
              </button>
            )}
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'photo')}
              className="hidden"
            />
            <p className="mt-2 text-xs text-gray-500">PNG, JPG up to 5MB</p>
          </div>

          {/* Photo Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo Description<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.photoDescription}
              onChange={(e) => handleInputChange('photoDescription', e.target.value)}
              placeholder="Foto anggota/Foto Kegiatan/Lain-lain"
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
              placeholder="Pembimbing"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Social Media */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Social Media<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.socialMedia}
              onChange={(e) => handleInputChange('socialMedia', e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Visi */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visi
            </label>
            <textarea
              value={formData.visi}
              onChange={(e) => handleInputChange('visi', e.target.value)}
              placeholder="Visi organisasi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Misi */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Misi
            </label>
            <textarea
              value={formData.misi}
              onChange={(e) => handleInputChange('misi', e.target.value)}
              placeholder="Misi organisasi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Struktur Organisasi */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Struktur Organisasi<span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.struktur}
              onChange={(e) => handleInputChange('struktur', e.target.value)}
              placeholder="Struktur organisasi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              {isEdit ? 'Update Organization' : 'Create Organization'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}