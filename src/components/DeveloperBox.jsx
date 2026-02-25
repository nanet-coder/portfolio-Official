export default function Developers() {
    const developers = [
        {
            name: "Sok Lim Houn",
            role: "Frontend Developer • React • Tailwind",
            img: "https://i.pinimg.com/736x/70/2e/b3/702eb327186a62e6bfab5be1e40a1b77.jpg",
            projects: "10+",
            experience: "2 years",
            email: "youremail@example.com",
            github: "github.com/username",
        },
        {
            name: "Jane Doe",
            role: "Backend Developer • Node.js • Express",
            img: "https://i.pinimg.com/736x/1c/0f/54/1c0f542f4470e79badf2b46f3e805af9.jpg",
            projects: "15+",
            experience: "3 years",
            email: "janedoe@example.com",
            github: "github.com/janedoe",
        },
        {
            name: "John Smith",
            role: "Fullstack Developer • React • Node.js",
            img: "https://i.pinimg.com/1200x/82/92/13/829213b28f3f1e33790a9dd1f0add1ae.jpg",
            projects: "12+",
            experience: "4 years",
            email: "johnsmith@example.com",
            github: "github.com/johnsmith",
        },
    ];

    return (
        <div
            id="developer"
            className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-whihte mb-10 animate-glow-amber">
                Our Developers
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
                {developers.map((dev, index) => (
                    <div
                        key={index}
                        className="group bg-white/10 backdrop-blur border border-white/20 p-6 rounded-xl text-center text-white shadow-lg transform transition-transform hover:scale-105"
                    >
                        {/* Animated logo */}
                        <img
                            src={dev.img}
                            alt={dev.name}
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover 
                                       animate-spin-slow group-hover:hue-rotate-180 group-hover:scale-110 transition-all duration-500"
                        />

                        <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-400 transition-colors duration-500">
                            {dev.name}
                        </h3>
                        <p className="text-gray-300 mb-4 group-hover:text-gray-100 transition-colors duration-500">
                            {dev.role}
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-200 mb-4 group-hover:text-gray-100 transition-colors duration-500">
                            <div>
                                <span className="font-semibold">Projects</span>
                                <p>{dev.projects}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Experience</span>
                                <p>{dev.experience}</p>
                            </div>
                            <div>
                                <span className="font-semibold">Email</span>
                                <p>{dev.email}</p>
                            </div>
                            <div>
                                <span className="font-semibold">GitHub</span>
                                <p>{dev.github}</p>
                            </div>
                        </div>

                        <a
                            href="#contact"
                            className="inline-block px-6 py-2 bg-white text-black rounded-full font-semibold group-hover:bg-amber-400 transition-colors duration-500"
                        >
                            Contact Me
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}