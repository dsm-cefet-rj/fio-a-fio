/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nova Paleta Oficial Fio a Fio
        linhaviva: '#B94F70',    // Rosa Linha Viva (Destaque, botões, ações, tags)
        rosablush: '#F6DDE5',    // Rosa Blush (Fundos suaves, cards, áreas selecionadas)
        rosaclaro: '#D98CA1',    // Rosa Claro Editorial (Detalhes de apoio, indicadores)
        marfim: '#F8E9ED',       // Marfim de Papel (Fundo geral da plataforma)
        pessego: '#F1DFD8',      // Pêssego Tecido (Blocos editoriais, cards)
        papelrosado: '#E8CCD4',  // Papel Rosado (Bordas, divisórias, placeholders)
        pretolinha: '#251D20',   // Preto de Linha (Texto principal, títulos, contraste)
        marromrosado: '#715B62', // Marrom Rosado (Texto secundário, descrições)

        // Aliases para compatibilidade total com os componentes
        brand: {
          50: '#F6DDE5',
          100: '#F1DFD8',
          200: '#E8CCD4',
          300: '#D98CA1',
          400: '#B94F70',
          500: '#B94F70',
          600: '#963B58',
          700: '#7C3049',
          800: '#715B62',
          900: '#251D20',
        },
        rosebaby: {
          50: '#F8E9ED',
          100: '#F6DDE5',
          200: '#F1DFD8',
          300: '#E8CCD4',
          400: '#D98CA1',
          500: '#B94F70',
          600: '#963B58',
          700: '#7C3049',
          800: '#715B62',
          900: '#251D20',
        },
        rosebg: '#F8E9ED',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-craft': '0 8px 30px -4px rgba(137, 107, 112, 0.08)',
        'linhaviva-glow': '0 0 20px rgba(229, 91, 134, 0.35)',
        'craft-card': '0 4px 20px -2px rgba(23, 21, 26, 0.04), 0 2px 6px -1px rgba(234, 222, 213, 0.4)',
      }
    },
  },
  plugins: [],
}
