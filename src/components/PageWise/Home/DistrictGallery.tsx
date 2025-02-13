"use client";
import HeadingAndSubHeading from "@/components/shared/HeadingAndSubHeading/HeadingAndSubHeading";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

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
  return (
    <div className="xl:px-16 sm:px-10 px-5 py-14 ">
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
          className={` max-md:my-2 my-4 max-md:mb-3 mx-auto max-md:w-[200px] p-2 px-2  font-Space text-center  outline-none rounded-lg border-2 border-light-secondary-color ${
            Language === "BN" && "font-BanglaSubHeading"
          }`}
          type="text"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {/* card */}
      <div className="grid max-xl:grid-cols-4 grid-cols-5 mt-3 max-lg:grid-cols-3 max-md:grid-cols-1  transform duration-300 max-md:hidden">
        {showAllDistrict ? (
          <>
            {filteredDistricts?.map((x, i) => (
              <button
                key={x?.name?.english}
                onMouseEnter={() => SetHovered(i)}
                onMouseOver={() => SetHovered(i)}
                onMouseLeave={() => SetHovered(null)}
                onFocus={() => SetHovered(i)}
                className={`border dark:border-light-primary-color h-[200px] max-md:h-[150px]  cursor-pointer  max-md:overflow-hidden overflow-hidden relative w-full`}
              >
                <Image
                  src={x?.photo}
                  alt="h"
                  className={`${
                    hovered === i ? "scale-110" : "scale-100"
                  } w-full h-full object-cover transform duration-300`}
                  width={500}
                  height={500}
                  loading="lazy"
                />
                <div className={`  absolute w-full h-full top-0 z-40 `}>
                  <h2 className="absolute right-0 top-0 px-2 dark:bg-light-primary-color font-Space text-sm bg-dark-primary-color text-light-primary-color dark:text-dark-primary-color">
                    <span className="font-BanglaHeading">
                      {Language === "BN" && convertToBangla(x?.photoCount)}
                    </span>{" "}
                    {Language === "EN" && x?.photoCount}
                    <span className="font-BanglaSubHeading text-base">
                      {Language === "BN" && <>টি ছবি</>}
                      <span className="font-Space text-sm">
                        {" "}
                        {Language === "EN" && <>Img</>}
                      </span>
                    </span>
                  </h2>
                  <h1 className="font-BanglaHeading  absolute px-4 p-2  dark:bg-light-primary-color dark:text-dark-primary-color bottom-0 bg-dark-primary-color text-light-primary-color left-0">
                    {Language === "BN" && <>{x?.name?.bangla}</>}
                  </h1>
                  <h1 className="font-Space uppercase text-sm  absolute px-4 p-2 bg-dark-primary-color text-light-primary-color dark:bg-light-primary-color dark:text-dark-primary-color bottom-0 left-0">
                    {Language === "EN" && <>{x?.name?.english}</>}
                  </h1>
                </div>
              </button>
            ))}
          </>
        ) : (
          <>
            {filteredDistricts?.slice(0, 19).map((x, i) => (
              <button
                key={x?.name?.english}
                onMouseEnter={() => SetHovered(i)}
                onMouseOver={() => SetHovered(i)}
                onMouseLeave={() => SetHovered(null)}
                onFocus={() => SetHovered(i)}
                className={`border dark:border-light-primary-color h-[200px] max-md:h-[150px]  cursor-pointer  max-md:overflow-hidden overflow-hidden relative w-full`}
              >
                <Image
                  src={x?.photo}
                  alt="h"
                  className={`${
                    hovered === i ? "scale-110" : "scale-100"
                  } w-full h-full object-cover transform duration-300`}
                  width={500}
                  height={500}
                  loading="lazy"
                />
                <div className={`  absolute w-full h-full top-0 z-40 `}>
                  <h2 className="absolute right-0 top-0 px-2 dark:bg-light-primary-color font-Space text-sm bg-dark-primary-color text-light-primary-color dark:text-dark-primary-color">
                    <span className="font-BanglaHeading">
                      {Language === "BN" && convertToBangla(x?.photoCount)}
                    </span>{" "}
                    {Language === "EN" && x?.photoCount}
                    <span className="font-BanglaSubHeading text-base">
                      {Language === "BN" && <>টি ছবি</>}
                      <span className="font-Space text-sm">
                        {" "}
                        {Language === "EN" && <>Img</>}
                      </span>
                    </span>
                  </h2>
                  <h1 className="font-BanglaHeading  absolute px-4 p-2  dark:bg-light-primary-color dark:text-dark-primary-color bottom-0 bg-dark-primary-color text-light-primary-color left-0">
                    {Language === "BN" && <>{x?.name?.bangla}</>}
                  </h1>
                  <h1 className="font-Space uppercase text-sm  absolute px-4 p-2 bg-dark-primary-color text-light-primary-color dark:bg-light-primary-color dark:text-dark-primary-color bottom-0 left-0">
                    {Language === "EN" && <>{x?.name?.english}</>}
                  </h1>
                </div>
              </button>
            ))}
          </>
        )}

        {!showAllDistrict && searchQuery === "" && (
          <div
            onClick={() => {
              setShowAllDistrict(true);
            }}
            className={`bg-dark-primary-color h-[200px] max-md:h-full max-md:py-2  max-md:mx-auto max-md:px-4 max-md:rounded max-md:mt-5 max-md:w-fit max-md:rounded-2xl max-md:overflow-hidden flex justify-center items-center text-light-primary-color text-xl font-Righteous cursor-pointer relative w-full`}
          >
            {Language === "EN" && <h1>View All District</h1>}
            {Language === "BN" && (
              <h1 className="font-BanglaHeading">সকল জেলা দেখুন</h1>
            )}
          </div>
        )}
      </div>

      {/* mobile device swiper */}
      <div className="relative md:hidden">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".custom-pagination", // Link to external pagination div
            clickable: true,
          }}
          modules={[Autoplay, EffectFade, Pagination]}
          className="mySwiper"
        >
          {filteredDistricts?.map((x) => (
            <SwiperSlide
              key={x?.name?.english}
              className="h-[200px] rounded max-md:h-[150px] border-light-primary-color border-2 overflow-hidden relative w-full"
            >
              <Image
                src={x?.photo}
                alt="h"
                className="w-full rounded h-full object-cover"
                width={500}
                height={500}
                loading="lazy"
              />
              <div className={`  absolute w-full h-full top-0 z-40 `}>
                <h2 className="absolute right-3 top-3 rounded px-2 dark:bg-light-primary-color font-Space text-sm bg-dark-primary-color text-light-primary-color dark:text-dark-primary-color">
                  <span className="font-BanglaHeading">
                    {Language === "BN" && convertToBangla(x?.photoCount)}
                  </span>{" "}
                  {Language === "EN" && x?.photoCount}
                  <span className="font-BanglaSubHeading text-base">
                    {Language === "BN" && <>টি ছবি</>}
                    <span className="font-Space text-sm">
                      {" "}
                      {Language === "EN" && <>Img</>}
                    </span>
                  </span>
                </h2>
                <h1 className="font-BanglaHeading  absolute rounded px-4 p-2  dark:bg-light-primary-color dark:text-dark-primary-color bottom-3 bg-dark-primary-color text-light-primary-color left-3">
                  {Language === "BN" && <>{x?.name?.bangla}</>}
                </h1>
                <h1 className="font-Space uppercase  rounded absolute px-4 p-2 bg-dark-primary-color text-light-primary-color dark:bg-light-primary-color dark:text-dark-primary-color bottom-3 left-3">
                  {Language === "EN" && <>{x?.name?.english}</>}
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* External Pagination Dots */}
        <div className="custom-pagination flex justify-center lg:hidden  mt-4 w-[95%] items-center flex-wrap mx-auto"></div>
      </div>
    </div>
  );
};

export default DistrictGallery;
