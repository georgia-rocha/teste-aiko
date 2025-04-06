import { EquipmentDetail } from '@/types/equipment';
import { useEffect, useRef } from 'react';

const MapView = ({ equipmentList }: { equipmentList: EquipmentDetail[] }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: -15.7797, lng: -47.9297 },
      zoom: 5,
      mapId: import.meta.env.VITE_GOOGLE_MAP_ID as string,
    });

    equipmentList.forEach((equipment) => {
      if (!equipment.currentPosition) return;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: {
          lat: equipment.currentPosition.lat,
          lng: equipment.currentPosition.lon,
        },
        title: equipment.name,
      });

      marker.addListener('click', () => {
        console.log('Equipamento:', equipment.name);
      });
    });
  }, [equipmentList]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default MapView;
