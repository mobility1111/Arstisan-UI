// export interface ArtisanProfile {
//   id?: string;
//   fullName: string;
//   email: string;
//   photoUrl?: string;

//   serviceTypeId?: string;
//   locationId?: string;

//   serviceTypeName?: string;
//   locationName?: string;
// }

export interface ArtisanProfile {
  id: string;
  fullName: string;
  email: string;
  photoUrl: string;

  serviceTypeId: string;
  locationId: string;

  serviceTypeName: string; // ✔ Add this
  locationName: string;    // ✔ Add this
}

export interface UpdateArtisanProfile {
  fullName?: string;
  serviceType?: string;
  location?: string;
  photoUrl?: string;
}
