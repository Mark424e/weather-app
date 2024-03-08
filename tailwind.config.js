/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Using modern `rgb`
        textColor: 'rgb(var(--color-textColor) / <alpha-value>)',
        
        // Using modern `hsl`
        textColor: 'hsl(var(--color-textColor) / <alpha-value>)',
        
        // Using legacy `rgba`
        textColor: 'rgba(var(--color-textColor), <alpha-value>)',

        // Using modern `rgb`
        backgroundColor: 'rgb(var(--color-backgroundColor) / <alpha-value>)',
        
        // Using modern `hsl`
        backgroundColor: 'hsl(var(--color-backgroundColor) / <alpha-value>)',
        
        // Using legacy `rgba`
        backgroundColor: 'rgba(var(--color-backgroundColor), <alpha-value>)',

        // Using modern `rgb`
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        
        // Using modern `hsl`
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        
        // Using legacy `rgba`
        primary: 'rgba(var(--color-primary), <alpha-value>)',

        // Using modern `rgb`
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        
        // Using modern `hsl`
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
        
        // Using legacy `rgba`
        secondary: 'rgba(var(--color-secondary), <alpha-value>)',

        // Using modern `rgb`
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        
        // Using modern `hsl`
        accent: 'hsl(var(--color-accent) / <alpha-value>)',
        
        // Using legacy `rgba`
        accent: 'rgba(var(--color-accent), <alpha-value>)',
      },
    },
  },
  plugins: [],
}