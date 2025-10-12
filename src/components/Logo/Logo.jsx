import React from "react";
import cls from "./Logo.module.css";

// images
import icon16 from "./icon_16x16.png";
import icon16x2 from "./icon_16x16@2x.png";
import icon32 from "./icon_32x32.png";
import icon32x2 from "./icon_32x32@2x.png";
import icon128 from "./icon_128x128.png";
import icon128x2 from "./icon_128x128@2x.png";
import icon256 from "./icon_256x256.png";
import icon256x2 from "./icon_256x256@2x.png";
import icon512 from "./icon_512x512.png";
import icon512x2 from "./icon_512x512@2x.png";

const IMAGES = {
    16:  [icon16,  icon16x2],
    32:  [icon32,  icon32x2],
    128: [icon128, icon128x2],
    256: [icon256, icon256x2],
    512: [icon512, icon512x2],
};

const PRESET = { sm: 32, md: 128, lg: 256, xl: 512 };

/**
 * Logo
 * @param {('sm'|'md'|'lg'|'xl'|number)} size - preset or exact pixel size
 * @param {string} alt - img alt text
 * @param {string} className - extra class names
 */
export default function Logo({ size = "md", alt = "Trailhead logo", className }) {
    const px = typeof size === "number" ? size : (PRESET[size] ?? PRESET.md);

    // pick the closest available source <= requested px (fallback to largest)
    const closest = Object.keys(IMAGES)
        .map(Number)
        .sort((a, b) => a - b)
        .reduce((acc, v) => (v <= px ? v : acc), 16);

    const [src1x, src2x] = IMAGES[closest] ?? IMAGES[512];

    return (
        <img
            className={[cls.root, className].filter(Boolean).join(" ")}
            src={src1x}
            srcSet={`${src1x} 1x, ${src2x} 2x`}
            width={px}
            height={px}
            alt={alt}
            loading="lazy"
            decoding="async"
        />
    );
}
