import equipment from '../data/equipment.json';
import equipmentModel from '../data/equipmentModel.json';
import equipmentPositionHistory from '../data/equipmentPositionHistory.json';
import equipmentState from '../data/equipmentState.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';

export function buildEquipmentDetails() {
  return equipment.map(eq => {
    const model = equipmentModel.find(m => m.id === eq.equipmentModelId);
    const positionHistory = equipmentPositionHistory.find(p => p.equipmentId === eq.id);
    const stateHistory = equipmentStateHistory.find(s => s.equipmentId === eq.id);

    const currentPosition = positionHistory?.positions.at(-1);
    const currentStateEntry = stateHistory?.states.at(-1);
    const currentState = equipmentState.find(s => s.id === currentStateEntry?.equipmentStateId);

    return {
      id: eq.id,
      name: eq.name,
      model: model!,
      positions: positionHistory?.positions || [],
      currentPosition: currentPosition || { date: '', lat: 0, lon: 0 },
      currentState: currentState || { id: '', name: 'Desconhecido', color: '#ccc' },
      stateHistory: stateHistory?.states || [],
      productivity: 0,
      earnings: 0,
    };
  });
}

