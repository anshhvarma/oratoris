"use client";
import React from "react";
import { StickyScroll } from "@/app/components/ui/stickyScroll";
import Image from "next/image";
import Img1 from "@/assests/suggestion/suggestion1.jpeg"
import Img2 from "@/assests/suggestion/suggestion2.jpeg"
import Img3 from "@/assests/suggestion/suggestion3.jpeg"
import Img4 from "@/assests/suggestion/suggestion4.jpeg"

const content = [
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={Img1}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo" />
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={Img2}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo" />
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={Img3}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo" />
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={Img4}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo" />
      </div>
    ),
  }
];
export function StickyScrollReveal() {
  return (
    (<div className="p-10">
      <h2
        className="text-center text-4xl sm:text-xl lg:text-5xl lg:mx-32 font-bold">
        Features.
      </h2>
      <StickyScroll content={content} />
    </div>)
  );
}
