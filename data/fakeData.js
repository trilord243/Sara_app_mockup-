// Fake data for testing the SARA app

export const countries = [
  'United States',
  'Argentina',
  'Brazil',
  'Canada',
  'Chile',
  'Colombia',
  'México',
  'Norway',
  'Peru',
];

export const languages = [
  'English',
  'Español',
  'Português',
];

export const userInfo = {
  fullName: 'Justin Wall',
  employeeNumber: '54896',
};

export const jobInfo = {
  serviceOrderNumber: '64833',
  customerContact: 'Angel Guia',
  emergencyContact: 'Lucy Hughes',
  siteAddress: '123 ABC Dr.',
  jobDescription: 'Provide details',
};

export const riskTypes = [
  {
    id: 'electricity',
    name: 'Electricity',
    icon: '⚡',
    description: 'Are you going to be working on or near electrical equipment?',
    minimumControl: 'Electrical Safety Training; Lock-Out Tag-out (LOTO), electrical test equipment (testers); Arc Flash PPE, Proper grounding, dissipate stored energy, Ground Fault Circuit Interrupter or similar protection.',
  },
  {
    id: 'biohazard',
    name: 'Biological Hazard',
    icon: '☣',
    description: 'Will you be exposed to biological hazards?',
    minimumControl: 'Use appropriate PPE, follow hygiene protocols, get vaccinated if necessary.',
  },
  {
    id: 'imprisonment',
    name: 'Partial or complete imprisonment of the body',
    icon: '🚧',
    description: 'Is there risk of body entrapment?',
    minimumControl: 'Lock-out Tag-out procedures, secure all moving parts, use proper guards.',
  },
  {
    id: 'slips',
    name: 'Slips & Trips',
    icon: '⚠',
    description: 'Are there slip, trip, or fall hazards?',
    minimumControl: 'Keep work area clean, use non-slip footwear, mark hazards clearly.',
  },
  {
    id: 'heights',
    name: 'Working at heights',
    icon: '🪜',
    description: 'Will you be working at heights?',
    minimumControl: 'Use fall protection equipment, secure ladders, use proper scaffolding.',
  },
  {
    id: 'confined',
    name: 'Working in a confined space',
    icon: '🚪',
    description: 'Will you be working in a confined space?',
    minimumControl: 'Obtain confined space permit, test atmosphere, use ventilation, have rescue plan.',
  },
  {
    id: 'fixedObjects',
    name: 'Fixed objects',
    icon: '🧱',
    description: 'Are there fixed objects that could cause injury?',
    minimumControl: 'Mark hazards, maintain clearances, use proper pathways.',
  },
  {
    id: 'vehicles',
    name: 'Movement of vehicles and/or machinery',
    icon: '🚗',
    description: 'Will there be moving vehicles or machinery?',
    minimumControl: 'Establish traffic control, use spotters, wear high-visibility clothing.',
  },
  {
    id: 'sharpParts',
    name: 'Sharp parts or objects',
    icon: '🔪',
    description: 'Will you be handling sharp objects?',
    minimumControl: 'Use cut-resistant gloves, handle carefully, proper storage.',
  },
  {
    id: 'ergonomics1',
    name: 'Ergonomics 1: difficult working position',
    icon: '🧍',
    description: 'Will you be in awkward positions?',
    minimumControl: 'Take breaks, use proper posture, use ergonomic tools.',
  },
  {
    id: 'ergonomics2',
    name: 'Ergonomics 2: manual handling and use of hand tools',
    icon: '🔧',
    description: 'Will you be doing manual handling or using hand tools?',
    minimumControl: 'Use proper lifting techniques, use mechanical aids, take breaks.',
  },
  {
    id: 'pressure',
    name: 'Pressure by work against the clock',
    icon: '⏱',
    description: 'Are you under time pressure?',
    minimumControl: 'Plan work properly, communicate delays, don\'t rush safety.',
  },
  {
    id: 'pressurizedSystems',
    name: 'Pressurized systems',
    icon: '💨',
    description: 'Will you work with pressurized systems?',
    minimumControl: 'Depressurize before work, use proper tools, wear PPE.',
  },
  {
    id: 'chemicals',
    name: 'Chemicals',
    icon: '🧪',
    description: 'Will you be exposed to chemicals?',
    minimumControl: 'Review SDS, use proper PPE, ensure ventilation, have spill kit.',
  },
  {
    id: 'temperature',
    name: 'Extreme temperatures',
    icon: '🌡',
    description: 'Will you be exposed to extreme temperatures?',
    minimumControl: 'Use thermal protection, take breaks, stay hydrated.',
  },
  {
    id: 'noise',
    name: 'Noise',
    icon: '🔊',
    description: 'Will you be exposed to high noise levels?',
    minimumControl: 'Use hearing protection, limit exposure time, post warnings.',
  },
  {
    id: 'lifting',
    name: 'Lifting equipment',
    icon: '🏗',
    description: 'Will you use lifting equipment?',
    minimumControl: 'Inspect equipment, follow load limits, use qualified operators.',
  },
  {
    id: 'other',
    name: 'Other (Please specify hazard in text box)',
    icon: '❓',
    description: 'Is there any other hazard not listed?',
    minimumControl: 'Identify and assess the specific hazard.',
  },
];

export const preTaskQuestions = [
  {
    id: 'lockout',
    question: 'Will you carry out lock-out/tag-out before starting the task?',
    hasNA: true,
  },
  {
    id: 'tools',
    question: 'Do you have all the necessary tools?',
    hasNA: true,
  },
  {
    id: 'competences',
    question: 'Do you have the necessary competences?',
    hasNA: true,
  },
  {
    id: 'ppe',
    question: 'Do you have all the necessary personal protective equipment?',
    hasNA: true,
  },
  {
    id: 'firstAid',
    question: 'Do you have a first aid kit?',
    hasNA: true,
  },
  {
    id: 'covid',
    question: 'Are covid-19 protocols in place?',
    hasNA: false,
  },
  {
    id: 'permission',
    question: 'Do you have permission from the site/end-user to carry out the job?',
    hasNA: false,
  },
];
