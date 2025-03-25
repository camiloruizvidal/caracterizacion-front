export interface IMapeoColumna {
  categoriaId: string;
  preguntaId: string;
  columnaExcel: string;
  esBusqueda: boolean;
}

export interface IExcelMappingTemplate {
  fichaJsonId: number;
  columnasExcel: string[];
  mapeo: IMapeoColumna[];
}
