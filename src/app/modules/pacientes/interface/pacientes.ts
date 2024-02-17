export interface IPaciente {
  nombre_primero: string;
  nombre_segundo?: string;
  apellido_primero: string;
  apellido_segundo?: string;
  documento_numero: string;
  sexo?: string;
  fecha_nacimiento?: Date;
  parentesco?: string;
  ocupacion?: string;
  aporta_ingresos?: boolean;
  nivel_escolaridad?: string;
  afiliacion_salud_tipo?: string;
  grupo_atencion_especial?: string;
  tiene_discapacidad?: boolean;
}

export interface IPacienteId extends IPaciente {
  id: number;
}
