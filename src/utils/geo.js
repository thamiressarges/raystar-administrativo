import { toast } from 'react-toastify';

export async function getCoordinates(address) {
  if (!address) return null;
  
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'RayStarApp/1.0' 
        }
    });
    
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: data[0].lat,
        lng: data[0].lon
      };
    }
    
    return null;
  } catch (error) {
    console.error("Erro na geocodificação:", error);
    toast.error("Erro ao converter endereço em coordenadas.");
    return null;
  }
}