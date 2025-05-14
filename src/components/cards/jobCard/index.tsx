import Image from "next/image";
import React from "react";

// Define types for our props
interface KeyAchievement {
  title: string;
  description: string;
}

interface Technology {
  name: string;
  iconUrl?: string; // Can be an imported icon component
}

interface JobProject {
  title: string;
  description: string;
  solution: string;
  images: string[];
}

export interface JobCardProps {
  id: string,
  companyName: string;
  companyLogo?: string; // Optional logo URL
  svgIcon?: string; // Optional SVG icon URL
  role: string;
  yearFrom: string | number;
  yearTo: string | number | "Present";
  mission: string;
  keyAchievements: KeyAchievement[];
  technologies: Technology[];
  projects: JobProject[];
  accentColor: string; // Custom color for company name and accents
  backgroundColor: string; // Custom color for background gradient
}

export const JobCard: React.FC<JobCardProps & { action: () => void }> = ({
  companyName,
  companyLogo,
  role,
  yearFrom,
  yearTo,
  mission,
  keyAchievements,
  svgIcon,
  technologies,
  accentColor = "#ffffff", // Default white accent
  backgroundColor = "#5A67D8", // Default purple background if none provided
  action,
}) => {
  // Convert hex to rgba for background with opacity
  const getRgbaFromHex = (hex: string, alpha = 0.1) => {
    // Remove # if present
    hex = hex.replace("#", "");

    // Handle 3-character hex
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return rgba
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Create gradient stops with different opacities
  const bgGradientFrom = getRgbaFromHex(backgroundColor, 0.25); // Bottom color (more opacity)
  const bgGradientMiddle = getRgbaFromHex(backgroundColor, 0.06); // Middle transition
  const bgGradientTo = getRgbaFromHex(backgroundColor, 0.01); // Top color (less opacity)

  return (
    <article
      className="
            relative flex flex-col items-start justify-between
            min-w-[360px] h-[81vh]
            backdrop-blur-lg rounded-3xl 
            z-10 ml-6 md:ml-0 p-6 overflow-hidden 
            hover:-translate-y-3 transition-transform duration-300 ease-linear
            group
        "
      style={{
        background: `linear-gradient(to top, ${bgGradientFrom}, ${bgGradientMiddle} 50%, ${bgGradientTo})`,
        borderColor: getRgbaFromHex(backgroundColor, 0.3),
      }}
      onClick={action}
    >
      {/* Animated background fill effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0 w-full 
                   group-hover:h-full transition-all duration-700 ease-in-out 
                   backdrop-blur-lg z-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${getRgbaFromHex(backgroundColor, 0.6)}, ${getRgbaFromHex(backgroundColor, 0.3)} 50%, ${getRgbaFromHex(backgroundColor, 0.1)})`,
        }}
      />
      
      {/* Content wrapper with higher z-index */}
      <div className="relative z-1 flex flex-col h-full w-full justify-between">
        {/* Company and Role Section */}
        <div className="mb-4">
          {companyLogo && (
            <Image
              src={companyLogo}
              alt={`${companyName} logo`}
              width={81}
              height={50}
              className="mb-2"
            />
          )}

          {!companyLogo && svgIcon && (
            <svg
              width="81px"
              height="24px"
              fill="none"
              viewBox="0 0 142 32"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                color: "#07e98a",
              }}
            >
              <g fill="#0AE98A">
                <path d="M25.334 25.135V6.106h8.77c1.897 0 3.355.555 4.386 1.663s1.546 2.606 1.546 4.473-.515 3.364-1.546 4.473c-1.03 1.108-2.499 1.662-4.385 1.662H28.63v6.748h-3.306zm3.306-9.675h5.26c.837 0 1.488-.214 1.965-.651q.7-.657.7-1.867v-1.39c0-.807-.234-1.44-.7-1.867-.467-.438-1.119-.652-1.965-.652h-5.26v6.437zm32.797 9.675c-.836 0-1.478-.243-1.935-.72-.447-.476-.72-1.088-.816-1.827h-.146c-.292.953-.827 1.682-1.604 2.168q-1.165.73-2.84.73-2.362-.001-3.646-1.226c-.856-.817-1.274-1.925-1.274-3.306 0-1.517.554-2.664 1.653-3.423q1.648-1.137 4.842-1.137h2.752V15.11q0-1.398-.758-2.168c-.506-.506-1.294-.759-2.373-.759q-1.34 0-2.197.584a5.2 5.2 0 0 0-1.43 1.488l-1.906-1.721c.506-.856 1.216-1.566 2.14-2.12.914-.554 2.12-.836 3.597-.836 1.974 0 3.481.457 4.531 1.37 1.05.915 1.576 2.237 1.576 3.948v7.633h1.604v2.606h-1.789zM55 23.055c.992 0 1.819-.224 2.46-.662.642-.437.963-1.03.963-1.77v-2.197H55.73c-2.207 0-3.306.68-3.306 2.052v.525c0 .68.233 1.196.69 1.536s1.09.515 1.887.515m18.689 2.08v-2.577l8.158-10.034h-7.895V9.879l11.668.039v2.46l-8.275 10.151h8.479v2.606zm-29.841.01a1.89 1.89 0 0 1-1.896-1.896V6.126h3.189v16.413h2.11v2.606zM89.11 8.022a1.896 1.896 0 1 0 0-3.792 1.896 1.896 0 0 0 0 3.792M63.499 9.889h-.282v2.645h2.44v9.305c0 1.05.282 1.867.846 2.44.564.574 1.4.866 2.519.866h2.78v-2.606h-2.955V12.534h3.189V9.889h-3.19V6.106h-2.868v1.887c0 1.04-.846 1.886-1.886 1.886h-.593zm24.017.039h3.19v15.207h-3.19z"></path>
                <path
                  fillRule="evenodd"
                  d="m9.65 4.803-8.07 8.07a3.81 3.81 0 0 0 0 5.388l8.08 8.08a3.81 3.81 0 0 0 5.387 0l2.693-2.694-2.693-2.693-2.694 2.693-8.08-8.08 8.07-8.07 5.387 5.387-5.387 5.386 2.694 2.694 5.387-5.387a3.81 3.81 0 0 0 0-5.387l-5.387-5.387a3.81 3.81 0 0 0-5.387 0"
                  clipRule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="platzi-logo-new_svg__a">
                  <path fill="#fff" d="M.461 0h91.077v32H.461z"></path>
                </clipPath>
              </defs>
            </svg>
          )}

          <h2 className="text-4xl font-bold mb-1" style={{ color: accentColor }}>
            {companyName}
          </h2>
          <p className="text-j-celestial-white/90 font-medium text-sm m-0 p-0">
            {role}
          </p>
          <small className="text-j-celestial-white/60 font-medium text-xs m-0 p-0">
            {yearFrom} - {yearTo}
          </small>
        </div>

        {/* Mission Section */}
        <div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-j-celestial-white mb-1">
              Resume
            </h3>
            <p className="text-sm font-light text-j-celestial-white/70">
              {mission}
            </p>
          </div>

          {/* Technologies Section */}
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-j-celestial-white/10"
              >
                <span className="text-xs text-j-celestial-white">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
