import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
        ignoreDuringBuilds: true,
    },
    distDir: 'out',
  
    images: {
      domains: [
        'localhost', 
        'images.unsplash.com', 
        'res.cloudinary.com', 
        'static.promediateknologi.id', 
        'cdn-icons-png.flaticon.com', 
        'upload.wikimedia.org',
        'www.indico.co.id',
        'mitratel.co.id',
        'www.globalxtreme.net',
        'www.boxhill.edu.au',
        'www.jagoanhosting.com',
        'www.dot.co.id',
        'sevima.com',
        'www.wahanakomputer.com',
        'www.telkomschools.sch.id',
        'logo.clearbit.com'
      ],
     remotePatterns: [{
      protocol: "http",
      hostname: "**"
     }],
    }
  /* config options here */
};

export default nextConfig;
