import { Address } from '../classes/Address';
import { HealthStatus } from './health-status';

export class PatientDetails {
  firstName: string;
  lastName: string;
  address: Address;
  occupation: string;
  age: number;
  status: boolean;
  healthStatus: HealthStatus;
}
