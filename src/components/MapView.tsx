import { useEffect, useRef } from 'react';
import loadGoogleMapsScript from './LoadGoogleMapsScript'; // ou o caminho certo
import { EquipmentDetail } from '@/types/equipment';

const MapView = ({ equipmentList }: { equipmentList: EquipmentDetail[] }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Chave da API do Google Maps não está definida!');
      return;
    }

    loadGoogleMapsScript(apiKey);

    const interval = setInterval(() => {
      if (window.google && window.google.maps && mapRef.current) {
        clearInterval(interval);

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: -15.7797, lng: -47.9297 },
          zoom: 5,
          mapId: import.meta.env.VITE_GOOGLE_MAP_ID as string,
        });

        const infoWindow = new google.maps.InfoWindow();

        equipmentList.forEach((equipment) => {
          if (!equipment.currentPosition) return;

          const position = {
            lat: equipment.currentPosition.lat,
            lng: equipment.currentPosition.lon,
          };

          const marker = new google.maps.Marker({
            map,
            position,
            title: equipment.name,
          });

          marker.addListener('mouseover', () => {
            infoWindow.setContent(`
              <div style="font-size: 14px;">
                <strong>${equipment.name}</strong><br />
                Modelo: ${equipment.model.name}<br />
                Estado: ${equipment.currentState.name}<br />
                Última atualização: ${new Date(equipment.currentPosition.date).toLocaleString()}
              </div>
            `);
            infoWindow.open(map, marker);
          });

          marker.addListener('mouseout', () => {
            infoWindow.close();
          });
        });
      }
    }, 500); // espera até o Google Maps estar disponível
  }, [equipmentList]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default MapView;
