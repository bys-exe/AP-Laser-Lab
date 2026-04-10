
export enum LabStage {
  INTRODUCTION = 'INTRO',
  THEORY = 'THEORY',
  ATOMIC_STATES = 'ATOMIC',
  INTERACTIONS = 'INTERACTIONS',
  POPULATION = 'POPULATION',
  CAVITY = 'CAVITY',
  PRACTICE = 'PRACTICE',
  BIT_STREAM = 'BITSTREAM',
  VIVA = 'VIVA'
}

export interface Electron {
  id: number;
  level: number;
  x: number;
}
