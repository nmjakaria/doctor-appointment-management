import React from 'react';

const WhyChooseUs = () => {
  const steps = [
    { step: "01", title: "Find a Doctor", desc: "Browse from our verified list of top-rated specialists near your location." },
    { step: "02", title: "Check Availability", desc: "Select your preferred date and convenient time slot dynamically." },
    { step: "03", title: "Book Instant Appointment", desc: "Secure your slot instantly and manage your bookings anytime via dashboard." }
  ];

  return (
    <section className="py-16 bg-secondary border-t border-secondary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white uppercase tracking-wide">
            How It Works
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
            Get your medical appointment structured in three simple, seamless steps.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center">

              <div className="absolute -top-5 left-6 bg-primary text-primary-foreground font-bold text-sm px-3 py-1 rounded-full shadow-sm">
                Step {item.step}
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;