abstract class NCoordinates {
  abstract latitude: number;
  abstract longitude: number;

  distanceTo(pointB: NCoordinates): number {
    // TODO (haversine formula https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript)
    return 0;
  }
}

interface Venue {
  id: number; // starts at 0 and increments
  name: string;
  address: string;
  location: NCoordinates;
  photoUrl: string; // display photo
}