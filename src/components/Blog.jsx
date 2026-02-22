import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { supabase } from "../supabaseClient"; // Ensure path is correct

export default function Blog() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                // Change "date" to "created_at" to get the absolute latest input first
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching blogs:", error.message);
            } else {
                setBlogPosts(data || []);
                if (data && data.length > 0) setSelectedPost(data[0]);
            }
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white font-bold animate-pulse">Loading Blogs...</div>
            </div>
        );
    }

    return (
        <section id="blog" className="py-24 px-6 bg-gray-900 min-h-screen">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 uppercase tracking-tighter">My Blog</h2>

            <div className="max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-8">
                {/* Left: Scrollable Blog Cards */}
                <div className="flex md:flex-col gap-4 md:space-y-4 overflow-x-auto md:overflow-y-auto max-h-[70vh] pr-2 scrollbar-none px-2"
                    data-aos="fade-right" data-aos-delay="200"
                >
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className={`
                                flex items-center md:flex-row flex-col gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                                ${selectedPost?.id === post.id ? "bg-white/20 border-white/40 scale-[1.02] shadow-xl" : "bg-white/5 border-white/10 hover:bg-white/10"}
                                min-w-[160px] md:min-w-full
                            `}
                        >
                            <div className="relative w-full md:w-24 h-20 flex-shrink-0">
                                <img
                                    src={post.image_url} // Changed from post.img
                                    alt=""
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                {post.video_url && ( // Changed from post.video
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                                        <div className="bg-indigo-600 rounded-full p-2 shadow-lg">
                                            <FaPlay className="text-white text-[10px]" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <h3 className="text-white font-bold text-sm md:text-base leading-tight">{post.title}</h3>
                                <p className="text-indigo-400 font-bold text-[10px] mt-1 uppercase tracking-widest">{post.date}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Selected Post Content */}
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl mt-6 md:mt-0 
    max-h-[75vh] flex flex-col overflow-y-auto text-gray-200 shadow-2xl scrollbar-none"
                    data-aos="fade-left" data-aos-delay="200"
                >

                    {selectedPost ? (
                        <div className="flex flex-col h-full">
                            {/* Media Container: Full Width, Fixed Height */}
                            <div className="rounded-2xl overflow-hidden mb-6 bg-slate-800 w-full shrink-0">
                                {selectedPost.video_url ? (
                                    <div className="aspect-video w-full">
                                        <video
                                            key={selectedPost.video_url}
                                            src={selectedPost.video_url}
                                            controls
                                            className="w-full h-full object-cover" // Video fills the frame
                                        />
                                    </div>
                                ) : (
                                    /* THE FIX: object-cover + w-full makes it go edge-to-edge (Left to Right) */
                                    <img
                                        src={selectedPost.image_url}
                                        alt={selectedPost.title}
                                        className="w-full h-[250px] md:h-[300px] object-cover block"
                                    />
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="flex-1">
                                <h3 className="text-3xl font-black text-white mb-2 leading-tight tracking-tighter">
                                    {selectedPost.title}
                                </h3>
                                <p className="text-indigo-400 font-black text-[10px] mb-4 uppercase tracking-[0.3em]">
                                    {selectedPost.date}
                                </p>

                                <div className="h-px w-full bg-white/10 mb-6"></div> {/* Decorative Line */}

                                <div className="space-y-4 text-gray-300 leading-relaxed text-base font-medium">
                                    {selectedPost.content?.split("\n").map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 italic font-bold">
                            Select a post to read more.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}