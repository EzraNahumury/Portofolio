// src/components/ProjectSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt, FaReact, FaNodeJs, FaHtml5, FaCss3Alt,
  FaJsSquare, FaTools, FaFigma, FaGithub, FaTimes, FaDownload, FaPython, FaJava, FaUsers, FaCalendarAlt
} from 'react-icons/fa';
import {
  SiTailwindcss, SiNextdotjs, SiVercel, SiMongodb,
  SiExpress, SiPostgresql, SiFlask, SiFirebase, SiGooglecloud, SiMysql, SiPhp, SiLaravel, SiBootstrap
} from 'react-icons/si';
import { PiCodeBold } from "react-icons/pi";
import { LuBadge } from "react-icons/lu";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { useNavbar } from '../contexts/NavbarContext';
import { supabase } from '../lib/supabase';
import Organizations from './Organizations';

// ===================================
// DATA PROYEK (FALLBACK - akan digantikan oleh data DB jika ada)
// ===================================
export const dummyProjects = [
  // WEB/APPS
  {
    title: "Aplikasi Membership",
    description: "Sistem manajemen keanggotaan digital yang efisien untuk berbagai organisasi dan komunitas.",
    tech: ["Java", "SQLite", "XML"],
    link: "https://github.com/EzraNahumury/Aplikasi-Membership",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "Ticket Booking System",
    description: "Platform pemesanan tiket konser full-stack dengan fitur pemilihan kursi interaktif dan pembayaran online.",
    tech: ["CSS3", "JavaScript", "PHP", "MySQL"],
    link: "https://github.com/EzraNahumury/WEBSITE-PEMESANAN-TIKET-KONSER-Full",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "TrashUp App",
    description: "Aplikasi pengelolaan sampah inovatif untuk mendukung gaya hidup berkelanjutan dan ramah lingkungan.",
    tech: ["Kotlin", "Firebase", "Google Cloud", "Postman"],
    link: "https://github.com/EzraNahumury/CAPSTONE-PROJECT-BANGKIT",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "MaybeMay E-Commerce",
    description: "Toko online eksklusif untuk penjualan tas dengan desain minimalis dan pengalaman belanja yang lancar.",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP"],
    link: "https://github.com/EzraNahumury/WEBSITE-PENJUALAN-TAS",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "Dusun Dokgarut Tourism",
    description: "Website profil desa wisata yang menampilkan keindahan alam dan kekayaan budaya Dusun Dokgarut.",
    tech: ["React", "TailwindCSS", "Framer Motion"],
    link: "https://github.com/EzraNahumury/DESIGN-WEBSITE-DUSUN-DOKGGARUT",
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2071&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "SmartWaste System",
    description: "Sistem klasifikasi sampah berbasis CNN dengan implementasi Flask dan PWA untuk deteksi sampah real-time.",
    tech: ["Flask", "PWA", "Python"],
    link: "https://github.com/EzraNahumury/SmartWaste-Sistem-Klasifikasi-Sampah-Berbasis-CNN-dengan-Implementasi-Flask-dan-PWA-untuk-Android",
    image: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?q=80&w=2074&auto=format&fit=crop",
    category: "Web/Apps",
  },
  {
    title: "Pet Shop Management",
    description: "Sistem manajemen operasional pet shop untuk layanan grooming, penitipan, dan inventaris produk.",
    tech: ["Laravel", "Bootstrap", "MySQL"],
    link: "https://github.com/EzraNahumury/PET-SHOP-MANAGEMENT",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop",
    category: "Web/Apps",
  },
  // MACHINE LEARNING
  {
    title: "Campus Maps UKDW",
    description: "Implementasi algoritma Best First Search untuk navigasi dan pencarian rute terpendek di lingkungan kampus.",
    tech: ["Python", "Algorithms", "Best First Search"],
    link: "https://github.com/EzraNahumury/Campus-Maps-UKDW-",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
    category: "Machine Learning",
  },
  {
    title: "Digital Image Processing",
    description: "Eksperimen pengolahan citra digital untuk ekstraksi fitur, filter, dan restorasi gambar.",
    tech: ["Python", "OpenCV", "NumPy"],
    link: "https://github.com/EzraNahumury/Pengolahan-Citra-Digital---Image-Processing",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    category: "Machine Learning",
  },
  {
    title: "Waste Classification CNN",
    description: "Model Deep Learning menggunakan Convolutional Neural Network untuk klasifikasi berbagai jenis sampah otomatis.",
    tech: ["TensorFlow", "Keras", "Python", "CNN"],
    link: "https://github.com/EzraNahumury/SKRIPSI/tree/main/CNN",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1974&auto=format&fit=crop",
    category: "Machine Learning",
  },
  {
    title: "YOLOv8 Waste Detection",
    description: "Deteksi objek sampah secara real-time menggunakan YOLOv8 untuk sistem monitoring kebersihan kota.",
    tech: ["YOLOv8", "Computer Vision", "Python"],
    link: "https://github.com/EzraNahumury/SKRIPSI/tree/main/YOLOv8/CODE",
    image: "https://images.unsplash.com/photo-1618477462146-050d2767eac4?q=80&w=2070&auto=format&fit=crop",
    category: "Machine Learning",
  },
  {
    title: "Federated Fraud Detection",
    description: "Sistem deteksi penipuan perbankan kolaboratif menggunakan Federated Learning untuk menjaga privasi data nasabah.",
    tech: ["Federated Learning", "AI"],
    link: "https://github.com/EzraNahumury/Collaborative-Intelligence-Network-Federated-Learning-",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    category: "Machine Learning",
  },
  {
    title: "Subsidi Ledger FL",
    description: "Penentuan kelayakan penerima subsidi secara cerdas menggunakan pendekatan Federated Learning yang terdesentralisasi.",
    tech: ["Python", "Federated Learning", "Data Analysis"],
    link: "https://github.com/EzraNahumury/SubsidiLedger",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "Machine Learning",
  },
];

// ===================================
// DATA SERTIFIKAT EZRA KRISTANTO NAHUMURY
// ===================================
export const userCertificates = [
  {
    title: "Bangkit Academy 2024 Batch 2",
    issuer: "Google, Tokopedia, Gojek, & Traveloka",
    date: "2024",
    link: "/certificates/[Bangkit 2024 Batch 2] Certificate - C239B4KY1302.pdf",
    image: "/certificate-images/[Bangkit 2024 Batch 2] Certificate - C239B4KY1302.png",
  },
  {
    title: "Menjadi Google Cloud Engineer",
    issuer: "Dicoding",
    date: "2024",
    link: "/certificates/Menjadi Google Cloud Engineer.pdf",
    image: "/certificate-images/Menjadi Google Cloud Engineer.png",
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding",
    date: "2024",
    link: "/certificates/Belajar Dasar AI.pdf",
    image: "/certificate-images/Belajar Dasar AI.png",
  },
  {
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding",
    date: "2024",
    link: "/certificates/Belajar Dasar Git dengan GitHub.pdf",
    image: "/certificate-images/Belajar Dasar Git dengan GitHub.png",
  },
  {
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding",
    date: "2024",
    link: "/certificates/Belajar Dasar Pemrograman JavaScript.pdf",
    image: "/certificate-images/Belajar Dasar Pemrograman JavaScript.png",
  },
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    date: "2024",
    link: "/certificates/Belajar Dasar Pemrograman Web.pdf",
    image: "/certificate-images/Belajar Dasar Pemrograman Web.png",
  },
  {
    title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
    issuer: "Dicoding",
    date: "2024",
    link: "/certificates/Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud.pdf",
    image: "/certificate-images/Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud.png",
  },
  {
    title: "Memulai Dasar Pemrograman Untuk Menjadi Pengembang Software",
    issuer: "Dicoding",
    date: "2024",
    link: "/certificates/Memulai Dasar Pemrograman Untuk Menjadi Pengembang SoftWare.pdf",
    image: "/certificate-images/Memulai Dasar Pemrograman Untuk Menjadi Pengembang SoftWare.png",
  },
  {
    title: "Pengenalan Ke Logika Pemrograman",
    issuer: "Dicoding",
    date: "2024",
    link: "/certificates/Pengenalan Ke Logika Pemrograman.pdf",
    image: "/certificate-images/Pengenalan Ke Logika Pemrograman.png",
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco",
    date: "2023",
    link: "/certificates/Cybersecurity Essentials.pdf",
    image: "/certificate-images/Cybersecurity Essentials.png",
  },
  {
    title: "Pendahuluan Tentang Keamanan Cyber",
    issuer: "Cisco",
    date: "2023",
    link: "/certificates/Pendahuluan Tentang Keamanan Cyber.pdf",
    image: "/certificate-images/Pendahuluan Tentang Keamanan Cyber.png",
  },
  {
    title: "Java Foundations",
    issuer: "Oracle Academy",
    date: "2023",
    link: "/certificates/JAVA FOUNDATIONS.pdf",
    image: "/certificate-images/JAVA FOUNDATIONS.png",
  },
  {
    title: "Java Programming",
    issuer: "Oracle Academy",
    date: "2024",
    link: "/certificates/JAVA PROGRAMMING.pdf",
    image: "/certificate-images/JAVA PROGRAMMING.png",
  },
  {
    title: "IT Specialist - Python",
    issuer: "Certiport",
    date: "2024",
    link: "/certificates/IT SPECIALIST.pdf",
    image: "/certificate-images/IT SPECIALIST.png",
  },
  {
    title: "Sertifikat Enumerator",
    issuer: "Lembaga Survei Indonesia",
    date: "2023",
    link: "/certificates/SERTIFIKAT ENUMERATOR.pdf",
    image: "/certificate-images/SERTIFIKAT ENUMERATOR.png",
  },
  {
    title: "Application Development with Cloud Run",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Application Development with Cloud Run.png",
    image: "/certificate-images/Application Development with Cloud Run.png",
  },
  {
    title: "Build Infrastructure with Terraform",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Build Infrastructure with Terraform on Google Cloud.png",
    image: "/certificate-images/Build Infrastructure with Terraform on Google Cloud.png",
  },
  {
    title: "Build a Secure Google Cloud Network",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Build a Secure Google Cloud Network.png",
    image: "/certificate-images/Build a Secure Google Cloud Network.png",
  },
  {
    title: "Cloud Computing Fundamentals",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Cloud Computing Fundamentals.png",
    image: "/certificate-images/Cloud Computing Fundamentals.png",
  },
  {
    title: "Data, ML, and AI in Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Data, ML, and AI in Google Cloud.png",
    image: "/certificate-images/Data, ML, and AI in Google Cloud.png",
  },
  {
    title: "Develop your Google Cloud Network",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Develop your Google Cloud Network.png",
    image: "/certificate-images/Develop your Google Cloud Network.png",
  },
  {
    title: "Developing a Google SRE Culture",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Developing a Google SRE Culture.png",
    image: "/certificate-images/Developing a Google SRE Culture.png",
  },
  {
    title: "Elastic Google Cloud Infrastructure: Scaling and Automation",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Elastic Google Cloud Infrastructure Scaling and Automation.png",
    image: "/certificate-images/Elastic Google Cloud Infrastructure Scaling and Automation.png",
  },
  {
    title: "Essential Google Cloud Infrastructure: Core Services",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Essential Google Cloud Infrastructure Core Services.png",
    image: "/certificate-images/Essential Google Cloud Infrastructure Core Services.png",
  },
  {
    title: "Essential Google Cloud Infrastructure: Foundation",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Essential Google Cloud Infrastructure Foundation.png",
    image: "/certificate-images/Essential Google Cloud Infrastructure Foundation.png",
  },
  {
    title: "Getting Started with Google Kubernetes Engine",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Getting Started with Google Kubernetes Engine.png",
    image: "/certificate-images/Getting Started with Google Kubernetes Engine.png",
  },
  {
    title: "Getting Started with Terraform for Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Getting Started with Terraform for Google Cloud.png",
    image: "/certificate-images/Getting Started with Terraform for Google Cloud.png",
  },
  {
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Google Cloud Fundamentals Core Infrastructure.png",
    image: "/certificate-images/Google Cloud Fundamentals Core Infrastructure.png",
  },
  {
    title: "Implement DevOps Workflows in Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Implement DevOps Workflows in Google Cloud.png",
    image: "/certificate-images/Implement DevOps Workflows in Google Cloud.png",
  },
  {
    title: "Implement Load Balancing on Compute Engine",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Implement Load Balancing on Compute Engine.png",
    image: "/certificate-images/Implement Load Balancing on Compute Engine.png",
  },
  {
    title: "Logging and Monitoring in Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Logging and Monitoring in Google Cloud.png",
    image: "/certificate-images/Logging and Monitoring in Google Cloud.png",
  },
  {
    title: "Monitor and Log with Google Cloud Observability",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Monitor and Log with Google Cloud Observability.png",
    image: "/certificate-images/Monitor and Log with Google Cloud Observability.png",
  },
  {
    title: "Networking and Security in Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Networking and Security in Google Cloud.png",
    image: "/certificate-images/Networking and Security in Google Cloud.png",
  },
  {
    title: "Observability in Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Observability in Google Cloud.png",
    image: "/certificate-images/Observability in Google Cloud.png",
  },
  {
    title: "Prepare Data for ML APIs on Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Prepare Data for ML APIs on Google Cloud.png",
    image: "/certificate-images/Prepare Data for ML APIs on Google Cloud.png",
  },
  {
    title: "Preparing for Your Associate Cloud Engineer Journey",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Preparing for Your Associate Cloud Engineer Journey.png",
    image: "/certificate-images/Preparing for Your Associate Cloud Engineer Journey.png",
  },
  {
    title: "Reliable Google Cloud Infrastructure: Design and Process",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Reliable Google Cloud Infrastructure Design and Process.png",
    image: "/certificate-images/Reliable Google Cloud Infrastructure Design and Process.png",
  },
  {
    title: "Set Up an App Dev Environment on Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Set Up an App Dev Environment on Google Cloud.png",
    image: "/certificate-images/Set Up an App Dev Environment on Google Cloud.png",
  },
  {
    title: "Using DevSecOps in your Google Cloud Environment",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/Using DevSecOps in your Google Cloud Environment.png",
    image: "/certificate-images/Using DevSecOps in your Google Cloud Environment.png",
  },
  {
    title: "Infrastructure in Google Cloud",
    issuer: "Google Cloud",
    date: "2024",
    link: "/certificates/a Infrastucture in Google Cloud.png",
    image: "/certificate-images/a Infrastucture in Google Cloud.png",
  },
];

const techStack = {
  frontend: [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "JavaScript", icon: <FaJsSquare className="text-[#F7DF1E]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "Flask", icon: <SiFlask className="text-white" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Java", icon: <FaJava className="text-[#5382a1]" /> },
    { name: "Laravel", icon: <SiLaravel className="text-[#FF2D20]" /> },
  ],
  "Machine Learning": [
    { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
  ],
  tools: [
    { name: "Git & GitHub", icon: <FaGithub className="text-white" /> },
    { name: "Vercel", icon: <SiVercel className="text-white" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "Tools Lain", icon: <FaTools className="text-gray-400" /> },
  ],
};

// ===================================
// HELPER & ANIMATION COMPONENTS
// ===================================
const LineShadowText = ({ children, className, shadowColor = "#4079ff", ...props }) => {
  return (
    <motion.span
      style={{ "--shadow-color": shadowColor }}
      className={`relative z-0 line-shadow-effect ${className}`}
      data-text={children}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// ===================================
// KOMPONEN KARTU SERTIFIKAT
// ===================================
const CertificateCard = ({ cert, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative cursor-pointer"
      whileHover={{ y: -8 }}
      onClick={() => onClick(cert)}
    >
      <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
        <div className="absolute inset-0">
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30 group-hover:from-slate-900/95 transition-all duration-500"></div>
        </div>
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex-1 flex items-start justify-between">
            <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">{cert.issuer}</span>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
              <span className="text-xs font-bold text-emerald-300">{cert.date}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight">{cert.title}</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-300">
                <FaDownload className="text-sm" />
                <span className="text-sm font-medium">View Certificate</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-cyan-500/20 backdrop-blur-md p-2 rounded-full border border-cyan-400/30">
                  <FaExternalLinkAlt className="text-cyan-300 text-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-transparent to-emerald-500/0 group-hover:from-cyan-500/10 group-hover:to-emerald-500/10 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN PREVIEW MODAL SERTIFIKAT
// ===================================
const CertificatePreviewModal = ({ certificate, onClose }) => {
  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative max-w-4xl w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10">
          <button onClick={onClose} className="bg-red-500/20 hover:bg-red-500/30 backdrop-blur-md p-3 rounded-full border border-red-400/30 transition-all duration-300 group">
            <FaTimes className="text-red-300 group-hover:text-red-200" />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{certificate.title}</h2>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="bg-cyan-500/20 px-4 py-2 rounded-full text-cyan-300 font-semibold border border-cyan-400/30">{certificate.issuer}</span>
                  <span className="bg-emerald-500/20 px-4 py-2 rounded-full text-emerald-300 font-semibold border border-emerald-400/30">{certificate.date}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <img src={certificate.image} alt={certificate.title} className="w-full h-auto max-h-[60vh] object-contain" />
          </div>
          <div className="mt-6 flex justify-center">
            <a href={certificate.link} download target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-cyan-500/25">
              <FaDownload className="group-hover:scale-110 transition-transform duration-300" />
              <span>Download Certificate</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ===================================
// KOMPONEN KARTU PROYEK
// ===================================
const ProjectCard = ({ project }) => {
  const techIcons = {
    "Next.js": <SiNextdotjs />, "React": <FaReact />, "TailwindCSS": <SiTailwindcss />,
    "Framer Motion": " गति ", "Node.js": <FaNodeJs />, "Express": <SiExpress />,
    "MongoDB": <SiMongodb />, "JWT": "🔑", "Figma": <FaFigma />, "Storybook": "📚",
    "Python": <FaPython />, "Flask": <SiFlask />, "MySQL": <SiMysql />,
    "PHP": <SiPhp />, "Laravel": <SiLaravel />, "Bootstrap": <SiBootstrap />,
    "Firebase": <SiFirebase />, "Google Cloud": <SiGooglecloud />, "Java": <FaJava />,
    "HTML5": <FaHtml5 />, "CSS3": <FaCss3Alt />, "JavaScript": <FaJsSquare />
  };

  return (
    <a href={project.link} target="_blank" rel="noopener noreferrer"
      className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
      style={{ background: `url('${project.image}') center/cover no-repeat`, cursor: 'pointer' }}
    >
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300 flex flex-col justify-between p-4 sm:p-6 text-white">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-cyan-300">{project.title}</h3>
          <p className="text-slate-300 mt-2 text-xs sm:text-sm leading-relaxed">{project.description}</p>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((t, i) => (
              <span key={i} className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full bg-cyan-900/70 text-cyan-200 border border-cyan-800/30 backdrop-blur-sm">
                {techIcons?.[t] || t}
              </span>
            ))}
          </div>
          <FaExternalLinkAlt className="text-slate-300 group-hover:text-cyan-200 transition-colors duration-300" />
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 rounded-2xl border border-cyan-300/10 pointer-events-none"></div>
    </a>
  );
};

// ===================================
// KOMPONEN UTAMA SECTION PROJECT
// ===================================
function ProjectSection() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [projectCategory, setProjectCategory] = useState('Web/Apps');
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const { hideNavbar, showNavbar } = useNavbar();

  // === Database States ===
  const [projectsFromDB, setProjectsFromDB] = useState([]);
  const [certificatesFromDB, setCertificatesFromDB] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  // === State dan konstanta untuk Show More/Less ===
  const INITIAL_CERTIFICATES_TO_SHOW = 6;
  const [visibleCertificatesCount, setVisibleCertificatesCount] = useState(INITIAL_CERTIFICATES_TO_SHOW);

  const INITIAL_PROJECTS_TO_SHOW = 6;
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(INITIAL_PROJECTS_TO_SHOW);

  // Fetch projects from database
  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('🔍 Fetching projects from Supabase...');
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('❌ Error fetching projects:', error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log('✅ Projects loaded from database:', data.length, 'projects');
          console.log('📊 Projects data:', data);
          setProjectsFromDB(data);
        } else {
          console.log('⚠️ No projects found in database, using fallback data');
        }
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  // Fetch certificates from database
  useEffect(() => {
    async function fetchCertificates() {
      try {
        console.log('🔍 Fetching certificates from Supabase...');
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('issue_date', { ascending: false });

        if (error) {
          console.error('❌ Error fetching certificates:', error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log('✅ Certificates loaded from database:', data.length, 'certificates');
          console.log('📜 Certificates data:', data);
          setCertificatesFromDB(data);
        } else {
          console.log('⚠️ No certificates found in database, using fallback data');
        }
      } catch (err) {
        console.error('❌ Error fetching certificates:', err);
      } finally {
        setLoadingCerts(false);
      }
    }
    fetchCertificates();
  }, []);

  useEffect(() => {
    if (previewCertificate) {
      hideNavbar();
    } else {
      showNavbar();
    }
  }, [previewCertificate, hideNavbar, showNavbar]);

  useEffect(() => {
    return () => {
      showNavbar();
    };
  }, [showNavbar]);

  const tabs = [
    { id: 'Projects', label: 'Projects', icon: <PiCodeBold className="text-[1.7em] mb-1" /> },
    { id: 'Certificate', label: 'Certificates', icon: <LuBadge className="text-[1.5em] mb-1" /> },
    { id: 'Organization', label: 'Organization', icon: <FaUsers className="text-[1.5em] mb-1" /> },
    { id: 'Tech Stack', label: 'Tech Stack', icon: <LiaLayerGroupSolid className="text-[1.5em] mb-1" /> },
  ];

  // Use database projects if available, fallback to dummy data
  const activeProjects = projectsFromDB.length > 0 ? projectsFromDB : dummyProjects;

  console.log('🎯 Active projects source:', projectsFromDB.length > 0 ? 'DATABASE' : 'FALLBACK');
  console.log('📦 Total projects:', activeProjects.length);

  // Transform database projects to match UI format
  const transformedProjects = activeProjects.map(p => {
    // If has UUID id, it's from database - transform it
    if (p.id && typeof p.id === 'string' && p.id.includes('-')) {
      return {
        id: p.id,
        title: p.title,
        description: p.description,
        tech: p.tags || [],
        link: p.demo_url || p.github_url || '#',
        image: p.image_url,
        category: 'Database', // All DB projects in one category
        featured: p.featured || false
      };
    }
    // Static data already in correct format
    return p;
  });

  console.log('🔄 Transformed projects:', transformedProjects.length);

  // Filter projects by category (only applies to static dummy data)
  const filteredProjects = transformedProjects.filter((p) => {
    // If from database (has category 'Database'), show all
    if (p.category === 'Database') return true;
    // For dummy data, filter by selected category
    return p.category === projectCategory;
  });

  console.log('✨ Filtered projects to display:', filteredProjects.length);

  // Use database certificates if available, fallback to static data
  const activeCertificates = certificatesFromDB.length > 0 ? certificatesFromDB : userCertificates;

  // === CHANGE START: Handler untuk tombol Show More/Less ===
  const handleShowMore = () => {
    setVisibleCertificatesCount(activeCertificates.length);
  };

  const handleShowLess = () => {
    setVisibleCertificatesCount(INITIAL_CERTIFICATES_TO_SHOW);
  };

  const handleShowMoreProjects = () => {
    setVisibleProjectsCount(filteredProjects.length);
  };

  const handleShowLessProjects = () => {
    setVisibleProjectsCount(INITIAL_PROJECTS_TO_SHOW);
  };

  // Reset visible projects count when category or tab changes
  useEffect(() => {
    setVisibleProjectsCount(INITIAL_PROJECTS_TO_SHOW);
  }, [projectCategory, activeTab]);
  // === CHANGE END ===

  return (
    <section id="project" className="py-20">

      <style>{`
        @keyframes line-shadow-anim { 0% { background-position: 0 0; } 100% { background-position: 100% 100%; } }
        .line-shadow-effect::after { content: attr(data-text); position: absolute; z-index: -1; left: 0.04em; top: 0.04em; background-image: linear-gradient(45deg, transparent 45%, var(--shadow-color) 45%, var(--shadow-color) 55%, transparent 0); background-size: 0.06em 0.06em; -webkit-background-clip: text; background-clip: text; color: transparent; animation: line-shadow-anim 30s linear infinite; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold font-moderniz">
          <span style={{ color: "#00ffdc" }}><LineShadowText shadowColor="#00b3a4">PORTFOLIO</LineShadowText></span>
          {' '}
          <span style={{ color: "#fff" }}><LineShadowText shadowColor="#bbbbbb">SHOWCASE</LineShadowText></span>
        </h2>
      </motion.div>

      <div className="w-full">
        <div className="flex justify-center mb-12">
          <motion.div
            layout
            className="inline-flex w-full max-w-4xl rounded-3xl p-2 shadow-lg border border-slate-800 bg-gradient-to-r from-[#101624] via-[#0a1627] to-[#0a223a] backdrop-blur-md"
            style={{ background: "linear-gradient(90deg, #101624 0%, #0a1627 50%, #0a223a 100%)", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-1 flex-col items-center justify-center px-2 py-7 rounded-2xl font-semibold text-base transition-colors duration-300 outline-none ${activeTab === tab.id ? "text-white" : "text-slate-400 hover:text-cyan-300"}`}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{ zIndex: 1, minWidth: 0 }}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-0 bg-gradient-to-br from-[#0a223a] to-[#101624] rounded-2xl"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    style={{ zIndex: -1, opacity: 0.96 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-2">
                  {tab.icon}
                  <span className="font-bold">{tab.label}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <div
          className="rounded-3xl p-0 md:p-6 shadow-xl border border-slate-800/60 mx-auto max-w-7xl bg-clip-padding"
          style={{ background: "rgba(17, 24, 39, 0.55)", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 md:p-10"
            >
              {activeTab === 'Projects' && (
                <>
                  {/* Only show category buttons for dummy data */}
                  {projectsFromDB.length === 0 && (
                    <div className="flex justify-center gap-4 mb-8">
                      <button className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${projectCategory === 'Web/Apps' ? 'bg-cyan-700/80 text-white border-cyan-400 shadow-cyan-500/10 shadow-lg' : 'bg-slate-900/60 text-cyan-200 border-slate-700 hover:bg-cyan-800/40 hover:text-white'}`} onClick={() => setProjectCategory('Web/Apps')}>Web/Apps</button>
                      <button className={`px-5 py-2 rounded-full font-semibold transition-all duration-200 border ${projectCategory === 'Machine Learning' ? 'bg-cyan-700/80 text-white border-cyan-400 shadow-cyan-500/10 shadow-lg' : 'bg-slate-900/60 text-cyan-200 border-slate-700 hover:bg-cyan-800/40 hover:text-white'}`} onClick={() => setProjectCategory('Machine Learning')}>Machine Learning</button>
                    </div>
                  )}

                  {loadingProjects ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.length > 0 ? (
                          filteredProjects.slice(0, visibleProjectsCount).map((p, i) => (
                            <ProjectCard key={p.id || i} project={p} />
                          ))
                        ) : (
                          <div className="col-span-full text-center text-slate-400 py-12">
                            No projects available yet.
                            {projectsFromDB.length === 0 && (
                              <div className="mt-4 text-sm text-cyan-400">
                                Add projects via Admin Dashboard to see them here!
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {filteredProjects.length > INITIAL_PROJECTS_TO_SHOW && (
                        <div className="flex justify-center mt-12">
                          {visibleProjectsCount < filteredProjects.length ? (
                            <motion.button
                              onClick={handleShowMoreProjects}
                              className="group bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show More ({filteredProjects.length - visibleProjectsCount} more)
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleShowLessProjects}
                              className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show Less
                            </motion.button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
              {activeTab === 'Certificate' && (
                <div className="space-y-8">
                  {loadingCerts ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <AnimatePresence>
                          {activeCertificates.slice(0, visibleCertificatesCount).map((cert, i) => {
                            // Transform DB data to match CertificateCard props
                            const certData = cert.id ? {
                              // From database (has UUID id)
                              title: cert.title,
                              issuer: cert.issuer,
                              date: cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '',
                              link: cert.credential_url || '#',
                              image: cert.image_url || ''
                            } : cert; // From static data

                            return <CertificateCard key={cert.id || i} cert={certData} onClick={setPreviewCertificate} />;
                          })}
                        </AnimatePresence>
                      </div>
                      {activeCertificates.length > INITIAL_CERTIFICATES_TO_SHOW && (
                        <div className="flex justify-center mt-12">
                          {visibleCertificatesCount < activeCertificates.length ? (
                            <motion.button
                              onClick={handleShowMore}
                              className="group bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show More ({activeCertificates.length - visibleCertificatesCount} more)
                            </motion.button>
                          ) : (
                            <motion.button
                              onClick={handleShowLess}
                              className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Show Less
                            </motion.button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
              {activeTab === 'Organization' && (
                <Organizations />
              )}
              {activeTab === 'Tech Stack' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  {Object.entries(techStack).map(([category, techs]) => (
                    <div key={category}>
                      <h3 className="text-xl font-bold text-cyan-300 capitalize mb-4 border-b-2 border-slate-800 pb-2">{category}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {techs.map((tech, i) => (
                          <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-slate-900/70 border border-slate-800 transition-all duration-300 hover:bg-slate-800/50 hover:border-cyan-500/30">
                            <div className="text-4xl">{tech.icon}</div>
                            <p className="text-sm text-slate-300">{tech.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {previewCertificate && (
          <CertificatePreviewModal
            certificate={previewCertificate}
            onClose={() => setPreviewCertificate(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectSection;