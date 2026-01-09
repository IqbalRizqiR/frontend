import Image from "next/image";

import Link from "next/link";


export const CardTeam: React.FC<{
  data: { name: string; role: string; image: string };
}> = ({ data }) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow-md px-4 py-3 border border-[#E2E8F0] rounded-xl">
      <div className="rounded-full w-16 h-16 overflow-hidden">
        <Image
          src={data.image}
          alt={data.name}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-left">
        <h3 className="font-semibold text-[#A10000] text-base">{data.name}</h3>
        <p className="opacity-70 text-[#A10000] text-sm">{data.role}</p>
      </div>
    </div>
  );
};

interface PortfolioProps {
  id: string;
  title: string;
  sosmed: string;
  image: string;
  link: string;
  date: string;
}

export function PortfolioCard({ portfolio }: { portfolio: PortfolioProps }) {
  return (
    <div className="relative flex flex-col bg-white shadow-lg my-5 rounded-2xl max-w-md h-[450px] overflow-hidden">
      {/* Image with Caption Overlay */}
      <div className="relative w-full h-[55%] overflow-hidden">
        <Image
          src={portfolio.image}
          alt={portfolio.title}
          fill
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between px-6 pt-4 pb-6">
        <div className="mb-3">
          <div className="flex justify-between items-center gap-2 py-2 break-words">
            <h3 className="w-[70%] font-semibold text-[#A2181C] text-[18px] leading-snug">
              {portfolio.title}
            </h3>
            <p className="z-10 text-gray-400 text-sm">{portfolio.date}</p>
          </div>
        </div>

        {/* Instagram Info + Button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="rounded-md w-6 h-6 overflow-hidden">
             
            </div>
            <span className="font-medium text-gray-800">
              {portfolio.sosmed}
            </span>
          </div>

          <Link
            href={portfolio.link}
            className="flex items-center gap-2 bg-[#A2181C] hover:bg-red-700 ml-3 px-4 py-2 rounded-full font-medium text-white text-sm transition-colors duration-200">
            Explore more
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export interface FAQCardProps {
  profileImg: string;
  question: string;
  response: string[];
}

export function FAQCard({ profileImg, question, response }: FAQCardProps) {
  return (
    <div className="flex flex-col items-end gap-2 sm:gap-3 mx-auto px-2 sm:px-4 max-w-xl">
      {/* Question bubble */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <p className="bg-white/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-white text-xs sm:text-sm">
          {question}
        </p>
        <Image
          src={profileImg}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full w-8 sm:w-10 h-8 sm:h-10"
        />
      </div>

      {/* Response card */}
      <div className="flex items-start gap-2 sm:gap-3">
        <Image
          src="/assets/image/tsp.png" // telkom 
          alt="Mascot"
          width={40}
          height={40}
          className="rounded-md w-8 sm:w-10 h-8 sm:h-10"
        />
        <div className="flex flex-col gap-y-1.5 sm:gap-y-2">

        {response.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-3 sm:p-4 rounded-lg sm:rounded-xl">
            <p
              className="text-gray-700 text-xs sm:text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}