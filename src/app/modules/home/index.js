
import React from 'react';
import heroImg from "@/assests/heroImg.png"
import Image from 'next/image';
import AnimatedTestimonials from '@/app/components/ui/testimonials'
import img1 from '@/assests/speakers/speaker1.jpeg'
import img2 from '@/assests/speakers/speaker2.jpeg'
import img4 from '@/assests/speakers/speaker4.jpeg'
import img5 from '@/assests/speakers/speaker5.jpeg'

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: img1
  },
    {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src:img2
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src:img5
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: img4
  }
];

const Home = () => {
  return (
    <section>
      <div className="bg-white">
        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                  Connect & learn from the experts
                </h1>
                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                  Grow your career fast with the right mentor.
                </p>

                <a
                  href="/signup"
                  title=""
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400"
                  role="button"
                >
                  Join for free
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>

                <p className="mt-5 text-gray-600">
                  Already joined us?{' '}
                  <a href="/login" title="" className="text-black transition-all duration-200 hover:underline">
                    Log in
                  </a>
                </p>
              </div>

              <div>
                <Image
                  width="100%"
                  height="100%"
                  src={heroImg}
                  alt="Image"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center pt-24">
          </div>
        </section>
      </div>
      <AnimatedTestimonials testimonials={testimonials} />;
    </section>
  );
};

export default Home;


