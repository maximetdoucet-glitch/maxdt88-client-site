/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "spotlight": "spotlight 2s ease .75s 1 forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "slide-in-from-bottom": "slide-in-from-bottom 0.7s ease-out forwards",
        "slide-in-from-top": "slide-in-from-top 0.7s ease-out forwards",
        "shimmer-slide": "shimmer-slide var(--speed) infinite linear",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "marquee": "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "shimmer-slide": {
          "to": {
            "transform": "translate(calc(100cqw - 100%), 0)"
          }
        },
        "spin-around": {
          "0%": {
            "transform": "translateZ(0) rotate(0)"
          },
          "15%, 35%": {
            "transform": "translateZ(0) rotate(90deg)"
          },
          "65%, 85%": {
            "transform": "translateZ(0) rotate(270deg)"
          },
          "100%": {
            "transform": "translateZ(0) rotate(360deg)"
          }
        },
        "marquee": {
          "from": { "transform": "translateX(0)" },
          "to": { "transform": "translateX(calc(-100% - var(--gap)))" }
        },
        "marquee-vertical": {
          "from": { "transform": "translateY(0)" },
          "to": { "transform": "translateY(calc(-100% - var(--gap)))" }
        }
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
