"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../_components/lib/api";

interface Organisation {
  id: number;
  name: string;
  description: string;
  logo: string;
}

export default function EkstrakurikulerPage() {
  const [orgs, setOrganisations] = useState<Organisation[]>([]);

  useEffect(() => {
    console.log("Fetching ekskul data...");
    api
      .get("/ekstrakulikuler")
      .then((response) => {
        console.log("Response:", response);
        console.log("Response data:", response.data);
        console.log("Response data.data:", response.data.data);
        setOrganisations(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching ekskul:", error);
        console.error("Error response:", error.response);
      });
  }, []);

  console.log("Current orgs:", orgs);

  useEffect(() => {
    api.get("/ekstrakulikuler").then((response) => {
      // Sesuaikan dengan struktur response API kamu

      setOrganisations(response.data.data);
    });
  }, []);
  return (
    <main className="bg-white min-h-screen">
      <section className="mx-auto px-6 py-16 max-w-7xl">
        <h1 className="mb-8 font-bold text-black text-5xl text-center">
          Ekstrakurikuler SMK Telkom Malang
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-gray-600 text-center">
          Temukan berbagai ekstrakurikuler yang bisa kamu ikuti untuk
          mengembangkan bakat, minat, dan karakter di SMK Telkom Malang.
        </p>
        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="relative bg-gray-100 rounded-2xl h-80 overflow-hidden hover:scale-102 transition-all"
            >
              {/* Image penuh atas */}
              <div className="relative w-full h-[70%] aspect-h-9 aspect-w-16">
                <Image
                  src={org.logo}
                  alt={`Logo ${org.name}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Box putih bawah */}
              <div className="bg-primary pl-2 h-[30%]">
                <h2 className="mb-2 px-2 py-2 font-bold text-white text-xl">
                  {org.name}
                </h2>
                <p className="mt-[-8px] px-2 max-w-xs text-white text-sm line-clamp-3">
                  {org.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}