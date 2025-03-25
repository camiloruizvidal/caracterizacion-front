export interface IExcelMappingTemplate {
  fichaJsonId: number;
  columnasExcel: string[];
  mapeo: {
    [columnaExcel: string]: {
      categoriaId: string;
      preguntaId: string;
    };
  };
}
