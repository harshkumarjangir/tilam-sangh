import React from "react";
import data from "../data/contactData.json";
import HeroSection from "../components/infrastructure/HeroSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection hero={data.hero} />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white shadow-sm border rounded-md p-6">
            <h2 className="text-2xl font-bold text-yellow-800">{data.page.title}</h2>
            <p className="mt-2 text-gray-700">{data.page.intro}</p>

            <ul className="mt-4 space-y-2 text-gray-700">
              <li><strong>📍 पता:</strong> {data.contactInfo.address}</li>
              <li><strong>📞 फोन:</strong> {data.contactInfo.phone}</li>
              <li><strong>✉ ईमेल:</strong> {data.contactInfo.email}</li>
              <li><strong>⏱ कार्यालय समय:</strong> {data.contactInfo.officeHours}</li>
            </ul>

            <h3 className="text-lg font-bold text-yellow-800 mt-6">शाखाएँ</h3>
            <ul className="mt-2 space-y-1 text-gray-700">
              {data.branches.map((b, i) => (
                <li key={i}>• <strong>{b.name}</strong> – {b.phone}</li>
              ))}
            </ul>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-sm border rounded-md p-6">
            <h3 className="text-lg font-semibold text-yellow-900">Inquiry Form</h3>

            <form className="mt-3 space-y-4">
              <input className="w-full border p-2 rounded" placeholder="Your Name" />
              <input className="w-full border p-2 rounded" placeholder="Email" />
              <input className="w-full border p-2 rounded" placeholder="Phone" />
              <textarea className="w-full border p-2 rounded" rows="4" placeholder="Message"></textarea>
              <button className="bg-yellow-700 text-white px-5 py-2 rounded hover:bg-yellow-800">
                Submit
              </button>
            </form>
          </div>

        </div>

      </main>
    </div>
  );
}
