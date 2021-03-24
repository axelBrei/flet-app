import React from 'react';
import Motorbike from 'resources/images/scooter.svg';
import Car from 'resources/images/car.svg';
import Pickup from 'resources/images/van.svg';
import Truck from 'resources/images/truck.svg';

export const vehiculeSizeOptions = [
  {
    id: 1,
    title: 'Moto',
    maxWeight: 5,
    dimensions: {
      height: 0.5,
      width: 0.5,
      length: 1,
    },
    renderIcon: (size) => <Motorbike height={size} width={size} />,
  },
  {
    id: 2,
    title: 'Auto',
    maxWeight: 70,
    dimensions: {
      height: 1,
      width: 2.5,
      length: 1,
    },
    renderIcon: (size) => <Car height={size} width={size} />,
  },
  {
    id: 3,
    title: 'Pickup',
    maxWeight: 120,
    dimensions: {
      height: 4,
      width: 2,
      length: 4,
    },
    renderIcon: (size) => <Pickup height={size} width={size} />,
  },
  {
    id: 4,
    title: 'Camión',
    maxWeight: 500,
    dimensions: {
      height: 4,
      width: 3,
      length: 8,
    },
    renderIcon: (size) => <Truck height={size} width={size} />,
  },
];
