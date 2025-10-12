import React from "react";
import { Logo } from ".";

export default {
    title: "Components/Logo",
    component: Logo,
    parameters: {
        layout: "centered",
    },
};

export const Small = {
    args: { size: "sm" },
};

export const Medium = {
    args: { size: "md" },
};

export const Large = {
    args: { size: "lg" },
};

export const XLarge = {
    args: { size: "xl" },
};

export const Custom72px = {
    args: { size: 72 },
};

export const WithClassName = {
    args: { size: "md", className: "storybook-border" },
};
