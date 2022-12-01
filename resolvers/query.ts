import { ConcesonarioCollection,VendedorCollection,Cochecollection } from "../db/db.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Coche,Concesionario,Vendedor } from "../types.ts";

export const Query = {
  getCoche: async (_: unknown, args: { id: string }): Promise<Coche | null> => {
    try {
      const coche = await Cochecollection.findOne({ _id: new ObjectId(args.id) });
      if (coche) return { ...coche };
      else return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  //mirar max y min y para eso darselo en schemas
  getCochePrecio: async (_: unknown, args: { min: number , max:number }): Promise<Coche[] | null> => {
    try {
      const coche = await Cochecollection.find({precio:{ $gt : args.min, $lt : args.max}});
      if (coche) return coche.map((coche) => ({...coche}));
      else return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  getConcesionario: async (_: unknown, args: { id: string }): Promise<Concesionario | null> => {
    try {
      const concesionario = await ConcesonarioCollection.findOne({ _id: new ObjectId(args.id) });
      if (concesionario) return { ...concesionario };
      else return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  getVendedor: async (_: unknown, args: { id: string }): Promise<Vendedor | null> => {
    try {
      const vendedor = await VendedorCollection.findOne({ _id: new ObjectId(args.id) });
      if (vendedor) return { ...vendedor };
      else return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  getVendedorNombre: async (_: unknown, args: { name: string }): Promise<Vendedor | null> => {
    try {
      const vendedor = await VendedorCollection.findOne((Vendedor: Vendedor) => Vendedor.name === args.name);
      if (vendedor) return { ...vendedor };
      else return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};