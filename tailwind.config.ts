import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(150 30% 60%)",
          dark: "hsl(150 30% 40%)",
        },
        secondary: {
          DEFAULT: "hsl(80 25% 60%)",
          foreground: "hsl(80 15% 20%)",
        },
        muted: {
          DEFAULT: "hsl(120 10% 95%)",
          foreground: "hsl(120 10% 40%)",
        },
        accent: {
          DEFAULT: "hsl(120 20% 85%)",
          foreground: "hsl(120 30% 25%)",
        },
        destructive: {
          DEFAULT: "hsl(0 65% 50%)",
          foreground: "hsl(0 0% 98%)",
        },
        border: "hsl(150 20% 85%)",
        input: "hsl(150 20% 90%)",
        ring: "hsl(150 30% 50%)",
        chart: {
          "1": "hsl(150 30% 50%)",
          "2": "hsl(120 25% 55%)",
          "3": "hsl(80 30% 60%)",
          "4": "hsl(170 25% 45%)",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
