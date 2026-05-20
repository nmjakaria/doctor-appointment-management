/* eslint-disable @next/next/no-img-element */
"use client";
import React from 'react';
import Marquee from 'react-fast-marquee';

const MedicalPartners = () => {
  const partners = [
    { id: 1, name: "Labaid Cardiac", logo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=150&q=80" },
    { id: 2, name: "Square Hospitals", logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=150&q=80" },
    { id: 3, name: "Apollo Clinics", logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=150&q=80" },
    { id: 4, name: "Ibn Sina Trust", logo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=150&q=80" },
    { id: 5, name: "Popular Diagnostic", logo: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=150&q=80" },
    { id: 6, name: "United Hospital", logo: "https://images.unsplash.com/photo-1538108149393-fdfd8169687d?auto=format&fit=crop&w=150&q=80" },
  ];

  return (
    <section className="py-10 bg-background border-y transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white uppercase tracking-wide">
          Our Affiliated Medical Partners
        </h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
          Top-tier hospitals and healthcare institutions we collaborate with.
        </p>
      </div>

      {/* Marquee Component Configuration */}
      <Marquee 
        gradient={true} 
        gradientColor="var(--marquee-gradient, #f9fafb)"
        speed={40} 
        pauseOnHover={true}
        direction="left"
      >
        {partners.map((partner) => (
          <div 
            key={partner.id} 
            className="flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm px-6 py-4 mx-4 min-w-35 h-35 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100 dark:border-gray-600 bg-gray-50 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center font-bold text-blue-600 dark:text-blue-400 text-xl">
                  {partner.name.charAt(0)}
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default MedicalPartners;