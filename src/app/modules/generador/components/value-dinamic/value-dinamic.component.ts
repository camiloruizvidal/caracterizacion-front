import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EValidation,
  IDynamicValue,
  IFamilyCard,
  IStepers
} from '../../interfaces/interface';

@Component({
  selector: 'app-value-dinamic',
  templateUrl: './value-dinamic.component.html',
  styleUrls: ['./value-dinamic.component.scss']
})
export class ValueDinamicComponent {
  dynamicForm: FormGroup;
  public tiposFicha: string[] = ['familyCard', 'personCard'];

  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({
      mensaje: ['', Validators.required],
      validation: ['', Validators.required],
      inputs: this.fb.array([])
    });
    
    const inputGroup = this.fb.group({
      tipo: [''], // FormControl para el tipo seleccionado
      input: [''], // FormControl para el input
      value: ['']  // FormControl para el value
    });

    this.inputs.push(inputGroup);
  }

  ngOnInit(): void {
    this.setInitialValues();
  }

  get inputs(): FormArray {
    return this.dynamicForm.get('inputs') as FormArray;
  }

  private setInitialValues(): void {
    const initialData: IDynamicValue = {
      mensaje: 'Riesgo por falta de actividad fisica',
      validation: EValidation.And,
      inputs: [
        { input: 'tieneCarro', value: 'Sí' },
        { input: 'haceEjercicio', value: 'No' }
      ]
    };

    this.dynamicForm.patchValue({
      mensaje: initialData.mensaje,
      validation: initialData.validation
    });

    initialData.inputs.forEach(inputData => {
      this.inputs.push(
        this.fb.group({
          input: [inputData.input, Validators.required],
          value: [inputData.value, Validators.required]
        })
      );
    });
  }

  addInput(): void {
    this.inputs.push(
      this.fb.group({
        input: ['', Validators.required],
        value: ['', Validators.required]
      })
    );
  }

  removeInput(index: number): void {
    this.inputs.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.dynamicForm.value);
  }

  getCardInputs(event: any): IStepers[] {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log({ selectedValue });
    return selectedValue === 'familyCard'
      ? this.jsonTest.familyCard
      : this.jsonTest.personCard;
  }

  onTipoChange(event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedValue = target.value;
      // Actualizar el valor del input correspondiente
      this.inputs.at(index).get('input')?.patchValue(selectedValue);
    }
  }

  get jsonTest(): IFamilyCard {
    return {
      isFinish: true,
      version: '1',
      dateLastVersion: new Date('2024-04-14T16:57:43.763Z'),
      familyCard: [
        {
          id: 21,
          title: 'INFORMACIÓN GENERAL',
          subtitle: null,
          orden: 0,
          ficha_tipo_id: 1,
          createdAt: '2024-04-14T16:58:35.188Z',
          updatedAt: '2024-04-14T16:58:35.188Z',
          values: [
            {
              label: '1.Departamento*',
              type: 'select',
              options: [
                { value: '05', option: 'Antioquia' },
                { value: '08', option: 'Atlántico' },
                { value: '11', option: 'Bogotá D.C.' },
                { value: '13', option: 'Bolívar' },
                { value: '15', option: 'Boyacá' },
                { value: '17', option: 'Caldas' },
                { value: '18', option: 'Caquetá' },
                { value: '19', option: 'Cauca' },
                { value: '20', option: 'Cesar' },
                { value: '23', option: 'Córdoba' },
                { value: '25', option: 'Cundinamarca' },
                { value: '27', option: 'Chocó' },
                { value: '41', option: 'Huila' },
                { value: '44', option: 'La Guajira' },
                { value: '47', option: 'Magdalena' },
                { value: '50', option: 'Meta' },
                { value: '52', option: 'Nariño' },
                { value: '54', option: 'Norte de Santander' },
                { value: '63', option: 'Quindío' },
                { value: '66', option: 'Risaralda' },
                { value: '68', option: 'Santander' },
                { value: '70', option: 'Sucre' },
                { value: '73', option: 'Tolima' },
                { value: '76', option: 'Valle del Cauca' },
                { value: '81', option: 'Arauca' },
                { value: '85', option: 'Casanare' },
                { value: '86', option: 'Putumayo' },
                {
                  value: '88',
                  option:
                    'Archipiélago de San Andrés, Providencia y Santa Catalina'
                },
                { value: '91', option: 'Amazonas' },
                { value: '94', option: 'Guainía' },
                { value: '95', option: 'Guaviare' },
                { value: '97', option: 'Vaupés' },
                { value: '99', option: 'Vichada' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '1.departamento*-8964b470-2101-485f-b4e1-db8e3f62d3df',
              value: null,
              orden: 0
            },
            {
              label:
                '2.Unidad Zonal de Planeación y Evaluación - Regional - Provincia*',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '2.unidad_zonal_de_planeacion_y_evaluacion_-_regional_-_provincia*-234f4516-8016-47ed-8cca-1e89f7aca7a3',
              value: null,
              orden: 1
            },
            {
              label:
                '1.1 Datos generales del escenario del entorno que se caracteriza',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '1.1_datos_generales_del_escenario_del_entorno_que_se_caracteriza_-d4792cc9-96df-4e89-b538-c82b61a20c00',
              value: null,
              orden: 2
            },
            {
              label: '3.Municipio / Área no municipalizada*',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '3.municipio_/_area_no_municipalizada*-081d067f-fc8c-4299-ae39-cd1d0995ad3c',
              value: null,
              orden: 3
            },
            {
              label: '4.Territorio*',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName: '4.territorio*-30ed43ca-93b7-46fb-9dff-5f0d94f6b34f',
              value: null,
              orden: 4
            },
            {
              label: '5.Microterritorio*',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '5.microterritorio*-30c82e44-b6b2-467a-8bbb-c1bbe6869ea8',
              value: null,
              orden: 5
            },
            {
              label:
                '6.Corregimiento / Centro de poblado / Vereda / Localidad/ Barrio/ Resguardo Indigena*',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '6.corregimiento_/_centro_de_poblado_/_vereda_/_localidad/_barrio/_resguardo_indigena*_-852cbccb-7c64-40ff-9334-4d0b968c2231',
              value: null,
              orden: 6
            },
            {
              label: '7.Dirección',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName: '7.direccion_-2613aba8-7ac3-42d3-b469-cf702e61f947',
              value: null,
              orden: 7
            },
            {
              label: '8.Geopunto (online-offline)',
              type: 'gps',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '8.geopunto_(online-offline)_-8daf81ee-1161-4502-ad7c-76a1f5dddfd2',
              value: null,
              orden: 8
            },
            {
              label:
                '9.Ubicación del hogar (cuando no se cuenta con nomenclatura, punto de referencia)',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '9.ubicacion_del_hogar_(cuando_no_se_cuenta_con_nomenclatura,_punto_de_referencia)_-ff7ddf92-f6f6-492b-9d3f-0f59c00371c6',
              value: null,
              orden: 9
            },
            {
              label: '10.Número de Identificación de la familia*',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '10.numero_de_identificacion_de_la_familia*_-df3f1283-9b8a-4cb6-991e-4d6c03fe0a8d',
              value: null,
              orden: 10
            },
            {
              label: '11.Estrato socioeconómico de la vivienda*',
              type: 'select',
              options: [
                { value: '1', option: 'Bajo-bajo' },
                { value: '2', option: 'Bajo' },
                { value: '3', option: 'Medio-bajo' },
                { value: '4', option: 'Medio' },
                { value: '5', option: 'Medio-alto' },
                { value: '6', option: 'Alto' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '11.estrato_socioeconomico_de_la_vivienda*_-3874e9cc-a020-4e69-b3c4-e1cb9f161be2',
              value: null,
              orden: 11
            },
            {
              label: '12.Número de hogares en la vivienda*',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '12.numero_de_hogares_en_la_vivienda*-b909c583-7901-4c83-90a4-a847e9e3e0b2',
              value: null,
              orden: 12
            },
            {
              label: '13.Número de familias en la vivienda*',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '13.numero_de_familias_en_la_vivienda*-93f89fcf-f247-4700-add0-f219e80badf6',
              value: null,
              orden: 13
            },
            {
              label: '14.Número de personas en la vivienda*',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '14.numero_de_personas_en_la_vivienda*-eb24070e-f1f9-4050-9362-48c9dffb853a',
              value: null,
              orden: 14
            },
            {
              label: '1.2 Identificación del encuestador',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '1.2_identificacion_del_encuestador-06aa1ad7-87ea-41e8-aeab-1dff93a5701f',
              value: null,
              orden: 15
            },
            {
              label:
                '15.Número de identificación del Equipo Básico de Salud (EBS)*',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '15.numero_de_identificacion_del_equipo_basico_de_salud_(ebs)*_-89064271-1801-4a6a-9834-29e0354b1b7a',
              value: null,
              orden: 16
            },
            {
              label:
                '16.Prestador primario / Organismo de adscripción del EBS*',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '16.prestador_primario_/_organismo_de_adscripcion_del_ebs*-c0e6f069-c3bb-40b5-83c1-5a239004c2b0',
              value: null,
              orden: 17
            },
            {
              label:
                '17.Número de identificación del responsable de la evaluación de necesidades en salud - caracterización*',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '17.numero_de_identificacion_del_responsable_de_la_evaluacion_de_necesidades_en_salud_-_caracterizacion*_-a832dc61-6fcb-46f7-9b5d-0c661a0cbbb6',
              value: null,
              orden: 18
            },
            {
              label:
                '18.Perfil de quien realiza la evaluación de necesidades en salud - caracterización*',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '18.perfil_de_quien_realiza_la_evaluacion_de_necesidades_en_salud_-_caracterizacion*-f7537c28-e07b-4e08-baf3-f1d0a73d0327',
              value: null,
              orden: 19
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-619baad4-fc47-4055-affc-4b78e31bf4f8',
              value: null,
              orden: 20
            }
          ]
        },
        {
          id: 27,
          title: 'CARACTERIZACIÓN FAMILIA',
          subtitle: null,
          orden: 1,
          ficha_tipo_id: 1,
          createdAt: '2024-04-14T17:10:55.874Z',
          updatedAt: '2024-04-14T17:10:55.874Z',
          values: [
            {
              label: '2.1 Estructura y contexto familiar',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '2.1_estructura_y_contexto_familiar_-f9138e62-7d57-4ec5-acfb-75b7b058bd59',
              value: null,
              orden: 0
            },
            {
              label: '21.Tipo Familia',
              type: 'select',
              options: [
                { value: '1', option: 'Nuclear biparental' },
                { value: '2', option: 'Nuclear monoparental' },
                { value: '3', option: 'Extenso biparental' },
                { value: '4', option: 'Extenso monoparental' },
                { value: '5', option: 'Compuesto biparental' },
                { value: '6', option: 'Compuesto monoparental' },
                { value: '7', option: 'Unipersonal' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName:
                '21.tipo_familia_-135b4aa0-7e2e-4886-8c4f-bf094d956437',
              value: null,
              orden: 1
            },
            {
              label: '22.Número de personas que conforman la familia',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '22.numero_de_personas_que_conforman_la_familia-cdbaad20-6bce-4cf4-932f-c98d04546bf8',
              value: null,
              orden: 2
            },
            {
              label: '24.Funcionalidad de la familia (Apgar familiar)',
              type: 'select',
              options: [
                { value: '1', option: 'Normal' },
                { value: '2', option: 'Disfunción leve' },
                { value: '3', option: 'Disfunción moderada' },
                { value: '4', option: 'Disfunción severa' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName:
                '24.funcionalidad_de_la_familia_(apgar_familiar)_-2f54db69-7915-4d53-9baf-20f40d250497',
              value: null,
              orden: 3
            },
            {
              label:
                '25.En la familia se identifica un cuidador principal de niños, niñas, persona con discapacidad, adulto mayor o enfermedad?',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '25.en_la_familia_se_identifica_un_cuidador_principal_de_ninos,_ninas,_persona_con_discapacidad,_adulto_mayor_o_enfermedad?_-58eea39b-804b-4031-956d-3af33530d429',
              value: null,
              orden: 4
            },
            {
              label:
                '26.Si la respuesta anterior es SI aplicar escala ZARIT y registre aquí el resultado - puntaje para determinar si se requiere intervención individual o familiar',
              type: 'select',
              options: [
                { value: '1', option: 'Ausencia de sobrecarga (≤ 46)' },
                { value: '2', option: 'Sobrecarga ligera (47-55)' },
                { value: '3', option: 'Sobrecarga intensa (≥ 56)' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '26.si_la_respuesta_anterior_es_si_aplicar_escala_zarit_y_registre_aqui_el_resultado_-_puntaje_para_determinar_si_se_requiere_intervencion_individual_o_familiar_-6b3fc540-abf6-4342-8f90-0a9c061bc009',
              value: null,
              orden: 5
            },
            {
              label:
                '27.Interrelaciones de la familia con el contexto socio cultural (diligenciar ECOMAPA)',
              type: 'select',
              options: [
                { value: '1', option: 'Positivo' },
                { value: '2', option: 'Tenue' },
                { value: '3', option: 'Estresante' },
                { value: '4', option: 'Fluye' },
                { value: '5', option: 'Intenso' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '27.interrelaciones_de_la_familia_con_el_contexto_socio_cultural_(diligenciar_ecomapa)_-527d0323-7963-4b1b-b71c-b2ede7cb12d9',
              value: null,
              orden: 6
            },
            {
              label:
                '2.2 Situaciones o condiciones de especial protección de la familia y sus integrantes',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '2.2_situaciones_o_condiciones_de_especial_proteccion_de_la_familia_y_sus_integrantes-8cf83a00-95a2-4819-97cd-54969551d5b1',
              value: null,
              orden: 7
            },
            {
              label: '28.Familia con niñas, niños y adolescentes',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '28.familia_con_ninas,_ninos_y_adolescentes_-d646a60e-676c-4a44-8be0-803ef9782fee',
              value: null,
              orden: 8
            },
            {
              label: '29.Gestante en la familia',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '29.gestante_en_la_familia-6f1b5ebe-8b3d-4e27-b60d-44cfd2af343c',
              value: null,
              orden: 9
            },
            {
              label: '30.Familia con personas adultos mayores',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '30.familia_con_personas_adultos_mayores_-2c5e3412-a3eb-4b7a-8ccb-0f38d3b32e59',
              value: null,
              orden: 10
            },
            {
              label: '31.Familia víctima del conflicto armado',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '31.familia_victima_del_conflicto_armado-dd1f1428-49ee-4ccb-a825-5fb383a53be8',
              value: null,
              orden: 11
            },
            {
              label: '32.Familia que conviven con personas con discapacidad',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '32.familia_que_conviven_con_personas_con_discapacidad_-6e4e0d9a-7440-40d9-a046-8303e66c41b6',
              value: null,
              orden: 12
            },
            {
              label:
                '33.Familia que conviven con personas que presentan alguna enfermedad crónica, huérfana o en estado terminal',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '33.familia_que_conviven_con_personas_que_presentan_alguna_enfermedad_cronica,_huerfana_o_en_estado_terminal_-4a0be05b-d3a5-47e1-9f0f-219d3c936a1f',
              value: null,
              orden: 13
            },
            {
              label:
                '34.Familia que convive con persona que presentan alguna enfermedad transmisible: TB, - Lepra Escabiosis, enfermedades infecciosas de la piel u otras, Malaria, Dengue, Chagas, Hepatisis A, Alguna enfermedad inmunoprevenible ( Varicela- Parotiditis, otra)',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '34.familia_que_convive_con_persona_que_presentan_alguna_enfermedad_transmisible:_tb,_-_lepra_escabiosis,_enfermedades_infecciosas_de_la_piel_u_otras,_malaria,_dengue,_chagas,_hepatisis_a,_alguna_enfermedad_inmunoprevenible_(_varicela-_parotiditis,_otra)_-7f1685bc-20c6-4b9b-9950-68887a1b8bb3',
              value: null,
              orden: 14
            },
            {
              label:
                '35.Familia con vivencia de sucesos vitales normativos y no normativos ( Eventos significativos que inciden de manera positiva o negativa en la persona y familia por ejemplo: Ingreso de niños estudiar, muerte familiar, accidente que genera discapacidad, separación pareja, entre otros) *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '35.familia_con_vivencia_de_sucesos_vitales_normativos_y_no_normativos_(_eventos_significativos_que_inciden_de_manera_positiva_o_negativa_en_la_persona_y_familia_por_ejemplo:_ingreso_de_ninos_estudiar,_muerte_familiar,_accidente_que_genera_discapacidad,_separacion_pareja,_entre_otros)_*_-2febb3b2-9e69-4a6c-b89b-69f09b54b884',
              value: null,
              orden: 15
            },
            {
              label:
                '36.Familia en situación de vulnerabilidad social (Consumo de SPA - Alcohol, explotación sexual, trabajo infantil, conflictos interpersonales, violencia intrafamiliar, trastorno mental, entre otras) ? *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '36.familia_en_situacion_de_vulnerabilidad_social_(consumo_de_spa_-_alcohol,_explotacion_sexual,_trabajo_infantil,_conflictos_interpersonales,_violencia_intrafamiliar,_trastorno_mental,_entre_otras)_?_*_-18e932fa-fac2-47fb-8f01-c782d7eee2b7',
              value: null,
              orden: 16
            },
            {
              label:
                '37.Familias con prácticas de cuidado de salud críticas de varios de sus integrantes que ponen en riesgo o han afectado en la salud (Hábitos alimentarios, situaciones de abandono)*',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '37.familias_con_practicas_de_cuidado_de_salud_criticas_de_varios_de_sus_integrantes_que_ponen_en_riesgo_o_han_afectado_en_la_salud_(habitos_alimentarios,_situaciones_de_abandono)*_-f0210364-97d1-4e82-a33c-51b521516047',
              value: null,
              orden: 17
            },
            {
              label:
                '38.Familia con integrantes con antecedentes de Ca, HTA, Diabetes, Asma, Enfermedad cardiaca, otra *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '38.familia_con_integrantes_con_antecedentes_de_ca,_hta,_diabetes,_asma,_enfermedad_cardiaca,_otra_*_-96f50b6d-5535-4005-b850-6f3556d17be4',
              value: null,
              orden: 18
            },
            {
              label: '¿Cuál(es)?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual(es)?_-158724d6-f3c0-4e96-a389-1ff5e410e824',
              value: null,
              orden: 19
            },
            {
              label: '39.Cómo obtiene sus alimentos *',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '39.como_obtiene_sus_alimentos_*_-5648a604-2425-47e0-b9b0-b0f0e5951788',
              value: null,
              orden: 20
            },
            {
              label: 'Fuente',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: 'fuente-6b980104-faaa-4460-ad9d-aecf40836ce1',
              value: null,
              orden: 21
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-0fe30ce0-cd0d-4a0c-8413-b5109271054e',
              value: null,
              orden: 22
            },
            {
              label:
                '2.3 Prácticas o condiciones protectoras para el cuidado de la salud predominantes en la familia',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '2.3_practicas_o_condiciones_protectoras_para_el_cuidado_de_la_salud_predominantes_en_la_familia_-e17d36a8-d439-4353-9da7-badb4ac3f7c2',
              value: null,
              orden: 23
            },
            {
              label:
                '40.Hábitos de vida saludable adaptado a las condiciones contextuales y culturales de la familia y sus integrantes. *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '40.habitos_de_vida_saludable_adaptado_a_las_condiciones_contextuales_y_culturales_de_la_familia_y_sus_integrantes._*-10f99e13-45cf-4813-b2b9-ac0bc9478d14',
              value: null,
              orden: 24
            },
            {
              label:
                '41.Recursos socioemocionales que potencian el cuidado de la salud de la familia *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '41.recursos_socioemocionales_que_potencian_el_cuidado_de_la_salud_de_la_familia_*_-c524ff2d-c975-47ea-90f0-bf72406c7795',
              value: null,
              orden: 25
            },
            {
              label:
                '42.Prácticas para el cuidado y protección de los entornos *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '42.practicas_para_el_cuidado_y_proteccion_de_los_entornos_*_-48740c09-397f-4ba2-b59e-b544325d1e2a',
              value: null,
              orden: 26
            },
            {
              label:
                '43.Prácticas de favorecen el establecimiento de relaciones sanas y constructivas *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '43.practicas_de_favorecen_el_establecimiento_de_relaciones_sanas_y_constructivas_*-2c713233-ae2c-4865-a88c-5738162204a6',
              value: null,
              orden: 27
            },
            {
              label:
                '44.Recursos sociales y comunitarios para el establecimiento de redes colectivas para la promoción de la salud. *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '44.recursos_sociales_y_comunitarios_para_el_establecimiento_de_redes_colectivas_para_la_promocion_de_la_salud._*_-fa89fe7e-c6e3-4633-bc0d-b907bb3bff72',
              value: null,
              orden: 28
            },
            {
              label:
                '45.Prácticas para la conservación de la autonomía y la capacidad funcional de las personas mayores. *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '45.practicas_para_la_conservacion_de_la_autonomia_y_la_capacidad_funcional_de_las_personas_mayores._*-8ff8b1b5-0dd2-4b16-8cb8-40fa87682182',
              value: null,
              orden: 29
            },
            {
              label:
                '46.Prácticas para la prevención de enfermedades en todas las edades. *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '46.practicas_para_la_prevencion_de_enfermedades_en_todas_las_edades._*_-25545a00-6c3f-4fb0-a25e-8ee26fe4a55a',
              value: null,
              orden: 30
            },
            {
              label:
                '47.Prácticas de cuidado desde los saberes ancestrales/tradicionales (aplica para poblaciones y comunidades indígenas, negras afrocolombianas, raizales, palenqueras y rom) *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '47.practicas_de_cuidado_desde_los_saberes_ancestrales/tradicionales_(aplica_para_poblaciones_y_comunidades_indigenas,_negras_afrocolombianas,_raizales,_palenqueras_y_rom)_*_-a73c3e4c-aa06-4551-a511-839e919c72cd',
              value: null,
              orden: 31
            },
            {
              label:
                '48.Capacidades de las familias para el ejercicio y exigibilidad del derecho a la salud *',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '48.capacidades_de_las_familias_para_el_ejercicio_y_exigibilidad_del_derecho_a_la_salud_*_-099a9998-d22a-4001-906f-2eb19533fe59',
              value: null,
              orden: 32
            }
          ]
        },
        {
          id: 29,
          title: 'CARACTERIZACIÓN DEL ENTORNO',
          subtitle: null,
          orden: 2,
          ficha_tipo_id: 1,
          createdAt: '2024-04-15T01:22:30.490Z',
          updatedAt: '2024-04-15T01:22:30.490Z',
          values: [
            {
              label:
                '4.1 Características y condiciones del entorno y de la vivienda',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '4.1_caracteristicas_y_condiciones_del_entorno_y_de_la_vivienda_-99185c9f-2f75-4b19-b75b-895761936a27',
              value: null,
              orden: 0
            },
            {
              label: '82.Tipo de vivienda',
              type: 'select',
              options: [
                { value: '1', option: 'Casa' },
                { value: '2', option: 'Casa Indígena' },
                { value: '3', option: 'Carpa' },
                { value: '4', option: 'Apartamento' },
                { value: '5', option: 'Pieza/ Cuarto en Inquilinato' },
                { value: '6', option: 'Contenedor' },
                { value: '7', option: 'Embarcación' },
                { value: '8', option: 'Vagón' },
                { value: '9', option: 'Refugio Natural' },
                { value: '10', option: 'Cueva' },
                { value: '11', option: 'Puente' },
                { value: '12', option: 'Otro' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName:
                '82.tipo_de_vivienda_-c6f7e604-0260-4fc6-9dec-f19f8bb4a474',
              value: null,
              orden: 1
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-8e88920e-519c-40e8-8c8f-203eb2e55105',
              value: null,
              orden: 2
            },
            {
              label:
                '83.¿Cuál es el material predominante de las paredes? (señale una sola opción)',
              type: 'select',
              options: [
                {
                  value: '1',
                  option: 'Bloque, ladrillo, piedra, madera pulida'
                },
                { value: '2', option: 'Tapia pisada, adobe' },
                { value: '3', option: 'Bahareque' },
                { value: '4', option: 'Material prefabricado' },
                { value: '5', option: 'Madera burda, tabla, tablón' },
                {
                  value: '6',
                  option: 'Guadua, caña, esterilla, otro vegetal'
                },
                {
                  value: '7',
                  option: 'Zinc, tela, lona, cartón, latas, desechos, plástico'
                },
                { value: '8', option: 'Otro' },
                { value: '0', option: 'Sin paredes' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName:
                '83.¿cual_es_el_material_predominante_de_las_paredes?_(senale_una_sola_opcion)_-ae2576ed-a78f-4404-99d0-4dceeab8e08b',
              value: null,
              orden: 3
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName: '¿cual?_-d9fd5d8b-56f2-40ff-9384-6cd9d1ba0ccc',
              value: null,
              orden: 4
            },
            {
              label:
                '86.¿De cuántos cuartos o piezas dormitorio dispone esta vivienda?',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '86.¿de_cuantos_cuartos_o_piezas_dormitorio_dispone_esta_vivienda?_-5e47aa1b-fd68-4e8f-91d1-3ceca938384f',
              value: null,
              orden: 5
            },
            {
              label: '87.Hacinamiento',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '87.hacinamiento_-65ac5e65-99bf-4ccc-a7d4-0c2039bde5ab',
              value: null,
              orden: 6
            },
            {
              label:
                '88.Se identifican algunos de los siguientes escenarios de riesgo de accidente en la vivienda',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '88.se_identifican_algunos_de_los_siguientes_escenarios_de_riesgo_de_accidente_en_la_vivienda_-d424adba-3fce-4405-be09-f8795ec9bf1d',
              value: null,
              orden: 7
            },
            {
              label: '89.Desde la vivienda se puede acceder fácilmente a:',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '89.desde_la_vivienda_se_puede_acceder_facilmente_a:_-4c0c6fe8-6f3e-40d9-8eb1-5c68e7fa92c1',
              value: null,
              orden: 8
            },
            {
              label:
                '90.¿Cuál fuente de energía o combustible se usa para cocinar? (puede señalar varias opciones)',
              type: 'select_multiple',
              options: [],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '90.¿cual_fuente_de_energia_o_combustible_se_usa_para_cocinar?_(puede_senalar_varias_opciones)_-28682052-31f6-4408-9c0e-d4675471b368',
              value: null,
              orden: 9
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-c794f284-c67c-40c8-8dec-083e285ae42e',
              value: null,
              orden: 10
            },
            {
              label:
                '91.¿Se observa cerca de la vivienda o dentro de ellas criaderos o reservorios que pueden favorecer la presencia de vectores transmisores de enfermedades?',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '91.¿se_observa_cerca_de_la_vivienda_o_dentro_de_ellas_criaderos_o_reservorios_que_pueden_favorecer_la_presencia_de_vectores_transmisores_de_enfermedades?_-be73b0bc-e23f-435f-a2d4-641a7aafc7d0',
              value: null,
              orden: 11
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-e40b9f7f-d4e7-4b89-b33d-e281bbcc6873',
              value: null,
              orden: 12
            },
            {
              label:
                '92.Observe si cerca de la vivienda hay alguno de los siguientes:',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '92.observe_si_cerca_de_la_vivienda_hay_alguno_de_los_siguientes:_-9dfb4e90-a3d1-4176-888b-1ba6ba86e6e0',
              value: null,
              orden: 13
            },
            {
              label: 'Ambientes',
              type: 'select_multiple',
              options: [
                { value: '1', option: 'Cultivos' },
                { value: '2', option: 'Apriscos' },
                { value: '3', option: 'Porquerizas' },
                { value: '4', option: 'Galpones' },
                { value: '5', option: 'Terrenos baldíos' },
                {
                  value: '6',
                  option:
                    'Presencia de Plagas: roedores, cucarachas, zancudos, moscas, etc.'
                },
                { value: '7', option: 'Ruido o sonidos desagradables' },
                { value: '8', option: 'Malos olores' },
                {
                  value: '9',
                  option: 'Sitios satélites de disposición de excretas'
                },
                { value: '10', option: 'Rellenos sanitarios/botaderos' },
                {
                  value: '11',
                  option:
                    'Industrias Contaminantes (del sector energético, minero, transporte, construcción, manufacturera, entre otros)'
                },
                { value: '12', option: 'Contaminación visual' },
                { value: '13', option: 'Río o quebrada' },
                {
                  value: '14',
                  option: 'Planta de tratamiento de agua residual'
                },
                { value: '15', option: 'Extracción minera' },
                { value: '16', option: 'Canales de agua lluvia' },
                { value: '17', option: 'Vías de tráfico vehicular' },
                { value: '18', option: 'Quemas a cielo abierto' },
                { value: '19', option: 'Otro' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName: 'ambientes_-2684d47e-f53a-49ec-8be7-500e8402e38e',
              value: null,
              orden: 14
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-d3ea1cc4-8a3b-4310-9a54-91db57870ad9',
              value: null,
              orden: 15
            },
            {
              label:
                '93.¿Al interior de la vivienda se realiza alguna actividad económica?',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '93.¿al_interior_de_la_vivienda_se_realiza_alguna_actividad_economica?-6226d998-b5ff-4757-bf82-78f56d682529',
              value: null,
              orden: 16
            },
            {
              label:
                '94.Señale los animales que conviven con la familia dentro de la vivienda o en su entorno inmediato. En el campo ¿Cuál? indique la cantidad.',
              type: 'select',
              options: [
                { value: '1', option: 'Perros' },
                { value: '2', option: 'Gato' },
                { value: '3', option: 'Porcinos' },
                { value: '4', option: 'Bóvidos: Búfalos, vacas, toros' },
                {
                  value: '5',
                  option: 'Equidos: Asnos, mulas, caballos, burros'
                },
                { value: '6', option: 'Ovinos / Caprinos' },
                { value: '7', option: 'Aves de producción' },
                { value: '8', option: 'Aves ornamentales' },
                { value: '9', option: 'Peces ornamentales, hamsters' },
                { value: '10', option: 'Cobayos, conejos' },
                { value: '11', option: 'Animales silvestres' },
                { value: '12', option: 'Otro' }
              ],
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '94.senale_los_animales_que_conviven_con_la_familia_dentro_de_la_vivienda_o_en_su_entorno_inmediato._en_el_campo_¿cual?_indique_la_cantidad._-2f4c4d9d-ec38-4d23-b417-dd1ccb584578',
              value: null,
              orden: 17
            },
            {
              label: '¿Cuál?',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-451e7a9a-f571-41b5-a3f5-ec821b2619fa',
              value: null,
              orden: 18
            },
            {
              label: '4.3 Agua y saneamiento básico',
              type: 'subtitle',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '4.3_agua_y_saneamiento_basico_-f2accf11-ef52-4252-a5e2-626265652746',
              value: null,
              orden: 19
            },
            {
              label:
                '95.¿Cuál es la principal fuente de abastecimiento de agua para consumo humano en la vivienda?',
              type: 'select',
              options: [],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '95.¿cual_es_la_principal_fuente_de_abastecimiento_de_agua_para_consumo_humano_en_la_vivienda?_-ba539d79-7368-49b7-9d3e-96cbeeec1e09',
              value: null,
              orden: 20
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-ed23f940-379c-4232-ac1c-e8a5121f9741',
              value: null,
              orden: 21
            },
            {
              label:
                '96.¿Cuál es el sistema de disposición de excretas en la vivienda?',
              type: 'select',
              options: [
                {
                  value: '1',
                  option: 'Acueducto administrado por empresa prestadora (ESP)'
                },
                { value: '2', option: 'Agua embotellada o en bolsa' },
                { value: '3', option: 'Acueducto veredal o comunitario' },
                { value: '4', option: 'Pila pública' },
                { value: '5', option: 'Carro tanque' },
                { value: '6', option: 'Abasto con distribución comunitaria' },
                { value: '7', option: 'Pozo con bomba' },
                {
                  value: '8',
                  option: 'Pozo sin bomba, aljibe, jagüey o barreno'
                },
                { value: '9', option: 'Laguna o jagüey' },
                {
                  value: '10',
                  option: 'Río, quebrada, manantial o nacimiento'
                },
                { value: '11', option: 'Aguas lluvias' },
                { value: '12', option: 'Aguatero' },
                { value: '13', option: 'Otro' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName:
                '96.¿cual_es_el_sistema_de_disposicion_de_excretas_en_la_vivienda?_-f9339789-73ac-4fcc-a2f7-f19a9be80ee0',
              value: null,
              orden: 22
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-8c4af154-7902-41e6-9a46-2a518617fc39',
              value: null,
              orden: 23
            },
            {
              label:
                '97.¿Cuál es el sistema de disposición de aguas residuales domésticas en la vivienda?',
              type: 'select',
              options: [
                { value: '1', option: 'Alcantarillado' },
                { value: '2', option: 'Pozo séptico' },
                { value: '3', option: 'Campo de oxidación' },
                { value: '4', option: 'Biofiltro' },
                { value: '5', option: 'Fuente hídrica' },
                { value: '6', option: 'Campo abierto' },
                { value: '7', option: 'Otro' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName:
                '97.¿cual_es_el_sistema_de_disposicion_de_aguas_residuales_domesticas_en_la_vivienda?_-72e121f9-0fc3-4bb9-b2b5-247e2e9a586b',
              value: null,
              orden: 24
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-1f99db76-77d3-4b57-a696-70e533091dde',
              value: null,
              orden: 25
            },
            {
              label:
                '98.¿Como se realiza la disposición final de los residuos sólidos ordinarios de la vivienda?',
              type: 'select',
              options: [
                {
                  value: '1',
                  option:
                    'Recolección por parte del servicio de aseo distrital o municipal'
                },
                { value: '2', option: 'Enterramiento' },
                { value: '3', option: 'Quema a campo abierto' },
                {
                  value: '4',
                  option: 'Disposición en fuentes de agua cercana'
                },
                { value: '5', option: 'Disposición a campo abierto' },
                { value: '6', option: 'Otro' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName:
                '98.¿como_se_realiza_la_disposicion_final_de_los_residuos_solidos_ordinarios_de_la_vivienda?_-70894a0c-8ded-413c-9f1a-d918c2693fc3',
              value: null,
              orden: 26
            },
            {
              label: '¿Cuál?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cual?_-c23f782d-6b3a-4417-b494-094c7ff085c4',
              value: null,
              orden: 27
            }
          ]
        }
      ],
      personCard: [
        {
          id: 33,
          title: '3.1 Identificación de cada uno de los integrantes',
          subtitle: null,
          orden: 0,
          ficha_tipo_id: 2,
          createdAt: '2024-04-15T02:18:43.011Z',
          updatedAt: '2024-04-15T02:18:43.011Z',
          values: [
            {
              label: '49.Primer Nombre',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '49.primer_nombre-ffa1f966-a3c7-4f62-9301-347c44a30ff3',
              value: null,
              orden: 0
            },
            {
              label: '50.Segundo Nombre',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '50.segundo_nombre-961f05e6-8120-4477-bf39-f1557a1f316e',
              value: null,
              orden: 1
            },
            {
              label: '51.Primer Apellido',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: true,
              columnName:
                '51.primer_apellido-eecf6f54-33fa-4fca-90a7-313a9a146947',
              value: null,
              orden: 2
            },
            {
              label: '52.Segundo Apellido',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '52.segundo_apellido-0c9e14b7-5f3d-4ccb-a9fc-f35c5dce54e1',
              value: null,
              orden: 3
            },
            {
              label: '53.Tipo de identificación',
              type: 'select',
              options: [
                { value: 'AS', option: 'Adulto sin identificación' },
                { value: 'CC', option: 'Cédula de Ciudadanía' },
                { value: 'CD', option: 'Carnet Diplomático' },
                { value: 'CE', option: 'Cédula de Extranjería' },
                { value: 'MS', option: 'Menor sin identificación' },
                { value: 'CN', option: 'Certificado de Nacido Vivo' },
                { value: 'PA', option: 'Pasaporte' },
                { value: 'PE', option: 'Permiso Especial de Permanencia' },
                { value: 'PT', option: 'Permiso por protección temporal' },
                { value: 'RC', option: 'Registro Civil' },
                { value: 'TI', option: 'Tarjeta de Identidad' }
              ],
              default: null,
              visibility: true,
              required: true,
              columnName:
                '53.tipo_de_identificacion-506ec076-a196-4a25-b3bd-ba695ae74b45',
              value: null,
              orden: 4
            },
            {
              label: '54.Número de identificación',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '54.numero_de_identificacion-ecbe7f1f-a22d-4e3b-9860-1e7aab18609d',
              value: null,
              orden: 5
            },
            {
              label: '55.Fecha de Nacimiento',
              type: 'calendar',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '55.fecha_de_nacimiento_-af9f5ff4-757d-40c4-ad13-72add1e8f15e',
              value: null,
              orden: 6
            },
            {
              label: '56.Sexo',
              type: 'select',
              options: [
                { value: '1', option: 'Hombre' },
                { value: '2', option: 'Mujer' },
                { value: '3', option: 'Indeterminado' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName: '56.sexo-99c3dc87-a2c3-4237-814c-3001250bcaf3',
              value: null,
              orden: 7
            },
            {
              label: '57.Rol dentro de la familia',
              type: 'select',
              options: [
                { value: '1', option: 'Jefe(a) de familia' },
                { value: '2', option: 'Cónyuge o compañero(a)' },
                { value: '3', option: 'Hijo(a)' },
                { value: '4', option: 'Hermano(a)' },
                { value: '5', option: 'Padre o madre' },
                { value: '6', option: 'Otros' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '57.rol_dentro_de_la_familia-97f85488-cadf-46c8-9605-5f0ada604d1e',
              value: null,
              orden: 8
            },
            {
              label: '58.Ocupación',
              type: 'select',
              options: [
                {
                  value: '110',
                  option: ' Oficiales de las Fuerzas Militares'
                },
                {
                  value: '210',
                  option: ' Suboficiales de las Fuerzas Militares'
                },
                {
                  value: '310',
                  option: ' Otros miembros de las Fuerzas Militares'
                },
                {
                  value: '1111',
                  option: ' Directores formuladores de políticas y normas'
                },
                { value: '1112', option: ' Directores del gobierno' },
                { value: '1113', option: ' Jefes de comunidades étnicas' },
                {
                  value: '1114',
                  option:
                    ' Dirigentes de organizaciones con un interés específico partidos políticos, sindicatos y organizaciones sociales'
                },
                { value: '1120', option: ' Directores y gerentes generales' },
                { value: '1211', option: ' Directores financieros' },
                { value: '1212', option: ' Directores de recursos humanos' },
                {
                  value: '1213',
                  option: ' Directores de políticas y planificación'
                },
                {
                  value: '1219',
                  option:
                    ' Directores de administración y servicios no clasificados en otros grupos primarios'
                },
                {
                  value: '1221',
                  option: ' Directores de ventas y comercialización'
                },
                {
                  value: '1222',
                  option: ' Directores de publicidad y relaciones públicas'
                },
                {
                  value: '1223',
                  option: ' Directores de investigación y desarrollo'
                },
                {
                  value: '1311',
                  option:
                    ' Directores de producción agropecuaria y silvicultura'
                },
                {
                  value: '1312',
                  option: ' Directores de producción de piscicultura y pesca'
                },
                {
                  value: '1321',
                  option: ' Directores de industrias manufactureras'
                },
                {
                  value: '1322',
                  option: ' Directores de explotaciones de minería'
                },
                {
                  value: '1323',
                  option: ' Directores de empresas de construcción'
                },
                {
                  value: '1324',
                  option:
                    ' Directores de empresas de abastecimiento, distribución y afines'
                },
                {
                  value: '1330',
                  option:
                    ' Directores de servicios de tecnología de la información y las comunicaciones'
                },
                {
                  value: '1341',
                  option: ' Directores de servicios de cuidados infantiles'
                },
                {
                  value: '1342',
                  option: ' Directores de servicios de salud'
                },
                {
                  value: '1343',
                  option:
                    ' Directores de servicios de atención a personas mayores'
                },
                {
                  value: '1344',
                  option: ' Directores de servicios de bienestar social'
                },
                {
                  value: '1345',
                  option: ' Directores de servicios de educación'
                },
                {
                  value: '1346',
                  option:
                    ' Gerentes de sucursales de bancos, de servicios financieros y de seguros'
                },
                {
                  value: '1349',
                  option:
                    ' Directores y gerentes de servicios profesionales no clasificados en otros grupos primarios'
                },
                { value: '1411', option: ' Gerentes de hoteles' },
                { value: '1412', option: ' Gerentes de restaurantes' },
                {
                  value: '1420',
                  option: ' Gerentes de comercios al por mayor y al por menor'
                },
                {
                  value: '1431',
                  option:
                    ' Gerentes de centros deportivos, de esparcimiento y culturales'
                },
                {
                  value: '1439',
                  option:
                    ' Otros gerentes de servicios no clasificados en otros grupos primarios'
                },
                { value: '2111', option: ' Físicos y astrónomos' },
                { value: '2112', option: ' Meteorólogos' },
                { value: '2113', option: ' Químicos' },
                { value: '2114', option: ' Geólogos y geofísicos' },
                {
                  value: '2120',
                  option: ' Matemáticos, actuarios y estadísticos'
                },
                {
                  value: '2131',
                  option: ' Biólogos, botánicos, zoólogos y afines'
                },
                {
                  value: '2132',
                  option: ' Agrónomos, silvicultores, zootecnistas y afines'
                },
                {
                  value: '2133',
                  option: ' Profesionales de la protección medioambiental'
                },
                {
                  value: '2141',
                  option: ' Ingenieros industriales y de producción'
                },
                { value: '2142', option: ' Ingenieros civiles' },
                { value: '2143', option: ' Ingenieros medioambientales' },
                { value: '2144', option: ' Ingenieros mecánicos' },
                { value: '2145', option: ' Ingenieros químicos' },
                {
                  value: '2146',
                  option: ' Ingenieros de minas, metalúrgicos y afines'
                },
                {
                  value: '2149',
                  option:
                    ' Ingenieros no clasificados en otros grupos primarios'
                },
                { value: '2151', option: ' Ingenieros electricistas' },
                { value: '2152', option: ' Ingenieros electrónicos' },
                {
                  value: '2153',
                  option: ' Ingenieros de telecomunicaciones'
                },
                { value: '2161', option: ' Arquitectos constructores' },
                { value: '2162', option: ' Arquitectos paisajistas' },
                {
                  value: '2163',
                  option: ' Diseñadores de productos y de prendas'
                },
                {
                  value: '2164',
                  option: ' Planificadores urbanos, regionales y de tránsito'
                },
                { value: '2165', option: ' Cartógrafos y topógrafos' },
                {
                  value: '2166',
                  option: ' Diseñadores gráficos y multimedia'
                },
                { value: '2211', option: ' Médicos generales' },
                { value: '2212', option: ' Médicos especialistas' },
                { value: '2221', option: ' Profesionales de enfermería' },
                { value: '2222', option: ' Profesionales de partería' },
                {
                  value: '2230',
                  option: ' Profesionales de medicina tradicional y alternativa'
                },
                {
                  value: '2240',
                  option: ' Paramédicos e instrumentadores quirúrgicos'
                },
                { value: '2250', option: ' Veterinarios' },
                { value: '2261', option: ' Odontólogos' },
                { value: '2262', option: ' Farmacéuticos' },
                {
                  value: '2263',
                  option:
                    ' Profesionales de la salud y la higiene laboral y ambiental'
                },
                { value: '2264', option: ' Fisioterapeutas' },
                { value: '2265', option: ' Dietistas y nutricionistas' },
                {
                  value: '2266',
                  option: ' Fonoaudiólogos y terapeutas del lenguaje'
                },
                { value: '2267', option: ' Optómetras' },
                {
                  value: '2269',
                  option:
                    ' Otros profesionales de la salud no clasificados en otros grupos primarios'
                },
                {
                  value: '2310',
                  option: ' Profesores de instituciones de educación superior'
                },
                {
                  value: '2320',
                  option: ' Profesores de formación profesional'
                },
                {
                  value: '2330',
                  option: ' Profesores de educación secundaria'
                },
                {
                  value: '2341',
                  option: ' Profesores de educación primaria'
                },
                { value: '2342', option: ' Profesores de primera infancia' },
                {
                  value: '2351',
                  option: ' Especialistas en métodos pedagógicos'
                },
                {
                  value: '2352',
                  option: ' Profesores de educación especial e inclusiva'
                },
                { value: '2353', option: ' Otros profesores de idiomas' },
                { value: '2354', option: ' Otros profesores de música' },
                { value: '2355', option: ' Otros profesores de artes' },
                {
                  value: '2356',
                  option: ' Instructores de tecnología de la información'
                },
                {
                  value: '2359',
                  option:
                    ' Otros profesionales de la educación no clasificados en otros grupos primarios'
                },
                { value: '2411', option: ' Contadores' },
                {
                  value: '2412',
                  option: ' Asesores financieros y de inversiones'
                },
                { value: '2413', option: ' Analistas financieros' },
                {
                  value: '2421',
                  option: ' Analistas de gestión y organización'
                },
                {
                  value: '2422',
                  option: ' Profesionales en políticas de administración'
                },
                {
                  value: '2423',
                  option: ' Profesionales de gestión de talento humano'
                },
                {
                  value: '2424',
                  option: ' Profesionales en formación y desarrollo de personal'
                },
                {
                  value: '2431',
                  option:
                    ' Profesionales de la publicidad y la comercialización'
                },
                {
                  value: '2432',
                  option: ' Profesionales de relaciones públicas'
                },
                {
                  value: '2433',
                  option:
                    ' Profesionales de ventas técnicas y médicas (excluyendo las TIC)'
                },
                {
                  value: '2434',
                  option:
                    ' Profesionales de ventas de tecnología de la información y las comunicaciones'
                },
                { value: '2511', option: ' Analistas de sistemas' },
                { value: '2512', option: ' Desarrolladores de software' },
                {
                  value: '2513',
                  option: ' Desarrolladores web y multimedia'
                },
                { value: '2514', option: ' Programadores de aplicaciones' },
                {
                  value: '2519',
                  option:
                    ' Desarrolladores y analistas de software y multimedia no clasificados en otros grupos primarios'
                },
                {
                  value: '2521',
                  option: ' Diseñadores y administradores de bases de datos'
                },
                { value: '2522', option: ' Administradores de sistemas' },
                {
                  value: '2523',
                  option: ' Profesionales en redes de computadores'
                },
                {
                  value: '2529',
                  option:
                    ' Profesionales en bases de datos y en redes de computadores no clasificados en otros grupos primarios'
                },
                { value: '2611', option: ' Abogados' },
                { value: '2612', option: ' Jueces' },
                {
                  value: '2619',
                  option:
                    ' Profesionales en derecho no clasificados en otros grupos primarios'
                },
                { value: '2621', option: ' Archivistas y curadores de arte' },
                {
                  value: '2622',
                  option: ' Bibliotecarios, documentalistas y afines'
                },
                { value: '2631', option: ' Economistas' },
                {
                  value: '2632',
                  option: ' Sociólogos, antropólogos y afines'
                },
                {
                  value: '2633',
                  option:
                    ' Filósofos, historiadores y especialistas en ciencias políticas'
                },
                { value: '2634', option: ' Psicólogos' },
                {
                  value: '2635',
                  option: ' Profesionales del trabajo social y consejeros'
                },
                { value: '2636', option: ' Profesionales religiosos' },
                { value: '2641', option: ' Autores y otros escritores' },
                { value: '2642', option: ' Periodistas' },
                {
                  value: '2643',
                  option: ' Traductores, intérpretes y otros lingüistas'
                },
                {
                  value: '2651',
                  option: ' Escultores, pintores artísticos y afines'
                },
                {
                  value: '2652',
                  option: ' Compositores, músicos y cantantes'
                },
                { value: '2653', option: ' Coreógrafos y bailarines' },
                {
                  value: '2654',
                  option:
                    ' Directores y productores de cine, de teatro y afines'
                },
                { value: '2655', option: ' Actores' },
                {
                  value: '2656',
                  option:
                    ' Locutores de radio, televisión y otros medios de comunicación'
                },
                {
                  value: '2659',
                  option:
                    ' Artistas creativos e interpretativos no clasificados en otros grupos primarios'
                },
                {
                  value: '3111',
                  option: ' Técnicos en ciencias físicas y químicas'
                },
                { value: '3112', option: ' Técnicos en ingeniería civil' },
                { value: '3113', option: ' Electrotécnicos' },
                { value: '3114', option: ' Técnicos en electrónica' },
                { value: '3115', option: ' Técnicos en ingeniería mecánica' },
                { value: '3116', option: ' Técnicos en química industrial' },
                { value: '3117', option: ' Técnicos de minas y metalurgia' },
                {
                  value: '3118',
                  option: ' Delineantes y dibujantes técnicos'
                },
                {
                  value: '3119',
                  option:
                    ' Técnicos en ciencias físicas y en ingeniería no clasificados en otros grupos primarios'
                },
                { value: '3121', option: ' Supervisores de minas' },
                {
                  value: '3122',
                  option: ' Supervisores de industrias manufactureras'
                },
                { value: '3123', option: ' Supervisores de la construcción' },
                {
                  value: '3131',
                  option: ' Operadores de plantas de producción de energía'
                },
                {
                  value: '3132',
                  option:
                    ' Operadores de incineradores, instalaciones de tratamiento de agua y afines'
                },
                {
                  value: '3133',
                  option:
                    ' Controladores de instalaciones de procesamiento de productos químicos'
                },
                {
                  value: '3134',
                  option:
                    ' Operadores de instalaciones de refinación de petróleo y gas natural'
                },
                {
                  value: '3135',
                  option: ' Operadores de procesos de producción de metales'
                },
                {
                  value: '3139',
                  option:
                    ' Técnicos en control de procesos no clasificados en otros grupos primarios'
                },
                {
                  value: '3141',
                  option:
                    ' Técnicos en ciencias biológicas (excluyendo la medicina)'
                },
                { value: '3142', option: ' Técnicos agropecuarios' },
                { value: '3143', option: ' Técnicos forestales' },
                {
                  value: '3151',
                  option: ' Oficiales maquinistas en navegación'
                },
                {
                  value: '3152',
                  option: ' Capitanes, oficiales de cubierta y prácticos'
                },
                { value: '3153', option: ' Pilotos de aviación y afines' },
                {
                  value: '3154',
                  option: ' Controladores de tráfico aéreo y marítimo'
                },
                {
                  value: '3155',
                  option: ' Técnicos en seguridad aeronáutica'
                },
                {
                  value: '3211',
                  option:
                    ' Técnicos en aparatos de diagnóstico y tratamiento médico'
                },
                {
                  value: '3212',
                  option: ' Técnicos de laboratorios médicos'
                },
                {
                  value: '3213',
                  option: ' Técnicos y asistentes farmacéuticos'
                },
                {
                  value: '3214',
                  option: ' Técnicos de prótesis médicas y dentales'
                },
                {
                  value: '3221',
                  option:
                    ' Técnicos y profesionales del nivel medio en enfermería'
                },
                {
                  value: '3222',
                  option:
                    ' Técnicos y profesionales del nivel medio en partería'
                },
                {
                  value: '3230',
                  option:
                    ' Técnicos y profesionales del nivel medio en medicina tradicional y alternativa'
                },
                {
                  value: '3240',
                  option: ' Técnicos y asistentes veterinarios'
                },
                {
                  value: '3251',
                  option: ' Higienistas y asistentes odontológicos'
                },
                {
                  value: '3252',
                  option: ' Técnicos en documentación sanitaria'
                },
                {
                  value: '3253',
                  option: ' Trabajadores comunitarios de la salud'
                },
                {
                  value: '3254',
                  option: ' Técnicos en optometría y ópticas'
                },
                {
                  value: '3255',
                  option: ' Técnicos y asistentes terapeutas'
                },
                { value: '3256', option: ' Asistentes médicos' },
                {
                  value: '3257',
                  option:
                    ' Inspectores de seguridad, salud ocupacional, medioambiental y afines'
                },
                {
                  value: '3258',
                  option: ' Técnicos en atención prehospitalaria'
                },
                {
                  value: '3259',
                  option:
                    ' Otros técnicos y profesionales del nivel medio de la salud, no clasificados en otros grupos primarios'
                },
                {
                  value: '3311',
                  option:
                    ' Agentes de bolsa, cambio y otros servicios financieros'
                },
                {
                  value: '3312',
                  option: ' Analistas de préstamos y créditos'
                },
                {
                  value: '3313',
                  option: ' Técnicos de contabilidad y afines'
                },
                {
                  value: '3314',
                  option:
                    ' Técnicos y profesionales del nivel medio de servicios estadísticos, matemáticos y afines'
                },
                { value: '3315', option: ' Tasadores y evaluadores' },
                { value: '3321', option: ' Agentes de seguros' },
                { value: '3322', option: ' Representantes comerciales' },
                { value: '3323', option: ' Agentes de compras' },
                {
                  value: '3324',
                  option: ' Agentes de operaciones comerciales y consignatarios'
                },
                {
                  value: '3331',
                  option: ' Declarantes o gestores de aduana'
                },
                {
                  value: '3332',
                  option: ' Organizadores de conferencias y eventos'
                },
                {
                  value: '3333',
                  option: ' Agentes de empleo y contratistas de mano de obra'
                },
                { value: '3334', option: ' Agentes inmobiliarios' },
                {
                  value: '3339',
                  option:
                    ' Agentes de servicios comerciales no clasificados en otros grupos primarios'
                },
                { value: '3341', option: ' Supervisores de oficina' },
                { value: '3342', option: ' Secretarios jurídicos' },
                {
                  value: '3343',
                  option: ' Secretarios administrativos y ejecutivos'
                },
                { value: '3344', option: ' Secretarios médicos' },
                {
                  value: '3351',
                  option: ' Agentes de aduana e inspectores de frontera'
                },
                {
                  value: '3352',
                  option: ' Agentes de administración tributaria'
                },
                {
                  value: '3353',
                  option: ' Agentes de servicios de seguridad social'
                },
                {
                  value: '3354',
                  option: ' Agentes gubernamentales de expedición de licencias'
                },
                {
                  value: '3355',
                  option: ' Inspectores de policía y detectives'
                },
                {
                  value: '3359',
                  option:
                    ' Agentes de gobierno y profesionales del nivel medio para la aplicación de regulaciones no clasificados en otros grupos primarios'
                },
                {
                  value: '3411',
                  option:
                    ' Técnicos y profesionales del nivel medio del derecho de servicios legales y afines'
                },
                {
                  value: '3412',
                  option: ' Trabajadores y asistentes sociales'
                },
                {
                  value: '3413',
                  option: ' Auxiliares laicos de las religiones'
                },
                { value: '3421', option: ' Atletas y deportistas' },
                {
                  value: '3422',
                  option:
                    ' Entrenadores, instructores y árbitros de actividades deportivas'
                },
                {
                  value: '3423',
                  option:
                    ' Instructores de educación física y actividades recreativas'
                },
                { value: '3431', option: ' Fotógrafos' },
                {
                  value: '3432',
                  option: ' Diseñadores y decoradores de interiores'
                },
                {
                  value: '3433',
                  option: ' Técnicos en galerías de arte, museos y bibliotecas'
                },
                { value: '3434', option: ' Chefs' },
                {
                  value: '3435',
                  option:
                    ' Otros técnicos y profesionales del nivel medio en actividades culturales y artísticas'
                },
                {
                  value: '3511',
                  option:
                    ' Técnicos en operaciones de tecnología de la información y las comunicaciones'
                },
                {
                  value: '3512',
                  option:
                    ' Técnicos en asistencia y soporte al usuario de tecnología de la información y las comunicaciones'
                },
                {
                  value: '3513',
                  option: ' Técnicos en redes y sistemas de computación'
                },
                { value: '3514', option: ' Técnicos de la Web' },
                {
                  value: '3521',
                  option: ' Técnicos de radiodifusión y grabación audio visual'
                },
                {
                  value: '3522',
                  option: ' Técnicos de ingeniería de las telecomunicaciones'
                },
                { value: '4110', option: ' Oficinistas generales' },
                { value: '4120', option: ' Secretarios generales' },
                {
                  value: '4131',
                  option:
                    ' Operadores de máquinas de procesamiento de texto y mecanógrafos'
                },
                { value: '4132', option: ' Grabadores de datos' },
                { value: '4211', option: ' Cajeros de bancos y afines' },
                { value: '4212', option: ' Receptores de apuestas y afines' },
                { value: '4213', option: ' Prestamistas' },
                { value: '4214', option: ' Cobradores y afines' },
                {
                  value: '4221',
                  option: ' Empleados y consultores de viajes'
                },
                {
                  value: '4222',
                  option: ' Empleados de centros de llamadas'
                },
                { value: '4223', option: ' Telefonistas' },
                { value: '4224', option: ' Recepcionistas de hoteles' },
                {
                  value: '4225',
                  option: ' Empleados de ventanillas de informaciones'
                },
                { value: '4226', option: ' Recepcionistas generales' },
                {
                  value: '4227',
                  option:
                    ' Entrevistadores de encuestas y de investigaciones de mercados'
                },
                {
                  value: '4229',
                  option:
                    ' Otros empleados de servicios de información al cliente no clasificados en otros grupos primarios'
                },
                {
                  value: '4311',
                  option: ' Auxiliares de contabilidad y cálculo de costos'
                },
                {
                  value: '4312',
                  option:
                    ' Auxiliares de servicios estadísticos, financieros y de seguros'
                },
                {
                  value: '4313',
                  option: ' Auxiliares encargados de las nóminas'
                },
                {
                  value: '4321',
                  option:
                    ' Empleados de control de abastecimientos e inventario'
                },
                {
                  value: '4322',
                  option: ' Empleados de servicios de apoyo a la producción'
                },
                {
                  value: '4323',
                  option: ' Empleados de servicios de transporte'
                },
                { value: '4411', option: ' Empleados de bibliotecas' },
                {
                  value: '4412',
                  option: ' Empleados de servicios de correos'
                },
                {
                  value: '4413',
                  option:
                    ' Codificadores de datos, correctores de pruebas de imprenta y afines'
                },
                { value: '4414', option: ' Escribientes públicos y afines' },
                { value: '4415', option: ' Empleados de archivos' },
                {
                  value: '4416',
                  option: ' Empleados del servicio de personal'
                },
                {
                  value: '4419',
                  option:
                    ' Otro personal de apoyo administrativo no clasificados en otros grupos primarios'
                },
                {
                  value: '5111',
                  option: ' Personal de servicio a pasajeros'
                },
                {
                  value: '5112',
                  option: ' Revisores y cobradores de los transportes públicos'
                },
                { value: '5113', option: ' Guías' },
                { value: '5120', option: ' Cocineros' },
                { value: '5131', option: ' Meseros' },
                { value: '5132', option: ' Bármanes' },
                { value: '5141', option: ' Peluqueros' },
                {
                  value: '5142',
                  option: ' Especialistas en tratamientos de belleza y afines'
                },
                {
                  value: '5151',
                  option:
                    ' Supervisores de mantenimiento y limpieza en oficinas, hoteles y otros establecimientos'
                },
                { value: '5152', option: ' Mayordomos domésticos' },
                { value: '5153', option: ' Conserjes y afines' },
                {
                  value: '5161',
                  option: ' Astrólogos, adivinos y trabajadores afines'
                },
                { value: '5162', option: ' Acompañantes' },
                {
                  value: '5163',
                  option: ' Personal de servicios funerarios y embalsamadores'
                },
                { value: '5164', option: ' Cuidadores de animales' },
                { value: '5165', option: ' Instructores de conducción' },
                {
                  value: '5169',
                  option:
                    ' Otros trabajadores de servicios personales no clasificados en otros grupos primarios'
                },
                {
                  value: '5211',
                  option: ' Vendedores de quioscos y de puestos de mercado'
                },
                {
                  value: '5212',
                  option:
                    ' Vendedores ambulantes de alimentos preparados para consumo inmediato'
                },
                { value: '5221', option: ' Comerciantes de tiendas' },
                {
                  value: '5222',
                  option: ' Supervisores de tiendas y almacenes'
                },
                {
                  value: '5223',
                  option:
                    ' Vendedores y auxiliares de venta en tiendas, almacenes y afines'
                },
                {
                  value: '5230',
                  option:
                    ' Cajeros de comercio, taquilleros y expendedores de boletas'
                },
                {
                  value: '5241',
                  option: ' Modelos de moda, arte y publicidad'
                },
                {
                  value: '5242',
                  option: ' Demostradores de tiendas, almacenes y afines'
                },
                { value: '5243', option: ' Vendedores puerta a puerta' },
                {
                  value: '5244',
                  option: ' Vendedores a través de medios tecnológicos'
                },
                {
                  value: '5245',
                  option: ' Expendedores de combustibles para vehículos'
                },
                {
                  value: '5246',
                  option: ' Vendedores de comidas al mostrador'
                },
                {
                  value: '5249',
                  option:
                    ' Otros vendedores no clasificados en otros grupos primarios'
                },
                { value: '5311', option: ' Cuidadores de niños' },
                { value: '5312', option: ' Auxiliares de maestros' },
                {
                  value: '5321',
                  option:
                    ' Trabajadores de los cuidados personales en instituciones'
                },
                {
                  value: '5322',
                  option: ' Trabajadores de los cuidados personales a domicilio'
                },
                {
                  value: '5329',
                  option:
                    ' Trabajadores de los cuidados personales en servicios de salud no clasificados en otros grupos primarios'
                },
                { value: '5411', option: ' Bomberos y rescatistas' },
                { value: '5412', option: ' Policías' },
                { value: '5413', option: ' Guardianes de prisión' },
                { value: '5414', option: ' Guardias de seguridad' },
                {
                  value: '5419',
                  option:
                    ' Personal de los servicios de protección no clasificadosen otros grupos primarios'
                },
                {
                  value: '6111',
                  option:
                    ' Agricultores y trabajadores calificados de cultivos extensivos'
                },
                {
                  value: '6112',
                  option:
                    ' Agricultores y trabajadores calificados de plantaciones de árboles y arbustos'
                },
                {
                  value: '6113',
                  option:
                    ' Agricultores y trabajadores calificados de huertas, invernaderos, viveros y jardines'
                },
                {
                  value: '6114',
                  option:
                    ' Agricultores y trabajadores calificados de cultivos mixtos'
                },
                {
                  value: '6121',
                  option:
                    ' Criadores de ganado y trabajadores de la cría de animales domésticos (excepto aves de corral)'
                },
                {
                  value: '6122',
                  option:
                    ' Avicultores y trabajadores calificados de la avicultura'
                },
                {
                  value: '6123',
                  option:
                    ' Criadores y trabajadores calificados de la apicultura y la sericicultura'
                },
                {
                  value: '6129',
                  option:
                    ' Criadores y trabajadores pecuarios calificados, avicultores y criadores de insectos no clasificados en otros grupos primarios'
                },
                {
                  value: '6130',
                  option:
                    ' Productores y trabajadores calificados de explotaciones agropecuarias mixtas cuya producción se destina al mercado'
                },
                {
                  value: '6210',
                  option: ' Trabajadores forestales calificados y afines'
                },
                {
                  value: '6221',
                  option: ' Trabajadores de explotaciones de acuicultura'
                },
                {
                  value: '6222',
                  option: ' Pescadores de agua dulce y en aguas costeras'
                },
                { value: '6223', option: ' Pescadores de alta mar' },
                { value: '6224', option: ' Cazadores y tramperos' },
                {
                  value: '6310',
                  option: ' Trabajadores agrícolas de subsistencia'
                },
                {
                  value: '6320',
                  option: ' Trabajadores pecuarios de subsistencia'
                },
                {
                  value: '6330',
                  option: ' Trabajadores agropecuarios de subsistencia'
                },
                {
                  value: '6340',
                  option:
                    ' Pescadores, cazadores, tramperos y recolectores de subsistencia'
                },
                { value: '7111', option: ' Constructores de casas' },
                { value: '7112', option: ' Albañiles' },
                {
                  value: '7113',
                  option: ' Labrantes, tronzadores y grabadores de piedra'
                },
                {
                  value: '7114',
                  option: ' Operarios en cemento armado, enfoscadores y afines'
                },
                {
                  value: '7115',
                  option: ' Carpinteros de armar y de obra blanca'
                },
                {
                  value: '7119',
                  option:
                    ' Oficiales y operarios de la construcción de obra gruesa y afines no clasificados en otros grupos primarios'
                },
                { value: '7121', option: ' Techadores' },
                {
                  value: '7122',
                  option: ' Enchapadores, parqueteros y colocadores de suelos'
                },
                { value: '7123', option: ' Revocadores' },
                {
                  value: '7124',
                  option:
                    ' Instaladores de material aislante y de insonorización'
                },
                { value: '7125', option: ' Cristaleros' },
                {
                  value: '7126',
                  option: ' Fontaneros e instaladores de tuberías'
                },
                {
                  value: '7127',
                  option:
                    ' Mecánicos montadores de aire acondicionado y refrigeración'
                },
                { value: '7131', option: ' Pintores y empapeladores' },
                { value: '7132', option: ' Barnizadores y afines' },
                {
                  value: '7133',
                  option: ' Limpiadores de fachadas y deshollinadores'
                },
                { value: '7211', option: ' Moldeadores y macheros' },
                { value: '7212', option: ' Soldadores y oxicortadores' },
                { value: '7213', option: ' Chapistas y caldereros' },
                {
                  value: '7214',
                  option: ' Montadores de estructuras metálicas'
                },
                {
                  value: '7215',
                  option: ' Aparejadores y empalmadores de cables'
                },
                { value: '7221', option: ' Herreros y forjadores' },
                { value: '7222', option: ' Herramentistas y afines' },
                {
                  value: '7223',
                  option: ' Ajustadores y operadores de máquinas herramientas'
                },
                {
                  value: '7224',
                  option: ' Pulidores de metales y afiladores de herramientas'
                },
                {
                  value: '7231',
                  option: ' Mecánicos y reparadores de vehículos de motor'
                },
                {
                  value: '7232',
                  option:
                    ' Mecánicos y reparadores de sistemas y motores de aeronaves'
                },
                {
                  value: '7233',
                  option:
                    ' Mecánicos y reparadores de máquinas agrícolas e industriales'
                },
                {
                  value: '7234',
                  option: ' Reparadores de bicicletas y afines'
                },
                {
                  value: '7311',
                  option:
                    ' Mecánicos y reparadores de instrumentos de precisión'
                },
                {
                  value: '7312',
                  option: ' Fabricantes y afinadores de instrumentos musicales'
                },
                {
                  value: '7314',
                  option: ' Alfareros y ceramistas (barro y arcilla)'
                },
                {
                  value: '7315',
                  option:
                    ' Sopladores, modeladores, laminadores, cortadores y pulidores de vidrio'
                },
                {
                  value: '7316',
                  option: ' Rotulistas, pintores decorativos y grabadores'
                },
                { value: '7321', option: ' Preimpresores y afines' },
                { value: '7322', option: ' Impresores' },
                { value: '7323', option: ' Encuadernadores y afines' },
                { value: '7331', option: ' Tejedores con telares' },
                { value: '7332', option: ' Tejedores con agujas' },
                { value: '7333', option: ' Otros tejedores' },
                { value: '7341', option: ' Cesteros y mimbreros' },
                { value: '7342', option: ' Sombrereros artesanales' },
                {
                  value: '7351',
                  option: ' Talladores piezas artesanales de madera'
                },
                {
                  value: '7352',
                  option: ' Decoradores de piezas artesanales en madera'
                },
                { value: '7361', option: ' Joyeros' },
                { value: '7362', option: ' Orfebres y plateros' },
                { value: '7363', option: ' Bisuteros' },
                { value: '7370', option: ' Artesanos del cuero' },
                { value: '7391', option: ' Artesanos de papel' },
                {
                  value: '7392',
                  option: ' Artesanos del hierro y otros metales'
                },
                {
                  value: '7393',
                  option: ' Artesanos de las semillas y cortezas vegetales'
                },
                {
                  value: '7399',
                  option:
                    ' Artesanos de otros materiales no clasificados en otros grupos primarios'
                },
                { value: '7411', option: ' Electricistas de obras y afines' },
                {
                  value: '7412',
                  option: ' Mecánicos y ajustadores electricistas'
                },
                {
                  value: '7413',
                  option: ' Instaladores y reparadores de líneas eléctricas'
                },
                {
                  value: '7421',
                  option: ' Mecánicos y reparadores en electrónica'
                },
                {
                  value: '7422',
                  option:
                    ' Instaladores y reparadores en tecnología de la información y las comunicaciones'
                },
                { value: '7511', option: ' Carniceros, pescaderos y afines' },
                {
                  value: '7512',
                  option: ' Panaderos, pasteleros y confiteros'
                },
                {
                  value: '7513',
                  option: ' Operarios de la elaboración de productos lácteos'
                },
                {
                  value: '7514',
                  option:
                    ' Operarios de la conservación de frutas, legumbres, verduras y afines'
                },
                {
                  value: '7515',
                  option: ' Catadores y clasificadores de alimentos y bebidas'
                },
                {
                  value: '7516',
                  option:
                    ' Preparadores y elaboradores de tabaco y sus productos'
                },
                {
                  value: '7521',
                  option: ' Operarios del tratamiento de la madera'
                },
                {
                  value: '7522',
                  option:
                    ' Ebanistas y carpinteros (excluye carpinteros de armar y de obra blanca)'
                },
                {
                  value: '7523',
                  option:
                    ' Ajustadores y operadores de máquinas para trabajar madera'
                },
                {
                  value: '7531',
                  option: ' Sastres, modistos, peleteros y sombrereros'
                },
                {
                  value: '7532',
                  option: ' Patronistas y cortadores de tela, cuero y afines'
                },
                { value: '7533', option: ' Costureros, bordadores y afines' },
                { value: '7534', option: ' Tapiceros, colchoneros y afines' },
                {
                  value: '7535',
                  option: ' Apelambradores, pellejeros y curtidores'
                },
                { value: '7536', option: ' Zapateros y afines' },
                { value: '7541', option: ' Buzos' },
                { value: '7542', option: ' Dinamiteros y pegadores' },
                {
                  value: '7543',
                  option:
                    ' Clasificadores y probadores de productos (excluyendo alimentos y bebidas)'
                },
                {
                  value: '7544',
                  option:
                    ' Fumigadores y otros controladores de plagas y malas hierbas'
                },
                {
                  value: '7549',
                  option:
                    ' Otros oficiales, operarios y oficios relacionados no clasificados en otros grupos primarios'
                },
                {
                  value: '8111',
                  option: ' Mineros y operadores de instalaciones mineras'
                },
                {
                  value: '8112',
                  option:
                    ' Operadores de instalaciones de procesamiento de minerales y rocas'
                },
                {
                  value: '8113',
                  option: ' Perforadores y sondistas de pozos y afines'
                },
                {
                  value: '8114',
                  option:
                    ' Operadores de máquinas para fabricar cemento y otros productos minerales'
                },
                {
                  value: '8121',
                  option:
                    ' Operadores de instalaciones de procesamiento de metales'
                },
                {
                  value: '8122',
                  option:
                    ' Operadores de máquinas pulidoras, galvanizadoras y recubridoras de metales'
                },
                {
                  value: '8131',
                  option:
                    ' Operadores de plantas y máquinas de productos químicos'
                },
                {
                  value: '8132',
                  option:
                    ' Operadores de máquinas para fabricar productos fotográficos'
                },
                {
                  value: '8141',
                  option:
                    ' Operadores de máquinas para fabricar productos de caucho'
                },
                {
                  value: '8142',
                  option:
                    ' Operadores de máquinas para fabricar productos de material plástico'
                },
                {
                  value: '8143',
                  option:
                    ' Operadores de máquinas para fabricar productos de papel'
                },
                {
                  value: '8151',
                  option:
                    ' Operadores de máquinas de preparación de fibras, hilado y devanado'
                },
                {
                  value: '8152',
                  option: ' Operadores de telares y otras máquinas tejedoras'
                },
                { value: '8153', option: ' Operadores de máquinas de coser' },
                {
                  value: '8154',
                  option:
                    ' Operadores de máquinas de blanqueamiento, teñido y limpieza de tejidos'
                },
                {
                  value: '8155',
                  option:
                    ' Operadores de máquinas de tratamiento de pieles y cueros'
                },
                {
                  value: '8156',
                  option:
                    ' Operadores de máquinas para la fabricación de calzado y afines'
                },
                {
                  value: '8157',
                  option: ' Operadores de máquinas de lavandería'
                },
                {
                  value: '8159',
                  option:
                    ' Operadores de máquinas para fabricar productos textiles y artículos de piel y cuero no clasificados en otros grupos primarios'
                },
                {
                  value: '8160',
                  option:
                    ' Operadores de máquinas para elaborar alimentos y productos afines'
                },
                {
                  value: '8171',
                  option:
                    ' Operadores de instalaciones para la preparación de pasta para papel y papel'
                },
                {
                  value: '8172',
                  option:
                    ' Operadores de instalaciones de procesamiento de la madera'
                },
                {
                  value: '8181',
                  option:
                    ' Operadores de máquinas y de instalaciones para elaborar productos de vidrio y cerámica'
                },
                {
                  value: '8182',
                  option: ' Operadores de máquinas de vapor y calderas'
                },
                {
                  value: '8183',
                  option:
                    ' Operadores de máquinas de embalaje, embotellamiento y etiquetado'
                },
                {
                  value: '8189',
                  option:
                    ' Otros operadores de máquinas y de instalaciones fijas no clasificados en otros grupos primarios'
                },
                {
                  value: '8211',
                  option: ' Ensambladores de maquinaria mecánica'
                },
                {
                  value: '8212',
                  option: ' Ensambladores de equipos eléctricos y electrónicos'
                },
                {
                  value: '8219',
                  option:
                    ' Ensambladores no clasificados bajo otros grupos primarios'
                },
                { value: '8311', option: ' Maquinistas de locomotoras' },
                {
                  value: '8312',
                  option: ' Guardafrenos, guardagujas y agentes de maniobras'
                },
                { value: '8321', option: ' Conductores de motocicletas' },
                {
                  value: '8323',
                  option: ' Conductores de camionetas y vehículos livianos'
                },
                { value: '8324', option: ' Conductores de taxis' },
                {
                  value: '8331',
                  option: ' Conductores de buses, microbuses y tranvías'
                },
                {
                  value: '8332',
                  option: ' Conductores de camiones y vehículos pesados'
                },
                {
                  value: '8341',
                  option: ' Operadores de maquinaria agrícola y forestal móvil'
                },
                {
                  value: '8342',
                  option:
                    ' Operadores de máquinas de movimiento de tierras, construcción de vías y afines'
                },
                {
                  value: '8343',
                  option: ' Operadores de grúas, aparatos elevadores y afines'
                },
                { value: '8344', option: ' Operadores de montacargas' },
                { value: '8350', option: ' Marineros de cubierta y afines' },
                { value: '9111', option: ' Personal doméstico' },
                {
                  value: '9112',
                  option:
                    ' Aseadores de oficinas, hoteles y otros establecimientos'
                },
                {
                  value: '9121',
                  option: ' Lavanderos y planchadores manuales'
                },
                { value: '9122', option: ' Lavadores de vehículos' },
                { value: '9123', option: ' Lavadores de ventanas' },
                {
                  value: '9129',
                  option:
                    ' Otro personal de limpieza no clasificados bajo otros grupos primarios'
                },
                {
                  value: '9211',
                  option: ' Obreros y peones de explotaciones agrícolas'
                },
                {
                  value: '9212',
                  option: ' Obreros y peones de explotaciones ganaderas'
                },
                {
                  value: '9213',
                  option: ' Obreros y peones de explotaciones agropecuarias'
                },
                {
                  value: '9214',
                  option: ' Obreros y peones de jardinería y horticultura'
                },
                { value: '9215', option: ' Obreros y peones forestales' },
                {
                  value: '9216',
                  option: ' Obreros y peones de pesca y acuicultura'
                },
                {
                  value: '9311',
                  option: ' Obreros y peones de minas y canteras'
                },
                {
                  value: '9312',
                  option: ' Obreros y peones de obras públicas y mantenimiento'
                },
                {
                  value: '9313',
                  option: ' Obreros y peones de la construcción de edificios'
                },
                { value: '9321', option: ' Empacadores manuales' },
                {
                  value: '9329',
                  option:
                    ' Obreros y peones de la industria manufacturera no clasificados en otros grupos primarios'
                },
                {
                  value: '9331',
                  option:
                    ' Conductores de vehículos accionados a pedal o a brazo'
                },
                {
                  value: '9332',
                  option:
                    ' Conductores de vehículos y máquinas de tracción animal'
                },
                { value: '9333', option: ' Obreros y peones de carga' },
                { value: '9334', option: ' Surtidores de estanterías' },
                { value: '9411', option: ' Cocineros de comidas rápidas' },
                { value: '9412', option: ' Ayudantes de cocina' },
                {
                  value: '9510',
                  option: ' Trabajadores ambulantes de servicios y afines'
                },
                {
                  value: '9520',
                  option:
                    ' Vendedores ambulantes (excluyendo comidas de preparación inmediata)'
                },
                {
                  value: '9611',
                  option: ' Recolectores de basura y material reciclable'
                },
                { value: '9612', option: ' Clasificadores de desechos' },
                { value: '9613', option: ' Barrenderos y afines' },
                {
                  value: '9621',
                  option: ' Mensajeros, mandaderos, maleteros y repartidores'
                },
                {
                  value: '9622',
                  option: ' Personas que realizan trabajos varios'
                },
                {
                  value: '9624',
                  option: ' Acarreadores de agua y recolectores de leña'
                },
                {
                  value: '9625',
                  option:
                    ' Recolectores de dinero y surtidores de máquinas de venta automática'
                },
                { value: '9626', option: ' Lectores de medidores' },
                {
                  value: '9629',
                  option:
                    ' Otras ocupaciones elementales no clasificadas en otros grupos primarios'
                },
                {
                  value: '9998',
                  option:
                    ' Jubilado, desempleado, ama de casa, estudiante, dedicación al hogar, menor de edad'
                },
                {
                  value: '9999',
                  option:
                    ' En los casos en que no se tiene esta información registrar'
                }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName: '58.ocupacion-2f14f702-cede-4274-8665-fbf57fae61f3',
              value: null,
              orden: 9
            },
            {
              label: '59.Nivel Educativo',
              type: 'select',
              options: [
                { value: '1', option: 'Preescolar' },
                { value: '2', option: 'Básica Primaria' },
                { value: '3', option: 'Básica Secundaria' },
                { value: '4', option: 'Media Académica o Clásica' },
                {
                  value: '5',
                  option: 'Media Técnica (Bachillerato Técnico)'
                },
                { value: '6', option: 'Normalista' },
                { value: '7', option: 'Técnica Profesional' },
                { value: '8', option: 'Tecnológica' },
                { value: '9', option: 'Profesional' },
                { value: '10', option: 'Especialización' },
                { value: '11', option: 'Maestría' },
                { value: '12', option: 'Doctorado' },
                { value: '13', option: 'Ninguno' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '59.nivel_educativo-d7d244c3-6e7f-4505-adb6-f5b6eb6358dc',
              value: null,
              orden: 10
            },
            {
              label: '60.Régimen de afiliación',
              type: 'select',
              options: [
                { value: '1', option: 'Subsidiado' },
                { value: '2', option: 'Contributivo' },
                { value: '3', option: 'Especial' },
                { value: '4', option: 'Excepción' },
                { value: '5', option: 'No afiliado' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '60.regimen_de_afiliacion-dcc0a15e-c6f4-41a2-b65f-6d7c66f2ce7c',
              value: null,
              orden: 11
            },
            {
              label: '61.EAPB',
              type: 'select',
              options: [
                {
                  value: 'CCF033',
                  option: 'CAJA DE COMPENSACIÓN FAMILIAR DE SUCRE'
                },
                {
                  value: 'CCF050',
                  option:
                    "CAJA DE COMPENSACIÓN FAMILIAR C.C.F. DEL ORIENTE COLOMBIANO 'COMFAORIENTE'"
                },
                {
                  value: 'CCF055',
                  option: 'CAJA DE COMPENSACION FAMILIAR CAJACOPI ATLANTICO'
                },
                {
                  value: 'CCF102',
                  option: 'CAJA DE COMPENSACIÓN FAMILIAR DEL CHOCÓ COMFACHOCO'
                },
                {
                  value: 'CCFC20',
                  option:
                    'CAJA DE COMPENSACIÓN FAMILIAR DEL CHOCÓ COMFACHOCO-CM'
                },
                {
                  value: 'CCFC33',
                  option: 'CAJA DE COMPENSACIÓN FAMILIAR DE SUCRE-CM'
                },
                {
                  value: 'CCFC50',
                  option:
                    'CAJA DE COMPENSACIÓN FAMILIAR C.C.F. DEL ORIENTE COLOMBIANO - COMFAORIENTE -CM'
                },
                {
                  value: 'CCFC55',
                  option:
                    'CAJA DE DE COMPENSACION FAMILIAR CAJACOPI ATLANTICO-CM'
                },
                {
                  value: 'EAS016',
                  option: 'EMPRESAS PUBLICAS DE MEDELLIN-DEPARTAMENTO MEDICO'
                },
                {
                  value: 'EAS027',
                  option: 'FONDO DE PASIVO SOCIAL DE LOS FERROCARRILES NALES'
                },
                {
                  value: 'EPS001',
                  option: 'ALIANSALUD ENTIDAD PROMOTORA DE SALUD S.A.'
                },
                { value: 'EPS002', option: 'SALUD TOTAL S.A. E.P.S.' },
                { value: 'EPS005', option: 'E.P.S. SANITAS S.A.' },
                { value: 'EPS008', option: 'COMPENSAR E.P.S.' },
                {
                  value: 'EPS010',
                  option: 'EPS Y MEDICINA PREPAGADA SURAMERICANA S.A'
                },
                { value: 'EPS012', option: 'COMFENALCO VALLE E.P.S.' },
                { value: 'EPS017', option: 'E.P.S. FAMISANAR LTDA.' },
                {
                  value: 'EPS018',
                  option:
                    'EPS SERVICIO OCCIDENTAL DE SALUD S.A. - EPS S.O.S. S.A.'
                },
                { value: 'EPS025', option: 'CAPRESOCA EPS' },
                { value: 'EPS037', option: 'LA NUEVA EPS S.A.' },
                { value: 'EPS040', option: 'SAVIA SALUD EPS -CM' },
                { value: 'EPS041', option: 'LA NUEVA EPS S.A.-CM' },
                {
                  value: 'EPS042',
                  option:
                    'COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA - COOSALUD'
                },
                { value: 'EPS046', option: 'FUNDACIÓN SALUD MIA EPS' },
                { value: 'EPS047', option: 'SALUD BOLIVAR EPS SAS' },
                {
                  value: 'EPS048',
                  option:
                    'ASOCIACION MUTUAL SER EMPRESA SOLIDARIA DE SALUD EPS-S MUTUAL SER EPS-S'
                },
                { value: 'EPSC25', option: 'CAPRESOCA EPS-CM' },
                { value: 'EPSC34', option: 'CAPITAL SALUD-CM' },
                {
                  value: 'EPSI01',
                  option: 'ASOCIACIÓN INDÍGENA DEL CESAR Y LA GUAJIRA DUSAKAWI'
                },
                { value: 'EPSI03', option: 'ASOCIACIÓN INDÍGENA DEL CAUCA' },
                { value: 'EPSI04', option: 'ANASWAYUU' },
                { value: 'EPSI05', option: 'MALLAMAS' },
                { value: 'EPSI06', option: 'PIJAOS SALUD EPSI' },
                {
                  value: 'EPSIC1',
                  option:
                    'ASOCIACIÓN INDÍGENA DEL CESAR Y LA GUAJIRA DUSAKAWI-CM'
                },
                {
                  value: 'EPSIC3',
                  option: 'ASOCIACIÓN INDÍGENA DEL CAUCA - AIC -CM'
                },
                { value: 'EPSIC4', option: 'ANASWAYUU-CM' },
                { value: 'EPSIC5', option: 'MALLAMAS-CM' },
                { value: 'EPSIC6', option: 'PIJAOS SALUD EPSI-CM' },
                {
                  value: 'EPSS01',
                  option: 'ALIANSALUD ENTIDAD PROMOTORA DE SALUD S.A.-CM'
                },
                { value: 'EPSS02', option: 'SALUD TOTAL S.A. E.P.S. CM' },
                { value: 'EPSS05', option: 'E.P.S. SANITAS S.A.-CM' },
                { value: 'EPSS08', option: 'COMPENSAR E.P.S.-CM' },
                {
                  value: 'EPSS10',
                  option: 'EPS Y MEDICINA PREPAGADA SURAMERICANA S.A-CM'
                },
                { value: 'EPSS12', option: 'COMFENALCO VALLE E.P.S.-CM' },
                { value: 'EPSS17', option: 'E.P.S. FAMISANAR LTDA.-CM' },
                {
                  value: 'EPSS18',
                  option:
                    'EPS SERVICIO OCCIDENTAL DE SALUD S.A. - EPS S.O.S. S.A.-CM'
                },
                { value: 'EPSS34', option: 'CAPITAL SALUD' },
                { value: 'EPSS37', option: 'NUEVA EPS S.A. -CM' },
                { value: 'EPSS40', option: 'SAVIA SALUD EPS' },
                { value: 'EPSS41', option: 'LA NUEVA EPS S.A.' },
                {
                  value: 'EPSS42',
                  option:
                    'COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA - COOSALUD -CM'
                },
                { value: 'EPSS46', option: 'FUNDACIÓN SALUD MIA - CM' },
                { value: 'EPSS47', option: 'SALUD BOLIVA EPS SAS CM' },
                {
                  value: 'EPSS48',
                  option:
                    'ASOCIACION MUTUAL SER EMPRESA SOLIDARIA DE SALUD EPS-S MUTUAL SER EPS-S - CM'
                },
                {
                  value: 'ESS024',
                  option:
                    'COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA LTDA. COOSALUD E.S.S.'
                },
                {
                  value: 'ESS062',
                  option: 'ASOCIACIÓN MUTUAL LA ESPERANZA ASMET SALUD'
                },
                {
                  value: 'ESS118',
                  option:
                    'ASOCIACIÓN MUTUAL EMPRESA SOLIDARIA DE SALUD DE NARIÑO E.S.S. EMSSANAR E.S.S.'
                },
                {
                  value: 'ESS207',
                  option: 'ASOCIACIÓN MUTUAL SER EMPRESA SOLIDARIA DE SALUD ESS'
                },
                {
                  value: 'ESSC07',
                  option:
                    'ASOCIACIÓN MUTUAL SER EMPRESA SOLIDARIA DE SALUD ESS-CM'
                },
                {
                  value: 'ESSC18',
                  option:
                    'ASOCIACIÓN MUTUAL EMPRESA SOLIDARIA DE SALUD DE NARIÑO E.S.S. EMSSANAR E.S.S.-CM'
                },
                {
                  value: 'ESSC24',
                  option:
                    'COOPERATIVA DE SALUD Y DESARROLLO INTEGRAL ZONA SUR ORIENTAL DE CARTAGENA LTDA. COOSALUD E.S.S.-CM'
                },
                {
                  value: 'ESSC62',
                  option: 'ASOCIACIÓN MUTUAL LA ESPERANZA ASMET SALUD-CM'
                },
                { value: 'INP001', option: 'INPEC' },
                { value: 'RES002', option: 'ECOPETROL' },
                { value: 'RES004', option: 'MAGISTERIO' },
                { value: 'RES005', option: 'UATLANTICO' },
                { value: 'RES006', option: 'CAPRUIS' },
                { value: 'RES007', option: 'UVALLE' },
                { value: 'RES008', option: 'UNISALUD' },
                { value: 'RES009', option: 'UCAUCA' },
                { value: 'RES010', option: 'UCARTAGENA' },
                { value: 'RES012', option: 'UCORDOBA' },
                { value: 'RES013', option: 'UNARIÑO' },
                { value: 'RES014', option: 'UPTC' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName: '61.eapb-d634b068-11bc-4b34-b4a9-04c9d46917cd',
              value: null,
              orden: 12
            },
            {
              label:
                '62.Pertenencia a un grupo poblacional de especial protección',
              type: 'select',
              options: [
                { value: '1', option: 'Niñas, niños y adolescentes' },
                { value: '2', option: 'Gestantes' },
                { value: '3', option: 'Personas adulta mayor' },
                {
                  value: '4',
                  option: 'Persona con condición de discapacidad'
                },
                {
                  value: '5',
                  option: 'Personas con orientación sexual diversa'
                },
                { value: '6', option: 'Víctimas de violencia' },
                { value: '7', option: 'Ninguno' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '62.pertenencia_a_un_grupo_poblacional_de_especial_proteccion-5c917e7b-f36b-4d91-99ed-0a979b7f1d7c',
              value: null,
              orden: 13
            },
            {
              label: '63.Pertenencia étnica',
              type: 'select',
              options: [
                { value: '1', option: 'Indígena' },
                { value: '2', option: 'ROM (gitano)' },
                {
                  value: '3',
                  option: 'Raizal (archipiélago de San Andrés y Providencia)'
                },
                { value: '4', option: 'Palanquero de San Basilio' },
                {
                  value: '5',
                  option:
                    'Negro(a) Mulato(a) Afrocolombiano(a) o Afro descendiente'
                },
                { value: '6', option: 'Ninguna de las anteriores' },
                { value: '7', option: 'Otro' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '63.pertenencia_etnica-d9a4be6f-fbb1-4ab1-b4c5-5838c664bcd2',
              value: null,
              orden: 14
            },
            {
              label: '64.Comunidad o pueblo indígena',
              type: 'select',
              options: [
                { value: '1', option: 'AMAZONAS KAWIYARI' },
                { value: '2', option: 'AMAZONAS SIONA' },
                { value: '3', option: 'AMAZONAS YAGUA' },
                { value: '4', option: 'AMAZONAS BARASANO' },
                { value: '5', option: 'AMAZONAS LETUAMA' },
                { value: '6', option: 'AMAZONAS MAKU' },
                { value: '7', option: 'AMAZONAS ANDOQUE' },
                { value: '8', option: 'AMAZONAS COCAMA' },
                { value: '9', option: 'AMAZONAS BORA' },
                { value: '10', option: 'AMAZONAS MUINANE' },
                { value: '11', option: 'AMAZONAS INGA' },
                { value: '12', option: 'AMAZONAS OCAINA' },
                { value: '13', option: 'AMAZONAS NONUYA' },
                { value: '14', option: 'AMAZONAS MACUNA' },
                { value: '15', option: 'AMAZONAS MIRAÑA' },
                { value: '16', option: 'AMAZONAS MURUI O WITOTO' },
                { value: '17', option: 'AMAZONAS YUKUNA' },
                { value: '18', option: 'AMAZONAS CUBEO' },
                { value: '19', option: 'AMAZONAS PASEÉ' },
                { value: '20', option: 'AMAZONAS TANIMUCA' },
                { value: '21', option: 'AMAZONAS TAIWANO' },
                { value: '22', option: 'AMAZONAS KARIJONA' },
                { value: '23', option: 'AMAZONAS MATAPI' },
                { value: '24', option: 'AMAZONAS TARIANO' },
                { value: '25', option: 'AMAZONAS MURUI O WITOTO' },
                {
                  value: '26',
                  option:
                    'AMAZONAS JURUMI - URTUMI(Pueblo Indígena en Aislamiento)'
                },
                { value: '27', option: 'AMAZONAS YURI' },
                { value: '28', option: 'AMAZONAS YARÍ' },
                { value: '29', option: 'AMAZONAS TICUNA' },
                { value: '30', option: 'ANTIOQUIA CUNA' },
                { value: '31', option: 'ANTIOQUIA EMBERA KATIO' },
                { value: '32', option: 'ANTIOQUIA EMBERA CHAMI' },
                { value: '33', option: 'ANTIOQUIA ZENU' },
                { value: '34', option: 'ANTIOQUIA NUTABE' },
                { value: '35', option: 'ARAUCA UWA' },
                { value: '36', option: 'ARAUCA BETOYE O GUAHIBO' },
                { value: '37', option: 'ARAUCA CHIRICOA' },
                { value: '38', option: 'ARAUCA PIAPOCO' },
                { value: '39', option: 'ARAUCA HITNU O MACAHUAN' },
                { value: '40', option: 'ARAUCA SIKUANI' },
                { value: '41', option: 'ARAUCA CUIBA' },
                { value: '42', option: 'ATLANTICO MOKANA' },
                { value: '43', option: 'BOGOTA PIJAO' },
                { value: '44', option: 'BOGOTA KICHWA' },
                { value: '45', option: 'BOGOTA INGA' },
                { value: '46', option: 'BOGOTA MUISCA' },
                { value: '47', option: 'BOLIVAR ZENU' },
                { value: '48', option: 'BOYACA EMBERA KATIO' },
                { value: '49', option: 'BOYACA EMBERA CHAMI' },
                { value: '50', option: 'BOYACA UWA' },
                { value: '51', option: 'CALDAS EMBERA KATIO' },
                { value: '52', option: 'CALDAS EMBERA CHAMI' },
                { value: '53', option: 'CAQUETA ANDOQUE' },
                { value: '54', option: 'CAQUETA COREGUAJE' },
                { value: '55', option: 'CAQUETA EMBERA CHAMI' },
                { value: '56', option: 'CAQUETA EMBERA KATIO' },
                { value: '57', option: 'CAQUETA INGA' },
                { value: '58', option: 'CAQUETA MISAK' },
                { value: '59', option: 'CAQUETA NASA' },
                { value: '60', option: 'CAQUETA PIJAO' },
                { value: '61', option: 'CAQUETA TUCANO' },
                { value: '62', option: 'CAQUETA PIRATAPUYO' },
                { value: '63', option: 'CAQUETA MURUI O WITOTO' },
                { value: '64', option: 'CAQUETA MACAGUAJE' },
                { value: '65', option: 'CASANARE MASIGUARE' },
                { value: '66', option: 'CASANARE AMORUA' },
                { value: '67', option: 'CASANARE CUIBA' },
                { value: '68', option: 'CASANARE BETOYE O GUAHIBO' },
                { value: '69', option: 'CASANARE SALIVA' },
                { value: '70', option: 'CASANARE TSIRIPU' },
                { value: '71', option: 'CASANARE PIAPOCO' },
                { value: '72', option: 'CASANARE YAMALERO' },
                { value: '73', option: 'CASANARE WIPIGUI' },
                { value: '74', option: 'CASANARE NASA' },
                { value: '75', option: 'CASANARE YARURO' },
                { value: '76', option: 'CASANARE UWA' },
                { value: '77', option: 'CAUCA CHAPA' },
                { value: '78', option: 'CAUCA AMBALO' },
                { value: '79', option: 'CAUCA EMBERA CHAMI' },
                { value: '80', option: 'CAUCA EPERARA SIAPIDARA' },
                { value: '81', option: 'CAUCA MISAK' },
                { value: '82', option: 'CAUCA INGA' },
                { value: '83', option: 'CAUCA KIZGO' },
                { value: '84', option: 'CAUCA KOKONUCO' },
                { value: '85', option: 'CAUCA YANACONA' },
                { value: '86', option: 'CAUCA NASA' },
                { value: '87', option: 'CAUCA TOTORO' },
                { value: '88', option: 'CAUCA POLINDARA' },
                { value: '89', option: 'CESAR ARHUACO' },
                { value: '90', option: 'CESAR WIWA' },
                { value: '91', option: 'CESAR YUKPA' },
                { value: '92', option: 'CESAR KOGUI' },
                { value: '93', option: 'CESAR KANKUAMO' },
                { value: '94', option: 'CESAR CHIMILA' },
                { value: '95', option: 'CHOCO CUNA' },
                { value: '96', option: 'CHOCO EMBERA CHAMI' },
                { value: '97', option: 'CHOCO EMBERA KATIO' },
                { value: '98', option: 'CHOCO WAUNANN' },
                { value: '99', option: 'CHOCO ZENU' },
                { value: '100', option: 'CORDOBA ZENU' },
                { value: '101', option: 'CORDOBA EMBERA KATIO' },
                { value: '102', option: 'CUNDINAMARCA MUISCA' },
                { value: '103', option: 'CUNDINAMARCA KICHWA' },
                { value: '104', option: "CUNDINAMARCA JE'ERURIWA" },
                { value: '105', option: 'CUNDINAMARCA YUKUNA' },
                { value: '106', option: 'CUNDINAMARCA MATAPI' },
                { value: '107', option: 'CUNDINAMARCA MACUNA' },
                { value: '108', option: 'CUNDINAMARCA YAUNA' },
                { value: '109', option: 'GUAINIA CURRIPACO O  BANIVA' },
                { value: '110', option: 'GUAINIA GUANANO' },
                { value: '111', option: 'GUAINIA PUINAVE' },
                { value: '112', option: 'GUAINIA CUBEO' },
                { value: '113', option: 'GUAINIA DESANO' },
                { value: '114', option: 'GUAINIA TUCANO' },
                { value: '115', option: 'GUAINIA PIRATAPUYO' },
                { value: '116', option: 'GUAINIA PIAPOCO' },
                { value: '117', option: 'GUAINIA GUARIQUEMA' },
                { value: '118', option: 'GUAINIA SIKUANI' },
                { value: '119', option: 'GUAINIA NUKAK' },
                { value: '120', option: 'GUAJIRA WAYUU' },
                { value: '121', option: 'GUAJIRA KOGUI' },
                { value: '122', option: 'GUAJIRA WIWA' },
                { value: '123', option: 'GUAJIRA ARHUACO' },
                { value: '124', option: 'GUAJIRA CARIACHIL' },
                { value: '125', option: 'GUAVIARE KARIJONA' },
                { value: '126', option: 'GUAVIARE CUBEO' },
                { value: '127', option: 'GUAVIARE DESANO' },
                { value: '128', option: 'GUAVIARE TUYUCA' },
                { value: '129', option: 'GUAVIARE SIRIANO' },
                { value: '130', option: 'GUAVIARE GUANANO' },
                { value: '131', option: 'GUAVIARE PIRATAPUYO' },
                { value: '132', option: 'GUAVIARE TARIANO' },
                { value: '133', option: 'GUAVIARE CURRIPACO O  BANIVA' },
                { value: '134', option: 'GUAVIARE YURITI' },
                { value: '135', option: 'GUAVIARE BETOYE O GUAHIBO' },
                { value: '136', option: 'GUAVIARE KARAPANA' },
                { value: '137', option: 'GUAVIARE NUKAK' },
                { value: '138', option: 'GUAVIARE PUINAVE' },
                { value: '139', option: 'GUAVIARE SIKUANI' },
                { value: '140', option: 'HUILA MISAK' },
                { value: '141', option: 'HUILA NASA' },
                { value: '142', option: 'HUILA ANDAQUI' },
                { value: '143', option: 'HUILA PIJAO' },
                { value: '144', option: 'HUILA TAMAS (DUJOS DEPANIQUITA)' },
                { value: '145', option: 'HUILA YANACONA' },
                { value: '146', option: 'MAGDALENA ARHUACO' },
                { value: '147', option: 'MAGDALENA CHIMILA' },
                { value: '148', option: 'MAGDALENA KOGUI' },
                { value: '149', option: 'MAGDALENA WIWA' },
                { value: '150', option: 'META ACHAGUA' },
                { value: '151', option: 'META EMBERA CHAMI' },
                { value: '152', option: 'META EMBERA KATIO' },
                { value: '153', option: 'META BETOYE O GUAHIBO' },
                { value: '154', option: 'META PIAPOCO' },
                { value: '155', option: 'META GUANANO' },
                { value: '156', option: 'META GUAYABERO O JIW' },
                { value: '157', option: 'META INGA' },
                { value: '158', option: 'META MISAK' },
                { value: '159', option: 'META NASA' },
                { value: '160', option: 'META SALIVA' },
                { value: '161', option: 'META SIKUANI' },
                { value: '162', option: 'META MURUI O WITOTO' },
                { value: '163', option: 'META TATUYO' },
                { value: '164', option: 'META BORA' },
                { value: '165', option: 'NARIÑO AWA' },
                { value: '166', option: 'NARIÑO EPERARA SIAPIDARA' },
                { value: '167', option: 'NARIÑO INGA' },
                { value: '168', option: 'NARIÑO KOFAN' },
                { value: '169', option: 'NARIÑO NASA' },
                { value: '170', option: 'NARIÑO PASTO' },
                { value: '171', option: 'NARIÑO QUILLASINGA' },
                { value: '172', option: 'NORTE DE SANTANDER MOTILON BARI' },
                { value: '173', option: 'NORTE DE SANTANDER UWA' },
                { value: '174', option: 'PUTUMAYO AWA' },
                { value: '175', option: 'PUTUMAYO INGA' },
                { value: '176', option: 'PUTUMAYO KATMENSA' },
                { value: '177', option: 'PUTUMAYO COREGUAJE' },
                { value: '178', option: 'PUTUMAYO EMBERA CHAMI' },
                { value: '179', option: 'PUTUMAYO EMBERA KATIO' },
                { value: '180', option: 'PUTUMAYO KICHWA' },
                { value: '181', option: 'PUTUMAYO KOFAN' },
                { value: '182', option: 'PUTUMAYO MURUI O WITOTO' },
                { value: '183', option: 'PUTUMAYO MUINANE' },
                { value: '184', option: 'PUTUMAYO NASA' },
                { value: '185', option: 'PUTUMAYO PASTO' },
                { value: '186', option: 'PUTUMAYO SIONA' },
                { value: '187', option: 'PUTUMAYO YANACONA' },
                { value: '188', option: 'QUINDIO EMBERA CHAMI' },
                { value: '189', option: 'RISARALDA EMBERA CHAMI' },
                { value: '190', option: 'RISARALDA EMBERA KATIO' },
                { value: '191', option: 'SANTANDER UWA' },
                { value: '192', option: 'SANTANDER EMBERA CHAMI' },
                { value: '193', option: 'SUCRE ZENU' },
                { value: '194', option: 'TOLIMA NASA' },
                { value: '195', option: 'TOLIMA PIJAO' },
                { value: '196', option: 'VALLE DEL CAUCA EMBERA CHAMI' },
                { value: '197', option: 'VALLE DEL CAUCA EPERARA SIAPIDARA' },
                { value: '198', option: 'VALLE DEL CAUCA NASA' },
                { value: '199', option: 'VALLE DEL CAUCA PASTO' },
                { value: '200', option: 'VALLE DEL CAUCA WAUNANN' },
                { value: '201', option: 'VAUPES CUBEO' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '64.comunidad_o_pueblo_indigena-5032303e-42da-4837-b3e7-e6d2634601b9',
              value: null,
              orden: 15
            },
            {
              label: '65.Reconoce alguna discapacidad',
              type: 'select',
              options: [
                { value: '1', option: 'Física' },
                { value: '2', option: 'Auditiva' },
                { value: '3', option: 'Visual' },
                { value: '4', option: 'Sordoceguera' },
                { value: '5', option: 'Intelectual' },
                { value: '6', option: 'Psicosocial (mental)' },
                { value: '7', option: 'Múltiple' },
                { value: '8', option: 'Otra' },
                { value: '9', option: 'Ninguna' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '65.reconoce_alguna_discapacidad-de57312c-8694-4044-8b39-db33893d7434',
              value: null,
              orden: 16
            }
          ]
        },
        {
          id: 31,
          title: '3.2 Situaciones o condiciones de salud',
          subtitle: null,
          orden: 1,
          ficha_tipo_id: 2,
          createdAt: '2024-04-15T02:17:39.231Z',
          updatedAt: '2024-04-15T02:17:39.231Z',
          values: [
            {
              label:
                '66.El integrante de la familia presenta situaciones o condiciones de salud crónicas*',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '66.el_integrante_de_la_familia_presenta_situaciones_o_condiciones_de_salud_cronicas*-aaf68945-3776-498f-9d9e-391fbc7272f8',
              value: null,
              orden: 0
            },
            {
              label:
                '67.Cumple con el esquema de atenciones de promoción y mantenimiento para el momento de curso de vida o para la gestación*',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '67.cumple_con_el_esquema_de_atenciones_de_promocion_y_mantenimiento_para_el_momento_de_curso_de_vida_o_para_la_gestacion*-00bf9a6c-b3ec-419b-8b64-f86d3b5cbc2e',
              value: null,
              orden: 1
            },
            {
              label:
                '68.Intervenciones pendientes de promoción y mantenimiento de la salud*',
              type: 'select',
              options: [
                { value: '1', option: 'Valoración Integral para la PYMS' },
                {
                  value: '2',
                  option:
                    'Valoración integral por profesional en odontología para la PYMS'
                },
                {
                  value: '3',
                  option: 'Promoción y apoyo a la lactancia materna'
                },
                { value: '4', option: 'Aplicación de flúor' },
                {
                  value: '5',
                  option: 'Profilaxis y remoción de placa bacteriana'
                },
                {
                  value: '6',
                  option: 'Vacunación de acuerdo con el esquema'
                },
                {
                  value: '7',
                  option: 'Fortificación casera con micronutrientes en polvo'
                },
                { value: '8', option: 'Suplementación con micronutrientes' },
                {
                  value: '9',
                  option: 'Desparasitación intestinal antihelmíntica'
                },
                {
                  value: '10',
                  option: 'Tamizaje para anemia - Hemoglobina y hematocrito'
                },
                {
                  value: '11',
                  option: 'Planificación familiar y anticoncepción'
                },
                { value: '12', option: 'Tamizaje de riesgo cardiovascular' },
                {
                  value: '13',
                  option:
                    'Tamizaje para ITS (Infecciones de Transmisión Sexual)'
                },
                {
                  value: '14',
                  option: 'Tamizaje para cáncer de cuello uterino'
                },
                { value: '15', option: 'Tamizaje para cáncer de mama' },
                { value: '16', option: 'Tamizaje para cáncer de próstata' },
                {
                  value: '17',
                  option: 'Tamizaje para cáncer de colon y recto'
                },
                {
                  value: '18',
                  option: 'Atención para el cuidado preconcepcional'
                },
                {
                  value: '19',
                  option:
                    'Atención para el cuidado prenatal – Controles prenatales'
                },
                {
                  value: '20',
                  option: 'Curso de preparación para la maternidad y paternidad'
                },
                {
                  value: '21',
                  option: 'Interrupción Voluntaria del Embarazo'
                },
                { value: '22', option: 'Atención del puerperio' },
                {
                  value: '23',
                  option: 'Atención para el seguimiento del recién nacido'
                },
                {
                  value: '24',
                  option: 'Preparación para la maternidad y la paternidad'
                },
                { value: '25', option: 'Educación para la salud' },
                { value: '26', option: 'Ninguno' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '68.intervenciones_pendientes_de_promocion_y_mantenimiento_de_la_salud*-bf55e230-e717-42ee-ab1f-e85cb59ac54a',
              value: null,
              orden: 2
            },
            {
              label:
                '69.Motivo por el cual no ha recibido las atenciones de promoción y mantenimiento de la salud',
              type: 'select',
              options: [
                {
                  value: '1',
                  option:
                    'Lugar de atención lejano, cerrado o ausencia del profesional de salud'
                },
                { value: '2', option: 'Horarios de atención restringidos' },
                { value: '3', option: 'Largos tiempos de espera' },
                {
                  value: '4',
                  option: 'No había disponibilidad de la tecnología'
                },
                { value: '5', option: 'Falta de tiempo del cuidador' },
                { value: '6', option: 'Tratamiento con remedios caseros' },
                {
                  value: '7',
                  option: 'Rechazo de la atención por tradición o cultura'
                },
                { value: '8', option: 'No afiliado' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '69.motivo_por_el_cual_no_ha_recibido_las_atenciones_de_promocion_y_mantenimiento_de_la_salud-75c1f88e-2025-47d7-8fd6-d33e2da55a5c',
              value: null,
              orden: 3
            },
            {
              label:
                '70.Realiza  alguna práctica deportiva o realiza ejercicio ?',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '70.realiza_alguna_practica_deportiva_o_realiza_ejercicio_?-889777b5-84c9-4728-a44c-db6201113e6d',
              value: null,
              orden: 4
            },
            {
              label:
                '71.Si es menor de 6 meses, ¿recibe lactancia materna exclusiva?',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '71.si_es_menor_de_6_meses,_¿recibe_lactancia_materna_exclusiva?-bb08667b-5e2e-4127-938e-f9c5756e61b3',
              value: null,
              orden: 5
            },
            {
              label:
                '72.Si es menor de 2 años, ¿hasta cuando recibió lactancia materna? (en meses)',
              type: 'select',
              options: [
                { value: '1', option: '1' },
                { value: '2', option: '2' },
                { value: '3', option: '3' },
                { value: '4', option: '4' },
                { value: '5', option: '5' },
                { value: '6', option: '6' },
                { value: '7', option: '7' },
                { value: '8', option: '8' },
                { value: '9', option: '9' },
                { value: '10', option: '10' },
                { value: '11', option: '11' },
                { value: '12', option: '12' },
                { value: '13', option: '13' },
                { value: '14', option: '14' },
                { value: '15', option: '15' },
                { value: '16', option: '16' },
                { value: '17', option: '17' },
                { value: '18', option: '18' },
                { value: '19', option: '19' },
                { value: '20', option: '20' },
                { value: '21', option: '21' },
                { value: '22', option: '22' },
                { value: '23', option: '23' },
                { value: '24', option: '24' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '72.si_es_menor_de_2_anos,_¿hasta_cuando_recibio_lactancia_materna?_(en_meses)-3f062577-67f0-488d-8cd8-64d096052d7e',
              value: null,
              orden: 6
            },
            {
              label: '73.Es menor de 5 años?',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '73.es_menor_de_5_anos?-23a3b9a7-7739-4696-8a19-73fe419af91b',
              value: null,
              orden: 7
            },
            {
              label: 'Peso(kg)',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: 'peso(kg)-4e2d2272-d073-4686-93fa-41f2b8e0f11f',
              value: null,
              orden: 8
            },
            {
              label: 'Talla(cm)',
              type: 'numbers',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: 'talla(cm)-02211b45-dc3a-4ebf-9825-bac120809bd5',
              value: null,
              orden: 9
            },
            {
              label: '75.Diagnóstico nutricional inidicador Peso para la talla',
              type: 'select',
              options: [
                { value: '1', option: 'Obesidad' },
                { value: '2', option: 'Sobrepeso' },
                { value: '3', option: 'Riesgo de Sobrepeso' },
                { value: '4', option: 'Peso Adecuado para la Talla' },
                { value: '5', option: 'Riesgo de Desnutrición Aguda' },
                { value: '6', option: 'Desnutrición Aguda Moderada' },
                { value: '7', option: 'Desnutrición Aguda Severa' }
              ],
              default: null,
              visibility: true,
              required: false,
              columnName:
                '75.diagnostico_nutricional_inidicador_peso_para_la_talla-0eed4d84-d9c3-488c-bc86-913ee5b2d111',
              value: null,
              orden: 10
            },
            {
              label:
                '76.Medida complementaria identificación de riesgo de muerte por desnutrición aguda , Perimetro Braquial',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '76.medida_complementaria_identificacion_de_riesgo_de_muerte_por_desnutricion_aguda_,_perimetro_braquial-69d2cbd9-3688-42ef-b567-55175eb428c2',
              value: null,
              orden: 11
            },
            {
              label: '77.Se identifican signos físicos de desnutrición aguda',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName:
                '77.se_identifican_signos_fisicos_de_desnutricion_aguda_-d8f63a23-5dd2-49de-97a7-4fa4068ed27a',
              value: null,
              orden: 12
            },
            {
              label:
                '78. ¿Actualmente presenta o ha presentado en el último mes alguna enfermedad como: Diarrea o soltura de estomago Tos, resfriado, gripa, bronquitis o pulmonía? Problemas de piel / alergias, accidente casero, familiar o escolar. Alguna otra enfermedad.',
              type: 'check',
              options: { valueTrue: 'Sí', valueFalse: 'No' },
              default: 'No',
              visibility: true,
              required: false,
              columnName:
                '78._¿actualmente_presenta_o_ha_presentado_en_el_ultimo_mes_alguna_enfermedad_como:_diarrea_o_soltura_de_estomago_tos,_resfriado,_gripa,_bronquitis_o_pulmonia?_problemas_de_piel_/_alergias,_accidente_casero,_familiar_o_escolar._alguna_otra_enfermedad._-326c0592-74dc-4ea1-8b46-e0d9142f2967',
              value: null,
              orden: 13
            },
            {
              label: '¿Cuáles?',
              type: 'text',
              options: null,
              default: null,
              visibility: true,
              required: false,
              columnName: '¿cuales?-f972dba0-f6e1-41b2-bb33-2e8298b30c77',
              value: null,
              orden: 14
            }
          ]
        },
        {
          id: 34,
          title: 'Rutas de atención',
          subtitle: null,
          orden: 2,
          ficha_tipo_id: 2,
          createdAt: '2024-05-19T14:36:47.660Z',
          updatedAt: '2024-05-19T14:36:47.660Z',
          values: [
            {
              label: 'Promoción de la Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'promocion_de_la_salud_-aec96414-d6f6-471d-b6d0-9769fb7e1965',
              default: null,
              value: null,
              orden: 0
            },
            {
              label:
                'Fomenta prácticas de crianza saludable, la lactancia materna exclusiva durante los primeros 6 meses, la alimentación complementaria adecuada, la vacunación según el esquema nacional, y la educación en hábitos saludables.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'fomenta_practicas_de_crianza_saludable,_la_lactancia_materna_exclusiva_durante_los_primeros_6_meses,_la_alimentacion_complementaria_adecuada,_la_vacunacion_segun_el_esquema_nacional,_y_la_educacion_en_habitos_saludables.-0a8048bf-5845-403b-adae-e31d8a354cb9',
              default: null,
              value: null,
              orden: 1
            },
            {
              label: 'Prevención de Enfermedades',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'prevencion_de_enfermedades_-2eee58c5-c545-47d1-970a-747e27e62725',
              default: null,
              value: null,
              orden: 2
            },
            {
              label:
                'Realización de controles de crecimiento y desarrollo, vacunación completa y oportuna, suplementación con micronutrientes, tamizajes de enfermedades metabólicas y auditivas al nacer, y educación a los padres sobre signos de alarma.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'realizacion_de_controles_de_crecimiento_y_desarrollo,_vacunacion_completa_y_oportuna,_suplementacion_con_micronutrientes,_tamizajes_de_enfermedades_metabolicas_y_auditivas_al_nacer,_y_educacion_a_los_padres_sobre_signos_de_alarma.-a39b78c3-e893-4424-948c-8b1c876af23d',
              default: null,
              value: null,
              orden: 3
            },
            {
              label: 'Atención Integral a Enfermedades Prevalentes',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'atencion_integral_a_enfermedades_prevalentes_-d2fa7b9a-7ae2-424d-9315-cab03c49b566',
              default: null,
              value: null,
              orden: 4
            },
            {
              label:
                'Diagnóstico temprano y tratamiento oportuno de enfermedades comunes en la infancia como infecciones respiratorias agudas, enfermedades diarreicas, desnutrición, y seguimiento en casos de enfermedades crónicas o congénitas.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'diagnostico_temprano_y_tratamiento_oportuno_de_enfermedades_comunes_en_la_infancia_como_infecciones_respiratorias_agudas,_enfermedades_diarreicas,_desnutricion,_y_seguimiento_en_casos_de_enfermedades_cronicas_o_congenitas.-f6d7b8e7-d42e-4cd5-aa07-c1eeb38024d6',
              default: null,
              value: null,
              orden: 5
            },
            {
              label: 'Salud Mental',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_mental_-71b6546c-0b80-47a5-9eca-6c41b26ba454',
              default: null,
              value: null,
              orden: 6
            },
            {
              label:
                'Evaluación y seguimiento del desarrollo psicomotor, identificación temprana de problemas del desarrollo, apoyo psicosocial a las familias, y promoción de ambientes familiares y escolares saludables.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'evaluacion_y_seguimiento_del_desarrollo_psicomotor,_identificacion_temprana_de_problemas_del_desarrollo,_apoyo_psicosocial_a_las_familias,_y_promocion_de_ambientes_familiares_y_escolares_saludables.-b66de494-f07c-4439-8562-ac6fcbb046bd',
              default: null,
              value: null,
              orden: 7
            },
            {
              label: 'Salud Bucal',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_bucal_-0c01b312-c260-411f-9803-a10017e0dc3f',
              default: null,
              value: null,
              orden: 8
            },
            {
              label:
                'Promoción de la higiene oral desde la erupción del primer diente, aplicación de flúor y sellantes, educación a los padres sobre prácticas adecuadas de alimentación y cuidado bucal.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'promocion_de_la_higiene_oral_desde_la_erupcion_del_primer_diente,_aplicacion_de_fluor_y_sellantes,_educacion_a_los_padres_sobre_practicas_adecuadas_de_alimentacion_y_cuidado_bucal.-60f5a5f6-376b-43db-a417-c9e92b9aae17',
              default: null,
              value: null,
              orden: 9
            },
            {
              label: 'Salud Visual y Auditiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_visual_y_auditiva_-54f2dfb5-1c3c-4a9d-8bb8-3c39884dccc2',
              default: null,
              value: null,
              orden: 10
            },
            {
              label:
                'Tamizaje auditivo y visual, seguimiento y tratamiento de problemas detectados, y orientación a los padres sobre la importancia del cuidado de la visión y la audición desde temprana edad.',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'tamizaje_auditivo_y_visual,_seguimiento_y_tratamiento_de_problemas_detectados,_y_orientacion_a_los_padres_sobre_la_importancia_del_cuidado_de_la_vision_y_la_audicion_desde_temprana_edad.-504d1eba-d72a-46d8-91a2-70527e012f97',
              default: null,
              value: null,
              orden: 11
            },
            {
              label: 'Salud Sexual y Reproductiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_sexual_y_reproductiva_-205467d2-1396-4180-a34c-8ba17c5c29ef',
              default: null,
              value: null,
              orden: 12
            },
            {
              label:
                'Orientación a los padres sobre la importancia de la educación sexual desde temprana edad, prevención del abuso sexual, y promoción del afecto y el respeto en las relaciones familiares.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'orientacion_a_los_padres_sobre_la_importancia_de_la_educacion_sexual_desde_temprana_edad,_prevencion_del_abuso_sexual,_y_promocion_del_afecto_y_el_respeto_en_las_relaciones_familiares.-fac4f0fa-a4cf-4439-9219-57b14cf345bb',
              default: null,
              value: null,
              orden: 13
            },
            {
              label: 'Educación en Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_-f706c036-e291-4474-b4fd-43ccc077f022',
              default: null,
              value: null,
              orden: 14
            },
            {
              label:
                'Capacitación a los padres y cuidadores en temas de salud infantil, nutrición, estimulación temprana, prevención de accidentes y promoción de la salud en el hogar y la comunidad.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'capacitacion_a_los_padres_y_cuidadores_en_temas_de_salud_infantil,_nutricion,_estimulacion_temprana,_prevencion_de_accidentes_y_promocion_de_la_salud_en_el_hogar_y_la_comunidad.-d1c67cf4-223c-4099-bae5-e2adb88da3a0',
              default: null,
              value: null,
              orden: 15
            },
            {
              label: 'Vigilancia Epidemiológica',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'vigilancia_epidemiologica_-fb67cb6d-d5a0-465b-b68f-bf89ab0c7ea8',
              default: null,
              value: null,
              orden: 16
            },
            {
              label:
                'Monitoreo constante de los indicadores de salud infantil, reporte de enfermedades de notificación obligatoria, y implementación de acciones de control de brotes y epidemias.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'monitoreo_constante_de_los_indicadores_de_salud_infantil,_reporte_de_enfermedades_de_notificacion_obligatoria,_y_implementacion_de_acciones_de_control_de_brotes_y_epidemias.-e5ffabc2-c3fc-4c76-b065-4ea60217ffa4',
              default: null,
              value: null,
              orden: 17
            },
            {
              label: 'Infancia (6-11 años)',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'infancia_(6-11_anos)-21cc7ef2-3e47-451b-8b1a-ef2d57453204',
              default: null,
              value: null,
              orden: 18
            },
            {
              label: 'Promoción de la Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'promocion_de_la_salud_-0058c095-704a-4374-8cac-64f29d50aa4d',
              default: null,
              value: null,
              orden: 19
            },
            {
              label:
                'Fomento de hábitos saludables, educación en nutrición equilibrada, promoción de la actividad física regular, y continuidad de esquemas de vacunación.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'fomento_de_habitos_saludables,_educacion_en_nutricion_equilibrada,_promocion_de_la_actividad_fisica_regular,_y_continuidad_de_esquemas_de_vacunacion.-66eb1bde-8bfb-4f37-aeb0-9f1de6e892fc',
              default: null,
              value: null,
              orden: 20
            },
            {
              label: 'Prevención de Enfermedades',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'prevencion_de_enfermedades_-4090caef-304d-4682-af6b-9c133797fa85',
              default: null,
              value: null,
              orden: 21
            },
            {
              label:
                'Controles de crecimiento y desarrollo, vacunación según el esquema nacional, tamizajes para detectar problemas de salud (como anemia, desnutrición, y enfermedades infecciosas), y promoción de higiene personal y ambiental.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_de_crecimiento_y_desarrollo,_vacunacion_segun_el_esquema_nacional,_tamizajes_para_detectar_problemas_de_salud_(como_anemia,_desnutricion,_y_enfermedades_infecciosas),_y_promocion_de_higiene_personal_y_ambiental.-0c00f4ba-7d18-4cca-a34e-e03b835207d1',
              default: null,
              value: null,
              orden: 22
            },
            {
              label: 'Atención Integral a Enfermedades Prevalentes',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'atencion_integral_a_enfermedades_prevalentes_-326f7361-3019-40d5-ac09-eeb3e0832e06',
              default: null,
              value: null,
              orden: 23
            },
            {
              label:
                'Diagnóstico y tratamiento de enfermedades comunes en esta etapa (como infecciones respiratorias, enfermedades diarreicas, y problemas dermatológicos), y manejo integral de enfermedades crónicas o discapacidades.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'diagnostico_y_tratamiento_de_enfermedades_comunes_en_esta_etapa_(como_infecciones_respiratorias,_enfermedades_diarreicas,_y_problemas_dermatologicos),_y_manejo_integral_de_enfermedades_cronicas_o_discapacidades.-d7e55c9d-7645-4403-be05-c01cf075255b',
              default: null,
              value: null,
              orden: 24
            },
            {
              label: 'Salud Mental',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_mental_-6e24c76e-7d04-4cd2-b680-5a61ca6a76c4',
              default: null,
              value: null,
              orden: 25
            },
            {
              label:
                'Evaluación periódica del desarrollo emocional y comportamental, identificación temprana de problemas de salud mental (como ansiedad, depresión, y trastornos de conducta), y apoyo psicosocial a niños y familias.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'evaluacion_periodica_del_desarrollo_emocional_y_comportamental,_identificacion_temprana_de_problemas_de_salud_mental_(como_ansiedad,_depresion,_y_trastornos_de_conducta),_y_apoyo_psicosocial_a_ninos_y_familias.-9c5c27d8-87d7-42f9-a5b4-9c416b8cd7f5',
              default: null,
              value: null,
              orden: 26
            },
            {
              label: 'Salud Bucal',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_bucal_-465ce86d-5b5c-4569-bf8f-a5304fa8f6ac',
              default: null,
              value: null,
              orden: 27
            },
            {
              label:
                'Controles odontológicos regulares, educación en higiene oral, aplicación de flúor y sellantes, y promoción de prácticas adecuadas de alimentación para prevenir caries y enfermedades periodontales.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_odontologicos_regulares,_educacion_en_higiene_oral,_aplicacion_de_fluor_y_sellantes,_y_promocion_de_practicas_adecuadas_de_alimentacion_para_prevenir_caries_y_enfermedades_periodontales.-825ecb15-f9ab-43de-88c8-f181178360fd',
              default: null,
              value: null,
              orden: 28
            },
            {
              label: 'Salud Visual y Auditiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_visual_y_auditiva_-57da4d13-e054-4e3f-8c5d-af694f901ec0',
              default: null,
              value: null,
              orden: 29
            },
            {
              label:
                'Tamizajes visuales y auditivos, seguimiento y tratamiento de problemas detectados, y orientación sobre la importancia del cuidado visual y auditivo.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'tamizajes_visuales_y_auditivos,_seguimiento_y_tratamiento_de_problemas_detectados,_y_orientacion_sobre_la_importancia_del_cuidado_visual_y_auditivo.-f5fda164-1539-487a-a6e6-b0d6df8dc4d9',
              default: null,
              value: null,
              orden: 30
            },
            {
              label: 'Salud Sexual y Reproductiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_sexual_y_reproductiva_-960db556-d8f9-4168-b7e6-68125e2a3f16',
              default: null,
              value: null,
              orden: 31
            },
            {
              label:
                'Educación en salud sexual y reproductiva adecuada para la edad, prevención del abuso sexual, promoción del respeto y la afectividad en las relaciones, y orientación a los padres sobre cómo abordar estos temas con sus hijos.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_sexual_y_reproductiva_adecuada_para_la_edad,_prevencion_del_abuso_sexual,_promocion_del_respeto_y_la_afectividad_en_las_relaciones,_y_orientacion_a_los_padres_sobre_como_abordar_estos_temas_con_sus_hijos.-3f5f0555-4021-49ad-b006-0d25449b4124',
              default: null,
              value: null,
              orden: 32
            },
            {
              label: 'Seguridad y Protección Social',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'seguridad_y_proteccion_social_-d3f67da1-1f55-4382-8cea-7991b039f2d2',
              default: null,
              value: null,
              orden: 33
            },
            {
              label:
                'Identificación y prevención de riesgos de violencia, maltrato, acoso escolar y explotación, activación de rutas de protección en casos de vulneración de derechos, y creación de entornos seguros y protectores.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'identificacion_y_prevencion_de_riesgos_de_violencia,_maltrato,_acoso_escolar_y_explotacion,_activacion_de_rutas_de_proteccion_en_casos_de_vulneracion_de_derechos,_y_creacion_de_entornos_seguros_y_protectores.-8ddfa941-314d-46fd-88c9-858c04e266e5',
              default: null,
              value: null,
              orden: 34
            },
            {
              label: 'Educación en Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_-8ceead3a-1b31-4c0c-8c5b-27e0198c83cf',
              default: null,
              value: null,
              orden: 35
            },
            {
              label:
                'Capacitación a niños y cuidadores en temas de salud, nutrición, actividad física, prevención de enfermedades, y promoción de hábitos saludables tanto en el hogar como en la escuela.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'capacitacion_a_ninos_y_cuidadores_en_temas_de_salud,_nutricion,_actividad_fisica,_prevencion_de_enfermedades,_y_promocion_de_habitos_saludables_tanto_en_el_hogar_como_en_la_escuela.-9d953543-a336-4bb0-a112-f594b0d0f4e7',
              default: null,
              value: null,
              orden: 36
            },
            {
              label: 'Vigilancia Epidemiológica',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'vigilancia_epidemiologica_-5d8e945b-bec2-4079-bfd8-c6b57a43175d',
              default: null,
              value: null,
              orden: 37
            },
            {
              label:
                'Monitoreo de indicadores de salud infantil, reporte de enfermedades de notificación obligatoria, implementación de acciones de control de brotes y epidemias, y análisis de tendencias epidemiológicas para la toma de decisiones.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'monitoreo_de_indicadores_de_salud_infantil,_reporte_de_enfermedades_de_notificacion_obligatoria,_implementacion_de_acciones_de_control_de_brotes_y_epidemias,_y_analisis_de_tendencias_epidemiologicas_para_la_toma_de_decisiones.-2d383f23-7d74-4033-8b3e-6534b312d4d2',
              default: null,
              value: null,
              orden: 38
            },
            {
              label: 'Adolescencia',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'adolescencia-394d8edb-a89e-4702-a9c9-976c180e958d',
              default: null,
              value: null,
              orden: 39
            },
            {
              label: 'Promoción de la Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'promocion_de_la_salud_-e606e7c5-9ae0-4496-adcd-d1cb0b7266f3',
              default: null,
              value: null,
              orden: 40
            },
            {
              label: 'Adolescencia (12-17 años)',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'adolescencia-87367a5a-6282-4476-bfda-f1c973080508',
              default: null,
              value: null,
              orden: 41
            },
            {
              label: 'Promoción de la Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'promocion_de_la_salud_-a26e48d7-663c-4b02-bc12-283e011e5d21',
              default: null,
              value: null,
              orden: 42
            },
            {
              label:
                'Fomento de hábitos saludables, educación en nutrición y actividad física, prevención de consumo de sustancias psicoactivas, y promoción de la salud sexual y reproductiva.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'fomento_de_habitos_saludables,_educacion_en_nutricion_y_actividad_fisica,_prevencion_de_consumo_de_sustancias_psicoactivas,_y_promocion_de_la_salud_sexual_y_reproductiva.-84416297-4266-4a67-b064-2e98c50c3c1c',
              default: null,
              value: null,
              orden: 43
            },
            {
              label: 'Prevención de Enfermedades',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'prevencion_de_enfermedades_-050ca397-e39e-4c93-ae94-55905c880f8b',
              default: null,
              value: null,
              orden: 44
            },
            {
              label:
                'Controles periódicos de salud, vacunación según el esquema nacional, tamizajes para detectar problemas de salud (como anemia, infecciones de transmisión sexual), y educación en higiene personal y ambiental.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_periodicos_de_salud,_vacunacion_segun_el_esquema_nacional,_tamizajes_para_detectar_problemas_de_salud_(como_anemia,_infecciones_de_transmision_sexual),_y_educacion_en_higiene_personal_y_ambiental.-301aa694-5d61-4d8b-bff4-678881fde19f',
              default: null,
              value: null,
              orden: 45
            },
            {
              label: 'Atención Integral a Enfermedades Prevalentes',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'atencion_integral_a_enfermedades_prevalentes_-4ca3ac8a-5b26-41f3-bc71-6182eff054b3',
              default: null,
              value: null,
              orden: 46
            },
            {
              label:
                'Diagnóstico y tratamiento de enfermedades comunes en esta etapa (como infecciones respiratorias y enfermedades de transmisión sexual), y manejo integral de enfermedades crónicas o trastornos mentales.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'diagnostico_y_tratamiento_de_enfermedades_comunes_en_esta_etapa_(como_infecciones_respiratorias_y_enfermedades_de_transmision_sexual),_y_manejo_integral_de_enfermedades_cronicas_o_trastornos_mentales.-4304330d-d9df-4a21-9229-66c6dc5522aa',
              default: null,
              value: null,
              orden: 47
            },
            {
              label: 'Salud Mental',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_mental_-d4d8b94c-0561-4038-89ce-289d4b2f27c8',
              default: null,
              value: null,
              orden: 48
            },
            {
              label:
                'Evaluación del desarrollo emocional y conductual, identificación temprana de problemas de salud mental (como ansiedad, depresión, y trastornos alimenticios), y apoyo psicosocial a adolescentes y jóvenes.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'evaluacion_del_desarrollo_emocional_y_conductual,_identificacion_temprana_de_problemas_de_salud_mental_(como_ansiedad,_depresion,_y_trastornos_alimenticios),_y_apoyo_psicosocial_a_adolescentes_y_jovenes.-a3f5d93c-86b2-42cc-93e3-a69877bc3eea',
              default: null,
              value: null,
              orden: 49
            },
            {
              label: 'Salud Bucal',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_bucal_-aa2fdeed-5297-4929-b09e-bdf4a6423b37',
              default: null,
              value: null,
              orden: 50
            },
            {
              label:
                'Controles odontológicos regulares, educación en higiene oral, aplicación de flúor y sellantes, y promoción de prácticas adecuadas de alimentación para prevenir caries y enfermedades periodontales.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_odontologicos_regulares,_educacion_en_higiene_oral,_aplicacion_de_fluor_y_sellantes,_y_promocion_de_practicas_adecuadas_de_alimentacion_para_prevenir_caries_y_enfermedades_periodontales.-36d93f87-d06f-4a38-9892-918ccc378551',
              default: null,
              value: null,
              orden: 51
            },
            {
              label: 'Salud Visual y Auditiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_visual_y_auditiva_-8f59aab2-d23f-4412-bc17-974e09252099',
              default: null,
              value: null,
              orden: 52
            },
            {
              label:
                'Tamizajes visuales y auditivos, seguimiento y tratamiento de problemas detectados, y orientación sobre la importancia del cuidado visual y auditivo.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'tamizajes_visuales_y_auditivos,_seguimiento_y_tratamiento_de_problemas_detectados,_y_orientacion_sobre_la_importancia_del_cuidado_visual_y_auditivo.-4d1867d7-9d1d-4e92-9b87-362a398ab7dd',
              default: null,
              value: null,
              orden: 53
            },
            {
              label: 'Salud Sexual y Reproductiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_sexual_y_reproductiva_-55f53f6e-50e7-48ac-b00b-5792d93d0dac',
              default: null,
              value: null,
              orden: 54
            },
            {
              label:
                'Educación en salud sexual y reproductiva, prevención de embarazos no deseados y enfermedades de transmisión sexual, promoción de relaciones afectivas y respetuosas, y orientación sobre métodos anticonceptivos.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_sexual_y_reproductiva,_prevencion_de_embarazos_no_deseados_y_enfermedades_de_transmision_sexual,_promocion_de_relaciones_afectivas_y_respetuosas,_y_orientacion_sobre_metodos_anticonceptivos.-b9f1e160-9f90-472a-bffb-3cfa0c2d212e',
              default: null,
              value: null,
              orden: 55
            },
            {
              label: 'Seguridad y Protección Social',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'seguridad_y_proteccion_social_-75e48dec-e839-4548-9224-402a8029b67c',
              default: null,
              value: null,
              orden: 56
            },
            {
              label:
                'Identificación y prevención de riesgos de violencia, maltrato, acoso escolar, explotación, y activación de rutas de protección en casos de vulneración de derechos, y promoción de entornos seguros y protectores.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'identificacion_y_prevencion_de_riesgos_de_violencia,_maltrato,_acoso_escolar,_explotacion,_y_activacion_de_rutas_de_proteccion_en_casos_de_vulneracion_de_derechos,_y_promocion_de_entornos_seguros_y_protectores.-5f4a6d03-b291-4705-8024-ef23d8bf6348',
              default: null,
              value: null,
              orden: 57
            },
            {
              label: 'Educación en Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_-b735ae20-78ba-47a1-82d0-bec78ba65d15',
              default: null,
              value: null,
              orden: 58
            },
            {
              label:
                'Capacitación en temas de salud, nutrición, actividad física, prevención de enfermedades, y promoción de hábitos saludables tanto en el hogar como en la comunidad.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'capacitacion_en_temas_de_salud,_nutricion,_actividad_fisica,_prevencion_de_enfermedades,_y_promocion_de_habitos_saludables_tanto_en_el_hogar_como_en_la_comunidad.-74ba32e8-8728-44fe-a99d-9c1f7366ce75',
              default: null,
              value: null,
              orden: 59
            },
            {
              label: 'Vigilancia Epidemiológica',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'vigilancia_epidemiologica_-b9a2c793-3e4b-4441-a1ac-865c7f34872c',
              default: null,
              value: null,
              orden: 60
            },
            {
              label:
                'Monitoreo de indicadores de salud infantil, reporte de enfermedades de notificación obligatoria, implementación de acciones de control de brotes y epidemias, y análisis de tendencias epidemiológicas para la toma de decisiones.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'capacitacion_en_temas_de_salud,_nutricion,_actividad_fisica,_prevencion_de_enfermedades,_y_promocion_de_habitos_saludables_tanto_en_el_hogar_como_en_la_comunidad.-aca28764-b00d-4f3d-bbe3-9fe3f04c3b4c',
              default: null,
              value: null,
              orden: 61
            },
            {
              label: 'Juventud (18-28 años)',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'juventud-65bef87f-4f88-4428-bc47-040d9d89eaf2',
              default: null,
              value: null,
              orden: 62
            },
            {
              label: 'Promoción de la Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'promocion_de_la_salud_-67e1455d-f22a-441b-a25d-c4fa44a81085',
              default: null,
              value: null,
              orden: 63
            },
            {
              label:
                'Fomento de hábitos saludables, educación en nutrición y actividad física, prevención de consumo de sustancias psicoactivas, y promoción de la salud sexual y reproductiva.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'fomento_de_habitos_saludables,_educacion_en_nutricion_y_actividad_fisica,_prevencion_de_consumo_de_sustancias_psicoactivas,_y_promocion_de_la_salud_sexual_y_reproductiva.-d5a943b1-b511-4e9c-88aa-a591e3c02402',
              default: null,
              value: null,
              orden: 64
            },
            {
              label: 'Prevención de Enfermedades',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'prevencion_de_enfermedades_-f182fc99-6d2b-4d19-b594-dc841fb95aa0',
              default: null,
              value: null,
              orden: 65
            },
            {
              label:
                'Controles periódicos de salud, vacunación según el esquema nacional, tamizajes para detectar problemas de salud (como anemia, infecciones de transmisión sexual), y educación en higiene personal y ambiental.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_periodicos_de_salud,_vacunacion_segun_el_esquema_nacional,_tamizajes_para_detectar_problemas_de_salud_(como_anemia,_infecciones_de_transmision_sexual),_y_educacion_en_higiene_personal_y_ambiental.-d4444d99-b8f2-4ff4-ac29-f106e7e2d32c',
              default: null,
              value: null,
              orden: 66
            },
            {
              label: 'Atención Integral a Enfermedades Prevalentes',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'atencion_integral_a_enfermedades_prevalentes_-5a31920b-b3ad-43cb-80b5-02590f55ee47',
              default: null,
              value: null,
              orden: 67
            },
            {
              label:
                'Diagnóstico y tratamiento de enfermedades comunes en esta etapa (como infecciones respiratorias y enfermedades de transmisión sexual), y manejo integral de enfermedades crónicas o trastornos mentales.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'diagnostico_y_tratamiento_de_enfermedades_comunes_en_esta_etapa_(como_infecciones_respiratorias_y_enfermedades_de_transmision_sexual),_y_manejo_integral_de_enfermedades_cronicas_o_trastornos_mentales.-b8c39c69-b1c6-4565-9b9a-da7bfb48a4bc',
              default: null,
              value: null,
              orden: 68
            },
            {
              label: 'Salud Mental',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_mental_-cd685925-f64e-4d3f-afa9-8677c439091e',
              default: null,
              value: null,
              orden: 69
            },
            {
              label:
                'Evaluación del desarrollo emocional y conductual, identificación temprana de problemas de salud mental (como ansiedad, depresión, y trastornos alimenticios), y apoyo psicosocial a adolescentes y jóvenes.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'evaluacion_del_desarrollo_emocional_y_conductual,_identificacion_temprana_de_problemas_de_salud_mental_(como_ansiedad,_depresion,_y_trastornos_alimenticios),_y_apoyo_psicosocial_a_adolescentes_y_jovenes.-d5c0d119-bf7f-429d-b141-e1c5eda8fd75',
              default: null,
              value: null,
              orden: 70
            },
            {
              label: 'Salud Bucal',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_bucal_-3d72c833-8e46-4cca-8d8d-b35d2d695a81',
              default: null,
              value: null,
              orden: 71
            },
            {
              label:
                'Controles odontológicos regulares, educación en higiene oral, aplicación de flúor y sellantes, y promoción de prácticas adecuadas de alimentación para prevenir caries y enfermedades periodontales.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_odontologicos_regulares,_educacion_en_higiene_oral,_aplicacion_de_fluor_y_sellantes,_y_promocion_de_practicas_adecuadas_de_alimentacion_para_prevenir_caries_y_enfermedades_periodontales.-2df164bc-cf24-4a83-97a9-1a7dc299d84e',
              default: null,
              value: null,
              orden: 72
            },
            {
              label: 'Salud Visual y Auditiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_visual_y_auditiva_-97a20b5b-9e18-49c8-882d-7a0db52ab272',
              default: null,
              value: null,
              orden: 73
            },
            {
              label:
                'Tamizajes visuales y auditivos, seguimiento y tratamiento de problemas detectados, y orientación sobre la importancia del cuidado visual y auditivo.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'tamizajes_visuales_y_auditivos,_seguimiento_y_tratamiento_de_problemas_detectados,_y_orientacion_sobre_la_importancia_del_cuidado_visual_y_auditivo.-c06c23fb-c689-4365-b12a-ebca90b07349',
              default: null,
              value: null,
              orden: 74
            },
            {
              label: 'Salud Sexual y Reproductiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_sexual_y_reproductiva_-054a9ed3-7164-45aa-8017-a7618fdf144c',
              default: null,
              value: null,
              orden: 75
            },
            {
              label:
                'Educación en salud sexual y reproductiva, prevención de embarazos no deseados y enfermedades de transmisión sexual, promoción de relaciones afectivas y respetuosas, y orientación sobre métodos anticonceptivos.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_sexual_y_reproductiva,_prevencion_de_embarazos_no_deseados_y_enfermedades_de_transmision_sexual,_promocion_de_relaciones_afectivas_y_respetuosas,_y_orientacion_sobre_metodos_anticonceptivos.-0056f99c-5a13-4e34-aa57-3f01ed585f96',
              default: null,
              value: null,
              orden: 76
            },
            {
              label: 'Seguridad y Protección Social',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'seguridad_y_proteccion_social_-3f265a8e-cc97-42ee-8ee8-24eec2a16a6a',
              default: null,
              value: null,
              orden: 77
            },
            {
              label:
                'Identificación y prevención de riesgos de violencia, maltrato, acoso escolar, explotación, y activación de rutas de protección en casos de vulneración de derechos, y promoción de entornos seguros y protectores.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'identificacion_y_prevencion_de_riesgos_de_violencia,_maltrato,_acoso_escolar,_explotacion,_y_activacion_de_rutas_de_proteccion_en_casos_de_vulneracion_de_derechos,_y_promocion_de_entornos_seguros_y_protectores.-90142187-6cfe-476f-9832-60a2f1df845c',
              default: null,
              value: null,
              orden: 78
            },
            {
              label: 'Educación en Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_-200c2f2b-c4ee-42fe-aef5-83035acac969',
              default: null,
              value: null,
              orden: 79
            },
            {
              label:
                'Capacitación en temas de salud, nutrición, actividad física, prevención de enfermedades, y promoción de hábitos saludables tanto en el hogar como en la comunidad.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'capacitacion_en_temas_de_salud,_nutricion,_actividad_fisica,_prevencion_de_enfermedades,_y_promocion_de_habitos_saludables_tanto_en_el_hogar_como_en_la_comunidad.-16616561-df52-4d8b-b24b-972fabcc7ffd',
              default: null,
              value: null,
              orden: 80
            },
            {
              label: 'Vigilancia Epidemiológica',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'vigilancia_epidemiologica_-2ef1aa0e-ed76-45ff-8107-0d6078864cf9',
              default: null,
              value: null,
              orden: 81
            },
            {
              label:
                'Monitoreo de indicadores de salud, reporte de enfermedades de notificación obligatoria, implementación de acciones de control de brotes y epidemias, y análisis de tendencias epidemiológicas para la toma de decisiones.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'monitoreo_de_indicadores_de_salud,_reporte_de_enfermedades_de_notificacion_obligatoria,_implementacion_de_acciones_de_control_de_brotes_y_epidemias,_y_analisis_de_tendencias_epidemiologicas_para_la_toma_de_decisiones.-d221aa03-81cf-4ea5-aac3-7aa62803e457',
              default: null,
              value: null,
              orden: 82
            },
            {
              label: 'Adultez (29-59 años)',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'adultez_(29-59_anos)-5e102ae1-4eee-4ad8-b358-ea9a552ce58e',
              default: null,
              value: null,
              orden: 83
            },
            {
              label: 'Promoción de la Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'promocion_de_la_salud_-185c92df-1dcf-47a6-8157-66bffd75ccfe',
              default: null,
              value: null,
              orden: 84
            },
            {
              label:
                'Fomento de estilos de vida saludables, educación en nutrición balanceada, actividad física regular, prevención de consumo de sustancias psicoactivas, y promoción de la salud mental y emocional.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'fomento_de_estilos_de_vida_saludables,_educacion_en_nutricion_balanceada,_actividad_fisica_regular,_prevencion_de_consumo_de_sustancias_psicoactivas,_y_promocion_de_la_salud_mental_y_emocional.-a9e1bfb0-6341-4aea-ade4-a165bc038575',
              default: null,
              value: null,
              orden: 85
            },
            {
              label: 'Prevención de Enfermedades',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'prevencion_de_enfermedades_-49db9c51-443a-4f88-ad05-2e6460c783b1',
              default: null,
              value: null,
              orden: 86
            },
            {
              label:
                'Controles periódicos de salud, vacunación según el esquema nacional, tamizajes para detectar problemas de salud (como hipertensión, diabetes, y cáncer), y educación en higiene personal y ambiental.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_periodicos_de_salud,_vacunacion_segun_el_esquema_nacional,_tamizajes_para_detectar_problemas_de_salud_(como_hipertension,_diabetes,_y_cancer),_y_educacion_en_higiene_personal_y_ambiental.-b5282ae5-9866-4152-b1dd-4f1ef2a93c76',
              default: null,
              value: null,
              orden: 87
            },
            {
              label: 'Atención Integral a Enfermedades Prevalentes',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'atencion_integral_a_enfermedades_prevalentes_-bc3d5bac-8083-42e4-8a11-1e2ace0fed73',
              default: null,
              value: null,
              orden: 88
            },
            {
              label:
                'Diagnóstico y tratamiento de enfermedades comunes (como infecciones, hipertensión, y diabetes), y manejo integral de enfermedades crónicas o condiciones de salud mental.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'diagnostico_y_tratamiento_de_enfermedades_comunes_(como_infecciones,_hipertension,_y_diabetes),_y_manejo_integral_de_enfermedades_cronicas_o_condiciones_de_salud_mental.-27ebdfc5-fc32-471b-9ddb-0bdeea865599',
              default: null,
              value: null,
              orden: 89
            },
            {
              label: 'Salud Mental',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_mental_-18442228-3eae-4e85-9ebd-4181fb133b7f',
              default: null,
              value: null,
              orden: 90
            },
            {
              label:
                'Evaluación del estado emocional y mental, identificación temprana de problemas de salud mental (como ansiedad, depresión, y estrés), y apoyo psicosocial.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'evaluacion_del_estado_emocional_y_mental,_identificacion_temprana_de_problemas_de_salud_mental_(como_ansiedad,_depresion,_y_estres),_y_apoyo_psicosocial.-581a2cd1-fc82-4a3e-aa76-25eaf96a1d94',
              default: null,
              value: null,
              orden: 91
            },
            {
              label: 'Salud Bucal',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_bucal_-4b17f336-a2e4-4b1f-adb7-1a7313fde5c9',
              default: null,
              value: null,
              orden: 92
            },
            {
              label:
                'Controles odontológicos regulares, educación en higiene oral, tratamiento de enfermedades periodontales y caries, y promoción de prácticas adecuadas de alimentación para la salud bucal.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_odontologicos_regulares,_educacion_en_higiene_oral,_tratamiento_de_enfermedades_periodontales_y_caries,_y_promocion_de_practicas_adecuadas_de_alimentacion_para_la_salud_bucal.-92775cad-c69c-4f70-9ffc-c00793470ee2',
              default: null,
              value: null,
              orden: 93
            },
            {
              label: 'Salud Visual y Auditiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_visual_y_auditiva_-ccfba1a4-cc05-4820-a403-311190efb6c5',
              default: null,
              value: null,
              orden: 94
            },
            {
              label:
                'Tamizajes visuales y auditivos, seguimiento y tratamiento de problemas detectados, y orientación sobre la importancia del cuidado visual y auditivo.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'tamizajes_visuales_y_auditivos,_seguimiento_y_tratamiento_de_problemas_detectados,_y_orientacion_sobre_la_importancia_del_cuidado_visual_y_auditivo.-38efbce6-3dff-42d3-8710-6ca49fd92c69',
              default: null,
              value: null,
              orden: 95
            },
            {
              label: 'Salud Sexual y Reproductiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_sexual_y_reproductiva_-10f6d3ce-70c8-4c39-b919-ebd3e86b3215',
              default: null,
              value: null,
              orden: 96
            },
            {
              label:
                'Educación en salud sexual y reproductiva, prevención de enfermedades de transmisión sexual, promoción de relaciones afectivas y respetuosas, y orientación sobre planificación familiar y métodos anticonceptivos.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_sexual_y_reproductiva,_prevencion_de_enfermedades_de_transmision_sexual,_promocion_de_relaciones_afectivas_y_respetuosas,_y_orientacion_sobre_planificacion_familiar_y_metodos_anticonceptivos.-0504c699-2a36-4375-bac0-428a20444d90',
              default: null,
              value: null,
              orden: 97
            },
            {
              label: 'Seguridad y Protección Social',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'seguridad_y_proteccion_social_-8193e9a0-d7ae-432a-9cf7-ede590623865',
              default: null,
              value: null,
              orden: 98
            },
            {
              label:
                'Identificación y prevención de riesgos de violencia, maltrato, explotación, activación de rutas de protección en casos de vulneración de derechos, y promoción de entornos seguros y protectores.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'identificacion_y_prevencion_de_riesgos_de_violencia,_maltrato,_explotacion,_activacion_de_rutas_de_proteccion_en_casos_de_vulneracion_de_derechos,_y_promocion_de_entornos_seguros_y_protectores.-ad095424-79a7-4bd2-89b9-790ea80bb1a2',
              default: null,
              value: null,
              orden: 99
            },
            {
              label: 'Educación en Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_-cb95cfe6-5479-440c-9672-b2d896511311',
              default: null,
              value: null,
              orden: 100
            },
            {
              label:
                'Capacitación en temas de salud, nutrición, actividad física, prevención de enfermedades, y promoción de hábitos saludables tanto en el hogar como en la comunidad.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'capacitacion_en_temas_de_salud,_nutricion,_actividad_fisica,_prevencion_de_enfermedades,_y_promocion_de_habitos_saludables_tanto_en_el_hogar_como_en_la_comunidad.-bb5d40f8-7ad1-45f7-82bc-c293b9868b69',
              default: null,
              value: null,
              orden: 101
            },
            {
              label: 'Vigilancia Epidemiológica',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'vigilancia_epidemiologica_-82288f0b-8ff0-4e10-b17a-e4aca56f815e',
              default: null,
              value: null,
              orden: 102
            },
            {
              label:
                'Monitoreo de indicadores de salud, reporte de enfermedades de notificación obligatoria, implementación de acciones de control de brotes y epidemias, y análisis de tendencias epidemiológicas para la toma de decisiones.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'monitoreo_de_indicadores_de_salud,_reporte_de_enfermedades_de_notificacion_obligatoria,_implementacion_de_acciones_de_control_de_brotes_y_epidemias,_y_analisis_de_tendencias_epidemiologicas_para_la_toma_de_decisiones.-3aa9a5b9-55fc-428c-8f3e-cd4e7a91a81c',
              default: null,
              value: null,
              orden: 103
            },
            {
              label: 'Adulto Mayor (60 años en adelante)',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'adulto_mayor_(60_anos_en_adelante)-158c1575-deea-44f1-ae63-7d025b668f67',
              default: null,
              value: null,
              orden: 104
            },
            {
              label: 'Promoción de la Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'promocion_de_la_salud_-26c5f034-8aea-43f4-b98c-ef0a1fd64372',
              default: null,
              value: null,
              orden: 105
            },
            {
              label:
                'Fomento de estilos de vida saludables, promoción de la actividad física adecuada, alimentación balanceada, y participación social activa.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'fomento_de_estilos_de_vida_saludables,_promocion_de_la_actividad_fisica_adecuada,_alimentacion_balanceada,_y_participacion_social_activa.-c076030a-2c5d-4a38-bb5b-7a04561a8039',
              default: null,
              value: null,
              orden: 106
            },
            {
              label: 'Prevención de Enfermedades',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'prevencion_de_enfermedades_-5026e43a-a9f2-4428-808c-50dee0627d4d',
              default: null,
              value: null,
              orden: 107
            },
            {
              label:
                'Controles periódicos de salud, vacunación según el esquema nacional, tamizajes para detectar problemas de salud (como hipertensión, diabetes, osteoporosis, y cáncer), y educación en higiene personal y ambiental.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_periodicos_de_salud,_vacunacion_segun_el_esquema_nacional,_tamizajes_para_detectar_problemas_de_salud_(como_hipertension,_diabetes,_osteoporosis,_y_cancer),_y_educacion_en_higiene_personal_y_ambiental.-3291409c-c509-449b-896c-e6d654b2388a',
              default: null,
              value: null,
              orden: 108
            },
            {
              label: 'Atención Integral a Enfermedades Prevalentes',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'atencion_integral_a_enfermedades_prevalentes_-3de91032-0953-4ff6-9359-9461fce907eb',
              default: null,
              value: null,
              orden: 109
            },
            {
              label:
                'Diagnóstico y tratamiento de enfermedades comunes en esta etapa (como infecciones, enfermedades crónicas, y enfermedades degenerativas), y manejo integral de condiciones de salud mental.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'diagnostico_y_tratamiento_de_enfermedades_comunes_en_esta_etapa_(como_infecciones,_enfermedades_cronicas,_y_enfermedades_degenerativas),_y_manejo_integral_de_condiciones_de_salud_mental.-852fcd78-0063-4455-a0df-7865917cb8c4',
              default: null,
              value: null,
              orden: 110
            },
            {
              label: 'Salud Mental',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_mental_-51fbda07-c45a-4a44-8803-0ed169998370',
              default: null,
              value: null,
              orden: 111
            },
            {
              label:
                'Evaluación del estado emocional y mental, identificación temprana de problemas de salud mental (como depresión, ansiedad, y demencia), y apoyo psicosocial y psicológico.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'evaluacion_del_estado_emocional_y_mental,_identificacion_temprana_de_problemas_de_salud_mental_(como_depresion,_ansiedad,_y_demencia),_y_apoyo_psicosocial_y_psicologico.-ddb20a9e-de7e-4b3b-9b6a-2665799e7cad',
              default: null,
              value: null,
              orden: 112
            },
            {
              label: 'Salud Bucal',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName: 'salud_bucal_-fbdbe8a1-1073-4509-a3c3-14c2b9411fc0',
              default: null,
              value: null,
              orden: 113
            },
            {
              label:
                'Controles odontológicos regulares, educación en higiene oral, tratamiento de enfermedades periodontales y caries, y adaptación de prótesis dentales si es necesario.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'controles_odontologicos_regulares,_educacion_en_higiene_oral,_tratamiento_de_enfermedades_periodontales_y_caries,_y_adaptacion_de_protesis_dentales_si_es_necesario.-2a7159c6-9f78-4235-9ea8-0156ce07c63e',
              default: null,
              value: null,
              orden: 114
            },
            {
              label: 'Salud Visual y Auditiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_visual_y_auditiva_-fe56640e-469e-4b9e-b93e-57cfa4e0ca34',
              default: null,
              value: null,
              orden: 115
            },
            {
              label:
                'Tamizajes visuales y auditivos, seguimiento y tratamiento de problemas detectados, provisión de ayudas técnicas (como gafas y audífonos), y orientación sobre la importancia del cuidado visual y auditivo.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'tamizajes_visuales_y_auditivos,_seguimiento_y_tratamiento_de_problemas_detectados,_provision_de_ayudas_tecnicas_(como_gafas_y_audifonos),_y_orientacion_sobre_la_importancia_del_cuidado_visual_y_auditivo.-e68b8674-4013-4fed-a2b0-a6b5dc610369',
              default: null,
              value: null,
              orden: 116
            },
            {
              label: 'Salud Sexual y Reproductiva',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'salud_sexual_y_reproductiva_-47839c75-2f9a-4336-9015-52875378bd51',
              default: null,
              value: null,
              orden: 117
            },
            {
              label:
                'Educación en salud sexual y reproductiva, promoción de relaciones afectivas y respetuosas, y orientación sobre la importancia de la sexualidad en la vejez.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_sexual_y_reproductiva,_promocion_de_relaciones_afectivas_y_respetuosas,_y_orientacion_sobre_la_importancia_de_la_sexualidad_en_la_vejez.-47c386d2-1b92-4aa7-b5f7-a9204bb2b4c6',
              default: null,
              value: null,
              orden: 118
            },
            {
              label: 'Seguridad y Protección Social',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'seguridad_y_proteccion_social_-9f9c33d2-c063-4ea6-af22-32fccefb2358',
              default: null,
              value: null,
              orden: 119
            },
            {
              label:
                'Identificación y prevención de riesgos de violencia, maltrato, abandono, activación de rutas de protección en casos de vulneración de derechos, y promoción de entornos seguros y protectores.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'identificacion_y_prevencion_de_riesgos_de_violencia,_maltrato,_abandono,_activacion_de_rutas_de_proteccion_en_casos_de_vulneracion_de_derechos,_y_promocion_de_entornos_seguros_y_protectores.-e57ff3ea-c252-4b02-8c59-c903a51d6022',
              default: null,
              value: null,
              orden: 120
            },
            {
              label: 'Educación en Salud',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'educacion_en_salud_-858d6c8d-39f6-4806-bcf3-d47c341bee8a',
              default: null,
              value: null,
              orden: 121
            },
            {
              label:
                'Capacitación en temas de salud, nutrición, actividad física adecuada, prevención de enfermedades, y promoción de hábitos saludables tanto en el hogar como en la comunidad.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'capacitacion_en_temas_de_salud,_nutricion,_actividad_fisica_adecuada,_prevencion_de_enfermedades,_y_promocion_de_habitos_saludables_tanto_en_el_hogar_como_en_la_comunidad.-904c69d3-9f8a-4035-95f9-ea5eec6c0c84',
              default: null,
              value: null,
              orden: 122
            },
            {
              label: 'Vigilancia Epidemiológica',
              type: 'title',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'vigilancia_epidemiologica_-a96d8e37-92a3-4dab-a75f-86f01192e523',
              default: null,
              value: null,
              orden: 123
            },
            {
              label:
                'Monitoreo de indicadores de salud, reporte de enfermedades de notificación obligatoria, implementación de acciones de control de brotes y epidemias, y análisis de tendencias epidemiológicas para la toma de decisiones.',
              type: 'subtitle',
              options: null,
              visibility: true,
              required: false,
              columnName:
                'monitoreo_de_indicadores_de_salud,_reporte_de_enfermedades_de_notificacion_obligatoria,_implementacion_de_acciones_de_control_de_brotes_y_epidemias,_y_analisis_de_tendencias_epidemiologicas_para_la_toma_de_decisiones.-75a27586-8943-4324-a667-2bc07de2611d',
              default: null,
              value: null,
              orden: 124
            }
          ]
        }
      ]
    };
  }
}
