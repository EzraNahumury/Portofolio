import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaDownload } from 'react-icons/fa';

// ===================================
// DATA ORGANISASI
// ===================================
export const userOrganizations = [
    {
        name: "Badan Eksekutif Mahasiswa (BEM) Universitas",
        role: "Anggota Kementerian Sosial Budaya",
        period: "2024 - 2025",
        description: "Served as a member in the Ministry of Social and Cultural Affairs under the student executive board at UKDW.",
        image: "/Organization/BEM-Universitas.png",
        certificate_link: "/Organization/BADAN EKSEKUTIF MAHASISWA UNIVERSITAS.pdf",
    },
    {
        name: "Himpunan Mahasiswa Informatika (HMTI)",
        role: "Anggota Dana Usaha",
        period: "2023",
        description: "Participated as a member of the fund-raising department in the informatics student association at UKDW.",
        image: "/Organization/HMTI.png",
        certificate_link: "/Organization/HIMPUNAN MAHASISWA TEKNIK INFORMATIKA.pdf",
    }
];

// ===================================
// KOMPONEN KARTU ORGANISASI
// ===================================
export const OrganizationCard = ({ org }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-500"
        >
            <div className="absolute inset-0">
                <img src={org.image} alt={org.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-slate-900/30 transition-all duration-500"></div>
            </div>
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-cyan-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/30 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                            {org.role}
                        </span>
                        <div className="flex items-center gap-1 text-emerald-300 text-xs font-bold bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30">
                            <FaCalendarAlt className="text-[10px]" />
                            {org.period}
                        </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">{org.name}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {org.description}
                    </p>
                    {org.certificate_link && org.certificate_link !== "#" && (
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            <a
                                href={org.certificate_link}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600/80 to-emerald-600/80 hover:from-cyan-500 hover:to-emerald-500 text-white text-xs font-bold rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 hover:shadow-[0_0_12px_rgba(0,255,220,0.3)]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaDownload />
                                Download Certificate
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Organizations = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {userOrganizations.map((org, i) => (
                <OrganizationCard key={i} org={org} />
            ))}
        </div>
    );
};

export default Organizations;
