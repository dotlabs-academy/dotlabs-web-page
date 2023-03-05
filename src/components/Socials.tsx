import React from 'react'

export interface SocialsProps {
    white?: boolean;
    customStyles?: string;
}

const Socials = ({ white, customStyles }: SocialsProps) => {
    return (
        <div className={`flex gap-x-5 justify-self-end ${customStyles ?? ""}`}>
            <slot />
            <a
                className="flex justify-center"
                href="https://twitter.com/DotlabsAcademy_"
                target="_blank"
            >
                <img src={white ? "assets/social-media/twitter-white.svg" : "assets/social-media/twitter.svg"} alt="Twitter Icon" />
            </a>
            <a
                className="flex justify-center"
                href="https://github.com/EdisonBedoya98/dotlabs-medellin-hackathon-landing"
                target="_blank"
            >
                <img src={white ? "assets/social-media/github-white.svg" : "assets/social-media/github.svg"} alt="Github" />
            </a>
            <a
                className="flex justify-center"
                href="https://www.instagram.com/dotlabs__/"
                target="_blank"
            >
                <img src={white ? "assets/social-media/instagram-white.svg" : "assets/social-media/instagram.svg"} alt="Instagram" />
            </a>
        </div>
    )
}

export default Socials