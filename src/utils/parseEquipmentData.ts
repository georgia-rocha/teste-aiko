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

    const positions = positionHistory?.positions || [];
    const states = stateHistory?.states || [];

    const enrichedStateHistory = states.map(state => {
      const closestPosition = positions.reduce((closest, pos) => {
        const stateDate = new Date(state.date).getTime();
        const posDate = new Date(pos.date).getTime();
        const closestDate = new Date(closest.date).getTime();

        return Math.abs(posDate - stateDate) < Math.abs(closestDate - stateDate) ? pos : closest;
      }, positions[0]);

      const stateInfo = equipmentState.find(s => s.id === state.equipmentStateId);

      return {
        date: state.date,
        equipmentStateId: state.equipmentStateId,
        lat: closestPosition?.lat || 0,
        lon: closestPosition?.lon || 0,
        name: stateInfo?.name || 'Desconhecido',
        color: stateInfo?.color || '#ccc',
      };
    });

    const currentPosition = positions[positions.length - 1];
    const lastState = enrichedStateHistory[enrichedStateHistory.length - 1];
    
    return {
      id: eq.id,
      name: eq.name,
      model: model!,
      positions,
      currentPosition: currentPosition || { date: '', lat: 0, lon: 0 },
      currentState: lastState
        ? {
            id: lastState.equipmentStateId,
            name: lastState.name,
            color: lastState.color,
          }
        : { id: '', name: 'Desconhecido', color: '#ccc' },
      stateHistory: enrichedStateHistory,
      productivity: 0,
      earnings: 0,
    };
  });
}


