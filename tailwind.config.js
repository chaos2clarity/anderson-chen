module.exports = {
  // ... other config
  theme: {
    extend: {
      animation: {
        'gradient-y': 'gradient-y 15s ease infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 15s ease-in-out infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px)' 
          },
          '50%': { 
            transform: 'translateY(-20px) translateX(10px)' 
          },
        }
      }
    }
  }
} 