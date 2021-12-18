import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookedOrdersSubscription, useTakeOrderMutation } from '../../generated/graphql';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
require('dotenv').config();

interface Coords {
  lat: number;
  lng: number;
}

// interface DriverProps {
//   lat: number;
//   lng: number;
//   $hover?: any;
// }

// const Driver: React.FC<DriverProps> = () => <div className='text-lg'>🚙</div>;

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<Coords>({ lng: 42.88023, lat: -78.878738 });
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [takeOrder] = useTakeOrderMutation();

  const onSuccess = (position: any) => {
    setDriverCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
  };

  const onError = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
  }, [driverCoords.lat, driverCoords.lng]);

  const { data: cookedData } = useCookedOrdersSubscription();

  useEffect(() => {
    if (cookedData?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedData]);

  const history = useHistory();

  const triggerMutation = async (orderId: number) => {
    const res = await takeOrder({
      variables: {
        input: {
          id: orderId,
        },
      },
    });

    if (res?.data?.takeOrder.success) {
      history.push(`/orders/${cookedData?.cookedOrders.id}`);
    }
  };
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBK74LQtQHmXsctNfDEzU0VrTtUXyQl-VE',
  });

  console.log(process.env);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLng(driverCoords.lat, driverCoords.lng)
    map.panTo(new window.google.maps.LatLng(driverCoords.lat, driverCoords.lng));

    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(undefined);
  }, []);

  const makeRoute = () => {
    if (map) {
      const directionService = new google.maps.DirectionsService();
      const directionRenderer = new google.maps.DirectionsRenderer();
      // @ts-ignore
      directionRenderer.setMap(map);
      directionService.route(
        {
          origin: {
            location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
          },
          travelMode: google.maps.TravelMode.DRIVING,
          destination: {
            location: new google.maps.LatLng(driverCoords.lat + 0.05, driverCoords.lng + 0.05),
          },
        },
        (result, status) => {
          directionRenderer.setDirections(result);
          console.log(result, status);
        }
      );
    }
  };
  console.log(cookedData);
  return (
    <div>
      <div className='overflow-hidden' style={{ width: window.innerWidth, height: '95vh' }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: window.innerWidth, height: '95vh' }}
            center={driverCoords}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
          > 
            <Marker position={{ lat: driverCoords.lat, lng: driverCoords.lng }} />
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>

      <div className='relative px-5 py-8 mx-auto bg-white max-w-screen-sm -top-10 shado-lg'>
        {cookedData?.cookedOrders.restaurant ? (
          <>
            <h1 className='text-3xl font-medium text-center'>New Cooked Order</h1>
            <h1 className='my-3 text-3xl font-medium text-center'>
              Pick it up soon @ {cookedData?.cookedOrders.restaurant?.name}
            </h1>
            <button
              onClick={() => triggerMutation(cookedData?.cookedOrders.id)}
              className='block w-full mt-5 text-center btn'
            >
              Accept Challenge &rarr;
            </button>
          </>
        ) : (
          <h1 className='text-3xl font-medium text-center'>No Orders yet</h1>
        )}
      </div>
    </div>
  );
};
