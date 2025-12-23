"use client";

import Image from "next/image";

const VisaInfo = () => {
  return (
    <div className="font-sans text-white uppercase leading-relaxed">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-accent/90 to-primary/90 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Replace with one or more background images for better visual */}
        <div className="relative z-10 w-full h-full">
          {/* <Image
            src="https://kalinatravelplatform.com/wp-content/uploads/2023/11/Nepal-Blog-.jpg"
            alt="Himalayas Nepal"
            fill
            className="object-cover"
            priority
          /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        <div className="absolute z-20 text-center px-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
            Nepal Visa Guide 2025
          </h1>
          <p className="text-xl md:text-3xl font-light text-white/90 max-w-2xl mx-auto">
            Complete visa information for tourists visiting the Himalayas
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 md:px-8">
        {/* Who Needs a Visa */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
              Who Needs a Visa?
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:-translate-y-2 transition-transform">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">🛡️</div>
                <h3 className="text-2xl font-semibold text-blue-800">Visa Exempt</h3>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg inline-block mb-4">
                Indian Nationals
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-800 before:font-bold">
                  No visa required for entry
                </li>
                <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-800 before:font-bold">
                  Stay up to 6 months with valid passport/ID
                </li>
                <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-800 before:font-bold">
                  Must enter through designated checkpoints
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:-translate-y-2 transition-transform">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">📋</div>
                <h3 className="text-2xl font-semibold text-blue-800">Visa Required</h3>
              </div>
              <div className="bg-gradient-to-r from-rose-600 to-blue-800 text-white px-4 py-2 rounded-lg inline-block mb-4">
                All Other Nationalities
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-800 before:font-bold">
                  Tourist visa required for entry
                </li>
                <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-800 before:font-bold">
                  Available as Visa-on-Arrival or e-Visa
                </li>
                <li className="pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-blue-800 before:font-bold">
                  Some nationalities must apply in advance
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Visa on Arrival Locations */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
              Visa-on-Arrival Locations
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:-translate-y-1 transition">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-200">
                <div className="text-4xl">✈️</div>
                <h3 className="text-2xl font-semibold text-blue-800">International Airports</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                  Tribhuvan International Airport (Kathmandu)
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                  Gautam Buddha Airport (Bhairahawa)
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                  Pokhara International Airport
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:-translate-y-1 transition">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-200">
                <div className="text-4xl">🚗</div>
                <h3 className="text-2xl font-semibold text-blue-800">Land Border Crossings</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">From India:</h4>
                  <div className="flex flex-wrap gap-3">
                    {["Kakadvitta", "Birgunj", "Belahiya", "Nepalgunj", "Dhangadi", "Mahendranagar"].map((item) => (
                      <span key={item} className="bg-gray-100 text-gray-700 px-4 py-2 rounded border border-gray-300 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-3">From Tibet/China:</h4>
                  <div className="flex flex-wrap gap-3">
                    {["Kodari", "Rasuwa Gadhi"].map((item) => (
                      <span key={item} className="bg-gray-100 text-gray-700 px-4 py-2 rounded border border-gray-300 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visa Types and Fees */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
              Tourist Visa Types & Fees
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded"></div>
            <p className="text-gray-600 italic mt-4">All fees in USD (as of December 2025)</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 text-center hover:-translate-y-3 transition-all shadow-lg">
              <div className="text-2xl font-bold text-blue-800 mb-2">15 Days</div>
              <div className="text-5xl font-extrabold text-rose-600 my-4">$30</div>
              <div className="text-gray-600">
                <span className="inline-block bg-gray-200 px-4 py-1 rounded-full mb-2">Multiple Entry</span>
                <p>Perfect for short visits</p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white to-rose-50 border-2 border-rose-600 rounded-xl p-8 text-center scale-105 shadow-2xl hover:-translate-y-3 transition-all">
              <div className="absolute -top-4 -right-8 bg-gradient-to-r from-rose-600 to-red-700 text-white px-8 py-2 rotate-45 shadow-lg text-sm font-bold">
                Most Popular
              </div>
              <div className="text-2xl font-bold text-blue-800 mb-2">30 Days</div>
              <div className="text-5xl font-extrabold text-rose-600 my-4">$50</div>
              <div className="text-gray-600">
                <span className="inline-block bg-gradient-to-r from-rose-600 to-red-700 text-white px-4 py-1 rounded-full mb-2">Multiple Entry</span>
                <p>Ideal for most tourists</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 text-center hover:-translate-y-3 transition-all shadow-lg">
              <div className="text-2xl font-bold text-blue-800 mb-2">90 Days</div>
              <div className="text-5xl font-extrabold text-rose-600 my-4">$125</div>
              <div className="text-gray-600">
                <span className="inline-block bg-gray-200 px-4 py-1 rounded-full mb-2">Multiple Entry</span>
                <p>For extended stays</p>
              </div>
            </div>
          </div>
        </section>

        {/* Extension Policy */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
              Visa Extension Policy
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-200">
                <div className="text-3xl">⏰</div>
                <h3 className="text-2xl font-semibold text-blue-800">Extension Details</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Maximum stay:</span>
                  <span className="text-gray-600">150 days per calendar year</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Extension fee:</span>
                  <span className="text-gray-600">Min 15 days: $45 + $3/day beyond</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Overstay penalty:</span>
                  <span className="text-gray-600">$5 USD per day</span>
                </div>
                <div className="pt-4">
                  <span className="font-medium block mb-1">Where to extend:</span>
                  <span className="text-gray-600">Department of Immigration, Kathmandu or Pokhara</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-200">
                <div className="text-3xl">⚠️</div>
                <h3 className="text-2xl font-semibold text-blue-800">Important Notes</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  <span className="text-gray-700">Extensions must be done before visa expires</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                  <span className="text-gray-700">Overstay penalty: $5 USD per day</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-1"></div>
                  <span className="text-gray-700">Regional offices in major cities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-1"></div>
                  <span className="text-gray-700">Online applications available</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Passport Requirements */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
              Passport Requirements
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:-translate-y-2 transition">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Validity</h3>
              <p className="text-gray-600">At least <strong>6 months</strong> from entry</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:-translate-y-2 transition">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Blank Pages</h3>
              <p className="text-gray-600">At least <strong>2 blank pages</strong></p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:-translate-y-2 transition">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Condition</h3>
              <p className="text-gray-600">Good condition, no damage</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200 hover:-translate-y-2 transition">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Photos</h3>
              <p className="text-gray-600"><strong>1 recent passport photo</strong></p>
            </div>
          </div>
        </section>

        {/* Travel Advisory */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-blue-800 mb-4">
              Important Travel Advisory
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-rose-50 border-l-4 border-rose-600 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl">🚨</div>
                <h3 className="text-2xl font-semibold text-blue-800">Avoid Airport Brokers</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-rose-600 before:text-xl">
                  Do not use unofficial agents or brokers at the airport
                </li>
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-rose-600 before:text-xl">
                  Apply directly at official counters
                </li>
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-rose-600 before:text-xl">
                  Brokers may overcharge or provide invalid documents
                </li>
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-rose-600 before:text-xl">
                  Official counters are clearly marked
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 rounded-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-3xl">💡</div>
                <h3 className="text-2xl font-semibold text-blue-800">Helpful Tips</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-green-600 before:text-xl">
                  Carry exact USD cash for fees
                </li>
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-green-600 before:text-xl">
                  Fill online form beforehand to save time
                </li>
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-green-600 before:text-xl">
                  Keep document copies
                </li>
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-green-600 before:text-xl">
                  Verify latest fees before travel
                </li>
                <li className="pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-green-600 before:text-xl">
                  Consider e-Visa online
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Official Information */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12 rounded-3xl my-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Official Information
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-white mx-auto rounded mb-8"></div>
          <div className="max-w-4xl mx-auto px-8">
            <p className="text-lg mb-8">
              For the most up-to-date information, visit the{" "}
              <a
                href="https://www.immigration.gov.np"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline hover:text-yellow-100 transition"
              >
                Nepal Department of Immigration
              </a>{" "}
              official website.
            </p>
            <div className="bg-white/10 rounded-xl p-6">
              <p className="text-sm italic">
                <strong>Disclaimer:</strong> Visa rules and fees can change. Always check official sources before travel.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VisaInfo;