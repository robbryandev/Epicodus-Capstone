/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
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
                main: '#f5f5f5',
                card: '#e4e4e7',
                nav: '#e5e7eb'
              },
              txt: {
                main: "black",
                shows: "#84cc16",
                home: "#fb923c",
                account: "#22d3ee"
              }
            }
          }
        },
        {
          name: 'midnight',
          extend: {
            colors: {
              background: {
                main: '#292524',
                card: '#1c1917',
                nav: '#18181b'
              },
              txt: {
                main: "white",
                shows: "#6d28d9",
                home: "#6d28d9",
                account: "#6d28d9"
              }
            }
          }
        }
      ]
    })
  ]
}