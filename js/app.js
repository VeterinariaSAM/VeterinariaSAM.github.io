function showNavigationOptions(email: string) {
    // Opciones de navegación para el correo específico
    const navOptionsSpecific = document.querySelectorAll('.nav-option-specific') as NodeListOf<HTMLElement>;
  
    // Opciones de navegación generales para cualquier otro correo
    const navOptionsGeneral = document.querySelectorAll('.nav-option-general') as NodeListOf<HTMLElement>;
  
    // Ocultar todas las opciones de navegación
    const allNavOptions = document.querySelectorAll('.nav-option') as NodeListOf<HTMLElement>;
    allNavOptions.forEach(option => {
      option.style.display = 'none';
    });
  
    // Verificar el correo específico y mostrar las opciones correspondientes
    if (email === 'correo@especifico.com') {
      navOptionsSpecific.forEach(option => {
        option.style.display = 'block';
      });
    } else {
      navOptionsGeneral.forEach(option => {
        option.style.display = 'block';
      });
    }
  }
  