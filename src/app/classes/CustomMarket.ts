import { AgmMarker } from '@agm/core';
import { MarkerManager} from '@agm/core';

export class CustomAgmMarker extends AgmMarker {

  public imei: number;
  constructor(imei: number, markerManager: MarkerManager) {
    super(markerManager);
    this.imei = imei;
  }
}
