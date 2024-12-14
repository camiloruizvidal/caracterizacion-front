import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'enviroment/enviroment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputsService {
  private apiUrl = `${environment.apiUrl}/v1/ficha`;
  constructor(private http: HttpClient) {}

  public obtenerGruposFichas(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/obtener/grupos');
  }

  public guardarFormulario(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/ficha/nueva', data);
  }

  public obtenerFormularioJson(id: number): Observable<any> {
    //return of({
    //  isFinish: false,
    //  version: '1766',
    //  dateLastVersion: new Date('2024-02-25T00:45:25.464Z'),
    //  grupalNombre: [
    //    {
    //      id: 7,
    //      title: 'DATOS GENERALES',
    //      subtitle: null,
    //      orden: 1,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-12T15:54:04.065Z',
    //      updatedAt: '2024-02-12T15:54:04.065Z',
    //      values: [
    //        {
    //          id: 150,
    //          columnName: 'direccion',
    //          orden: 1,
    //          label: 'Dirección (O nombre de finca y vereda)',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T15:55:25.966Z',
    //          updatedAt: '2024-02-12T15:55:25.966Z',
    //          value: null
    //        },
    //        {
    //          id: 151,
    //          columnName: 'barrio',
    //          orden: 2,
    //          label: 'Barrio',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T15:56:02.628Z',
    //          updatedAt: '2024-02-12T15:56:02.628Z',
    //          value: null
    //        },
    //        {
    //          id: 152,
    //          columnName: 'municipio',
    //          orden: 3,
    //          label: 'Municipio',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Popayán', option: 'Popayán' },
    //            { value: 'Almaguer', option: 'Almaguer' },
    //            { value: 'Argelia', option: 'Argelia' },
    //            { value: 'Balboa', option: 'Balboa' },
    //            { value: 'Bolívar', option: 'Bolívar' },
    //            { value: 'Buenos Aires', option: 'Buenos Aires' },
    //            { value: 'Cajibío', option: 'Cajibío' },
    //            { value: 'Caldono', option: 'Caldono' },
    //            { value: 'Caloto', option: 'Caloto' },
    //            { value: 'Corinto', option: 'Corinto' },
    //            { value: 'El Tambo', option: 'El Tambo' },
    //            { value: 'Florencia', option: 'Florencia' },
    //            { value: 'Guachené', option: 'Guachené' },
    //            { value: 'Guapi', option: 'Guapi' },
    //            { value: 'Inzá', option: 'Inzá' },
    //            { value: 'Jambaló', option: 'Jambaló' },
    //            { value: 'La Sierra', option: 'La Sierra' },
    //            { value: 'La Vega', option: 'La Vega' },
    //            { value: 'López de Micay', option: 'López de Micay' },
    //            { value: 'Mercaderes', option: 'Mercaderes' },
    //            { value: 'Miranda', option: 'Miranda' },
    //            { value: 'Morales', option: 'Morales' },
    //            { value: 'Padilla', option: 'Padilla' },
    //            { value: 'Páez', option: 'Páez' },
    //            { value: 'Piamonte', option: 'Piamonte' },
    //            { value: 'Piendamó', option: 'Piendamó' },
    //            { value: 'Puerto Tejada', option: 'Puerto Tejada' },
    //            { value: 'Puracé', option: 'Puracé' },
    //            { value: 'Rosas', option: 'Rosas' },
    //            { value: 'San Sebastián', option: 'San Sebastián' },
    //            {
    //              value: 'Santander de Quilichao',
    //              option: 'Santander de Quilichao'
    //            },
    //            { value: 'Silvia', option: 'Silvia' },
    //            { value: 'Sotara', option: 'Sotará' },
    //            { value: 'Suárez', option: 'Suárez' },
    //            { value: 'Timbío', option: 'Timbío' },
    //            { value: 'Timbiquí', option: 'Timbiquí' },
    //            { value: 'Toribío', option: 'Toribío' },
    //            { value: 'Totoró', option: 'Totoró' },
    //            { value: 'Villa Rica', option: 'Villa Rica' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T15:56:20.974Z',
    //          updatedAt: '2024-02-12T15:56:20.974Z',
    //          value: null
    //        },
    //        {
    //          id: 153,
    //          columnName: 'telefono',
    //          orden: 4,
    //          label: 'Teléfono',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T15:59:20.445Z',
    //          updatedAt: '2024-02-12T15:59:20.445Z',
    //          value: null
    //        },
    //        {
    //          id: 154,
    //          columnName: 'participa_organizacion_comunitaria',
    //          orden: 5,
    //          label:
    //            '¿Usted o su familia pertenece a alguna organización comunitaria y/o participan en algún proyecto comunitario especifico?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: 'No',
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T16:01:14.875Z',
    //          updatedAt: '2024-02-12T16:01:14.875Z',
    //          value: 'No'
    //        },
    //        {
    //          id: 155,
    //          columnName: 'participa_organizacion_comunitaria_si',
    //          orden: 6,
    //          label: '¿Cual?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'participa_organizacion_comunitaria',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T16:03:18.083Z',
    //          updatedAt: '2024-02-12T16:03:18.083Z',
    //          value: null
    //        },
    //        {
    //          id: 156,
    //          columnName: 'cuantas_personas_residen_en_la_vivienda',
    //          orden: 7,
    //          label: '¿Cuántas personas residen en la vivienda?',
    //          description: null,
    //          type: 'numbers',
    //          options: null,
    //          default: null,
    //          visibility: null,
    //          required: true,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T16:04:26.509Z',
    //          updatedAt: '2024-02-12T16:04:26.509Z',
    //          value: null
    //        },
    //        {
    //          id: 166,
    //          columnName: 'cuantas_familias_residen_en_esta_vivienda',
    //          orden: 8,
    //          label:
    //            '¿Cuántas familias residen de manera habitual en esta vivienda?',
    //          description: null,
    //          type: 'numbers',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T16:34:14.879Z',
    //          updatedAt: '2024-02-12T16:34:14.879Z',
    //          value: null
    //        },
    //        {
    //          id: 165,
    //          columnName: 'ubicacion_gps',
    //          orden: 9,
    //          label: 'Cargar ubicación GPS',
    //          description: null,
    //          type: 'gps',
    //          options: null,
    //          default: null,
    //          visibility: null,
    //          required: false,
    //          ficha_grupo_id: 7,
    //          createdAt: '2024-02-12T16:23:38.304Z',
    //          updatedAt: '2024-02-12T16:23:38.304Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 2,
    //      title: 'VIVIENDA',
    //      subtitle: null,
    //      orden: 2,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-07T18:46:08.802Z',
    //      updatedAt: '2024-02-07T18:46:08.802Z',
    //      values: [
    //        {
    //          id: 42,
    //          columnName: 'tipo_vivienda',
    //          orden: 1,
    //          label: 'La vivienda ocupada por este hogar es:',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Propia, totalmente pagada',
    //              option: 'Propia, totalmente pagada'
    //            },
    //            {
    //              value: 'Propia, la están pagando',
    //              option: 'Propia, la están pagando'
    //            },
    //            { value: 'En arriendo', option: 'En arriendo' },
    //            { value: 'Otra', option: 'Otra' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 43,
    //          columnName: 'tipo_vivienda_valor_arriendo',
    //          orden: 2,
    //          label: 'Valor del arriendo',
    //          description: null,
    //          type: 'numbers',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'tipo_vivienda',
    //                rule: '=',
    //                value: 'En arriendo'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 167,
    //          columnName: 'tipo_vivienda_otro',
    //          orden: 3,
    //          label: 'Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              { columnDepend: 'tipo_vivienda', rule: '=', value: 'Otra' }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-12T19:39:30.029Z',
    //          updatedAt: '2024-02-12T19:39:30.029Z',
    //          value: null
    //        },
    //        {
    //          id: 44,
    //          columnName: 'lote_legalizado',
    //          orden: 4,
    //          label: 'El lote donde está ubicada la vivienda es legalizado:',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: 'No',
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: 'No'
    //        },
    //        {
    //          id: 45,
    //          columnName: 'estrato_vivienda',
    //          orden: 5,
    //          label:
    //            '¿A qué estrato pertenece esta vivienda? (Solicite recibo de servicio público, si lo tiene)',
    //          description: null,
    //          type: 'numbers',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 46,
    //          columnName: 'trabajo_en_casa',
    //          orden: 6,
    //          label:
    //            '¿En su vivienda se realiza algún trabajo o negocio que genere ingresos económicos?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 168,
    //          columnName: 'trabajo_en_casa_cual',
    //          orden: 7,
    //          label: 'Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              { columnDepend: 'trabajo_en_casa', rule: '=', value: 'Sí' }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-12T19:55:28.336Z',
    //          updatedAt: '2024-02-12T19:55:28.336Z',
    //          value: null
    //        },
    //        {
    //          id: 47,
    //          columnName: 'ingresos_mensuales_familia',
    //          orden: 8,
    //          label:
    //            '¿Cuáles son los ingresos mensuales promedio de la familia?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Menos de un Salario Mínimo Legal Vigente',
    //              option: 'Menos de un Salario Mínimo Legal Vigente'
    //            },
    //            {
    //              value: '1 Salario Mínimo Legal Vigente',
    //              option: '1 Salario Mínimo Legal Vigente'
    //            },
    //            {
    //              value: 'Más de 1 Salario Mínimo Legal Vigente',
    //              option: 'Más de 1 Salario Mínimo Legal Vigente'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 48,
    //          columnName: 'gastos_servicios_publicos',
    //          orden: 9,
    //          label:
    //            'Mensualmente, ¿cuál es el promedio en gastos en servicios públicos en su familia? $',
    //          description: null,
    //          type: 'numbers',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 49,
    //          columnName: 'acceso_facil_vivienda',
    //          orden: 10,
    //          label:
    //            'Considera que desde su vivienda se puede acceder fácilmente.',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            {
    //              value:
    //                'Medios de transporte (Buses, autos, camiones, lanchas, etc.)',
    //              option:
    //                'Medios de transporte (Buses, autos, camiones, lanchas, etc.)'
    //            },
    //            {
    //              value: 'Centros sociales, culturales y/o recreacionales',
    //              option: 'Centros sociales, culturales y/o recreacionales'
    //            },
    //            {
    //              value: 'Parques, áreas deportivas y/o zonas verdes',
    //              option: 'Parques, áreas deportivas y/o zonas verdes'
    //            },
    //            {
    //              value: 'Iglesias, templos, espacios para cultos religiosos',
    //              option: 'Iglesias, templos, espacios para cultos religiosos'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 50,
    //          columnName: 'desplazamiento_escuela_centro_estudio',
    //          orden: 11,
    //          label:
    //            '¿Cuánto tiempo promedio se gasta y cuál es la forma más frecuente en que se hace el desplazamiento desde su vivienda a la escuela o centro de estudio?:',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'A pie', option: 'A pie' },
    //            { value: 'En bicicleta', option: 'En bicicleta' },
    //            {
    //              value: 'En vehículo motorizado',
    //              option: 'En vehículo motorizado'
    //            },
    //            {
    //              value: 'En Mula/caballo/burro',
    //              option: 'En Mula/caballo/burro'
    //            },
    //            { value: 'No aplica', option: 'No aplica' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 51,
    //          columnName: 'tiempo_promedio_desplazamiento_escuela',
    //          orden: 12,
    //          label: 'Tiempo Promedio',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 52,
    //          columnName: 'desplazamiento_trabajo',
    //          orden: 13,
    //          label:
    //            '¿Cuánto tiempo promedio se gasta y cuál es la forma más frecuente en que se hace el desplazamiento desde su vivienda a su sitio de trabajo?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'A pie', option: 'A pie' },
    //            { value: 'En bicicleta', option: 'En bicicleta' },
    //            {
    //              value: 'En vehículo motorizado',
    //              option: 'En vehículo motorizado'
    //            },
    //            {
    //              value: 'En Mula/caballo/burro',
    //              option: 'En Mula/caballo/burro'
    //            },
    //            { value: 'No aplica', option: 'No aplica' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 53,
    //          columnName: 'tiempo_promedio_desplazamiento_trabajo',
    //          orden: 14,
    //          label: 'Tiempo promedio:',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 54,
    //          columnName: 'desplazamiento_salud',
    //          orden: 15,
    //          label:
    //            '¿Cuánto tiempo promedio se gasta y cuál es la forma más frecuente en que se hace el desplazamiento desde su vivienda al puesto o centro de salud?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'A pie', option: 'A pie' },
    //            { value: 'En bicicleta', option: 'En bicicleta' },
    //            {
    //              value: 'En vehículo motorizado',
    //              option: 'En vehículo motorizado'
    //            },
    //            {
    //              value: 'En Mula/caballo/burro',
    //              option: 'En Mula/caballo/burro'
    //            },
    //            { value: 'Otro', option: 'Otro' },
    //            { value: 'No aplica', option: 'No aplica' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 55,
    //          columnName: 'tiempo_promedio_desplazamiento_salud',
    //          orden: 16,
    //          label: 'Tiempo promedio:',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 56,
    //          columnName: 'cocina_sitio_preparar_alimentos',
    //          orden: 17,
    //          label: 'La cocina o sitio para preparar los alimentos es:',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'De uso exclusivo de las personas de la familia',
    //              option: 'De uso exclusivo de las personas de la familia'
    //            },
    //            {
    //              value: 'Compartida con personas de otras familias',
    //              option: 'Compartida con personas de otras familias'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 57,
    //          columnName: 'combustible_cocinar',
    //          orden: 18,
    //          label: '¿Cuál combustible usan para cocinar?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'Electricidad', option: 'Electricidad' },
    //            {
    //              value: 'Gas propano en cilindro',
    //              option: 'Gas propano en cilindro'
    //            },
    //            {
    //              value: 'Gas natural conectado a red pública',
    //              option: 'Gas natural conectado a red pública'
    //            },
    //            {
    //              value: 'Leña, madera o carbón de leña',
    //              option: 'Leña, madera o carbón de leña'
    //            },
    //            {
    //              value: 'Petróleo, gasolina, kerosén, alcohol',
    //              option: 'Petróleo, gasolina, kerosén, alcohol'
    //            },
    //            { value: 'Carbón mineral', option: 'Carbón mineral' },
    //            {
    //              value: 'Materiales de desecho',
    //              option: 'Materiales de desecho'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 58,
    //          columnName: 'servicios_basicos_vivienda',
    //          orden: 19,
    //          label:
    //            '¿Cuáles de los siguientes servicios básicos domiciliarios tiene su vivienda?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'Electricidad', option: 'Electricidad' },
    //            {
    //              value: 'Gas propano en cilindro',
    //              option: 'Gas propano en cilindro'
    //            },
    //            {
    //              value: 'Gas natural conectado a red pública',
    //              option: 'Gas natural conectado a red pública'
    //            },
    //            {
    //              value: 'Leña, madera o carbón de leña',
    //              option: 'Leña, madera o carbón de leña'
    //            },
    //            {
    //              value: 'Petróleo, gasolina, kerosén, alcohol',
    //              option: 'Petróleo, gasolina, kerosén, alcohol'
    //            },
    //            { value: 'Carbón mineral', option: 'Carbón mineral' },
    //            {
    //              value: 'Materiales de desecho',
    //              option: 'Materiales de desecho'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 59,
    //          columnName: 'conformidad_servicios',
    //          orden: 20,
    //          label: '¿Está conforme con estos servicios prestados?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 60,
    //          columnName: 'por_que_no_conformidad',
    //          orden: 21,
    //          label: '¿Por qué?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 61,
    //          columnName: 'origen_agua_consumo',
    //          orden: 22,
    //          label:
    //            '¿De dónde toman principalmente el agua para consumir en la vivienda?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Acueducto público', option: 'Acueducto público' },
    //            {
    //              value: 'Acueducto comunal o veredal',
    //              option: 'Acueducto comunal o veredal'
    //            },
    //            {
    //              value: 'Pozo con bomba o aljibe',
    //              option: 'Pozo con bomba o aljibe'
    //            },
    //            { value: 'Laguna o jagüey', option: 'Laguna o jagüey' },
    //            {
    //              value: 'Río, quebrada o manantial',
    //              option: 'Río, quebrada o manantial'
    //            },
    //            { value: 'Aguas lluvias', option: 'Aguas lluvias' },
    //            { value: 'Carro tanque', option: 'Carro tanque' },
    //            { value: 'Agua embotellada', option: 'Agua embotellada' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 169,
    //          columnName: 'origen_agua_consumo_otro',
    //          orden: 23,
    //          label: 'Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'origen_agua_consumo',
    //                rule: '=',
    //                value: 'Otro'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-12T23:11:14.817Z',
    //          updatedAt: '2024-02-12T23:11:14.817Z',
    //          value: null
    //        },
    //        {
    //          id: 62,
    //          columnName: 'regularidad_obtencion_agua',
    //          orden: 24,
    //          label:
    //            '¿Ustedes obtienen el agua de esta forma con qué regularidad?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Permanente, es decir 24 horas al día',
    //              option: 'Permanente, es decir 24 horas al día'
    //            },
    //            { value: 'Horario establecido', option: 'Horario establecido' },
    //            { value: 'De manera irregular', option: 'De manera irregular' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 63,
    //          columnName: 'almacenamiento_agua',
    //          orden: 25,
    //          label: '¿En qué almacenan el agua para consumo humano?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            {
    //              value: 'Recipiente o tanque con tapa',
    //              option: 'Recipiente o tanque con tapa'
    //            },
    //            {
    //              value: 'Recipiente o tanque sin tapa',
    //              option: 'Recipiente o tanque sin tapa'
    //            },
    //            { value: 'No almacena', option: 'No almacena' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 64,
    //          columnName: 'frecuencia_lavado_tanque_recipiente',
    //          orden: 26,
    //          label: '¿Cada cuánto lo lava?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 65,
    //          columnName: 'ubicacion_tanque_recipiente',
    //          orden: 27,
    //          label: '¿En dónde está ubicado el tanque o recipiente?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Interior de la vivienda',
    //              option: 'Interior de la vivienda'
    //            },
    //            {
    //              value: 'Exterior de la vivienda bajo techo',
    //              option: 'Exterior de la vivienda bajo techo'
    //            },
    //            {
    //              value: 'Exterior de la vivienda sin techo',
    //              option: 'Exterior de la vivienda sin techo'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 66,
    //          columnName: 'tratamiento_agua',
    //          orden: 28,
    //          label: '¿Qué hace con el agua antes de tomarla?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'La consumen sin tratamiento',
    //              option: 'La consumen sin tratamiento'
    //            },
    //            {
    //              value: 'La hierven previamente',
    //              option: 'La hierven previamente'
    //            },
    //            { value: 'La filtran', option: 'La filtran' },
    //            { value: 'Le aplican cloro', option: 'Le aplican cloro' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 67,
    //          columnName: 'tratamiento_agua_tiempo_hervir_agua',
    //          orden: 29,
    //          label: '¿Cuánto tiempo la hierve?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'tratamiento_agua',
    //                rule: '=',
    //                value: 'La hierven previamente'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 170,
    //          columnName: 'tratamiento_agua_otro',
    //          orden: 30,
    //          label: 'Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-12T23:58:42.330Z',
    //          updatedAt: '2024-02-12T23:58:42.330Z',
    //          value: null
    //        },
    //        {
    //          id: 68,
    //          columnName: 'servicio_sanitario',
    //          orden: 31,
    //          label: 'El servicio sanitario es:',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'De uso exclusivo de las personas de la familia',
    //              option: 'De uso exclusivo de las personas de la familia'
    //            },
    //            {
    //              value: 'Compartido con personas de otras familias',
    //              option: 'Compartido con personas de otras familias'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 69,
    //          columnName: 'disposicion_final_basuras',
    //          orden: 32,
    //          label:
    //            '¿Cuál es la disposición final de las basuras en este hogar?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            {
    //              value: 'La recoge el servicio de aseo municipal',
    //              option: 'La recoge el servicio de aseo municipal'
    //            },
    //            {
    //              value: 'Quema a campo abierto',
    //              option: 'Quema a campo abierto'
    //            },
    //            {
    //              value: 'La botan al campo abierto',
    //              option: 'La botan al campo abierto'
    //            },
    //            { value: 'La entierran', option: 'La entierran' },
    //            {
    //              value: 'La tiran al fuentes de agua',
    //              option: 'La tiran al fuentes de agua'
    //            },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 171,
    //          columnName: 'disposicion_final_basuras_otro',
    //          orden: 33,
    //          label: 'Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'disposicion_final_basuras',
    //                rule: '=',
    //                value: 'Otro'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-13T00:03:44.220Z',
    //          updatedAt: '2024-02-13T00:03:44.220Z',
    //          value: null
    //        },
    //        {
    //          id: 70,
    //          columnName: 'separacion_residuos_reciclaje',
    //          orden: 34,
    //          label:
    //            '¿Usted o su familia realizan el proceso de separación de los residuos para colaborarle a las personas recicladoras?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 71,
    //          columnName: 'proteccion_contra_animales_plagas_vectores',
    //          orden: 35,
    //          label:
    //            '¿Con qué tipo de elementos se protegen contra animales, plagas, vectores?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            {
    //              value: 'Toldillos/Mosquiteros',
    //              option: 'Toldillos/Mosquiteros'
    //            },
    //            {
    //              value: 'Mallas en ventanas y/o puertas (anjeos)',
    //              option: 'Mallas en ventanas y/o puertas (anjeos)'
    //            },
    //            {
    //              value: 'Fumigación con insecticidas/plaguicidas',
    //              option: 'Fumigación con insecticidas/plaguicidas'
    //            },
    //            { value: 'Raticidas', option: 'Raticidas' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 182,
    //          columnName: 'proteccion_contra_animales_plagas_vectores_otros',
    //          orden: 36,
    //          label: 'Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'proteccion_contra_animales_plagas_vectores',
    //                rule: '=',
    //                value: 'Otro'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-13T01:26:09.213Z',
    //          updatedAt: '2024-02-13T01:26:09.213Z',
    //          value: null
    //        },
    //        {
    //          id: 72,
    //          columnName: 'guardado_ropa_vivienda',
    //          orden: 37,
    //          label:
    //            '¿En qué sitio guardan la ropa las personas de esta vivienda?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            {
    //              value: 'Guardarropa, closet, ropero',
    //              option: 'Guardarropa, closet, ropero'
    //            },
    //            { value: 'Baúl', option: 'Baúl' },
    //            { value: 'Caja', option: 'Caja' },
    //            { value: 'Canasta', option: 'Canasta' },
    //            { value: 'Colgada', option: 'Colgada' },
    //            { value: 'Cajones', option: 'Cajones' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 183,
    //          columnName: 'guardado_ropa_vivienda_otro',
    //          orden: 38,
    //          label: '¿Cuál?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'guardado_ropa_vivienda',
    //                rule: '=',
    //                value: 'Otro'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-13T01:29:14.223Z',
    //          updatedAt: '2024-02-13T01:29:14.223Z',
    //          value: null
    //        },
    //        {
    //          id: 73,
    //          columnName: 'guardado_individual_ropa',
    //          orden: 39,
    //          label:
    //            'Cada miembro del hogar guarda su ropa en un lugar separado de los demás?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 74,
    //          columnName: 'aseo_en_vivienda',
    //          orden: 40,
    //          label: '¿Cómo hace aseo en su vivienda?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Solo barre', option: 'Solo barre' },
    //            { value: 'Barre y trapea', option: 'Barre y trapea' },
    //            { value: 'Solo trapea', option: 'Solo trapea' },
    //            { value: 'Barre y lava', option: 'Barre y lava' },
    //            { value: 'Solo lava', option: 'Solo lava' },
    //            {
    //              value: 'Riega con agua y barre',
    //              option: 'Riega con agua y barre'
    //            },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 184,
    //          columnName: 'aseo_en_vivienda_otro',
    //          orden: 41,
    //          label: '¿Cual?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              { columnDepend: 'aseo_en_vivienda', rule: '=', value: 'Otro' }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-13T01:33:40.713Z',
    //          updatedAt: '2024-02-13T01:33:40.713Z',
    //          value: null
    //        },
    //        {
    //          id: 75,
    //          columnName: 'uso_detergentes_desinfectantes_aseo',
    //          orden: 42,
    //          label:
    //            '¿Utiliza para hacer el aseo detergentes y/o desinfectantes?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 76,
    //          columnName: 'uso_final_plaguicidas',
    //          orden: 43,
    //          label:
    //            'En caso de usar plaguicidas, ¿cuál es el uso final que dan a los envases vacíos?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Guardar alimentos y agua',
    //              option: 'Guardar alimentos y agua'
    //            },
    //            {
    //              value: 'Los utiliza para varios usos en el hogar',
    //              option: 'Los utiliza para varios usos en el hogar'
    //            },
    //            {
    //              value: 'Los bota en la basura',
    //              option: 'Los bota en la basura'
    //            },
    //            { value: 'Los entierra', option: 'Los entierra' },
    //            { value: 'Los quema', option: 'Los quema' },
    //            { value: 'Otro', option: 'Otro' },
    //            { value: 'No aplica', option: 'No aplica' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 185,
    //          columnName: 'uso_final_plaguicidas_otro',
    //          orden: 44,
    //          label: 'Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'uso_final_plaguicidas',
    //                rule: '=',
    //                value: 'Otro'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-13T01:38:02.155Z',
    //          updatedAt: '2024-02-13T01:38:02.155Z',
    //          value: null
    //        },
    //        {
    //          id: 77,
    //          columnName: 'lavar_verduras_frutas_crudas',
    //          orden: 45,
    //          label: 'Antes de consumir verduras y frutas crudas ¿las lavan?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 78,
    //          columnName: 'encender_velas_velones',
    //          orden: 46,
    //          label:
    //            '¿Acostumbran encender velas/velones dentro de su vivienda?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 79,
    //          columnName: 'frecuencia_humo_en_vivienda',
    //          orden: 47,
    //          label: '¿Es frecuente que haya humo dentro de la vivienda?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 80,
    //          columnName: 'accidente_lesion_ultimo_anio',
    //          orden: 48,
    //          label:
    //            '¿Usted o alguien de la familia se ha accidentado o lesionado en el último año en la vivienda?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 81,
    //          columnName: 'tipo_lesion_accidente',
    //          orden: 49,
    //          label: 'Si la respuesta es sí ¿de qué se lesionó o accidentó?',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'Quemaduras', option: 'Quemaduras' },
    //            {
    //              value: 'Heridas cortantes/punzantes',
    //              option: 'Heridas cortantes/punzantes'
    //            },
    //            {
    //              value: 'Mordedura de algún animal',
    //              option: 'Mordedura de algún animal'
    //            },
    //            { value: 'Picaduras venenosas', option: 'Picaduras venenosas' },
    //            { value: 'Descarga eléctrica', option: 'Descarga eléctrica' },
    //            { value: 'Casi se ahoga', option: 'Casi se ahoga' },
    //            { value: 'Fracturas', option: 'Fracturas' },
    //            { value: 'Intoxicaciones', option: 'Intoxicaciones' },
    //            { value: 'Se Atragantó', option: 'Se Atragantó' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'accidente_lesion_ultimo_anio',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 82,
    //          columnName: 'secuelas_accidentes',
    //          orden: 50,
    //          label:
    //            'Señale cuáles de las siguientes secuelas produjo los accidentes?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'No Tuvo', option: 'No Tuvo' },
    //            {
    //              value: 'Discapacidad Temporal',
    //              option: 'Discapacidad Temporal'
    //            },
    //            {
    //              value: 'Discapacidad Permanente',
    //              option: 'Discapacidad Permanente'
    //            },
    //            { value: 'Muerte', option: 'Muerte' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: 'No Tuvo',
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'accidente_lesion_ultimo_anio',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: 'No Tuvo'
    //        },
    //        {
    //          id: 83,
    //          columnName: 'accidentes_frecuentes_en_ninos',
    //          orden: 51,
    //          label:
    //            '¿Cuáles son los accidentes más frecuentes en los niños de su hogar o familia?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 2,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 3,
    //      title: 'MORBILIDAD SENTIDA',
    //      subtitle: null,
    //      orden: 3,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-07T18:46:08.802Z',
    //      updatedAt: '2024-02-07T18:46:08.802Z',
    //      values: [
    //        {
    //          id: 84,
    //          columnName: 'hay_ninos_menores_5_anos',
    //          orden: 1,
    //          label:
    //            '¿En la vivienda hay niños y/o niñas menores de cinco años?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: 'No',
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: 'No'
    //        },
    //        {
    //          id: 189,
    //          columnName: 'menores_cinco_annos',
    //          orden: 2,
    //          label: 'MENORES DE CINCO AÑOS',
    //          description: null,
    //          type: 'title',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-15T22:58:28.334Z',
    //          updatedAt: '2024-02-15T22:58:28.334Z',
    //          value: null
    //        },
    //        {
    //          id: 190,
    //          columnName: 'morbilidad_agudo',
    //          orden: 3,
    //          label: 'MORBILIDAD AGUDA',
    //          description: null,
    //          type: 'subtitle',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-15T22:59:25.992Z',
    //          updatedAt: '2024-02-15T22:59:25.992Z',
    //          value: null
    //        },
    //        {
    //          id: 85,
    //          columnName: 'busqueda_ayuda_enfermedad_ninos',
    //          orden: 4,
    //          label: '¿Dónde buscó ayuda o tratamiento?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'No busco ayuda', option: 'No busco ayuda' },
    //            { value: 'Hospital Público', option: 'Hospital Público' },
    //            {
    //              value: 'Centro/Puesto de salud',
    //              option: 'Centro/Puesto de salud'
    //            },
    //            {
    //              value: 'Clínica/Hospital privado',
    //              option: 'Clínica/Hospital privado'
    //            },
    //            { value: 'Médico particular', option: 'Médico particular' },
    //            { value: 'Farmacia', option: 'Farmacia' },
    //            { value: 'Curandero', option: 'Curandero' },
    //            { value: 'Otro (Especifique)', option: 'Otro (Especifique)' }
    //          ],
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 86,
    //          columnName: 'edad_promedio_lactancia_materna',
    //          orden: 5,
    //          label:
    //            '¿Hasta qué edad promedio o aproximadamente alimentó al (los) menor (es) con leche materna?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 87,
    //          columnName: 'esquema_vacunacion_completo_ninos',
    //          orden: 6,
    //          label:
    //            '¿El (los) niño (s) ¿tienen el esquema de vacunación completo para su edad?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: 'Sí',
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: 'Sí'
    //        },
    //        {
    //          id: 186,
    //          columnName: 'esquema_vacunacion_completo_ninos_porque_no',
    //          orden: 7,
    //          label: '¿Por que nó?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'esquema_vacunacion_completo_ninos',
    //                rule: '=',
    //                value: 'No'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-15T18:52:46.742Z',
    //          updatedAt: '2024-02-15T18:52:46.742Z',
    //          value: null
    //        },
    //        {
    //          id: 88,
    //          columnName: 'purgado_ninos_ultimo_anio',
    //          orden: 8,
    //          label: '¿Ha purgado al niño(a) o niños (niñas) en el último año?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: 'No',
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: 'No'
    //        },
    //        {
    //          id: 187,
    //          columnName: 'purgado_ninos_ultimo_anio_cuantas_veces',
    //          orden: 9,
    //          label: '¿Cuantas veces?',
    //          description: null,
    //          type: 'numbers',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'purgado_ninos_ultimo_anio',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-15T18:55:24.319Z',
    //          updatedAt: '2024-02-15T18:55:24.319Z',
    //          value: null
    //        },
    //        {
    //          id: 191,
    //          columnName: 'mayores_cinco_annos',
    //          orden: 10,
    //          label: 'MAYORES CINCO AÑOS',
    //          description: null,
    //          type: 'title',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'No'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-15T23:52:54.958Z',
    //          updatedAt: '2024-02-15T23:52:54.958Z',
    //          value: null
    //        },
    //        {
    //          id: 192,
    //          columnName: 'mayores_cinco_annos_morbilidad_aguda',
    //          orden: 11,
    //          label: 'MORBILIDAD AGUDA',
    //          description: null,
    //          type: 'subtitle',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'No'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-15T23:53:52.835Z',
    //          updatedAt: '2024-02-15T23:53:52.835Z',
    //          value: null
    //        },
    //        {
    //          id: 93,
    //          columnName: 'otra_enfermedad_ultimo_mes',
    //          orden: 12,
    //          label: 'Alguna otra enfermedad. Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'No'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 98,
    //          columnName: 'sufrimiento_enfermedades',
    //          orden: 13,
    //          label:
    //            'Usted o algún miembro de su familia cercana ha sufrido de:',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Malaria', option: 'Malaria' },
    //            { value: 'Dengue', option: 'Dengue' },
    //            { value: 'Fiebre amarilla', option: 'Fiebre amarilla' },
    //            { value: 'Cólera', option: 'Cólera' },
    //            { value: 'Leishmaniasis', option: 'Leishmaniasis' }
    //          ],
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'No'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 99,
    //          columnName: 'enfermedades_miembros_familia',
    //          orden: 14,
    //          label:
    //            '¿Usted o algún miembro de su familia cercana sufre de alguna de las siguientes enfermedades? (A excepción de menores de cinco años)',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'Tensión Alta', option: 'Tensión Alta' },
    //            { value: 'Azúcar en la sangre', option: 'Azúcar en la sangre' },
    //            {
    //              value: 'Asma/otra enfermedad pulmonar',
    //              option: 'Asma/otra enfermedad pulmonar'
    //            },
    //            {
    //              value: 'Enfermedad de la piel/alergias graves',
    //              option: 'Enfermedad de la piel/alergias graves'
    //            },
    //            { value: 'Cáncer o tumores', option: 'Cáncer o tumores' },
    //            {
    //              value: 'Enfermedad cardiaca o cerebrovascular',
    //              option: 'Enfermedad cardiaca o cerebrovascular'
    //            },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'hay_ninos_menores_5_anos',
    //                rule: '=',
    //                value: 'No'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 3,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 12,
    //      title: 'SALUD ORAL',
    //      subtitle: null,
    //      orden: 4,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-15T19:10:11.308Z',
    //      updatedAt: '2024-02-15T19:10:11.308Z',
    //      values: [
    //        {
    //          id: 103,
    //          columnName: 'frecuencia_visitas_odontologo',
    //          orden: 1,
    //          label:
    //            '¿Cada cuánto acuden los miembros de su familia al odontólogo?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Menos de 6 meses', option: 'Menos de 6 meses' },
    //            { value: 'Entre 6 y 12 meses', option: 'Entre 6 y 12 meses' },
    //            { value: 'Entre 1 y 2 años', option: 'Entre 1 y 2 años' },
    //            { value: 'Más de 2 años', option: 'Más de 2 años' },
    //            {
    //              value: 'Nunca lo ha visitado',
    //              option: 'Nunca lo ha visitado'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 12,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 13,
    //      title: 'MORTALIDAD',
    //      subtitle: null,
    //      orden: 5,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-15T19:12:07.229Z',
    //      updatedAt: '2024-02-15T19:12:07.229Z',
    //      values: [
    //        {
    //          id: 104,
    //          columnName:
    //            'muerte_familiares_ultimo_cinco_anos_violenta_accidente',
    //          orden: 1,
    //          label:
    //            '¿En los últimos cinco años algún miembro de su familia cercana ha muerto de alguna de las siguientes causas? [Violenta / Accidente]',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Violenta / Accidente',
    //              option: 'Violenta / Accidente'
    //            },
    //            { value: 'Enfermedad crónica', option: 'Enfermedad crónica' },
    //            {
    //              value: 'Enfermedad infecciosa',
    //              option: 'Enfermedad infecciosa'
    //            },
    //            { value: 'Otra', option: 'Otra' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 13,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 188,
    //          columnName:
    //            'muerte_familiares_ultimo_cinco_anos_violenta_accidente_otro',
    //          orden: 2,
    //          label: 'Especifique',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend:
    //                  'muerte_familiares_ultimo_cinco_anos_violenta_accidente_otro',
    //                rule: '=',
    //                value: 'Otra'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 13,
    //          createdAt: '2024-02-15T19:25:04.908Z',
    //          updatedAt: '2024-02-15T19:25:04.908Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 8,
    //      title: 'SEGURIDAD Y ENTORNO DE LA VIVIENDA',
    //      subtitle: null,
    //      orden: 6,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-13T22:54:47.439Z',
    //      updatedAt: '2024-02-13T22:54:47.439Z',
    //      values: [
    //        {
    //          id: 107,
    //          columnName: 'tipo_vivienda_repetido',
    //          orden: 1,
    //          label: 'Tipo de vivienda',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Casa', option: 'Casa' },
    //            { value: 'Apartamento', option: 'Apartamento' },
    //            {
    //              value: 'Cuarto(s) en inquilinato',
    //              option: 'Cuarto(s) en inquilinato'
    //            },
    //            {
    //              value: 'Improvisada (carpa, refugio natural, plásticos, etc)',
    //              option: 'Improvisada (carpa, refugio natural, plásticos, etc)'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 8,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 108,
    //          columnName: 'autoconstruccion_vivienda',
    //          orden: 2,
    //          label: '¿La vivienda es auto construida?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 8,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 109,
    //          columnName: 'topografia_terreno',
    //          orden: 3,
    //          label:
    //            'Topografía del terreno: La vivienda está ubicada sobre un terreno',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'Plano', option: 'Plano' },
    //            { value: 'Ladera', option: 'Ladera' },
    //            { value: 'Inundable', option: 'Inundable' },
    //            { value: 'Relleno', option: 'Relleno' },
    //            { value: 'Irregular', option: 'Irregular' },
    //            { value: 'Deslizamiento', option: 'Deslizamiento' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 8,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 110,
    //          columnName: 'cerca_vivienda',
    //          orden: 4,
    //          label: 'Observe si cerca de la vivienda hay:',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'Terrenos baldíos', option: 'Terrenos baldíos' },
    //            {
    //              value: 'Plagas: roedores, cucarachas, zancudos, moscas, etc.',
    //              option: 'Plagas: roedores, cucarachas, zancudos, moscas, etc.'
    //            },
    //            {
    //              value: 'Industrias. contaminantes',
    //              option: 'Industrias. contaminantes'
    //            },
    //            { value: 'Porquerizas', option: 'Porquerizas' },
    //            { value: 'Malos olores', option: 'Malos olores' },
    //            {
    //              value: 'Rellenos sanitarios/botaderos',
    //              option: 'Rellenos sanitarios/botaderos'
    //            },
    //            {
    //              value: 'Contaminación auditiva',
    //              option: 'Contaminación auditiva'
    //            },
    //            {
    //              value: 'Contaminación visual',
    //              option: 'Contaminación visual'
    //            },
    //            { value: 'Río o quebrada', option: 'Río o quebrada' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 8,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 111,
    //          columnName: 'cerca_zonas_recreativas',
    //          orden: 5,
    //          label:
    //            '¿Cerca de la vivienda hay zonas recreativas, zonas verdes y/o de esparcimiento?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 8,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 9,
    //      title: 'CONDICIONES DE LA VIVIENDA',
    //      subtitle: null,
    //      orden: 7,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-13T22:55:45.798Z',
    //      updatedAt: '2024-02-13T22:55:45.798Z',
    //      values: [
    //        {
    //          id: 112,
    //          columnName: 'material_piso',
    //          orden: 1,
    //          label:
    //            'Piso: ¿cuál es el material predominante del piso de la casa?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value:
    //                'Liso e impermeable (cemento, baldosa, ladrillo, tableta, granito)',
    //              option:
    //                'Liso e impermeable (cemento, baldosa, ladrillo, tableta, granito)'
    //            },
    //            {
    //              value: 'Madera burda, tabla, tablón, otro vegetal',
    //              option: 'Madera burda, tabla, tablón, otro vegetal'
    //            },
    //            { value: 'Madera pulida', option: 'Madera pulida' },
    //            {
    //              value: 'Material plástico (vinilo, otro material sintético)',
    //              option: 'Material plástico (vinilo, otro material sintético)'
    //            },
    //            { value: 'Lámina', option: 'Lámina' },
    //            { value: 'Esterilla', option: 'Esterilla' },
    //            { value: 'Tierra, arena', option: 'Tierra, arena' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 113,
    //          columnName: 'material_paredes',
    //          orden: 2,
    //          label:
    //            'Paredes: ¿cuál es el material predominante de las paredes?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Impermeable (cemento, bloque, ladrillo, piedra)',
    //              option: 'Impermeable (cemento, bloque, ladrillo, piedra)'
    //            },
    //            {
    //              value:
    //                'Bahareque/Barro, tapia pisada, esterilla, caña, otro tipo de material vegetal',
    //              option:
    //                'Bahareque/Barro, tapia pisada, esterilla, caña, otro tipo de material vegetal'
    //            },
    //            {
    //              value: 'Madera pulida, Madera burda (tabla, tablón), Guadua',
    //              option: 'Madera pulida, Madera burda (tabla, tablón), Guadua'
    //            },
    //            { value: 'No tiene', option: 'No tiene' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 114,
    //          columnName: 'material_techo',
    //          orden: 3,
    //          label: 'Techo: ¿cuál es el material predominante del techo?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Concreto', option: 'Concreto' },
    //            { value: 'Tejas de barro', option: 'Tejas de barro' },
    //            { value: 'Fibrocemento', option: 'Fibrocemento' },
    //            { value: 'Zinc', option: 'Zinc' },
    //            { value: 'Palma o paja', option: 'Palma o paja' },
    //            { value: 'Plástico', option: 'Plástico' },
    //            {
    //              value: 'Desechos (cartón, lata, tela, sacos, etc)',
    //              option: 'Desechos (cartón, lata, tela, sacos, etc)'
    //            },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 115,
    //          columnName: 'ambientes_separados',
    //          orden: 4,
    //          label: '¿La vivienda tiene los siguientes ambientes separados?',
    //          description: null,
    //          type: 'title',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 116,
    //          columnName: 'cuartos_dormitorio',
    //          orden: 11,
    //          label:
    //            '¿De cuántos cuartos o piezas dormitorio dispone este hogar?',
    //          description: null,
    //          type: 'numbers',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 193,
    //          columnName: 'observe_donde_duerme_personas',
    //          orden: 12,
    //          label: 'Observe en dónde duermen las personas de la vivienda',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'Cama con colchón', option: 'Cama con colchón' },
    //            { value: 'Cama sin colchón', option: 'Cama sin colchón' },
    //            { value: 'Colchón', option: 'Colchón' },
    //            { value: 'Estera', option: 'Estera' },
    //            { value: 'Hamaca / Chinchorro', option: 'Hamaca / Chinchorro' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-16T00:20:05.539Z',
    //          updatedAt: '2024-02-16T00:20:05.539Z',
    //          value: null
    //        },
    //        {
    //          id: 118,
    //          columnName: 'cantidad_camas',
    //          orden: 13,
    //          label: '¿Cuántas camas hay en la vivienda?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 119,
    //          columnName: 'ventilacion_natural_cocina',
    //          orden: 14,
    //          label:
    //            '¿La vivienda tiene ventilación natural en cada ambiente? Conteste SI ó NO, para cada opción, según observe: [Cocina:]',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 120,
    //          columnName: 'elementos_separados_casa',
    //          orden: 15,
    //          label:
    //            '¿La casa cuenta con los siguientes elementos por separado?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 121,
    //          columnName: 'tipo_alumbrado',
    //          orden: 16,
    //          label:
    //            'Qué tipo de alumbrado utilizan en la vivienda? (señale una sola opción, la más predominante)',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Eléctrica', option: 'Eléctrica' },
    //            {
    //              value: 'Kerosén, petróleo, gasolina',
    //              option: 'Kerosén, petróleo, gasolina'
    //            },
    //            { value: 'Vela', option: 'Vela' },
    //            {
    //              value: 'Planta de electricidad comunitaria',
    //              option: 'Planta de electricidad comunitaria'
    //            },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 122,
    //          columnName: 'elementos_pertenencias',
    //          orden: 17,
    //          label: 'Observe si en la vivienda poseen:',
    //          description: null,
    //          type: 'select_multiple',
    //          options: [
    //            { value: 'Televisor', option: 'Televisor' },
    //            { value: 'Equipo de sonido', option: 'Equipo de sonido' },
    //            { value: 'Refrigerador', option: 'Refrigerador' },
    //            { value: 'Ventilador', option: 'Ventilador' },
    //            { value: 'Ninguno', option: 'Ninguno' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 9,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 10,
    //      title: 'SANEAMIENTO BÁSICO',
    //      subtitle: null,
    //      orden: 8,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-13T22:56:08.235Z',
    //      updatedAt: '2024-02-13T22:56:08.235Z',
    //      values: [
    //        {
    //          id: 123,
    //          columnName: 'disposicion_excretas',
    //          orden: 145,
    //          label: 'Observe en dónde se disponen las excretas (heces)',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Inodoro conectado a alcantarillado',
    //              option: 'Inodoro conectado a alcantarillado'
    //            },
    //            {
    //              value: 'Inodoro conectado a pozo séptico o sumidero',
    //              option: 'Inodoro conectado a pozo séptico o sumidero'
    //            },
    //            {
    //              value: 'Inodoro con descarga al aire libre',
    //              option: 'Inodoro con descarga al aire libre'
    //            },
    //            { value: 'Letrina o sumidero', option: 'Letrina o sumidero' },
    //            { value: 'Campo abierto', option: 'Campo abierto' },
    //            { value: 'En agua corriente', option: 'En agua corriente' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 124,
    //          columnName: 'sanitario_letrina_distancia_cercana',
    //          orden: 146,
    //          label:
    //            'Si el servicio sanitario que utilizan en la vivienda es letrina, para cada opción responda SI ó NO, según observe, si la letrina está ubicada a una distancia cercana a:',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Fuentes de abastecimiento de agua',
    //              option: 'Fuentes de abastecimiento de agua'
    //            },
    //            { value: 'Ríos y quebradas', option: 'Ríos y quebradas' },
    //            {
    //              value: 'Tanques subterráneos de agua',
    //              option: 'Tanques subterráneos de agua'
    //            },
    //            { value: 'Vivienda', option: 'Vivienda' },
    //            { value: 'Sumidero', option: 'Sumidero' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 125,
    //          columnName: 'cantidad_inodoros_sanitarios',
    //          orden: 147,
    //          label:
    //            '¿Cuántos inodoros o sanitarios de arrastre tiene este hogar?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Ninguno', option: 'Ninguno' },
    //            { value: '1', option: '1' },
    //            { value: '2', option: '2' },
    //            { value: 'Más de 2', option: 'Más de 2' },
    //            { value: 'No aplica', option: 'No aplica' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 126,
    //          columnName: 'ubicacion_sanitario',
    //          orden: 148,
    //          label:
    //            '¿Dónde se encuentra el sanitario, inodoro o letrina que usan las personas de esta familia?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Fuera de la casa', option: 'Fuera de la casa' },
    //            {
    //              value:
    //                'Dentro de la casa, pero fuera del área habitada (patio o solar)',
    //              option:
    //                'Dentro de la casa, pero fuera del área habitada (patio o solar)'
    //            },
    //            { value: 'Dentro de la casa', option: 'Dentro de la casa' },
    //            { value: 'No aplica', option: 'No aplica' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 127,
    //          columnName: 'lavamanos_cerca_sanitario',
    //          orden: 149,
    //          label: '¿El lavamanos se encuentra cerca del sanitario?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Si', option: 'Si' },
    //            { value: 'No', option: 'No' },
    //            { value: 'No aplica', option: 'No aplica' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 194,
    //          columnName: 'manejo_basura',
    //          orden: 150,
    //          label: 'MANEJO DE BASURAS Y RESIDUOS SÓLIDOS EN LA VIVIENDA',
    //          description: null,
    //          type: 'title',
    //          options: null,
    //          default: null,
    //          visibility: null,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-16T00:30:05.220Z',
    //          updatedAt: '2024-02-16T00:30:05.220Z',
    //          value: null
    //        },
    //        {
    //          id: 128,
    //          columnName: 'recogida_basura',
    //          orden: 151,
    //          label: 'Recogen la basura en:',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Recipientes con tapa',
    //              option: 'Recipientes con tapa'
    //            },
    //            {
    //              value: 'Recipientes sin tapa',
    //              option: 'Recipientes sin tapa'
    //            },
    //            {
    //              value: 'Directamente al suelo',
    //              option: 'Directamente al suelo'
    //            },
    //            { value: 'Bolsas plásticas', option: 'Bolsas plásticas' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 129,
    //          columnName: 'convivencia_animales',
    //          orden: 152,
    //          label: 'CONVIVENCIA CON ANIMALES',
    //          description: null,
    //          type: 'title',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 130,
    //          columnName: 'lugar_preparacion_alimentos',
    //          orden: 153,
    //          label:
    //            '¿En cuál de los siguientes lugares preparan los alimentos las personas de este hogar?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'En un cuarto usado solo para cocinar',
    //              option: 'En un cuarto usado solo para cocinar'
    //            },
    //            {
    //              value: 'En un cuarto usado también para dormir',
    //              option: 'En un cuarto usado también para dormir'
    //            },
    //            {
    //              value: 'En una sala comedor con lavaplatos',
    //              option: 'En una sala comedor con lavaplatos'
    //            },
    //            {
    //              value: 'En una sala comedor sin lavaplatos',
    //              option: 'En una sala comedor sin lavaplatos'
    //            },
    //            {
    //              value: 'En un patio, corredor, a aire libre',
    //              option: 'En un patio, corredor, a aire libre'
    //            },
    //            {
    //              value: 'En ninguna parte (no preparan alimentos)',
    //              option: 'En ninguna parte (no preparan alimentos)'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 131,
    //          columnName: 'material_mesa_alimentos',
    //          orden: 154,
    //          label:
    //            '¿De qué material está elaborada la mesa en donde manipulan los alimentos? (señale solo una opción, la más predominante)',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Cemento', option: 'Cemento' },
    //            { value: 'Madera', option: 'Madera' },
    //            { value: 'Ladrillo', option: 'Ladrillo' },
    //            { value: 'Baldosa', option: 'Baldosa' },
    //            { value: 'Metal', option: 'Metal' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 132,
    //          columnName: 'almacenamiento_alimentos',
    //          orden: 155,
    //          label: 'Observe en qué lugar almacenan los alimentos',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Refrigerador', option: 'Refrigerador' },
    //            {
    //              value: 'Recipientes abiertos',
    //              option: 'Recipientes abiertos'
    //            },
    //            {
    //              value: 'Recipientes cerrados',
    //              option: 'Recipientes cerrados'
    //            },
    //            {
    //              value: 'Al aire libre dentro de la casa',
    //              option: 'Al aire libre dentro de la casa'
    //            },
    //            {
    //              value: 'Al aire libre fuera de la casa',
    //              option: 'Al aire libre fuera de la casa'
    //            },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 133,
    //          columnName: 'almacenamiento_conjunto_productos',
    //          orden: 156,
    //          label:
    //            '¿Almacenan junto a los alimentos y/o agua de consumo algunos de los siguientes productos? (marcar las opciones que apliquen):',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            {
    //              value: 'Gasolina/kerosén/petróleo',
    //              option: 'Gasolina/kerosén/petróleo'
    //            },
    //            {
    //              value: 'Plaguicidas agrícolas',
    //              option: 'Plaguicidas agrícolas'
    //            },
    //            {
    //              value: 'Detergente/desinfectante',
    //              option: 'Detergente/desinfectante'
    //            },
    //            {
    //              value:
    //                'Plaguicidas para matar: cucarachas/hormigas/zancudos/ratas',
    //              option:
    //                'Plaguicidas para matar: cucarachas/hormigas/zancudos/ratas'
    //            },
    //            {
    //              value: 'No aplica ningún producto químico de los anteriores',
    //              option: 'No aplica ningún producto químico de los anteriores'
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 10,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 14,
    //      title: 'OBSERVACIONES DEL ENCUESTADOR',
    //      subtitle: null,
    //      orden: 9,
    //      ficha_tipo_id: 1,
    //      table: 'tarjeta_familiar',
    //      createdAt: '2024-02-16T00:45:30.110Z',
    //      updatedAt: '2024-02-16T00:45:30.110Z',
    //      values: [
    //        {
    //          id: 195,
    //          columnName: 'NOTAS',
    //          orden: 1,
    //          label:
    //            'Describa brevemente si durante la visita observó alguna característica de la vivienda que le haya llamado la atención y/o que considere anormal ',
    //          description: null,
    //          type: 'textarea',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 14,
    //          createdAt: '2024-02-16T00:45:57.856Z',
    //          updatedAt: '2024-02-16T00:45:57.856Z',
    //          value: null
    //        }
    //      ]
    //    }
    //  ],
    //  individualNombre: [
    //    {
    //      id: 5,
    //      title: 'DATOS PERSONALES',
    //      subtitle: null,
    //      orden: 1,
    //      ficha_tipo_id: 2,
    //      table: 'pacientes',
    //      createdAt: '2024-02-07T18:46:08.802Z',
    //      updatedAt: '2024-02-07T18:46:08.802Z',
    //      values: [
    //        {
    //          id: 147,
    //          columnName: 'documento_tipo',
    //          orden: 1,
    //          label: 'Tipo de documento',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'CC', option: 'Cédula de Ciudadanía' },
    //            { value: 'TI', option: 'Tarjeta de Identidad' },
    //            { value: 'CE', option: 'Cédula de Extranjería' },
    //            { value: 'PAS', option: 'Pasaporte' },
    //            { value: 'RC', option: 'Registro Civil' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 143,
    //          columnName: 'documento_numero',
    //          orden: 2,
    //          label: 'Número documento',
    //          description: null,
    //          type: 'selectFilter',
    //          options: {
    //            create_new: true,
    //            label_no_exist:
    //              'Este paciente no existe en nuestra base de datos. ¿Desea crearlo?',
    //            label: 'ingrese el documento',
    //            formato_listado_mostrar:
    //              '${documento_numero}) ${nombre_primero} ${apellido_primero}',
    //            item_busqueda: 'documento_numero',
    //            tabla_destino: 'patients',
    //            relaciones: [
    //              { origen: 'nombre_primero', destino: 'nombre_primero' },
    //              { origen: 'apellido_primero', destino: 'apellido_primero' },
    //              { origen: 'nombre_segundo', destino: 'nombre_segundo' },
    //              { origen: 'apellido_segundo', destino: 'apellido_segundo' },
    //              { origen: 'genero', destino: 'sexo' },
    //              { origen: 'documento_numero', destino: 'documento_numero' }
    //            ]
    //          },
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 148,
    //          columnName: 'genero',
    //          orden: 3,
    //          label: '¿Cuál es su sexo?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'H', option: 'Hombre' },
    //            { value: 'M', option: 'Mujer' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 196,
    //          columnName: 'fecha_nacimiento',
    //          orden: 4,
    //          label: 'Ingrese la fecha de nacimiento',
    //          description: null,
    //          type: 'calendar',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-25T00:11:09.828Z',
    //          updatedAt: '2024-02-25T00:11:09.828Z',
    //          value: null
    //        },
    //        {
    //          id: 139,
    //          columnName: 'nombre_primero',
    //          orden: 5,
    //          label: 'Primer nombre',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 140,
    //          columnName: 'nombre_segundo',
    //          orden: 6,
    //          label: 'Segundo nombre',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 141,
    //          columnName: 'apellido_primero',
    //          orden: 7,
    //          label: 'Primer apellido',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 142,
    //          columnName: 'apellido_segundo',
    //          orden: 8,
    //          label: 'Segundo apellido',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 157,
    //          columnName: 'estado_civil',
    //          orden: 9,
    //          label: 'Estado civil',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Soltero(a)', option: 'Soltero(a)' },
    //            { value: 'Casado(a)', option: 'Casado(a)' },
    //            { value: 'Separado(a)', option: 'Separado(a)' },
    //            { value: 'Viudo(a)', option: 'Viudo(a)' },
    //            { value: 'Unión libre', option: 'Unión libre' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-12T16:08:29.830Z',
    //          updatedAt: '2024-02-12T16:08:29.830Z',
    //          value: null
    //        },
    //        {
    //          id: 158,
    //          columnName: 'parentesco',
    //          orden: 10,
    //          label: 'Parentesco (respecto a\nquien responde la encuesta)',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Jefe(a) de familia', option: 'Jefe(a) de familia' },
    //            {
    //              value: 'Cónyuge o compañero(a)',
    //              option: 'Cónyuge o compañero(a)'
    //            },
    //            { value: 'Hijo(a)', option: 'Hijo(a)' },
    //            { value: 'Hermano(a)', option: 'Hermano(a)' },
    //            { value: 'Padre o madre', option: 'Padre o madre' },
    //            { value: 'Otros', option: 'Otros' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-12T16:09:52.528Z',
    //          updatedAt: '2024-02-12T16:09:52.528Z',
    //          value: null
    //        },
    //        {
    //          id: 159,
    //          columnName: 'ocupacion',
    //          orden: 11,
    //          label: 'Ocupación',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Empleado', option: 'Empleado' },
    //            {
    //              value: 'Trabajador independiente',
    //              option: 'Trabajador independiente'
    //            },
    //            { value: 'Ama de casa', option: 'Ama de casa' },
    //            {
    //              value: 'Jubilado, pensionado',
    //              option: 'Jubilado, pensionado'
    //            },
    //            { value: 'Desempleado', option: 'Desempleado' },
    //            { value: 'Estudiante', option: 'Estudiante' },
    //            { value: 'No aplica por edad', option: 'No aplica por edad' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-12T16:10:34.797Z',
    //          updatedAt: '2024-02-12T16:10:34.797Z',
    //          value: null
    //        },
    //        {
    //          id: 160,
    //          columnName: 'aporta_ingresos',
    //          orden: 12,
    //          label: '¿Aporta ingresos económicos a la familia?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Sí', option: 'Sí' },
    //            { value: 'No', option: 'No' },
    //            { value: 'No aplica', option: 'No aplica' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-12T16:12:10.550Z',
    //          updatedAt: '2024-02-12T16:12:10.550Z',
    //          value: null
    //        },
    //        {
    //          id: 161,
    //          columnName: 'nivel_escolaridad',
    //          orden: 13,
    //          label: '¿Nivel de Escolaridad?',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Ninguno', option: 'Ninguno' },
    //            { value: 'Primaria completa', option: 'Primaria completa' },
    //            { value: 'Primaria incompleta', option: 'Primaria incompleta' },
    //            { value: 'Secundaria completa', option: 'Secundaria completa' },
    //            {
    //              value: 'Secundaria incompleta',
    //              option: 'Secundaria incompleta'
    //            },
    //            {
    //              value: 'Técnica o tecnológica',
    //              option: 'Técnica o tecnológica'
    //            },
    //            { value: 'Universitaria', option: 'Universitaria' },
    //            { value: 'Postgrado', option: 'Postgrado' },
    //            { value: 'Otro', option: 'Otro' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-12T16:13:02.819Z',
    //          updatedAt: '2024-02-12T16:13:02.819Z',
    //          value: null
    //        },
    //        {
    //          id: 162,
    //          columnName: 'tipo_afiliacion_salud',
    //          orden: 14,
    //          label: 'Tipo de afiliación en salud',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Contributivo', option: 'Contributivo' },
    //            { value: 'Subsidiado', option: 'Subsidiado' },
    //            { value: 'Sisben', option: 'Sisben' },
    //            { value: 'Ninguno', option: 'Ninguno' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-12T16:15:16.527Z',
    //          updatedAt: '2024-02-12T16:15:16.527Z',
    //          value: null
    //        },
    //        {
    //          id: 163,
    //          columnName: 'grupo_atención_especial',
    //          orden: 15,
    //          label: 'Grupo de atención especial',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Desplazados', option: 'Desplazados' },
    //            { value: 'Afrodescendientes', option: 'Afrodescendientes' },
    //            { value: 'Indígenas', option: 'Indígenas' },
    //            { value: 'No aplica', option: 'No aplica' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-12T16:17:00.008Z',
    //          updatedAt: '2024-02-12T16:17:00.008Z',
    //          value: null
    //        },
    //        {
    //          id: 164,
    //          columnName: 'discapacidad',
    //          orden: 16,
    //          label: 'Discapacidad',
    //          description: null,
    //          type: 'select',
    //          options: [
    //            { value: 'Motora', option: 'Motora' },
    //            { value: 'Auditiva', option: 'Auditiva' },
    //            { value: 'Visual', option: 'Visual' },
    //            { value: 'Del habla', option: 'Del habla' },
    //            { value: 'Mental', option: 'Mental' },
    //            { value: 'Otra', option: 'Otra' },
    //            { value: 'Ninguna', option: 'Ninguna' }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: true,
    //          ficha_grupo_id: 5,
    //          createdAt: '2024-02-12T16:18:30.551Z',
    //          updatedAt: '2024-02-12T16:18:30.551Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 1,
    //      title: 'ENCUESTA PSICOSOCIAL',
    //      subtitle: null,
    //      orden: 2,
    //      ficha_tipo_id: 2,
    //      table: 'psicosocial_persona',
    //      createdAt: '2024-02-07T18:46:08.802Z',
    //      updatedAt: '2024-02-07T18:46:08.802Z',
    //      values: [
    //        {
    //          id: 144,
    //          columnName: 'ustedes_recibieron_ayuda',
    //          orden: 13,
    //          label:
    //            '¿En los últimos dos años usted y su familia han recibido algún tipo de ayuda o apoyo de alguna entidad u organización?',
    //          description: null,
    //          type: 'check',
    //          options: { valueTrue: 'Sí', valueFalse: 'No' },
    //          default: 'Sí',
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: 'Sí'
    //        },
    //        {
    //          id: 145,
    //          columnName: 'ustedes_recibieron_ayuda_de_quien',
    //          orden: 14,
    //          label: '¿De cuál organización,  institución o persona?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'ustedes_recibieron_ayuda',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 146,
    //          columnName: 'ustedes_recibieron_ayuda_que_tipo',
    //          orden: 15,
    //          label: '¿Qué tipo de ayuda?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: {
    //            isDepent: true,
    //            rules: [
    //              {
    //                columnDepend: 'ustedes_recibieron_ayuda',
    //                rule: '=',
    //                value: 'Sí'
    //              }
    //            ],
    //            isShow: true
    //          },
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 16,
    //          columnName: 'principal_necesidad',
    //          orden: 16,
    //          label:
    //            '¿En la actualidad cuál considera que es la principal necesidad que tienen usted y su familia?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 17,
    //          columnName: 'desplazamiento',
    //          orden: 17,
    //          label:
    //            '¿Ha sido usted y/o su familia desplazados por la violencia en los últimos diez años?, ¿En Caso Sí Hace Cuánto?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 18,
    //          columnName: 'de_que_lugar',
    //          orden: 18,
    //          label: '¿De qué lugar?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 19,
    //          columnName: 'deseos_volver',
    //          orden: 19,
    //          label:
    //            '¿Siente deseos de volver al sitio de donde fue desplazado?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 20,
    //          columnName: 'despues_desplazamiento_rechazo_discriminacion',
    //          orden: 20,
    //          label:
    //            'Después del desplazamiento usted o su familia han sido rechazados o discriminados en:',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 21,
    //          columnName: 'cambios_despues_desplazamiento',
    //          orden: 21,
    //          label:
    //            '¿Qué cambios ha presentado la familia después del desplazamiento?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 22,
    //          columnName: 'afectados_negativamente_desplazamiento',
    //          orden: 22,
    //          label:
    //            '¿Qué tan afectados de manera negativa considera que están usted y su familia como consecuencia del desplazamiento?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 23,
    //          columnName: 'desplazamiento_positivo',
    //          orden: 23,
    //          label:
    //            '¿Considera que el desplazamiento ha sido de alguna manera positivo para usted y su familia?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 24,
    //          columnName: 'a_gusto_en_vivienda',
    //          orden: 24,
    //          label:
    //            '¿Se siente a gusto en la vivienda que habita actualmente?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 25,
    //          columnName: 'que_le_gusta_o_menos_gusta',
    //          orden: 25,
    //          label: '¿Qué es lo que más le gusta o menos le gusta?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 26,
    //          columnName: 'lugar_preferido_dentro_casa',
    //          orden: 26,
    //          label:
    //            '¿Cuándo su familia se encuentra dentro de la casa, en qué lugar prefieren estar la mayor parte del tiempo?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 27,
    //          columnName: 'consumo_alimentos',
    //          orden: 27,
    //          label: 'Cuándo consumen los alimentos en su familia, lo hacen:',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 28,
    //          columnName: 'casos_maltrato_o_violencia',
    //          orden: 28,
    //          label:
    //            '¿Al interior de su familia se presentan o se han presentado casos de maltrato o violencia?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 29,
    //          columnName: 'ayuda_o_denuncia',
    //          orden: 29,
    //          label:
    //            "En caso de responder 'Sí' a la anterior pregunta ¿Ha pedido ayuda o ha denunciado estos casos? (para llenar el 'No' coloque 'No porque...')",
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 30,
    //          columnName: 'decisiones_importantes_en_familia',
    //          orden: 30,
    //          label:
    //            '¿Cómo se toman las decisiones más importantes en su familia?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 31,
    //          columnName: 'correccion_de_problemas_en_familia',
    //          orden: 31,
    //          label:
    //            '¿Cómo se corrigen o resuelven usualmente los problemas en su familia? (señale una sola opción)',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 32,
    //          columnName: 'resolucion_problemas_en_comunidad',
    //          orden: 32,
    //          label: '¿Cómo se resuelven los problemas en su comunidad?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 33,
    //          columnName: 'necesidad_capacitarse',
    //          orden: 33,
    //          label: '¿Considera que necesita capacitarse?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 34,
    //          columnName: 'en_que_o_porque_capacitarse',
    //          orden: 34,
    //          label: '¿En qué o Porque?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 35,
    //          columnName: 'emprender_negocio',
    //          orden: 35,
    //          label: '¿Le gustaría emprender un negocio?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 36,
    //          columnName: 'de_que_o_porque_emprender',
    //          orden: 36,
    //          label: '¿De qué? o ¿Por qué?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 37,
    //          columnName: 'condiciones_vida_en_un_ano',
    //          orden: 37,
    //          label:
    //            '¿Cómo cree que serán las condiciones de vida de usted y su familia en un año?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 38,
    //          columnName: 'molestias_salud',
    //          orden: 38,
    //          label:
    //            '¿Usted o algún miembro de su familia cercana -esposo (a), hijos- mayor de 15 años ha tenido cambios en su comportamiento habitual en los últimos seis (6) meses?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 39,
    //          columnName: 'cambios_en_menores_15_anos',
    //          orden: 39,
    //          label:
    //            '¿En su hogar, alguno de los menores de 15 años ha tenido cambios en su comportamiento habitual en los últimos seis (6) meses? (en la columna, QUIEN registre el número que le correspondió a la persona en la pregunta III, numeral 15, miembros de la familia) [¿Juega o se divierte menos?]',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 40,
    //          columnName: 'dedicacion_tiempo_libre',
    //          orden: 40,
    //          label: '¿A qué dedica su familia el tiempo libre?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        },
    //        {
    //          id: 41,
    //          columnName: 'felicidad_actual',
    //          orden: 41,
    //          label: 'En la actualidad considera que Usted ES FELIZ ¿Por qué?',
    //          description: null,
    //          type: 'text',
    //          options: null,
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 1,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        }
    //      ]
    //    },
    //    {
    //      id: 6,
    //      title: 'RUTAS DE ATENCIÓN',
    //      subtitle: null,
    //      orden: 3,
    //      ficha_tipo_id: 2,
    //      table: 'rutas_persona',
    //      createdAt: '2024-02-07T18:46:08.802Z',
    //      updatedAt: '2024-02-07T18:46:08.802Z',
    //      values: [
    //        {
    //          id: 149,
    //          columnName: 'ruta_atencion',
    //          orden: 999,
    //          label: 'Ruta de atención del paciente',
    //          description: null,
    //          type: 'ruta_atencion',
    //          options: [
    //            {
    //              genero: 'H',
    //              edad_inicial: 0,
    //              edad_final: 2,
    //              categoria: 'Recién nacido',
    //              descripcion:
    //                'Crecimiento y desarrollo físico y mental muy rápidos. Dependencia total de los adultos.',
    //              examenes_medicos_recomendados: [
    //                'Tamizaje neonatal',
    //                'Evaluación de la vista y el oído',
    //                'Control del peso y la talla'
    //              ]
    //            },
    //            {
    //              genero: 'H',
    //              edad_inicial: 3,
    //              edad_final: 5,
    //              categoria: 'Niño pequeño',
    //              descripcion:
    //                'Desarrollo de la motricidad gruesa y fina. Inicio del lenguaje y la socialización.',
    //              examenes_medicos_recomendados: [
    //                'Control del peso y la talla',
    //                'Vacunas según el calendario nacional',
    //                'Examen dental'
    //              ]
    //            },
    //            {
    //              genero: 'H',
    //              edad_inicial: 6,
    //              edad_final: 12,
    //              categoria: 'Niño',
    //              descripcion:
    //                'Crecimiento y desarrollo físico y mental continuos. Independencia gradual.',
    //              examenes_medicos_recomendados: [
    //                'Control del peso y la talla',
    //                'Vacunas según el calendario nacional',
    //                'Examen dental',
    //                'Examen de la vista'
    //              ]
    //            },
    //            {
    //              genero: 'H',
    //              edad_inicial: 13,
    //              edad_final: 19,
    //              categoria: 'Adolescente',
    //              descripcion:
    //                'Pubertad. Cambios físicos y hormonales significativos. Desarrollo de la identidad personal.',
    //              examenes_medicos_recomendados: [
    //                'Control del peso y la talla',
    //                'Vacunas según el calendario nacional',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)'
    //              ]
    //            },
    //            {
    //              genero: 'H',
    //              edad_inicial: 20,
    //              edad_final: 39,
    //              categoria: 'Adulto joven',
    //              descripcion:
    //                'Mayor independencia y responsabilidad. Inicio de la vida laboral y familiar.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)'
    //              ]
    //            },
    //            {
    //              genero: 'H',
    //              edad_inicial: 40,
    //              edad_final: 59,
    //              categoria: 'Adulto',
    //              descripcion:
    //                'Madurez física y mental. Estabilidad en la vida personal y profesional.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Colonoscopia'
    //              ]
    //            },
    //            {
    //              genero: 'H',
    //              edad_inicial: 60,
    //              edad_final: 74,
    //              categoria: 'Adulto mayor',
    //              descripcion:
    //                'Envejecimiento gradual. Disminución de la capacidad física y mental.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Colonoscopia',
    //                'Prueba de osteoporosis'
    //              ]
    //            },
    //            {
    //              genero: 'H',
    //              edad_inicial: 75,
    //              edad_final: '+',
    //              categoria: 'Anciano',
    //              descripcion:
    //                'Tercera edad. Mayor riesgo de enfermedades y dependencia de cuidados.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Colonoscopia',
    //                'Prueba de osteoporosis',
    //                'Prueba de equilibrio y marcha'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 0,
    //              edad_final: 2,
    //              categoria: 'Recién nacida',
    //              descripcion:
    //                'Crecimiento y desarrollo físico y mental muy rápidos. Dependencia total de los adultos.',
    //              examenes_medicos_recomendados: [
    //                'Tamizaje neonatal',
    //                'Evaluación de la vista y el oído',
    //                'Control del peso y la talla'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 3,
    //              edad_final: 5,
    //              categoria: 'Niña pequeña',
    //              descripcion:
    //                'Desarrollo de la motricidad gruesa y fina. Inicio del lenguaje y la socialización.',
    //              examenes_medicos_recomendados: [
    //                'Control del peso y la talla',
    //                'Vacunas según el calendario nacional',
    //                'Examen dental'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 6,
    //              edad_final: 12,
    //              categoria: 'Niña',
    //              descripcion:
    //                'Crecimiento y desarrollo físico y mental continuos. Independencia gradual.',
    //              examenes_medicos_recomendados: [
    //                'Control del peso y la talla',
    //                'Vacunas según el calendario nacional',
    //                'Examen dental',
    //                'Examen de la vista'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 13,
    //              edad_final: 19,
    //              categoria: 'Adolescente',
    //              descripcion:
    //                'Pubertad. Cambios físicos y hormonales significativos. Desarrollo de la identidad personal.',
    //              examenes_medicos_recomendados: [
    //                'Control del peso y la talla',
    //                'Vacunas según el calendario nacional',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Citología vaginal'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 20,
    //              edad_final: 39,
    //              categoria: 'Adulto joven',
    //              descripcion:
    //                'Mayor independencia y responsabilidad. Inicio de la vida laboral y familiar.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Citología vaginal'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 20,
    //              edad_final: 39,
    //              categoria: 'Embarazada',
    //              descripcion: 'Gestación y desarrollo fetal.',
    //              examenes_medicos_recomendados: [
    //                'Análisis de sangre y orina',
    //                'Ecografía obstétrica',
    //                'Pruebas de detección prenatal'
    //              ],
    //              controles_prenatales: [
    //                '1-2 visitas (primer trimestre)',
    //                '5-6 visitas (segundo trimestre)',
    //                '3-4 visitas (tercer trimestre)'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 40,
    //              edad_final: 59,
    //              categoria: 'Adulto',
    //              descripcion:
    //                'Madurez física y mental. Estabilidad en la vida personal y profesional.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Mamografía',
    //                'Colonoscopia'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 60,
    //              edad_final: 74,
    //              categoria: 'Adulto mayor',
    //              descripcion:
    //                'Envejecimiento gradual. Disminución de la capacidad física y mental.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Mamografía',
    //                'Colonoscopia',
    //                'Prueba de osteoporosis'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 75,
    //              edad_final: 84,
    //              categoria: 'Adulto mayor',
    //              descripcion:
    //                'Envejecimiento acelerado. Disminución significativa de la capacidad física y mental. Mayor riesgo de enfermedades.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Mamografía',
    //                'Colonoscopia',
    //                'Prueba de osteoporosis',
    //                'Prueba de equilibrio y marcha',
    //                'Evaluación cognitiva'
    //              ],
    //              consejos_de_salud: [
    //                'Mantener una dieta saludable y equilibrada.',
    //                'Realizar ejercicio físico regular, adaptado a las capacidades de cada persona.',
    //                'Mantener una vida social activa.',
    //                'Realizar actividades que estimulen la mente.',
    //                'Vacunarse contra la gripe y la neumonía.',
    //                'Tomar los medicamentos necesarios para controlar las enfermedades crónicas.',
    //                'Realizar visitas regulares al médico.'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 85,
    //              edad_final: 99,
    //              categoria: 'Adulto mayor en edad avanzada',
    //              descripcion:
    //                'Fragilidad física y mental. Mayor necesidad de ayuda para las actividades básicas de la vida diaria.',
    //              examenes_medicos_recomendados: [
    //                'Examen físico anual',
    //                'Control del peso y la talla',
    //                'Examen dental',
    //                'Examen de la vista',
    //                'Prueba de detección de ETS (si es sexualmente activo)',
    //                'Mamografía',
    //                'Colonoscopia',
    //                'Prueba de osteoporosis',
    //                'Prueba de equilibrio y marcha',
    //                'Evaluación cognitiva',
    //                'Evaluación funcional'
    //              ],
    //              consejos_de_salud: [
    //                'Mantener una dieta saludable y equilibrada.',
    //                'Realizar ejercicio físico regular, adaptado a las capacidades de cada persona.',
    //                'Mantener una vida social activa.',
    //                'Realizar actividades que estimulen la mente.',
    //                'Vacunarse contra la gripe y la neumonía.',
    //                'Tomar los medicamentos necesarios para controlar las enfermedades crónicas.',
    //                'Realizar visitas regulares al médico.',
    //                'Recibir apoyo familiar y social.'
    //              ]
    //            },
    //            {
    //              genero: 'M',
    //              edad_inicial: 100,
    //              categoria: 'Centenaria',
    //              descripcion:
    //                'Supervivencia excepcional. Disminución significativa de la capacidad física y mental. Gran necesidad de ayuda para las actividades básicas de la vida diaria.',
    //              examenes_medicos_recomendados: [
    //                'Evaluación médica individualizada',
    //                'Control del peso y la talla',
    //                'Evaluación funcional',
    //                'Evaluación cognitiva'
    //              ],
    //              consejos_de_salud: [
    //                'Mantener una dieta saludable y equilibrada.',
    //                'Realizar ejercicio físico adaptado a las capacidades de cada persona.',
    //                'Mantener una vida social activa.',
    //                'Realizar actividades que estimulen la mente.',
    //                'Vacunarse contra la gripe y la neumonía.',
    //                'Tomar los medicamentos necesarios para controlar las enfermedades crónicas.',
    //                'Realizar visitas regulares al médico.',
    //                'Recibir apoyo familiar y social.'
    //              ]
    //            }
    //          ],
    //          default: null,
    //          visibility: true,
    //          required: false,
    //          ficha_grupo_id: 6,
    //          createdAt: '2024-02-07T18:45:58.453Z',
    //          updatedAt: '2024-02-07T18:45:58.453Z',
    //          value: null
    //        }
    //      ]
    //    }
    //  ]
    //});
    return this.http.get(this.apiUrl + '/ficha/obtenerJson/' + id.toString());
  }

  public crearGrupo(data: { title: string; ficha_tipo_id: number }) {
    return this.http.post(this.apiUrl + '/ficha/grupo_nuevo', data);
  }
}
