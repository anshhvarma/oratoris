"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/app/components/ui/schedule";
import Image from "next/image";
import { motion } from "framer-motion";
import img1 from '@/assests/suggestion/suggestion1.jpeg'
import img2 from '@/assests/suggestion/suggestion2.jpeg'
import img3 from '@/assests/suggestion/suggestion3.jpeg'
import img4 from '@/assests/suggestion/suggestion4.jpeg'
import img5 from '@/assests/suggestion/suggestion5.jpeg'
import { Mic, PersonStanding, School } from "lucide-react";


export function AnimatedModal() {
  const images = [
    img1,img2,img3,img4,img5
  ];
  
  return (
    (<div className="flex items-center justify-center pt-7">
      <Modal>
        <ModalTrigger
          className="border rounder-lg h- dark:text-black text-black flex justify-center group/modal-btn">
          <span
            className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Schedule Seminar
          </span>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4
              className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Schedule your {" "}
              <span
                className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                    Events
              </span>{" "}
              now! ✈️
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden">
                  <Image
                    src={image}
                    alt="bali images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0" />
                </motion.div>
              ))}
            </div>
            <div
              className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex  items-center justify-center">
                <School className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  5 college started
                </span>
              </div>
              <div className="flex items-center justify-center">
                <PersonStanding className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                   500+ Attendees
                </span>
              </div>
              <div className="flex items-center justify-center">
                <VacationIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  69 visiting spots
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Mic className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  20+ Speakers
                </span>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>)
  );
}

const PlaneIcon = ({
  className
}) => {
  return (
    (<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>)
  );
};

const VacationIcon = ({
  className
}) => {
  return (
    (<svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path
        d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path
        d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>)
  );
};

