import { Address } from '../classes/Address';
import { Node } from '../classes/node';
import { GpsLocation } from '../classes/gps-location';

export class LocationNodeDetails {
  id: number;
  name: string;
  email: string;
  cellPhone: string;
  address: Address;
  nodes: Node[];
  status: string;
  gpsLocation:GpsLocation;
}
