import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

export const typeDefs = gql`
type Vendedor {
    name: String!
    Dni: String!
    Coche: [String!]!
}
type Coche {
    plate: String!
    marca: String!
    precio: Int!
} 

type Concesionario {
    nombre: String!
    direccion: String!
    disponibles: Int!
    Vendedor: [String!]
}

type Query { 
    getCoche(id: String!): Coche
    getCochePrecio(min: Int!,max:Int!): [Coche!]
    getConcesionario(id:String!): Concesionario
    getVendedor(id:String!): Vendedor
    getVendedorNombre(name:String!): Vendedor
}

type Mutation {
    createCoche(plate: String!, marca: String!, precio: Int!): Coche!
    createVendedor(name: String!, Dni: String!): Vendedor!
    createConcesionario(nombre: String!, direccion: String!, disponibles: Int!): Concesionario!
    CocheaVendedor(Dni: String!, plate: String!): Coche!
    VendedoraConcesionario(Dni: String!, direccion: String!): Vendedor!
  }
`;