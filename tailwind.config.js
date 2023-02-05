/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: {
            background: {
              main: '#3f3f46',
              card: '#27272a',
              nav: '#18181b'
            },
            txt: {
              main: "white",
              shows: "#4ade80",
              home: "#fb923c",
              account: "#22d3ee"
            }
          }
        }
      },
      themes: [
        {
          name: 'light',
          extend: {
            colors: {
              background: {
                main: '#e4e4e7',
                card: '#d4d4d8',
                nav: '#d1d5db'
              },
              txt: {
                main: "black",
                shows: "#15803d",
                home: "#b45309",
                account: "#0284c7"
              }
            }
          }
        }
      ]
    })
  ]
}