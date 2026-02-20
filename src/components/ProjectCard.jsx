export default function ProjectCard({ title, description, link }) {
    return (
        <div className="border rounded p-4 shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="my-2">{description}</p>
            <a
                href={link}
                target="_blank"
                className="text-blue-500 hover:underline"
            >
                View Project
            </a>
        </div>
    );
}
