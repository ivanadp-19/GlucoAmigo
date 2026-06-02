# Prompts para otro agente — mejoras funcionales de GlucoAmigo

Contexto para el agente:

- La app actual ya es una demo frontend funcional en buena parte.
- No debe agregarse backend, login, base de datos, APIs externas ni captura de datos sensibles reales.
- Todas las interacciones deben funcionar en navegador usando estado local y/o `localStorage`.
- `docs/DataOrigibal.md` es el source of truth de contenido.
- `docs/SPEC.md` y `docs/PROMPT-ORIGINAL.md` son el contrato de producto.
- No dejes botones decorativos sin comportamiento.

## Prompt 0 — Arreglar lint antes de mejorar

Antes de hacer mejoras visuales o funcionales, arregla los errores actuales de lint.

Resultado de verificacion:

- `npm run lint` falla con 4 errores `react-hooks/set-state-in-effect`.
- Archivos afectados:
  - `components/challenges/FamilyChallenges.tsx`
  - `components/ui/ConfettiSuccess.tsx`
  - `lib/emotion-storage.ts`
  - `lib/glucose-storage.ts`

Objetivo:

Resolver los errores de lint sin romper la funcionalidad frontend/localStorage.

Requisitos:

- Mantener carga desde `localStorage` para:
  - registros de glucosa,
  - retos familiares,
  - emociones.
- Mantener confeti funcional.
- Evitar `setState` sincronico directo dentro de `useEffect` cuando ESLint lo marque.
- Puedes usar inicializadores lazy de `useState`, un estado `mounted` cuidadosamente justificado, o una estrategia compatible con cliente/SSR de Next.
- No silenciar reglas de ESLint salvo que sea absolutamente necesario y este explicado.
- No eliminar persistencia local.

Criterios de aceptacion:

- `npm run lint` pasa sin errores.
- La app conserva las interacciones actuales.
- No se introduce backend, API ni dependencia nueva innecesaria.

## Prompt 1 — Conectar glucosa guardada con grafica y resumen

Revisa y mejora la funcionalidad de glucosa actual de GlucoAmigo.

Estado actual detectado:

- `GlucoseForm` ya permite registrar valores.
- Hay validacion basica para valores 40-600 mg/dL.
- El registro se guarda en `localStorage` mediante `useGlucoseRecords`.
- La Home puede leer la ultima glucosa registrada.
- `GlucoseChart` todavia calcula y grafica principalmente `WEEKLY_GLUCOSE` mock, no necesariamente los registros guardados por el usuario.

Objetivo:

Hacer que la experiencia de glucosa sea funcional como demo completa: si el usuario guarda registros, esos datos deben reflejarse en la pantalla de Glucosa y, cuando tenga sentido, convivir con los datos mock iniciales sin romper la demo.

Trabaja principalmente en:

- `components/glucose/GlucoseScreen.tsx`
- `components/glucose/GlucoseForm.tsx`
- `components/glucose/GlucoseChart.tsx`
- `lib/glucose-storage.ts`
- `lib/mock-data.ts`

Requisitos:

- Mantener datos mock como estado inicial cuando no hay registros guardados.
- Si hay registros guardados, mostrar una seccion de "Registros recientes".
- Hacer que la grafica pueda usar registros guardados recientes o una combinacion clara entre mock inicial y registros locales.
- Recalcular promedio, lectura mas alta, lectura mas baja y porcentaje dentro de objetivo con la misma fuente de datos que se esta mostrando.
- Mantener rangos:
  - En ayunas: 80-130 mg/dL.
  - 2 h despues de comer: menor a 180 mg/dL.
- Clasificar cada registro segun su momento cuando sea posible:
  - En ayunas y antes de comer: objetivo 80-130.
  - 2 h despues de comer: objetivo menor a 180.
  - Antes de dormir: usar lenguaje de seguimiento general, sin diagnosticar.
- Agregar un boton pequeno para limpiar registros locales solo si encaja con la demo, con confirmacion simple.

Restricciones:

- No agregar backend.
- No convertir esto en diagnostico medico.
- No alarmar al usuario por valores fuera de rango.
- No pedir datos sensibles.

Criterios de aceptacion:

- Registrar glucosa cambia lo visible en `/glucosa`.
- La Home sigue mostrando la ultima glucosa guardada.
- La grafica y las tarjetas de resumen usan datos coherentes.
- Los estados se entienden en mobile.
- El proyecto compila.

## Prompt 2 — Pulir quiz y retos como juego real

Revisa y mejora `/retos` para que se sienta como un mini juego real y no solo como tarjetas interactivas.

Estado actual detectado:

- `QuizGame` ya tiene preguntas, feedback, puntaje, racha, reinicio y guardado de estadisticas en `localStorage`.
- `FamilyChallenges` ya tiene progreso de 7 dias, check-ins con Si/No, persistencia en `localStorage` y confeti.
- Hay un typo en el texto del quiz: "calorías sin que lo notices" debe ser "calorías sin que lo notes".

Objetivo:

Mejorar claridad, continuidad y sensacion de juego, manteniendo el contenido del source of truth.

Trabaja principalmente en:

- `components/challenges/QuizGame.tsx`
- `components/challenges/FamilyChallenges.tsx`
- `lib/challenges-storage.ts`
- `lib/mock-data.ts`

Requisitos:

- Corregir el typo "notices" a "notes".
- Mostrar en `/retos` la ultima puntuacion del quiz si existe en `localStorage`.
- Hacer que el progreso del quiz sea mas intuitivo: el avance debe reflejar preguntas contestadas, no solo indice actual.
- Mantener feedback inmediato:
  - Acierto: mensaje positivo y celebracion visual moderada.
  - Error: mensaje amable + explicacion.
- En retos familiares, mostrar una tarjeta/resumen superior con:
  - retos activos,
  - metas alcanzadas,
  - progreso semanal total.
- Mantener los 4 retos:
  - Reto Cero Refresco,
  - Caminata 10 en Familia,
  - Comida sin Pantallas,
  - Porcion Inteligente.
- En check-ins de retos con pregunta inversa, dejar claro que para "Comida sin Pantallas" y "Porcion Inteligente" responder "No" es el exito.
- Evitar culpa cuando el usuario responde que no logro el reto.

Restricciones:

- No agregar ranking online.
- No agregar sonidos si no son necesarios.
- No inventar nuevas preguntas fuera del contenido del spec/source of truth.

Criterios de aceptacion:

- El quiz se completa de inicio a fin.
- El usuario entiende cuanto avanzo.
- La ultima puntuacion persiste tras recargar.
- Los retos se pueden marcar/desmarcar y persisten.
- Las preguntas Si/No no se sienten confusas.

## Prompt 3 — Mejorar Aprende sin saturar

Revisa y mejora `/aprende` para que el contenido educativo sea mas navegable y menos pesado.

Estado actual detectado:

- `lib/mock-data.ts` ya contiene lecciones mucho mas completas que la version inicial.
- Ya hay categorias: Alimentacion, Actividad fisica, Monitoreo, Descanso, Mitos y realidades, Prevencion.
- El contenido ya incluye mucha informacion de `DataOrigibal.md`.
- Riesgo: si todo se muestra con demasiado texto, puede sentirse como articulo medico y no como capsulas tipo app.

Objetivo:

Convertir el contenido educativo en una experiencia clara, escaneable y gamificada.

Trabaja principalmente en:

- `components/learn/LearningScreen.tsx`
- `components/learn/LessonCard.tsx`
- `components/learn/GoalsSection.tsx`
- `lib/mock-data.ts`

Requisitos:

- Mantener `docs/DataOrigibal.md` como source of truth.
- Agregar filtros/chips por categoria si no estan claros.
- Mostrar progreso educativo simulado:
  - capsulas completadas,
  - categoria activa,
  - proximas capsulas bloqueadas.
- Permitir marcar una capsula como completada usando estado local o `localStorage`.
- No esconder contenido esencial: alimentacion, actividad, monitoreo, descanso, mitos y prevencion deben seguir disponibles.
- Mejorar modales o vistas de leccion para que usen bloques cortos:
  - una idea principal,
  - bullets concretos,
  - tip final.
- Mantener tono educativo, calido y no culpabilizante.

Contenido que debe seguir presente:

- 500-700 calorias como orientacion general individualizable.
- Limitar ultraprocesados, bebidas azucaradas y alcoholicas.
- Fibra 20-30 g diarios.
- Actividad 200-300 min/semana.
- Glucosa en ayunas 80-130 mg/dL.
- Postprandial menor a 180 mg/dL.
- Dormir 7-9 horas.
- Revision anual de orina, pies y ojos.
- Mitos de fruta, medicamentos, saltarse comidas y carbohidratos.

Criterios de aceptacion:

- `/aprende` se puede explorar sin sentirse largo.
- Las capsulas tienen interaccion real.
- El progreso educativo persiste o se mantiene durante la sesion.
- No se pierde contenido del source of truth.

## Prompt 4 — Comida: hacer mas util el plato saludable

Revisa y mejora `/comida` para que sea una herramienta practica, no solo una lista.

Estado actual detectado:

- `FoodSuggestions` ya alterna entre poco tiempo y economico.
- `PlateBuilder` ya permite elegir proteina, base y verduras/fruta.
- Las porciones del source of truth ya estan incluidas en `PLATE_BUILDER_STEPS`.
- `FOOD_DISCLAIMER` existe en datos, pero verifica que se renderice de forma especifica en la pantalla.

Objetivo:

Hacer que la pantalla de comida sea mas accionable y claramente funcional.

Trabaja principalmente en:

- `components/food/FoodScreen.tsx`
- `components/food/FoodSuggestions.tsx`
- `components/food/PlateBuilder.tsx`
- `lib/mock-data.ts`
- `components/ui/Disclaimer.tsx`

Requisitos:

- Mostrar el disclaimer nutricional especifico:
  "Estas son recomendaciones generales. Consulta con tu nutriólogo para individualizar tu alimentación."
- En `FoodSuggestions`, permitir marcar una opcion como "me gusta" o "la usare hoy" usando estado local.
- En `PlateBuilder`, permitir elegir 2-3 verduras/fruta, no solo una, porque el source of truth dice "Agrega verduras o fruta 2-3 opciones".
- Mostrar resultado como:
  "Tu plato de hoy: [proteina] + [base] + [verduras/fruta elegidas]".
- Agregar boton para guardar plato del dia en localStorage o en estado local.
- Mostrar ultimo plato guardado si existe.
- Mantener porciones visibles.
- No hacer recomendaciones medicas personalizadas.

Criterios de aceptacion:

- El usuario puede armar un plato completo.
- Puede seleccionar mas de una verdura/fruta.
- Puede guardar/ver su ultimo plato.
- El disclaimer especifico se ve en `/comida`.
- No hay botones decorativos sin accion.

## Prompt 5 — Emociones y QA final mobile-first

Revisa y mejora `/emociones` y despues haz QA visual/funcional general de toda la demo.

Estado actual detectado:

- `EmotionalCheckIn` ya permite elegir emocion, escribir nota y guardar en `localStorage`.
- Ya muestra frases de apoyo, registros recientes y seccion AMDNL.
- Solo muestra confeti para emociones positivas, lo cual esta bien, pero debe evitar que emociones dificiles se sientan como "menos celebrables".

Objetivo:

Hacer que seguimiento emocional sea empatico, funcional y coherente con el resto de la app; despues cerrar pulido general para demo Vercel.

Trabaja principalmente en:

- `components/emotions/EmotionalCheckIn.tsx`
- `lib/emotion-storage.ts`
- `lib/mock-data.ts`
- `components/layout/MobileShell.tsx`
- `components/layout/BottomNav.tsx`
- `app/globals.css`

Requisitos en emociones:

- Mantener titulo: "¿Cómo te sientes hoy?"
- Mantener subtitulo: "Tu bienestar emocional también es importante."
- Escala de 5 emociones seleccionable.
- Guardar estado, nota y fecha en `localStorage`.
- Mostrar registro de hoy si existe.
- Para emociones dificiles, mostrar apoyo claro sin confeti obligatorio:
  - "Un mal día no borra todo tu progreso."
  - "Tu valor no depende de un número."
  - "Escuchar a tu cuerpo también es cuidarte."
- Para emociones positivas, celebrar sin exagerar.
- Verificar que AMDNL se presente como informacion de referencia, no como servicio de la app.

QA final:

- Ejecutar `npm run build`.
- Revisar mobile: 360x740 o similar.
- Revisar desktop: debe parecer telefono centrado, no landing.
- Confirmar rutas:
  - `/`
  - `/glucosa`
  - `/aprende`
  - `/retos`
  - `/comida`
  - `/emociones`
- Confirmar que no hay:
  - backend,
  - login,
  - APIs externas,
  - datos sensibles,
  - botones sin comportamiento,
  - textos desbordados.

Criterios de aceptacion:

- Emociones guarda y muestra historial reciente.
- El tono es reconfortante incluso si el usuario elige "Muy mal".
- La app compila.
- Las interacciones principales funcionan sin backend.
- La demo se siente lista para Vercel.
