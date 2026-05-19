'use server';

import { redirect } from "next/navigation";

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

//get doctor by id
export const getDoctorById = async (id) => {
  if (!id) return null;
  try {
    const res = await fetch(`${process.env.SERVER_URL}/appointment/${id}`, {
      cache: "no-store",
    });
    // if (!res.ok) {
    //   // throw new Error(`Failed to fetch doctor: ${res.status}`);
    // }
    const doctor = await res.json();
    return doctor; 

  } catch (error) {
    console.error("Error in getDoctorById:", error);
    return null;
  }
};

export const getRatedDoctors = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/rated-doctor`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch top rated doctors: ${res.status}`);
    }

    const topDoctors = await res.json();
    return Array.isArray(topDoctors) ? topDoctors : (topDoctors.data || []);

  } catch (error) {
    console.error("Error in getRatedDoctors Action:", error);
    return []; 
  }
};

//booking
export async function createBooking(appointmentData) {
  try {
    const serverUrl = process.env.SERVER_URL;
    
    const res = await fetch(`${serverUrl}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData)
    });

    if (!res.ok) {
      return { success: false, error: "Failed to book appointment" };
    }

    const data = await res.json(); 
    return { success: true, data };

  } catch (error) {
    return { success: false, error: error.message || "Something went wrong" };
  }
}

export async function updateAppointment(id, formData) {
    const rawData = Object.fromEntries(formData.entries());
    delete rawData._id; 

    try {
        const res = await fetch(`${process.env.SERVER_URL}/booking/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rawData)
        });

        if (!res.ok) {
            return { success: false, error: "Failed to update" };
            // redirect("/dashboard");
        }

        const data = await res.json();
        return { success: true, data };
        
    } catch (error) {
        return { success: false, error: "Network error" };
    }
}