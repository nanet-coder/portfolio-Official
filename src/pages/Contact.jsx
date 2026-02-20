import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";

export default function Contact() {
    const contacts = [
        {
            icon: <FaEnvelope />,
            text: "soklimhoun@gmail.com",
            href: "mailto:soklimhoun@gmail.com",
        },
        {
            icon: <FaGithub />,
            text: "github.com/soklimhoun",
            href: "https://github.com/soklimhoun",
            external: true,
        },
        {
            icon: <FaLinkedin />,
            text: "linkedin.com/in/soklimhoun",
            href: "https://www.linkedin.com/in/soklimhoun",
            external: true,
        },
        {
            icon: <FaPhone />,
            text: "+855 88 389 3940",
            href: "tel:+85512345678",
        },
    ];

    return (
        <section id="contact" className="py-28 px-6 relative bg-black/20">
            <div className="max-w-4xl mx-auto text-center">
                {/* Heading with subtle fade/slide animation */}
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white/70 drop-shadow-lg animate-titleFade">
                    Contact Me
                </h2>

                {/* Description */}
                <p className="text-lg mb-12 text-white/70 drop-shadow-sm">
                    I’m open to job opportunities, freelance projects, and collaborations. Feel free to reach out through any of the following:
                </p>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                    {contacts.map((contact, index) => (
                        <a
                            key={index}
                            href={contact.href}
                            target={contact.external ? "_blank" : "_self"}
                            rel={contact.external ? "noopener noreferrer" : undefined}
                            className="flex items-center justify-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-6 transition-all duration-700 hover:scale-105 hover:bg-amber-400/30"
                        >
                            <span className="text-2xl text-white/70 drop-shadow">{contact.icon}</span>
                            <span className="text-lg font-semibold text-white/70 drop-shadow">
                                {contact.text}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Animations */}
            <style>{`
        /* Title fade/slide animation */
        @keyframes titleFade {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-titleFade {
          animation: titleFade 1.2s ease forwards;
        }
      `}</style>
        </section>
    );
}