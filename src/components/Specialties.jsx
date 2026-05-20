import React from 'react';

const Specialties = () => {
  const specialtiesList = [
    { id: 1, name: "Cardiology", icon: "❤️", desc: "Expert care for your heart and cardiovascular health needs." },
    { id: 2, name: "Pediatrics", icon: "👶", desc: "Comprehensive and compassionate healthcare for children and infants." },
    { id: 3, name: "Neurology", icon: "🧠", desc: "Advanced diagnosis and treatment for brain and nervous system disorders." },
    { id: 4, name: "Dermatology", icon: "✨", desc: "Professional treatment for skin, hair, and nail conditions." },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        {/* মেইন হেডিং স্টাইল বজায় রাখা হয়েছে */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white uppercase tracking-wide">
            Explore By Specialties
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
            Find the right care by browsing through our specialized medical departments.
          </p>
        </div>

        {/* রেসপন্সিভ গ্রিড লেআউট এবং সমান উচ্চতার কার্ড (Equal height cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialtiesList.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col justify-between p-6 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              
              {/* হোম পেজের বাটনের সাথে মিল রেখে ডিজাইন */}
              <button className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start">
                Find Doctors <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;