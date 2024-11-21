'use client'
import React, { useState, useEffect } from 'react';
import heroImg from "@/assests/heroImg.png";
import Image from 'next/image';
import AnimatedTestimonials from '@/app/components/ui/testimonials';
import img1 from '@/assests/speakers/speaker1.jpeg';
import img2 from '@/assests/speakers/speaker2.jpeg';
import img4 from '@/assests/speakers/speaker4.jpeg';
import img5 from '@/assests/speakers/speaker5.jpeg';
import { Building, GraduationCapIcon, School, UserCircle } from 'lucide-react';
import { AppleCardsCarouselDemo } from './universities';
import { AnimatedModalDemo } from './schedule';
import { StickyScrollRevealDemo } from './features';
import HeroComponent from './heroComponent';

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: img1,
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: img2,
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: img5,
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: img4,
  },
];

const Home = () => {

  return (
    <section>
      <HeroComponent />


      <div className="bg-white flex justify-evenly rounded-lg p-4">
        <div className="flex items-center">
          <School size={32} className="mr-4" />
          <div>
            <p className="font-medium">24+</p>
            <p className="text-gray-500">Colleges</p>
          </div>
        </div>

        <div className="flex items-center">
          <UserCircle size={32} className="mr-4" />
          <div>
            <p className="font-medium">450+</p>
            <p className="text-gray-500">Speakers</p>
          </div>
        </div>

        <div className="flex items-center">
          <GraduationCapIcon size={32} className="mr-4" />
          <div>
            <p className="font-medium">70,000+</p>
            <p className="text-gray-500">Attendees</p>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-center text-5xl mx-32 pt-10 font-bold">
          Uniting Campuses and Visionaries to Ignite Innovation and Learning.
        </h1>
      </div>
      
      <AnimatedTestimonials testimonials={testimonials} />
      <AppleCardsCarouselDemo />
      <StickyScrollRevealDemo />
    </section>
  );
};

export default Home;
