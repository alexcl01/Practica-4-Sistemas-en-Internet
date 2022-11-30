export type Vendedor = {
    name: string,
    Dni: string,
    Coche: string[]
};
  
export type Coche = {
    plate: string,
    marca: string,
    precio: number
}; 

export type Concesionario = {
    nombre: string,
    direccion: string,
    disponibles: number,
    Vendedor: string[]
}; 