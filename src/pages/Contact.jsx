import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";

export default function Contact() {
    return (
        <section
            id="contact"
            className="py-28 px-6 text-white relative"
        >
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Contact Me</h2>
                <p className="text-gray-200 text-lg mb-12">
                    I’m open to job opportunities, freelance projects, and collaborations. Feel free to reach out through any of the following:
                </p>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Email */}
                    <a
                        href="mailto:soklimhoun@gmail.com"
                        className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition hover:scale-105"
                    >
                        <FaEnvelope className="text-2xl text-white" />
                        <span className="text-lg font-semibold">soklimhoun@gmail.com</span>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/soklimhoun"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition hover:scale-105"
                    >
                        <FaGithub className="text-2xl text-white" />
                        <span className="text-lg font-semibold">github.com/soklimhoun</span>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/soklimhoun"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-blue-700 transition hover:scale-105"
                    >
                        <FaLinkedin className="text-2xl text-white" />
                        <span className="text-lg font-semibold">linkedin.com/in/soklimhoun</span>
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:+85512345678"
                        className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-green-700 transition hover:scale-105"
                    >
                        <FaPhone className="text-2xl text-white" />
                        <span className="text-lg font-semibold">+855 123 456 78</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
