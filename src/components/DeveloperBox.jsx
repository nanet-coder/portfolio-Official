export default function DeveloperBox() {
    return (
        <div className="max-w-sm mx-auto bg-white/10 backdrop-blur border border-white/20 p-6 rounded-xl text-center text-white shadow-lg hover:scale-105 transition-transform">
            <img
                src="https://images.unsplash.com/photo-1603415526960-f4e1b3b1c33f?auto=format&fit=crop&w=200&q=80"
                alt="Sok Lim Houn"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-2xl font-bold mb-2">Sok Lim Houn</h3>
            <p className="text-gray-300 mb-4">Frontend Developer • React • Tailwind</p>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-200 mb-4">
                <div>
                    <span className="font-semibold">Projects</span>
                    <p>10+</p>
                </div>
                <div>
                    <span className="font-semibold">Experience</span>
                    <p>2 years</p>
                </div>
                <div>
                    <span className="font-semibold">Email</span>
                    <p>youremail@example.com</p>
                </div>
                <div>
                    <span className="font-semibold">GitHub</span>
                    <p>github.com/username</p>
                </div>
            </div>

            <a
                href="#contact"
                className="inline-block px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
            >
                Contact Me
            </a>
        </div>
    );
}
