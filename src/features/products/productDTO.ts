export default interface ProductDTO {
  id?: string;
  name: string;
  mesureUnit: MesureUnit;
}

export enum MesureUnit {
  Kilogram,
  Unit,
  Liter,
  Meter,
}
