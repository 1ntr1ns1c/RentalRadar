import type { FC } from 'react';

export interface Service {
  id: number;
  name: string;
  desc: string;
  icon: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: FC<ServiceCardProps> = ({ service }) => (
  <div className="flex flex-col items-center p-6 border rounded-lg hover:bg-gray-50 transition text-center">
    <div className="text-4xl mb-4">{service.icon}</div>
    <h4 className="font-semibold mb-2">{service.name}</h4>
    <p className="text-sm text-gray-600">{service.desc}</p>
  </div>
);

export default ServiceCard;