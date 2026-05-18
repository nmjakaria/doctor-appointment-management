'use server';

export async function getDoctors(query = "", specialty = "all") {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/appointment`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch doctors: ${res.status}`);
    }

    const doctors = await res.json();
    const doctorsList = Array.isArray(doctors) ? doctors : (doctors.data || []);


    const uniqueSpecialties = new Set();
    doctorsList.forEach(d => {
      if (d.specialty) {
        const formatted = d.specialty.trim();
        if (formatted) uniqueSpecialties.add(formatted);
      }
    });

    const dynamicSpecialties = [
      { label: "All Specialities", value: "all" },
      ...Array.from(uniqueSpecialties).map(spec => ({
        label: spec.charAt(0).toUpperCase() + spec.slice(1),
        value: spec.toLowerCase()
      }))
    ];

    let filtered = doctorsList;
    
    if (query) {
      filtered = filtered.filter(d => 
        d.name?.toLowerCase().includes(query.toLowerCase()) || 
        d.hospital?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (specialty !== "all") {
      filtered = filtered.filter(d => 
        d.specialty?.toLowerCase() === specialty.toLowerCase()
      );
    }

    return {
      doctors: filtered,
      specialties: dynamicSpecialties
    };

  } catch (error) {
    console.error("Error in getDoctors Action:", error);
    return { doctors: [], specialties: [{ label: "All Specialities", value: "all" }] }; 
  }
}