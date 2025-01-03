/** @type {import('tailwindcss').Config} */
import tailwindConfig from "frappe-ui/src/utils/tailwind.config";
import frappeUIPreset from "frappe-ui/src/tailwind/preset.js";
export default {
  presets: [frappeUIPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
		"../node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [], 
}