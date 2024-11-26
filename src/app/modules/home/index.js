'use client'
import React from 'react';
import AnimatedTestimonials from '@/app/components/ui/testimonials';
import img1 from '@/assests/speakers/speaker1.jpeg';
import img2 from '@/assests/speakers/speaker2.jpeg';
import img4 from '@/assests/speakers/speaker4.jpeg';
import img5 from '@/assests/speakers/speaker5.jpeg';
import { GraduationCapIcon, School, UserCircle } from 'lucide-react';
import { CardsCarousel } from './universities';
import { StickyScrollReveal } from './features';
import HeroComponent from './heroComponent';
import { AnimatedModal } from './schedule';
import HeroVideo from '@/app/components/ui/HeroVideo';

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
      <section className='bg-[#FCF8F1] bg-opacity-30'>
      <div className="flex flex-col sm:flex-row justify-evenly rounded-lg mx-4 sm:mx-48 border-t pt-6 gap-6 sm:gap-0">
      <div className="flex items-center justify-center">
        <School size={40} className="mr-4" />
        <div>
          <p className="font-medium">24+</p>
          <p className="text-gray-500">Colleges</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <UserCircle size={40} className="mr-4" />
        <div>
          <p className="font-medium">450+</p>
          <p className="text-gray-500">Speakers</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <GraduationCapIcon size={40} className="mr-4" />
        <div>
          <p className="font-medium">70,000+</p>
          <p className="text-gray-500">Attendees</p>
        </div>
      </div>
    </div>




    <div className="flex flex-1 justify-center items-center pt-11">
      <HeroVideo
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/"
        thumbnailSrc=""
        thumbnailAlt="Hero Video"
      />
      <HeroVideo
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/"
        thumbnailSrc=""
        thumbnailAlt="Hero Video"
      />
    </div>


        <div>
          <h1 className="text-center text-5xl lg:mx-32 pt-20 font-bold">
            {/* Uniting Campuses and Visionaries to Ignite Innovation and Learning. */}
            <span className='text-yellow-400'> Not just </span>a College, but a Vibe
          </h1>

          <p className='text-center text-xl pt-2'>
            Discover A place where Education feels like an Adventure.        </p>
        </div>

        <CardsCarousel />
        <div>
          <h2
            className="text-start text-4xl sm:text-xl lg:text-5xl lg:mx-32 pt-20 font-bold">
            What <span className='text-yellow-400'> Speaker </span> Says.
          </h2>
          <AnimatedTestimonials testimonials={testimonials} />
        </div>
        <StickyScrollReveal />
        <div className='pt-8'>
        <h1 className="text-center text-4xl sm:text-xl lg:text-9xl lg:mx-32 pt-20 font-bold">
  <span className="text-yellow-400">Ready to schedule?</span> start your journey.
</h1>

          <AnimatedModal />
        </div>
      </section>
    </section>
  );
};

export default Home;
