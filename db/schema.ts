import { Coche, Vendedor, Concesionario } from "../types.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

export type CocheSchema = Omit<Coche, "id"> & {
  _id: ObjectId;
};
export type VendedorSchema = Omit<Vendedor, "id"> & {
    _id: ObjectId;
};
export type ConcesionarioSchema = Omit<Concesionario, "id"> & {
    _id: ObjectId;
};