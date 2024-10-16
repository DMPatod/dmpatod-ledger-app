export default interface ProductDTO {
  id?: string;
  name: string;
  mesureUnit: MesureUnit;
  averageValue: number;
}

export enum MesureUnit {
  Kilogram,
  Unit,
  Liter,
  Meter,
}
