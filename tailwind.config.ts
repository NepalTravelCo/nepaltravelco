import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                text: "var(--text-color)",
                muted: "var(--text-muted)",
            },
            fontFamily: {
                heading: ["var(--font-poppins)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            boxShadow: {
                navbar: "0 4px 15px rgba(0, 0, 0, 0.15)",
                mega: "0 8px 40px rgba(0, 0, 0, 0.12)",
            },
        },
    },
    plugins: [],
};

export default config;
