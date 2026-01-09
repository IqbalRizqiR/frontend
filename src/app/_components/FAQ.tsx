"use client";
import Image from "next/image";
import { FAQCard } from "./card";
import { dataFAQ } from "./const/datas";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Faq() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const changeSlideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dataFAQ.length);
    }, 5000);
    return () => clearInterval(changeSlideInterval);
  }, [currentSlide]);

  return (
    <>
      <motion.div 
        className="relative bg-secondary mt-31 w-full" 
        id="faq"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="-top-[15px] left-0 absolute w-full overflow-hidden leading-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg
            width="1440"
            height="60"
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto">
            <path
              d="M0 20 Q720 50 1440 20 L1440 0 Q720 10 0 0 Z"
              fill="url(#gradienName)"
            />
            <defs>
              <linearGradient
                id="gradienName"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="#E9E2EA" />
                <stop offset="1" stopColor="#F5F5F5" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        <motion.section 
          className="relative bg-[#E55959] px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Section Title */}
          <motion.h2 
            className="mb-8 sm:mb-10 font-bold text-white text-2xl sm:text-3xl md:text-4xl text-center"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Benefit & FAQ
          </motion.h2>

          {/* Cards Slider */}
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
              initial={{ x: 0 }}
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ duration: 0.5 }}
            >
              {dataFAQ.map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="flex-shrink-0 px-1 sm:px-2 w-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <FAQCard {...faq} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Slider Indicators */}
          <motion.div 
            className="z-10 relative flex justify-center items-center gap-x-2 mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            {Array.from({ length: dataFAQ.length }).map((_, index) => (
              <motion.button 
                key={index} 
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`rounded-full bg-white transition-all duration-300 ${
                    currentSlide === index
                      ? "w-[0.625rem] h-[0.625rem] bg-opacity-100"
                      : "w-2 h-2 bg-opacity-[28%]"
                  }`}></div>
              </motion.button>
            ))}
          </motion.div>

        </motion.section>
        <motion.div 
          className="block bg-[#E9E2EA] h-5"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        ></motion.div>
      </motion.div>
    </>
  );
}
