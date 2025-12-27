"use client"

function CopyrightSection() {
  const currentYear = new Date().getFullYear()

  return (
    <div className="bg-primary pt-8 pb-12 border-t border-white/5">
      <div className="container-max">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-500 text-xs tracking-wider">
            Copyright © {currentYear} <span className="text-stone-300 font-semibold">Nepal Travel Co.</span> All Rights Reserved.
          </p>
          <div className="flex gap-8">
            {["Legacy", "Sitemap", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-stone-500 text-xs hover:text-white transition-colors duration-300 tracking-widest uppercase">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CopyrightSection
