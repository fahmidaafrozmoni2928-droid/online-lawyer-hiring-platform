"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {motion} from "framer-motion";
import Link from "next/link";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    title: "Find & Hire Expert Legal Counsel",
    desc: "Connect with verified lawyers for all your legal needs.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab",
    title: "Trusted Lawyers At Your Fingertips",
    desc: "Browse experienced attorneys and book appointments online.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    title: "Legal Support Made Simple",
    desc: "Hire professional legal experts anytime, anywhere.",
  },
];

export default function Banner() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation= {true}
        pagination={{ clickable: true }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero min-h-[80vh]"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="hero-overlay bg-black bg-opacity-60"></div>

              <div className="hero-content text-center text-white">
                <motion.div className="max-w-3xl"
                 initial={{opacity: 0, y: 50}}
                 animate={{opacity: 1, y: 0}}
                 transition={{duration: 0.8}}
                >
                  <h1 className="text-5xl md:text-7xl font-bold">
                    {slide.title}
                  </h1>

                  <p className="py-6 text-lg">
                    {slide.desc}
                  </p>

                  <Link href="/browse-lawyers">
                    <button className="btn btn-primary">
                      Browse Lawyers
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
