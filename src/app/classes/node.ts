import { GpsLocation } from './gps-location';

export class Node {
  id: number;
  nodeIdentifier: string;
  gpsLocation: GpsLocation;
  status: string;
}
