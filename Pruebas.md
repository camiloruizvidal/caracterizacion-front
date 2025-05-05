# Plan de Pruebas - Frontend Caracterización

## Índice

1. [Pruebas de Autenticación](#pruebas-de-autenticación)
2. [Pruebas de Generación de Formularios](#pruebas-de-generación-de-formularios)
3. [Pruebas de Gestión de Pacientes](#pruebas-de-gestión-de-pacientes)
4. [Pruebas de Informes](#pruebas-de-informes)
5. [Pruebas de Integración con Excel](#pruebas-de-integración-con-excel)

## Pruebas de Autenticación

### 1. Login

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Validación de campos requeridos | Mostrar mensaje de error en campos vacíos | |
| Login con credenciales incorrectas | Mostrar mensaje "Credenciales inválidas" | |
| Login con credenciales correctas | Redireccionar al dashboard | |
| Almacenamiento de token | Token guardado en localStorage | |
| Expiración de sesión | Redireccionar al login después de 30 minutos | |

### 2. Recuperación de Contraseña

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Envío de correo de recuperación | Mostrar mensaje "Correo enviado" | |
| Correo electrónico inexistente | Mostrar mensaje "Correo no registrado" | |
| Correo electrónico válido | Enviar correo con link de recuperación | |
| Proceso de cambio de contraseña | Permitir establecer nueva contraseña | |

## Pruebas de Generación de Formularios

### 1. Creación de Formulario

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Creación de nuevo formulario | Formulario creado con nombre y descripción | |
| Adición de pregunta tipo texto | Campo de texto agregado correctamente | |
| Adición de pregunta tipo número | Campo numérico agregado con validación | |
| Adición de selección múltiple | Lista de opciones con checkboxes | |
| Adición de selección única | Lista de opciones con radio buttons | |
| Adición de campo fecha | Selector de fecha funcionando | |
| Adición de campo hora | Selector de hora funcionando | |
| Configuración de campo requerido | Indicador visual de campo obligatorio | |
| Visibilidad condicional | Campo se muestra/oculta según condición | |

### 2. Edición de Formulario

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Edición de pregunta existente | Cambios guardados correctamente | |
| Reordenamiento de preguntas | Nuevo orden mantenido al guardar | |
| Eliminación de pregunta | Pregunta removida del formulario | |
| Duplicación de pregunta | Nueva pregunta creada con mismos atributos | |

### 3. Vista Previa

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Vista previa del formulario | Formulario renderizado correctamente | |
| Validación en vista previa | Mensajes de error mostrados al validar | |
| Comportamiento responsive | Formulario adaptable a diferentes tamaños | |

## Pruebas de Gestión de Pacientes

### 1. Búsqueda de Pacientes

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Búsqueda por documento | Mostrar paciente si existe | |
| Búsqueda por nombre | Mostrar lista de coincidencias | |
| Carga de datos relacionados | Mostrar información completa del paciente | |
| Paginación de resultados | Navegación entre páginas de resultados | |

### 2. Autocompletado

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Carga desde Excel | Datos cargados en formulario | |
| Actualización de datos | Datos existentes actualizados | |
| Validación de duplicados | Mostrar advertencia si existe duplicado | |

## Pruebas de Informes

### 1. Generación de Informes

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Generación por fecha | Informe generado con datos del período | |
| Aplicación de filtros | Datos filtrados según criterios | |
| Exportación a Excel | Archivo Excel generado correctamente | |
| Exportación a PDF | Archivo PDF generado correctamente | |

### 2. Visualización de Datos

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Carga de datos en tabla | Datos mostrados correctamente | |
| Ordenación de columnas | Datos ordenados al hacer clic en columna | |
| Paginación de tabla | Navegación entre páginas de datos | |
| Exportación de datos | Datos exportados en formato seleccionado | |

## Pruebas de Integración con Excel

### 1. Carga de Archivos

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Carga de archivo Excel | Archivo cargado correctamente | |
| Archivo inválido | Mostrar mensaje de error | |
| Validación de formato | Verificar estructura del Excel | |
| Mapeo de columnas | Columnas mapeadas correctamente | |

### 2. Procesamiento de Datos

| Punto a Verificar | Valor Esperado | Valor Encontrado |
|-------------------|----------------|------------------|
| Lectura de datos Excel | Datos leídos correctamente | |
| Validación de datos | Errores de validación mostrados | |
| Actualización en BD | Datos guardados en base de datos | |
| Sincronización con formularios | Datos disponibles en formularios | |

## Notas de Implementación

- Todas las pruebas deben documentarse con casos de éxito y error
- Incluir capturas de pantalla para casos críticos
- Documentar cualquier bug encontrado
- Mantener un registro de las pruebas realizadas
