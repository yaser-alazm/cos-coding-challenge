export interface AuctionsDTO {
    items: Auction[];
    page: number;
    total: number;
}

export interface Auction {
    id: number;
    label: string;
    endingTime: string; //formatted: "2021-02-06T17:00:00.000Z",
    currentHighestBidValue: number;
    amIHighestBidder: boolean;
    associatedVehicle: AssociatedVehicle;
}

export interface AssociatedVehicle {
    ez: string,
    id: number,
    fuelType: number,
    transmission: number,
    vehicleImages: VehicleImage[],
    mileageInKm: number
}

export interface VehicleImage {
    url: string;
    perspective: number;
    createdAt: string; //formatted: "2021-01-27T08:57:40.667Z"
    updatedAt: string; //formatted: "2021-01-27T08:57:40.667Z"
}
