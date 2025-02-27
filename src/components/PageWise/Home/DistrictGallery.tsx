"use client";
import HeadingAndSubHeading from "@/components/shared/HeadingAndSubHeading/HeadingAndSubHeading";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
interface ZilaPhoto {
  name: {
    english: string;
    bangla: string;
  };
  photo: any; // URL or filename for the photo
  photoCount: number; // Number of photos
}
const DistrictGallery = () => {
  // redux writing
  const Language = useSelector((state: any) => state.Language.value);

  const zilaPhotos: ZilaPhoto[] = [
    {
      name: { english: "Bagerhat", bangla: "বাগেরহাট" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
    {
      name: { english: "Barisal", bangla: "বরিশাল" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 5,
    },
    {
      name: { english: "Bhola", bangla: "ভোলা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 8,
    },
    {
      name: { english: "Bogra", bangla: "বগুড়া" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 12,
    },
    {
      name: { english: "Chandpur", bangla: "চাঁদপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 7,
    },
    {
      name: { english: "Chattogram", bangla: "চট্টগ্রাম" },
      photo:
        "https://images.unsplash.com/photo-1622104269661-dfffda1059e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Chuadanga", bangla: "চুয়াডাঙ্গা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 9,
    },
    {
      name: { english: "Comilla", bangla: "কুমিল্লা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
    {
      name: { english: "Cox's Bazar", bangla: "কক্সবাজার" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 11,
    },
    {
      name: { english: "Dhaka", bangla: "ঢাকা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 13,
    },
    {
      name: { english: "Dinajpur", bangla: "দিনাজপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Faridpur", bangla: "ফরিদপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 8,
    },
    {
      name: { english: "Feni", bangla: "ফেনী" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 7,
    },
    {
      name: { english: "Gaibandha", bangla: "গাইবান্ধা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 9,
    },
    {
      name: { english: "Gazipur", bangla: "গাজীপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
    {
      name: { english: "Gopalganj", bangla: "গোপালগঞ্জ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 5,
    },
    {
      name: { english: "Habiganj", bangla: "হবিগঞ্জ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Jamuna", bangla: "জামুণা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 8,
    },
    {
      name: { english: "Jhalokathi", bangla: "ঝালকাঠী" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 7,
    },
    {
      name: { english: "Jhenaidah", bangla: "ঝিনাইদহ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 9,
    },
    {
      name: { english: "Khagrachari", bangla: "খাগড়াছড়ি" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 12,
    },
    {
      name: { english: "Khulna", bangla: "খুলনা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 11,
    },
    {
      name: { english: "Kishoreganj", bangla: "কিশোরগঞ্জ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
    {
      name: { english: "Kurigram", bangla: "কুড়িগ্রাম" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 5,
    },
    {
      name: { english: "Kushtia", bangla: "কুষ্টিয়া" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 8,
    },
    {
      name: { english: "Lakshmipur", bangla: "লক্ষ্মীপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 7,
    },
    {
      name: { english: "Lalmonirhat", bangla: "লালমনিরহাট" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Madaripur", bangla: "মাদারিপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 5,
    },
    {
      name: { english: "Magura", bangla: "মাগুরা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
    {
      name: { english: "Manikganj", bangla: "মানিকগঞ্জ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 9,
    },
    {
      name: { english: "Meherpur", bangla: "মেহেরপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Moulvibazar", bangla: "মৌলভীবাজার" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 8,
    },
    {
      name: { english: "Munshiganj", bangla: "মুন্সিগঞ্জ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 7,
    },
    {
      name: { english: "Mymensingh", bangla: "ময়মনসিংহ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Naogaon", bangla: "নওগাঁ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
    {
      name: { english: "Narail", bangla: "নড়াইল" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 5,
    },
    {
      name: { english: "Narshingdi", bangla: "নরসিংদী" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 8,
    },
    {
      name: { english: "Netrokona", bangla: "নেত্রকোনা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Nilphamari", bangla: "নীলফামারী" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 7,
    },
    {
      name: { english: "Noakhali", bangla: "নোয়াখালী" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 9,
    },
    {
      name: { english: "Pabna", bangla: "পাবনা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
    {
      name: { english: "Panchagarh", bangla: "পঞ্চগড়" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Patuakhali", bangla: "পটুয়াখালী" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 7,
    },
    {
      name: { english: "Pirojpur", bangla: "পিরোজপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Rajbari", bangla: "রাজবাড়ী" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 9,
    },
    {
      name: { english: "Rajshahi", bangla: "রাজশাহী" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 12,
    },
    {
      name: { english: "Rangamati", bangla: "রাঙ্গামাটি" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
    {
      name: { english: "Rangpur", bangla: "রংপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 8,
    },
    {
      name: { english: "Satkhira", bangla: "সাতক্ষীরা" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 9,
    },
    {
      name: { english: "Shariatpur", bangla: "শরিয়তপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Sherpur", bangla: "শেরপুর" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 5,
    },
    {
      name: { english: "Sunamganj", bangla: "সুনামগঞ্জ" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 7,
    },
    {
      name: { english: "Sylhet", bangla: "সিলেট" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 8,
    },
    {
      name: { english: "Tangail", bangla: "টাঙ্গাইল" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 6,
    },
    {
      name: { english: "Thakurgaon", bangla: "ঠাকুরগাঁও" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 5,
    },
    {
      name: { english: "Trishal", bangla: "ত্রিশাল" },
      photo:
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      photoCount: 10,
    },
  ];
  const convertToBangla = (num: any) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((digit: any) => banglaDigits[parseInt(digit)])
      .join("");
  };

  const [showAllDistrict, setShowAllDistrict] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredDistricts = zilaPhotos.filter((district) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      district.name.english.toLowerCase().includes(searchValue) ||
      district.name.bangla.toLowerCase().includes(searchValue)
    );
  });
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const [hovered, SetHovered] = useState<number | null>(null);
  const ItemsPerPage = 6;

  const navigationPrevRef = React.useRef<HTMLButtonElement | null>(null);
  const navigationNextRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <div className="xl:px-16 sm:px-10 px-5 py-20 ">
      <HeadingAndSubHeading
        heading="District Photo Gallery
"
        headingBn="জেলা ছবির গ্যালারি"
        subHeading="Explore the beauty captured across all 64 district"
        subHeadingBn="৬৪টি জেলা জুড়ে ধারণ করা সৌন্দর্য অন্বেষণ করুন"
      />
      <div className="flex justify-center">
        <input
          placeholder={
            Language === "BN" ? "জেলা অনুসন্ধান করুন" : "Search district"
          }
          className={` max-md:my-2 my-4 max-md:mb-3 mx-auto max-md:w-[200px] p-2 px-2  font-Space text-center  outline-none rounded-lg border-2 border-light-primary-color ${Language === "BN" && "font-BanglaSubHeading"
            }`}
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {/* card */}
      <div className="relative">

        <div className="grid max-xl:grid-cols-4 grid-cols-4 mt-3 max-lg:grid-cols-3 max-md:grid-cols-1 gap-2 transform duration-300 max-md:hidden">
          {showAllDistrict ? (
            <>
              {filteredDistricts?.map((x, i) => (
                <button
                  key={x?.name?.english}
                  onMouseEnter={() => SetHovered(i)}
                  onMouseOver={() => SetHovered(i)}
                  onMouseLeave={() => SetHovered(null)}
                  onFocus={() => SetHovered(i)}
                  className={`border-2 dark:border-light-primary-color h-[220px] max-md:h-[150px] rounded-3xl  cursor-pointer  max-md:overflow-hidden overflow-hidden relative w-full text-dark-primary-color `}
                >
                  <Image
                    src={x?.photo}
                    alt="h"
                    className={`${hovered === i ? "scale-110" : "scale-100"
                      } w-full h-full object-cover transform duration-300`}
                    width={500}
                    height={500}
                    loading="lazy"
                  />{" "}
                  <div className="rounded-2xl h-full bg-gradient-to-t from-black/70 via-black/20 to-black/0  absolute w-full z-30  -bottom-5 p-2 flex items-center justify-between text-sm text-white"></div>
                  <div className={`  absolute w-full h-full top-0 z-40 `}>
                    <h1 className="font-BanglaHeading  absolute px-4 p-2   bottom-2 left-0 right-0">
                      {Language === "BN" && <>{x?.name?.bangla}</>}
                      <span className="font-Righteous">
                        {Language === "EN" && <>{x?.name?.english}</>}
                      </span>
                      <span>
                        {" "}
                        -{" "}
                        <span className="font-BanglaHeading">
                          {Language === "BN" && convertToBangla(x?.photoCount)}
                        </span>{" "}
                        <span className="font-Righteous">
                          {Language === "EN" && x?.photoCount}
                        </span>
                        <span className="font-BanglaSubHeading text-base">
                          {Language === "BN" && <>টি ছবি</>}
                          <span className="font-Righteous text-sm">
                            {" "}
                            {Language === "EN" && <>Img</>}
                          </span>
                        </span>
                      </span>
                    </h1>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <>
              {filteredDistricts?.slice(0, 12).map((x, i) => (
                <button
                  key={x?.name?.english}
                  onMouseEnter={() => SetHovered(i)}
                  onMouseOver={() => SetHovered(i)}
                  onMouseLeave={() => SetHovered(null)}
                  onFocus={() => SetHovered(i)}
                  className={`border-2 dark:border-light-primary-color h-[220px] max-md:h-[150px] rounded-3xl  cursor-pointer  max-md:overflow-hidden overflow-hidden relative w-full text-dark-primary-color `}
                >
                  <Image
                    src={x?.photo}
                    alt="h"
                    className={`${hovered === i ? "scale-110" : "scale-100"
                      } w-full h-full object-cover transform duration-300`}
                    width={500}
                    height={500}
                    loading="lazy"
                  />{" "}
                  <div className="rounded-2xl h-full bg-gradient-to-t from-black/70 via-black/20 to-black/0  absolute w-full z-30  -bottom-5 p-2 flex items-center justify-between text-sm text-white"></div>
                  <div className={`  absolute w-full h-full top-0 z-40 `}>
                    <h1 className="font-BanglaHeading  absolute px-4 p-2   bottom-2 left-0 right-0">
                      {Language === "BN" && <>{x?.name?.bangla}</>}
                      <span className="font-Righteous">
                        {Language === "EN" && <>{x?.name?.english}</>}
                      </span>
                      <span>
                        {" "}
                        -{" "}
                        <span className="font-BanglaHeading">
                          {Language === "BN" && convertToBangla(x?.photoCount)}
                        </span>{" "}
                        <span className="font-Righteous">
                          {Language === "EN" && x?.photoCount}
                        </span>
                        <span className="font-BanglaSubHeading text-base">
                          {Language === "BN" && <>টি ছবি</>}
                          <span className="font-Righteous text-sm">
                            {" "}
                            {Language === "EN" && <>Img</>}
                          </span>
                        </span>
                      </span>
                    </h1>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
        {
          !showAllDistrict && searchQuery === "" && <button onClick={() => {
            setShowAllDistrict(true);
          }} className=" max-md:hidden h-[50%] bg-gradient-to-t from-dark-primary-color dark:from-light-primary-color dark:via-black/80 via-dark-primary-color/80 to-dark-primary-color/0 dark:to-black/10 dark:rounded-2xl   absolute w-full z-30  bottom-0 p-2 flex items-center justify-center text-3xl text-light-primary-color dark:text-dark-primary-color">
            <span className="mt-20">{Language === "EN" && <h1>View All District</h1>}
              {Language === "BN" && (
                <h1 className="font-BanglaHeading">সকল জেলা দেখুন</h1>
              )}</span>
          </button>
        }
      </div>

      {/* mobile device swiper */}
      <div className="relative  md:hidden">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (
              typeof swiper.params.navigation !== "boolean" &&
              swiper.params.navigation
            ) {
              const nav = swiper.params.navigation;
              nav.prevEl = navigationPrevRef.current;
              nav.nextEl = navigationNextRef.current;
            }
          }}
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          className="mySwiper  max-md:h-[250px]"
        >
          {filteredDistricts?.map((x, i) => (
            <SwiperSlide
              key={x?.name?.english}
              onMouseEnter={() => SetHovered(i)}
              onMouseOver={() => SetHovered(i)}
              onMouseLeave={() => SetHovered(null)}
              onFocus={() => SetHovered(i)}
              className={`border-2 dark:border-light-primary-color h-[220px] max-md:h-[150px] rounded-3xl  cursor-pointer  max-md:overflow-hidden overflow-hidden relative w-full text-dark-primary-color `}
            >
              <Image
                src={x?.photo}
                alt="h"
                className={`${hovered === i ? "scale-110" : "scale-100"
                  } w-full h-full object-cover transform duration-300`}
                width={500}
                height={500}
                loading="lazy"
              />{" "}
              <div className="rounded-2xl h-full bg-gradient-to-t from-black/70 via-black/20 to-black/0  absolute w-full z-30  -bottom-5 p-2 flex items-center justify-between text-sm text-white"></div>
              <div className={`  absolute w-full h-full top-0 z-40 `}>
                <h1 className="font-BanglaHeading  absolute px-4 p-2   bottom-2 left-0 right-0">
                  {Language === "BN" && <>{x?.name?.bangla}</>}
                  <span className="font-Righteous">
                    {Language === "EN" && <>{x?.name?.english}</>}
                  </span>
                  <span>
                    {" "}
                    -{" "}
                    <span className="font-BanglaHeading">
                      {Language === "BN" && convertToBangla(x?.photoCount)}
                    </span>{" "}
                    <span className="font-Righteous">
                      {Language === "EN" && x?.photoCount}
                    </span>
                    <span className="font-BanglaSubHeading text-base">
                      {Language === "BN" && <>টি ছবি</>}
                      <span className="font-Righteous text-sm">
                        {" "}
                        {Language === "EN" && <>Img</>}
                      </span>
                    </span>
                  </span>
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className=" ms-5 mt-2 gap-x-1 flex">
          <button
            ref={navigationPrevRef}
            className="border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color dark:text-dark-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color hover:bg-light-primary-color hover:text-dark-primary-color p-2 rounded-xl"
          >
            <FaAngleLeft />
          </button>
          <button
            ref={navigationNextRef}
            className="border-2 dark:border-dark-primary-color border-light-primary-color text-light-primary-color dark:text-dark-primary-color dark:hover:bg-dark-primary-color dark:hover:text-light-primary-color hover:bg-light-primary-color hover:text-dark-primary-color p-2 rounded-xl"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistrictGallery;
