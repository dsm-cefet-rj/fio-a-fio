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
        linhaviva: '#E55B86',    // Rosa Linha Viva (Destaque, botões, ações, tags)
        rosablush: '#FEF1F4',    // Rosa Blush (Fundos suaves, cards, áreas selecionadas)
        rosaclaro: '#EF9FB1',    // Rosa Claro Editorial (Detalhes de apoio, indicadores)
        marfim: '#FBF7EF',       // Marfim de Papel (Fundo geral da plataforma)
        pessego: '#F1DFD8',      // Pêssego Tecido (Blocos editoriais, cards)
        papelrosado: '#EADED5',  // Papel Rosado (Bordas, divisórias, placeholders)
        pretolinha: '#17151A',   // Preto de Linha (Texto principal, títulos, contraste)
        marromrosado: '#896B70', // Marrom Rosado (Texto secundário, descrições)

        // Aliases para compatibilidade total com os componentes
        brand: {
          50: '#FEF1F4',
          100: '#F1DFD8',
          200: '#EADED5',
          300: '#EF9FB1',
          400: '#E55B86',
          500: '#E55B86',
          600: '#D24471',
          700: '#B8325C',
          800: '#896B70',
          900: '#17151A',
        },
        rosebaby: {
          50: '#FBF7EF',
          100: '#FEF1F4',
          200: '#F1DFD8',
          300: '#EADED5',
          400: '#EF9FB1',
          500: '#E55B86',
          600: '#D24471',
          700: '#B8325C',
          800: '#896B70',
          900: '#17151A',
        },
        rosebg: '#FBF7EF',
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



