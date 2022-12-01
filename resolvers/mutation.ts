import { Cochecollection,VendedorCollection,ConcesonarioCollection} from "../db/db.ts";
import { Coche,Concesionario,Vendedor } from "../types.ts";


export const Mutation = {
  createCoche: async (
    _: unknown,
    args: { plate: string; marca: string; precio: number }
  ): Promise<Coche> => {
    try {
      const exists = await Cochecollection.findOne({ plate: args.plate });
      if (exists) {
        throw new Error("ya hay un coche con esta matricula");
      }
      await Cochecollection.insertOne({
        plate: args.plate,
        marca: args.marca,
        precio: args.precio,
      });
      return {
        plate: args.plate,
        marca: args.marca,
        precio: args.precio,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  createVendedor: async (
    _: unknown, 
    args: {name: string, Dni: string}
    ): Promise<Vendedor> => {
    try{  
        const vendedor = await VendedorCollection.findOne({Dni: args.Dni});
        if(vendedor){
            throw new Error("ya esta este dni");
        }
        await VendedorCollection.insertOne({
            name: args.name,
            Dni: args.Dni,
            Coche: [],
        });
        return { 
            name: args.name,
            Dni: args.Dni,
            Coche: [],
        };
        
    }catch(error){
        console.log(error);
        throw new Error(error);
    }
  },

  createConcesionario: async (
    _: unknown, 
    args: {nombre: string, direccion: string, disponibles: number}
    ): Promise<Concesionario> => {
      try{  
        const cocncesionario = await ConcesonarioCollection.findOne({direccion: args.direccion});
        if(cocncesionario){
            throw new Error("ya esta la direccion");
        }
        await ConcesonarioCollection.insertOne({
            nombre: args.nombre,
            direccion: args.direccion,
            disponibles: args.disponibles,
            Vendedor: [],
        });
        return { 
          nombre: args.nombre,
          direccion: args.direccion,
          disponibles: args.disponibles,
          Vendedor: [],
        };
        
    }catch(error){
        console.log(error);
        throw new Error(error);
    }
  },

  CocheaVendedor: async(
    _: unknown, 
    args: {Dni: string, plate: string}): Promise<Coche | Vendedor> => {
            try{
              const vendedor = await VendedorCollection.findOne({Dni: args.Dni});
              const coche = await Cochecollection.findOne({plate: args.plate});
              if(!vendedor){
                  throw new Error("no exite ese dni");
              }else if(!coche){
                throw new Error("no exite esa matricula");
              }
                
              vendedor.Coche.push(args.plate);
              await VendedorCollection.updateOne(
                  {Dni: args.Dni},
                  {$set: {coches: vendedor.Coche}},
              );
              return coche;
                

            }catch(error){
            console.log(error);
            throw new Error(error);
      }
    },

    VendedoraConcesionario: async(
      _: unknown, 
      args: {Dni: string, direccion: string}): Promise<Vendedor | Concesionario> => {
              try{
                const vendedor = await VendedorCollection.findOne({Dni: args.Dni});
                const concesionario = await ConcesonarioCollection.findOne({direccion: args.direccion});

                if(!vendedor){
                  throw new Error("no exite ese dni");
                }else if(!concesionario){
                  throw new Error("no existe esta direccion");
                }
                  
                concesionario.Vendedor.push(args.Dni);
                await ConcesonarioCollection.updateOne(
                    {Dni: args.Dni},
                    {$set: {Vendedor: concesionario.Vendedor}},
                );
                return vendedor;
                  
              }catch(error){
                  console.log(error);
                  throw new Error(error);
          }
      },
    
};