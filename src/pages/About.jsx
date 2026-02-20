import { FaGraduationCap, FaLaptopCode, FaBook } from "react-icons/fa";

export default function About() {
    return (
        <section id="about" className="w-full bg-gray-900 py-24 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* IMAGE */}
                <div className="relative group">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                        alt="Developer workspace"
                        className="rounded-2xl shadow-2xl transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-black/20 group-hover:bg-gradient-to-br from-purple-600/40 to-indigo-600/30 transition duration-200" />
                </div>

                {/* CONTENT */}
                <div className="space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        About Me
                    </h2>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        I am a passionate Frontend Developer specializing in building modern,
                        responsive, and user-friendly web applications with clean UI and smooth UX.
                    </p>

                    {/* INFO BOXES */}
                    <div className="grid sm:grid-cols-2 gap-4">

                        {/* BOX */}
                        <div className="group relative p-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur
              transition-all duration-150 ease-out
              hover:-translate-y-1 hover:scale-[1.03]
              hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]">

                            <h3 className="text-lg font-semibold text-white transition-colors duration-150 group-hover:text-yellow-300">
                                Frontend
                                <span className="block h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-500 
                  transition-all duration-200 group-hover:w-full mt-1" />
                            </h3>

                            <p className="text-gray-300 text-sm transition-colors duration-150 group-hover:text-gray-100">
                                React, Tailwind, HTML, CSS, JavaScript
                            </p>
                        </div>

                        {/* BOX */}
                        <div className="group relative p-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur
              transition-all duration-150 ease-out
              hover:-translate-y-1 hover:scale-[1.03]
              hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]">

                            <h3 className="text-lg font-semibold text-white transition-colors duration-150 group-hover:text-yellow-300">
                                Tools
                                <span className="block h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-500 
                  transition-all duration-200 group-hover:w-full mt-1" />
                            </h3>

                            <p className="text-gray-300 text-sm transition-colors duration-150 group-hover:text-gray-100">
                                Git, GitHub, VS Code, Vite
                            </p>
                        </div>

                        {/* BOX FULL */}
                        <div className="group relative sm:col-span-2 p-5 rounded-xl border border-white/20 bg-white/10 backdrop-blur
              transition-all duration-150 ease-out
              hover:-translate-y-1 hover:scale-[1.02]
              hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]">

                            <h3 className="text-lg font-semibold text-white transition-colors duration-150 group-hover:text-yellow-300">
                                Goal
                                <span className="block h-[2px] w-0 bg-gradient-to-r from-indigo-400 to-purple-500 
                  transition-all duration-200 group-hover:w-full mt-1" />
                            </h3>

                            <p className="text-gray-300 text-sm transition-colors duration-150 group-hover:text-gray-100">
                                Build real-world projects and grow as a professional developer
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* EDUCATION */}
            <div className="max-w-6xl mx-auto mt-24">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
                    Education & Courses
                </h2>

                {/* UNIVERSITY */}
                <div className="group max-w-3xl mx-auto mb-12 p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20
          transition-all duration-150 hover:scale-[1.03]
          hover:shadow-[0_0_30px_rgba(99,102,241,0.45)]">

                    <h3 className="text-xl md:text-2xl font-bold text-white transition-colors duration-150 group-hover:text-yellow-300">
                        <FaGraduationCap className="inline mr-2" />
                        Bachelor of Information Technology
                    </h3>

                    <p className="text-gray-300 mt-1">BELTEI International University</p>
                    <p className="text-gray-400 text-sm">2019 – 2023</p>
                </div>

                {/* YEARS */}
                <div className="grid md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((year) => (
                        <div
                            key={year}
                            className="group p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20
                transition-all duration-150 hover:scale-[1.03]
                hover:shadow-[0_0_30px_rgba(99,102,241,0.45)]"
                        >
                            <h3 className="text-lg font-bold text-white transition-colors duration-150 group-hover:text-yellow-300 flex items-center gap-2">
                                {year < 4 ? <FaBook /> : <FaGraduationCap />} Year {year}
                            </h3>

                            <ul className="list-disc list-inside text-gray-300 text-sm mt-2 space-y-1
                transition-colors duration-150 group-hover:text-gray-100">
                                <li>Core Programming</li>
                                <li>Web Development</li>
                                <li>Databases</li>
                                <li>Networking</li>
                                <li>Projects</li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
