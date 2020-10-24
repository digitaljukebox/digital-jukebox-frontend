import firebase from 'firebase';
export class NCoordinates {
  latitude: number;
  longitude: number;

  constructor(lat: number, lon: number) {
    this.latitude = lat;
    this.longitude = lon;
  }

  distanceTo(pointB: NCoordinates): number {
    // TODO (haversine formula https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript)
    function toRad(deg: number) {
      return (deg * Math.PI) / 180;
    }

    const lat2 = pointB.latitude;
    const lon2 = pointB.longitude;
    const lat1 = this.latitude;
    const lon1 = this.longitude;

    const R = 6371; // km
    //has a problem with the .toRad() method below.
    const x1 = lat2 - lat1;
    const dLat = toRad(x1);
    const x2 = lon2 - lon1;
    const dLon = toRad(x2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }
}

// TODO after the User model is added, the venue interface needs 2 extra fields:
// temp banlist and perm banlist, arrays of Users.
export interface Venue {
  id: string;
  name: string;
  address: string;
  description: string;
  location: NCoordinates;
  photoURL: string; // display photo
}

export interface SpotifyAuth {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  state: string;
}

export type VenueProfileView = {
  venueId: string;
  userId: string; // will be an empty string if user wasn't logged in when viewing the venue.
  timestamp: Date;
};

export type VenueCheckIn = {
  venueId: string;
  userId: string;
  timeStamp: Date;
};

export type Dictionary<T> = { [key: string]: T };

export function venueFromFirestoreDocument(
  doc: firebase.firestore.QueryDocumentSnapshot
) {
  const data = doc.data();

  const venue: Venue = {
    id: doc.id,
    name: data.name,
    address: data.address,
    description: data.description,
    location: new NCoordinates(data.location.latitude, data.location.longitude),
    photoURL: data.photoURL
  };

  return venue;
}

export type UserProfile = {
  spotify: {
    accessToken: string,
    expiresAt: number,
    refreshToken: string,
  };
};
