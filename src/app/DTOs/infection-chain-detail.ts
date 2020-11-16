import { infectedDetail } from './infectedDetail';
import { Status } from './status';
import { VisitTrack } from './visit-track';

export class InfectionChainDetail{
      status:Status;
      infectedDetails:infectedDetail[];
      visitTrack: VisitTrack[];
}