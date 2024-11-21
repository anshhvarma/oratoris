"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/app/components/ui/cardcarousel";
import Img1 from '@/assests/universites/university1.jpg'
import Img2 from '@/assests/universites/univ2.jpeg'
import Img3 from '@/assests/universites/univ3.jpeg'
import Img4 from '@/assests/universites/univ4.jpeg'
import Img5 from '@/assests/universites/univ5.jpeg'

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    (<div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Create your University.
      </h2>
      <Carousel items={cards} />
    </div>)
  );
}
const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: Img1
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src:Img2
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src:Img3
  },

  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src:Img4
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src:Img5 
  }
];
