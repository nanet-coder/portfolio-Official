import { useState } from "react";
import { FaPlay } from "react-icons/fa";

export default function Blog() {
    const blogPosts = [
        {
            title: "Getting Started with React",
            date: "Feb 10, 2026",
            img: "https://i.pinimg.com/1200x/cb/a0/b8/cba0b89d2bf2d96a1ed26edb5849f804.jpg",
            video: "https://www.w3schools.com/html/mov_bbb.mp4",
            content: `
React is a JavaScript library for building user interfaces.
Start by creating components and using JSX syntax.
You can manage state using useState and handle side-effects with useEffect.
Components can be functional or class-based.
React encourages reusable UI components for scalable apps.
Create user interfaces from components.
      `,
        },
        {
            title: "Tailwind CSS Tips",
            date: "Feb 12, 2026",
            img: "https://i.pinimg.com/736x/82/31/53/823153259f6064dd8a73bacf4c58622b.jpg",
            content: `
Tailwind CSS allows quick styling with utility classes.
Use responsive classes for mobile-first design.
Tailwind CSS allows quick styling with utility classes.
Use responsive classes for mobile-first design.
Tailwind CSS allows quick styling with utility classes.
Use responsive classes for mobile-first design.
Tailwind CSS allows quick styling with utility classes.
Use responsive classes for mobile-first design.
Tailwind CSS allows quick styling with utility classes.
Use responsive classes for mobile-first design.
      `,
        },
        {
            title: "Building a Portfolio Website",
            date: "Feb 15, 2026",
            img: "https://i.pinimg.com/1200x/59/e1/5d/59e15d56d1c93e102d65022814d6bf3d.jpg",
            content: `
Your portfolio is your personal brand. Include your projects, skills, and contact info.
Make it responsive and visually appealing using Tailwind CSS.
Add animations and hover effects to enhance user experience.
Include a blog or testimonials section to show your expertise.
Ensure fast loading times and good SEO for discoverability.
      `,
        },
    ];

    const [selectedPost, setSelectedPost] = useState(blogPosts[0]);

    return (
        <section id="blog" className="py-24 px-6 bg-gray-900 min-h-screen">
            <h2 className="text-4xl font-bold text-white text-center mb-12">My Blog</h2>

            <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-8">
                {/* Left: Scrollable Blog Cards */}
                <div className="flex md:flex-col gap-4 md:space-y-4 overflow-x-auto md:overflow-y-auto max-h-[70vh] pr-2 scrollbar-none px-2">
                    {blogPosts.map((post, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedPost(post)}
                            className={`
                flex items-center md:flex-row flex-col gap-2 p-3 rounded-xl border border-white/20 cursor-pointer
                transition-all duration-300
                ${selectedPost.title === post.title ? "bg-white/20 scale-105" : "hover:bg-white/10 hover:scale-105"}
                min-w-[140px] md:min-w-full
              `}
                        >
                            {/* Thumbnail with optional video icon */}
                            <div className="relative w-full md:w-20 h-20 flex-shrink-0">
                                <img
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                {post.video && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-black/50 rounded-full p-2">
                                            <FaPlay className="text-white text-sm md:text-base" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Title and Date */}
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-sm md:text-base">{post.title}</h3>
                                <p className="text-gray-400 text-xs md:text-sm">{post.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Selected Post Content */}
              
                {/* Right: Selected Post Content */}
                <div className="bg-white/10 p-4 md:p-6 rounded-xl border border-white/20 backdrop-blur mt-6 md:mt-0 
            max-h-[60vh] md:max-h-[70vh] overflow-y-auto text-gray-200">
                    {/* Video or Image */}
                    {selectedPost.video ? (
                        <video
                            src={selectedPost.video}
                            controls
                            className="w-full h-auto max-h-[50vh] md:max-h-[80vh] object-contain rounded-lg mb-4"
                        />
                    ) : (
                        <img
                            src={selectedPost.img}
                            alt={selectedPost.title}
                            className="w-full h-auto max-h-[50vh] md:max-h-[80vh] object-contain rounded-lg mb-4"
                        />
                    )}

                    <h3 className="text-2xl font-bold mb-2">{selectedPost.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{selectedPost.date}</p>
                    {selectedPost.content.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                    ))}
                </div>


            </div>

            <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </section>
    );
}
