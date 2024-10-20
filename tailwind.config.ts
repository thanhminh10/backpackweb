import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#04547C",
        "primary-default": "#107DA7",
        "primary-light": "#98B8C9",
        "primary-sky-blue": "#EDF3F6",
        "secondary": "#AA132D",
        "secondary-default": "#CF0024",
        "secondary-light": "#FE738B",
        "soft-pink": "#FBCCD4",
        "teriaty": "#F3F3F3",
        "neutral-gray-80": "#0E1010",
        "neutral-gray-60": "#525655",
        "neutral-gray-40": "#C5C5C5",
        "neutral-gray-20": "#E2E7EB",
        "semantics-succeed": "#006736",
        "semantics-warning": "#FBBD08",
        "semantics-error": "#B60202",
        "semantics-info": "#0099E9",
        "semantics-cancel": "#202020",
        "white": "#FFFFFF",
        "light": "#FBE0E1",
        "semi-dark": "#8B0B03",
        "dark": "#702426",
        "neutral-title": "#21272A",
        "neutral-detail": "#25282D",
        "neutral-gray": "#D1D5D9",
        "neutral-gray-50":"#4C4C4C",
        "card-title-color":"#171A1F",
        "light-gray":"#C4C4C4",
        "semi-gray":"#9D9D9D"

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gap: {
        1:"4px",
        2: "8px",
        4: "16px",
        6: "24px", // Added value for gap
        9: "36px",
        12: "48px",
        18: "72px",
      },
      padding: {
        '2': "8px",
        '3':'12px',
        '4': "16px",
        '6': "24px", 
        '8': "32px", 
        '9': '36px', // Added value for padding 36px
        '12': '48px',
        '20': '80px', // Added value for padding 80px
      },
      borderColor: {
        "black-20": "#00000033", // Custom border color
        "light-gray": "#F2F4F8", // Custom border color
      },
      maxHeight: {
        "110": "110px",
        "400": "400px",
      },
      borderRadius: {
        "8": "8px",
        "16": "16px",
      },

      borderWidth: {
        "1": "1px",
      },
      fontSize: {
        '12':'12px',
        '14':'14px',
        '16':'16px',
        '20':'20px',
        '26': '26px',
      },
      boxShadow: {
        "custom-light": "0 1px 3px rgba(0, 0, 0, 0.1)",
        "custom-heavy": "0 4px 6px rgba(0, 0, 0, 0.4)",
      },
      zIndex: {
        "1": "1",
        "100": "100",
      },
      fontWeight: {
        '100': '100',
        '200': '200',
        '300': '300',
        '400': '400',
        '500': '500',
        '600': '600',
        '700': '700',
        '800': '800',
        '900': '900',
      },
      
    },
  },
  plugins: [],
};

export default config;
