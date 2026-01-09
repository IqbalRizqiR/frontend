import Image from "next/image";
import React from "react";

export interface LeaderComponent {
  name: string;
  role: string;
  image: string;
}
 const newsData = [
    {
      id: 1,
      category: 'MAC',
      title: 'Mac A Rhythm: Saat Aula Berubah Jadi Panggung Se...',
      author: 'Rayyan Irsa',
      date: 'Sep 14, 2025',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      category: 'MAC',
      title: 'Dance Attack! Saat Jalanan Berubah Jadi Tempat T...',
      author: 'Rayyan Irsa',
      date: 'Sep 14, 2025',
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 3,
      category: 'MAC',
      title: 'MAC Home Band Class : MAC 33 Kenalan Cara Setup ...',
      author: 'Rayyan Irsa',
      date: 'Sep 14, 2025',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop'
    }
  ];


const NewsSection: React.FC<{ datas: LeaderComponent[] }> = ({  }) => {
  return (
    <section className="py-20 px-6 bg-white text-center" id="leaders">
      <p className="text-sm text-gray-400 mb-2">Update Berita</p>
      <h2 className="text-4xl font-bold mb-14">Berita Terbaru</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category Badge */}
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded ${
                  news.featured 
                    ? 'bg-red-500 text-white' 
                    : 'bg-red-50 text-red-500'
                }`}>
                  {news.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 hover:text-red-500 transition-colors">
                {news.title}
              </h3>

              {/* Author & Date */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  </div>
                  <span className="font-medium">{news.author}</span>
                </div>
                <span>{news.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
