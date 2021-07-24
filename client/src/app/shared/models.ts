export class Planet {
  id: number;
  planetName: string;
  planetColor: string;
  planetRadiusKM: number;
  distInMillionsKM: DistInMillionsKM;
  description: string;
  imageUrl: string;
  imageName: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || 0;
    this.planetName = obj && obj.planetName || '';
    this.planetColor = obj && obj.planetColor || '';
    this.planetRadiusKM = obj && obj.planetRadiusKM || 0;
    this.distInMillionsKM = obj && new DistInMillionsKM(obj.distInMillionsKM) || new DistInMillionsKM();
    this.description = obj && obj.description || '';
    this.imageUrl = obj && obj.imageUrl || '';
    this.imageName = obj && obj.imageName || '';
  }
}

export class DistInMillionsKM {
  fromSun: number;
  fromEarth: number;

  constructor(obj?: any) {
    this.fromSun = obj && obj.fromSun || 0;
    this.fromEarth = obj && obj.fromEarth || 0;
  }
}
