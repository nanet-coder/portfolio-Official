import { useEffect } from 'react';

export function useMetadata({
    title = 'Bong Houn - Full Stack Developer',
    description = 'Full Stack Developer portfolio',
    image = 'https://limhoun-official.vercel.app/preview.png',
    url = 'https://limhoun-official.vercel.app/',
}) {
    useEffect(() => {
        // Update document title
        document.title = title;

        // Update or create meta tags
        const updateMetaTag = (name, content, isProperty = false) => {
            let tag = document.querySelector(
                isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
            );

            if (!tag) {
                tag = document.createElement('meta');
                if (isProperty) {
                    tag.setAttribute('property', name);
                } else {
                    tag.setAttribute('name', name);
                }
                document.head.appendChild(tag);
            }

            tag.setAttribute('content', content);
        };

        // Update meta tags
        updateMetaTag('description', description);
        updateMetaTag('og:title', title, true);
        updateMetaTag('og:description', description, true);
        updateMetaTag('og:image', image, true);
        updateMetaTag('og:url', url, true);
        updateMetaTag('twitter:title', title);
        updateMetaTag('twitter:description', description);
        updateMetaTag('twitter:image', image);
    }, [title, description, image, url]);
}