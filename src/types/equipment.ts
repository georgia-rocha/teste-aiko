export interface Equipment {
  id: string;
  name: string;
  equipmentModelId: string;
}

export interface EquipmentState {
  id: string;
  name: string;
  color: string;
}

export interface Position {
  date: string;
  lat: number;
  lon: number;
}

export interface EquipmentPositionHistory {
  equipmentId: string;
  positions: Position[];
}

export interface EquipmentStateHistory {
  equipmentId: string;
  states: {
    date: string;
    equipmentStateId: string;
  }[];
}

export interface HourlyEarning {
  equipmentStateId: string;
  value: number;
}

export interface EquipmentModel {
  id: string;
  name: string;
  hourlyEarnings: HourlyEarning[];
}

export interface EquipmentStateRecord {
  date: string;
  equipmentStateId: string;
}

export interface EquipmentDetail {
  id: string;
  name: string;
  model: {
    id: string;
    name: string;
    hourlyEarnings: {
      equipmentStateId: string;
      value: number;
    }[];
  };
  positions: {
    date: string;
    lat: number;
    lon: number;
  }[];
  currentPosition: {
    date: string;
    lat: number;
    lon: number;
  };
  currentState: {
    id: string;
    name: string;
    color: string;
  };
  stateHistory: {
    date: string;
    equipmentStateId: string;
  }[];
  productivity: number; 
  earnings: number;
}
