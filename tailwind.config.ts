/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
// import flowbite from "flowbite/plugin";

import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{ts,tsx}",
    "./node_modules/flowbite-react/lib/**/*.js",
    flowbite.content(),

  ],
  theme: {
    extend: {
      backgroundImage: {
        'portada': "url('/images/portadas/feria_Huancaro_portada.webp')", // Asegúrate de reemplazar '/ruta/a/tu/imagen.jpg' con la ruta real a tu imagen


      },
      colors:{
        'primary': '#9e0c26', 
        'secondary': '#654321', 
    
      }
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
