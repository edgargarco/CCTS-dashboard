import { Address } from '../classes/Address';
import { Node } from '../classes/node';

export class LocationNodeDetails {
  id: number;
  name: string;
  email: string;
  cellPhone: string;
  address: Address;
  nodes: Node[];
  status: string;
}
