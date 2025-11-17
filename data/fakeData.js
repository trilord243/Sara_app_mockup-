// Datos de prueba para la aplicación SARA

export const countries = [
  'Estados Unidos',
  'Argentina',
  'Brasil',
  'Canadá',
  'Chile',
  'Colombia',
  'México',
  'Noruega',
  'Perú',
];

export const languages = [
  'Español',
  'English',
  'Português',
];

export const userInfo = {
  fullName: 'Juan Pérez',
  employeeNumber: '54896',
};

export const jobInfo = {
  serviceOrderNumber: '64833',
  customerContact: 'Ángel Guía',
  emergencyContact: 'Lucía Hughes',
  siteAddress: 'Av. Principal 123',
  jobDescription: 'Proporcione detalles del trabajo',
};

export const riskTypes = [
  {
    id: 'electricity',
    name: 'Electricidad',
    icon: '⚡',
    description: '¿Trabajará sobre o cerca de equipos eléctricos?',
    minimumControl: 'Capacitación en seguridad eléctrica; Bloqueo y etiquetado (LOTO); Equipo de prueba eléctrica; EPP para arco eléctrico; Conexión a tierra adecuada; Disipar energía almacenada; Interruptor de circuito por falla a tierra o protección similar.',
  },
  {
    id: 'biohazard',
    name: 'Peligro Biológico',
    icon: '☣',
    description: '¿Estará expuesto a peligros biológicos?',
    minimumControl: 'Usar EPP apropiado; Seguir protocolos de higiene; Vacunarse si es necesario.',
  },
  {
    id: 'imprisonment',
    name: 'Aprisionamiento parcial o completo del cuerpo',
    icon: '🚧',
    description: '¿Existe riesgo de atrapamiento corporal?',
    minimumControl: 'Procedimientos de bloqueo y etiquetado; Asegurar todas las partes móviles; Usar guardas apropiadas.',
  },
  {
    id: 'slips',
    name: 'Resbalones y Tropezones',
    icon: '⚠',
    description: '¿Existen peligros de resbalones, tropezones o caídas?',
    minimumControl: 'Mantener el área de trabajo limpia; Usar calzado antideslizante; Marcar claramente los peligros.',
  },
  {
    id: 'heights',
    name: 'Trabajo en alturas',
    icon: '🪜',
    description: '¿Trabajará en alturas?',
    minimumControl: 'Usar equipo de protección contra caídas; Asegurar escaleras; Usar andamios apropiados.',
  },
  {
    id: 'confined',
    name: 'Trabajo en espacios confinados',
    icon: '🚪',
    description: '¿Trabajará en un espacio confinado?',
    minimumControl: 'Obtener permiso de espacio confinado; Probar la atmósfera; Usar ventilación; Tener plan de rescate.',
  },
  {
    id: 'fixedObjects',
    name: 'Objetos fijos',
    icon: '🧱',
    description: '¿Hay objetos fijos que puedan causar lesiones?',
    minimumControl: 'Marcar peligros; Mantener distancias de seguridad; Usar rutas apropiadas.',
  },
  {
    id: 'vehicles',
    name: 'Movimiento de vehículos y/o maquinaria',
    icon: '🚗',
    description: '¿Habrá vehículos o maquinaria en movimiento?',
    minimumControl: 'Establecer control de tráfico; Usar observadores; Vestir ropa de alta visibilidad.',
  },
  {
    id: 'sharpParts',
    name: 'Partes o objetos cortantes',
    icon: '🔪',
    description: '¿Manejará objetos cortantes?',
    minimumControl: 'Usar guantes resistentes a cortes; Manejar con cuidado; Almacenamiento apropiado.',
  },
  {
    id: 'ergonomics1',
    name: 'Ergonomía 1: posición de trabajo difícil',
    icon: '🧍',
    description: '¿Estará en posiciones incómodas?',
    minimumControl: 'Tomar descansos; Usar postura apropiada; Usar herramientas ergonómicas.',
  },
  {
    id: 'ergonomics2',
    name: 'Ergonomía 2: manejo manual y uso de herramientas manuales',
    icon: '🔧',
    description: '¿Realizará manejo manual o usará herramientas manuales?',
    minimumControl: 'Usar técnicas apropiadas de levantamiento; Usar ayudas mecánicas; Tomar descansos.',
  },
  {
    id: 'pressure',
    name: 'Presión por trabajo contra reloj',
    icon: '⏱',
    description: '¿Está bajo presión de tiempo?',
    minimumControl: 'Planificar el trabajo apropiadamente; Comunicar retrasos; No apresurar la seguridad.',
  },
  {
    id: 'pressurizedSystems',
    name: 'Sistemas presurizados',
    icon: '💨',
    description: '¿Trabajará con sistemas presurizados?',
    minimumControl: 'Despresurizar antes de trabajar; Usar herramientas apropiadas; Usar EPP.',
  },
  {
    id: 'chemicals',
    name: 'Químicos',
    icon: '🧪',
    description: '¿Estará expuesto a químicos?',
    minimumControl: 'Revisar hojas de seguridad (SDS); Usar EPP apropiado; Asegurar ventilación; Tener kit de derrames.',
  },
  {
    id: 'temperature',
    name: 'Temperaturas extremas',
    icon: '🌡',
    description: '¿Estará expuesto a temperaturas extremas?',
    minimumControl: 'Usar protección térmica; Tomar descansos; Mantenerse hidratado.',
  },
  {
    id: 'noise',
    name: 'Ruido',
    icon: '🔊',
    description: '¿Estará expuesto a niveles altos de ruido?',
    minimumControl: 'Usar protección auditiva; Limitar tiempo de exposición; Colocar advertencias.',
  },
  {
    id: 'lifting',
    name: 'Equipo de elevación',
    icon: '🏗',
    description: '¿Usará equipo de elevación?',
    minimumControl: 'Inspeccionar equipo; Seguir límites de carga; Usar operadores calificados.',
  },
  {
    id: 'other',
    name: 'Otro (Por favor especifique el peligro)',
    icon: '❓',
    description: '¿Existe algún otro peligro no listado?',
    minimumControl: 'Identificar y evaluar el peligro específico.',
  },
];

export const preTaskQuestions = [
  {
    id: 'lockout',
    question: '¿Realizará bloqueo/etiquetado antes de iniciar la tarea?',
    hasNA: true,
  },
  {
    id: 'tools',
    question: '¿Tiene todas las herramientas necesarias?',
    hasNA: true,
  },
  {
    id: 'competences',
    question: '¿Tiene las competencias necesarias?',
    hasNA: true,
  },
  {
    id: 'ppe',
    question: '¿Tiene todo el equipo de protección personal necesario?',
    hasNA: true,
  },
  {
    id: 'firstAid',
    question: '¿Tiene un botiquín de primeros auxilios?',
    hasNA: true,
  },
  {
    id: 'covid',
    question: '¿Están implementados los protocolos COVID-19?',
    hasNA: false,
  },
  {
    id: 'permission',
    question: '¿Tiene permiso del sitio/usuario final para realizar el trabajo?',
    hasNA: false,
  },
];
