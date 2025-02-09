"use client";
import HeadingAndSubHeading from "@/components/shared/HeadingAndSubHeading/HeadingAndSubHeading";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import { Autoplay, EffectFade } from "swiper/modules";
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
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 10,
    },
    {
      name: { english: "Barisal", bangla: "বরিশাল" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 5,
    },
    {
      name: { english: "Bhola", bangla: "ভোলা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 8,
    },
    {
      name: { english: "Bogra", bangla: "বগুড়া" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 12,
    },
    {
      name: { english: "Chandpur", bangla: "চাঁদপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 7,
    },
    {
      name: { english: "Chattogram", bangla: "চট্টগ্রাম" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Chuadanga", bangla: "চুয়াডাঙ্গা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 9,
    },
    {
      name: { english: "Comilla", bangla: "কুমিল্লা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 10,
    },
    {
      name: { english: "Cox's Bazar", bangla: "কক্সবাজার" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 11,
    },
    {
      name: { english: "Dhaka", bangla: "ঢাকা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 13,
    },
    {
      name: { english: "Dinajpur", bangla: "দিনাজপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Faridpur", bangla: "ফরিদপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 8,
    },
    {
      name: { english: "Feni", bangla: "ফেনী" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 7,
    },
    {
      name: { english: "Gaibandha", bangla: "গাইবান্ধা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 9,
    },
    {
      name: { english: "Gazipur", bangla: "গাজীপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 10,
    },
    {
      name: { english: "Gopalganj", bangla: "গোপালগঞ্জ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 5,
    },
    {
      name: { english: "Habiganj", bangla: "হবিগঞ্জ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Jamuna", bangla: "জামুণা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 8,
    },
    {
      name: { english: "Jhalokathi", bangla: "ঝালকাঠী" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 7,
    },
    {
      name: { english: "Jhenaidah", bangla: "ঝিনাইদহ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 9,
    },
    {
      name: { english: "Khagrachari", bangla: "খাগড়াছড়ি" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 12,
    },
    {
      name: { english: "Khulna", bangla: "খুলনা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 11,
    },
    {
      name: { english: "Kishoreganj", bangla: "কিশোরগঞ্জ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 10,
    },
    {
      name: { english: "Kurigram", bangla: "কুড়িগ্রাম" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 5,
    },
    {
      name: { english: "Kushtia", bangla: "কুষ্টিয়া" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 8,
    },
    {
      name: { english: "Lakshmipur", bangla: "লক্ষ্মীপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 7,
    },
    {
      name: { english: "Lalmonirhat", bangla: "লালমনিরহাট" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Madaripur", bangla: "মাদারিপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 5,
    },
    {
      name: { english: "Magura", bangla: "মাগুরা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 10,
    },
    {
      name: { english: "Manikganj", bangla: "মানিকগঞ্জ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 9,
    },
    {
      name: { english: "Meherpur", bangla: "মেহেরপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Moulvibazar", bangla: "মৌলভীবাজার" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 8,
    },
    {
      name: { english: "Munshiganj", bangla: "মুন্সিগঞ্জ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 7,
    },
    {
      name: { english: "Mymensingh", bangla: "ময়মনসিংহ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Naogaon", bangla: "নওগাঁ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 10,
    },
    {
      name: { english: "Narail", bangla: "নড়াইল" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 5,
    },
    {
      name: { english: "Narshingdi", bangla: "নরসিংদী" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 8,
    },
    {
      name: { english: "Netrokona", bangla: "নেত্রকোনা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Nilphamari", bangla: "নীলফামারী" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 7,
    },
    {
      name: { english: "Noakhali", bangla: "নোয়াখালী" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 9,
    },
    {
      name: { english: "Pabna", bangla: "পাবনা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 10,
    },
    {
      name: { english: "Panchagarh", bangla: "পঞ্চগড়" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Patuakhali", bangla: "পটুয়াখালী" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 7,
    },
    {
      name: { english: "Pirojpur", bangla: "পিরোজপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Rajbari", bangla: "রাজবাড়ী" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 9,
    },
    {
      name: { english: "Rajshahi", bangla: "রাজশাহী" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 12,
    },
    {
      name: { english: "Rangamati", bangla: "রাঙ্গামাটি" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 10,
    },
    {
      name: { english: "Rangpur", bangla: "রংপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 8,
    },
    {
      name: { english: "Satkhira", bangla: "সাতক্ষীরা" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 9,
    },
    {
      name: { english: "Shariatpur", bangla: "শরিয়তপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Sherpur", bangla: "শেরপুর" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 5,
    },
    {
      name: { english: "Sunamganj", bangla: "সুনামগঞ্জ" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 7,
    },
    {
      name: { english: "Sylhet", bangla: "সিলেট" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 8,
    },
    {
      name: { english: "Tangail", bangla: "টাঙ্গাইল" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 6,
    },
    {
      name: { english: "Thakurgaon", bangla: "ঠাকুরগাঁও" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
      photoCount: 5,
    },
    {
      name: { english: "Trishal", bangla: "ত্রিশাল" },
      photo: [
        "https://images.unsplash.com/photo-1574691966469-209649da8dcc?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1574691602250-ca700c7f52f4?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1619713277018-c5499173232c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpdHRhZ29uZ3xlbnwwfHwwfHx8MA%3D%3D",
      ],
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

  return (
    <div className="xl:px-16 sm:px-10 px-5 py-14 ">
      <HeadingAndSubHeading
        heading="District Photo Gallery
"
        headingBn="জেলা ছবির গ্যালারি"
        subHeading="Explore the beauty captured across all 64 district"
        subHeadingBn="৬৪টি জেলা জুড়ে ধারণ করা সৌন্দর্য অন্বেষণ করুন"
      />

      {/* card */}
      <div className="grid max-xl:grid-cols-4 grid-cols-5 mt-10 max-lg:grid-cols-3 max-md:grid-cols-1 gap-2 transform duration-300">
        {showAllDistrict ? (
          <>
            {zilaPhotos?.map((x) => (
              <div
                key={x?.name?.english}
                className={` h-[200px] max-md:h-[150px] max-md:rounded-2xl max-md:overflow-hidden relative w-full`}
              >
                <Swiper
                  spaceBetween={0}
                  effect={"fade"}
                  centeredSlides={true}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, EffectFade]}
                  className="mySwiper flex items-center bg-black h-full w-full"
                >
                  {x?.photo?.map((img: any, index: any) => (
                    <SwiperSlide className="" key={index}>
                      <Image
                        src={img}
                        alt="h"
                        className="w-full h-full object-cover "
                        width={500}
                        height={500}
                        loading="lazy"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="bg-black/30 absolute w-full h-full top-0 z-40 ">
                  <h2 className="absolute right-3 top-3 text-xl text-dark-primary-color">
                    <span className="font-BanglaHeading">
                      {Language === "BN" && convertToBangla(x?.photoCount)}
                    </span>{" "}
                    {Language === "EN" && x?.photoCount}
                    <span className="font-BanglaSubHeading text-base">
                      {Language === "BN" && <>টি ছবি</>}
                      <span className="font-Space">
                        {Language === "EN" && <>Pictures</>}
                      </span>
                    </span>
                  </h2>
                  <h1 className="font-BanglaHeading text-4xl absolute text-dark-primary-color bottom-3 left-3">
                    {Language === "BN" && <>{x?.name?.bangla}</>}
                  </h1>
                  <h1 className="font-Righteous text-2xl uppercase absolute bottom-3 left-3">
                    {Language === "EN" && <>{x?.name?.english}</>}
                  </h1>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {zilaPhotos?.slice(0, 19).map((x) => (
              <div
                key={x?.name?.english}
                className={` h-[200px] max-md:h-[150px] max-md:rounded-2xl max-md:overflow-hidden relative w-full`}
              >
                <Swiper
                  spaceBetween={0}
                  effect={"fade"}
                  centeredSlides={true}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, EffectFade]}
                  className="mySwiper flex items-center bg-black h-full w-full"
                >
                  {x?.photo?.map((img: any, index: any) => (
                    <SwiperSlide className="" key={index}>
                      <Image
                        src={img}
                        alt="h"
                        className="w-full h-full object-cover "
                        width={500}
                        height={500}
                        loading="lazy"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="bg-black/30 absolute w-full h-full top-0 z-40 ">
                  <h2 className="absolute right-3 top-3 text-xl text-dark-primary-color">
                    <span className="font-BanglaHeading">
                      {Language === "BN" && convertToBangla(x?.photoCount)}
                    </span>{" "}
                    {Language === "EN" && x?.photoCount}
                    <span className="font-BanglaSubHeading text-base">
                      {Language === "BN" && <>টি ছবি</>}
                      <span className="font-Space">
                        {Language === "EN" && <>Pictures</>}
                      </span>
                    </span>
                  </h2>
                  <h1 className="font-BanglaHeading text-4xl absolute text-dark-primary-color bottom-3 left-3">
                    {Language === "BN" && <>{x?.name?.bangla}</>}
                  </h1>
                  <h1 className="font-Righteous text-2xl uppercase absolute bottom-3 left-3">
                    {Language === "EN" && <>{x?.name?.english}</>}
                  </h1>
                </div>
              </div>
            ))}
          </>
        )}

        {!showAllDistrict && (
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
    </div>
  );
};

export default DistrictGallery;
