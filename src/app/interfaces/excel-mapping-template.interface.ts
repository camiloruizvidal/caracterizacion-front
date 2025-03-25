export interface IMapeoColumna {
  categoriaId: string;
  preguntaId: string;
  esBusqueda: boolean;
}

export interface IMapeoColumnas {
  [columnaExcel: string]: IMapeoColumna;
}

export interface IExcelMappingTemplate {
  fichaJsonId: number;
  columnasExcel: string[];
  mapeo: IMapeoColumnas;
}
