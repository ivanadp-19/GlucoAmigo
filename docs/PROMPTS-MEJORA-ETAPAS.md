# Prompts de mejora por etapa — GlucoAmigo

Estos prompts parten de la version actual del proyecto y deben respetar siempre:

- Source of truth de producto: `docs/DataOrigibal.md`
- Especificacion aterrizada: `docs/SPEC.md`
- Prompt base original: `docs/PROMPT-ORIGINAL.md`
- App demo frontend only: sin backend, sin base de datos, sin login, sin APIs externas y sin datos sensibles reales.
- Stack actual: Next.js App Router, TypeScript, Tailwind CSS, componentes reutilizables y datos mock/local state.

## Prompt 1 — Inicio, navegacion y sensacion de app movil

Mejora la etapa de Inicio y navegacion de GlucoAmigo sobre la version actual del repo. Usa como fuente principal `docs/DataOrigibal.md`, y como contrato de producto `docs/SPEC.md` y `docs/PROMPT-ORIGINAL.md`.

Objetivo: que la pantalla inicial se sienta mas como una app movil real, calida, educativa y motivadora para pacientes con diabetes mellitus tipo 1 y tipo 2, sin parecer una landing page. Conserva el enfoque mobile-first y la inspiracion tipo Duolingo sin copiar branding.

Trabaja principalmente sobre:

- `components/home/HomeScreen.tsx`
- `components/home/MotivationalCard.tsx`
- `components/home/GoalCard.tsx`
- `components/home/ProgressRing.tsx`
- `components/layout/MobileShell.tsx`
- `components/layout/BottomNav.tsx`
- `lib/mock-data.ts`
- estilos globales si hace falta

Requisitos de contenido:

- Mantener el saludo "Hola, Ana".
- Mostrar GlucoAmigo como identidad clara de la app.
- Mantener los datos mock iniciales: diabetes Tipo 2, ultima glucosa 126 mg/dL, registros esta semana 5, dias dentro de objetivo 4, racha saludable 3 dias.
- Mantener rangos de glucosa: en ayunas 80-130 mg/dL y 2 h postprandial menor a 180 mg/dL.
- Expandir las frases motivacionales usando `DataOrigibal.md`, especialmente las secciones: generales, dias dificiles, autoestima, habitos saludables, adherencia/tratamiento y familia/apoyo.
- Incluir el disclaimer visible: "Esta app es una herramienta educativa y de seguimiento. No sustituye la orientacion de tu medico o nutriologo."

Mejoras esperadas:

- Reordenar la jerarquia visual para que el usuario vea primero estado actual, motivacion y accion principal.
- Hacer que la tarjeta de estado explique el resultado con tono simple y no alarmista: "Dentro de objetivo", "Cerca del objetivo" o "Fuera de objetivo".
- Mejorar la racha saludable con una pieza visual clara y alegre, sin depender solo de texto.
- Convertir las tarjetas hacia comida y emociones en accesos secundarios utiles y consistentes con la navegacion.
- Afinar microcopy con frases como "Un paso a la vez", "Cada registro cuenta", "Tu salud merece paciencia", "Hoy tambien cuenta".
- Garantizar que la navegacion inferior tenga 4 tabs principales: Inicio, Glucosa, Aprende y Retos.

Restricciones:

- No agregar login, perfil clinico real, backend, APIs externas ni formularios de datos sensibles.
- No cambiar el contenido educativo por recomendaciones inventadas si contradicen `DataOrigibal.md`.
- No usar tono medico prescriptivo; usar tono educativo y de acompanamiento.

Criterios de aceptacion:

- La home se ve completa y usable en mobile.
- El CTA "Registrar glucosa" lleva a `/glucosa`.
- El disclaimer sigue visible.
- La app mantiene apariencia de demo interactiva real y no de pagina de marketing.
- No hay texto desbordado ni tarjetas que rompan el layout en pantallas pequenas.

## Prompt 2 — Glucosa: registro, grafica e interpretacion

Mejora la etapa de Glucosa de GlucoAmigo sobre la version actual. Usa `docs/DataOrigibal.md` como fuente de verdad para rangos, mensajes y enfoque educativo; usa `docs/SPEC.md` y `docs/PROMPT-ORIGINAL.md` como contrato funcional.

Objetivo: hacer que `/glucosa` permita registrar, visualizar e interpretar datos mock/locales de glucosa de forma clara para pacientes, sin convertirlo en sistema medico real.

Trabaja principalmente sobre:

- `components/glucose/GlucoseScreen.tsx`
- `components/glucose/GlucoseForm.tsx`
- `components/glucose/GlucoseChart.tsx`
- `lib/glucose-storage.ts`
- `lib/mock-data.ts`
- `components/ui/ConfettiSuccess.tsx`

Requisitos de contenido:

- Campos del formulario:
  - Nivel de glucosa en mg/dL.
  - Momento: En ayunas, Antes de comer, 2 h despues de comer, Antes de dormir.
  - Estado emocional opcional: Muy mal, Desanimado, Neutral, Bien, Muy bien.
- Al guardar, agregar el registro a estado local o `localStorage` si ya esta implementado.
- Mostrar mensaje de exito: "Registro guardado. Cada dato te ayuda a cuidar mejor tu salud."
- Mantener datos mock de los ultimos 7 dias: 142, 130, 126, 165, 118, 174, 128 mg/dL.
- Mantener rangos:
  - En ayunas: 80-130 mg/dL.
  - 2 h postprandial: menor a 180 mg/dL.
- Mostrar interpretacion sencilla: "Tus niveles se han mantenido cerca del objetivo la mayor parte de la semana."

Mejoras esperadas:

- Mejorar validacion del input para evitar valores vacios, negativos o evidentemente invalidos.
- Clasificar visualmente cada registro como "Dentro de objetivo", "Cerca del objetivo" o "Fuera de objetivo" con color semaforo suave.
- Mostrar resumen semanal con promedio, lectura mas alta, lectura mas baja y porcentaje dentro de objetivo.
- Mejorar la grafica para que las bandas/lineas de referencia sean comprensibles, no tecnicas.
- Hacer que la experiencia de guardar sea satisfactoria: confirmacion visible, animacion simple o confeti moderado.
- Si se usan registros guardados, reflejarlos en la tarjeta de ultima glucosa y en la lista/resumen sin romper los datos mock base.

Restricciones:

- No enviar datos a ningun servidor.
- No pedir nombre completo, telefono, correo, diagnosticos detallados ni datos medicos sensibles reales.
- No dar instrucciones de tratamiento ni diagnostico. Mantener lenguaje educativo.
- No alarmar ante valores altos; usar mensajes de orientacion general y recordar consultar al equipo de salud.

Criterios de aceptacion:

- El usuario puede registrar un valor valido y ver confirmacion.
- La grafica se renderiza correctamente en mobile.
- Los rangos 80-130 y menor a 180 son visibles y entendibles.
- Los calculos de promedio, maximo, minimo y porcentaje dentro de objetivo funcionan con los datos actuales.
- El disclaimer medico sigue visible.

## Prompt 3 — Aprende y Mis objetivos: educacion accionable

Mejora la etapa educativa de GlucoAmigo. Usa `docs/DataOrigibal.md` como source of truth del contenido, especialmente las secciones de alimentacion, actividad fisica, monitoreo, habitos, prevencion de complicaciones, descanso, mitos y realidades.

Objetivo: convertir `/aprende` en una experiencia educativa tipo capsulas desbloqueables, con contenido mas completo, claro y accionable, sin saturar al usuario.

Trabaja principalmente sobre:

- `components/learn/LearningScreen.tsx`
- `components/learn/LessonCard.tsx`
- `components/learn/GoalsSection.tsx`
- `lib/mock-data.ts`

Contenido obligatorio desde `DataOrigibal.md`:

- Alimentacion saludable:
  - Reduccion diaria sugerida de 500-700 calorias como punto de partida general.
  - Explicar con ejemplos equivalentes: refrescos, hamburguesa grande, donas glaseadas o chocolate con leche.
  - Limitar ultraprocesados: refrescos azucarados, jugos envasados, bebidas energeticas, papas fritas, comida frita/congelada, pizza y hamburguesas.
  - Limitar bebidas azucaradas y alcoholicas; optar por agua natural o bebidas sin azucar.
  - Aumentar fibra a 20-30 g diarios con alimentos como alcachofas, brocoli, zanahoria, coles de Bruselas, frijoles, lentejas, frutos rojos, manzana, jicama y pera.
  - Plato saludable: mitad verduras, una cuarta parte proteina y una cuarta parte carbohidratos ricos en fibra.
- Actividad fisica:
  - Meta ideal 200-300 min por semana.
  - Aerobico 150 min/semana: caminar, nadar, correr, bailar.
  - Fuerza/resistencia 20-30 min, 2-3 veces por semana: gimnasio, bandas, peso corporal, lagartijas, sentadillas.
- Monitoreo:
  - Glucosa en ayunas 80-130 mg/dL.
  - Glucosa 2 h postprandial menor a 180 mg/dL.
- Prevencion:
  - Revision anual de orina, pies y ojos.
  - Tamizaje de albumina, revision podologica anual y revision oftalmologica anual.
- Descanso:
  - Dormir 7-9 horas.
  - Horarios regulares.
  - Evitar pantallas 30-60 min antes de dormir.
  - Evitar cafeina por la tarde/noche.
  - Habitacion oscura, silenciosa y fresca.
- Mitos y realidades:
  - Fruta en diabetes.
  - Medicamentos y alimentacion.
  - Saltarse comidas.
  - Azucar vs carbohidratos.

Mejoras esperadas:

- Reorganizar las capsulas en categorias claras: Alimentacion, Actividad, Monitoreo, Descanso, Mitos, Prevencion.
- Cada tarjeta debe tener titulo, resumen, estado visual tipo desbloqueable y contenido corto en modal/vista.
- Agregar un bloque "Mis objetivos" con tarjetas accionables: Medir mi glucosa, Comer balanceado, Moverme durante la semana, Dormir 7-9 horas, Ir a revisiones medicas.
- Usar lenguaje simple, calido, no culpabilizante y no tecnico.
- Convertir listas largas en pequenas capsulas o bullets escaneables.
- Evitar que la pantalla parezca articulo medico; debe parecer experiencia de aprendizaje interactiva.

Restricciones:

- No inventar recomendaciones que contradigan el source of truth.
- No prometer perdida de peso garantizada.
- No presentar metas como obligatorias para todos; aclarar que deben individualizarse con medico/nutriologo cuando aplique.
- No meter videos o APIs externas; si se mencionan videos/infografias, simularlos como tarjetas visuales frontend.

Criterios de aceptacion:

- `/aprende` contiene contenido mas completo que la version actual.
- La informacion es fiel a `DataOrigibal.md`.
- El usuario puede abrir/cerrar capsulas.
- "Mis objetivos" comunica rangos y habitos clave.
- El disclaimer medico sigue visible.

## Prompt 4 — Retos: quiz didactico y plan familiar saludable

Mejora la etapa de Retos de GlucoAmigo. Usa `docs/DataOrigibal.md` como fuente principal para retos familiares y usa `docs/SPEC.md` / `docs/PROMPT-ORIGINAL.md` para las preguntas del quiz y el estilo gamificado.

Objetivo: que `/retos` se sienta como una experiencia de juego educativa, con feedback inmediato, progreso visual y retos familiares realistas de 7 dias.

Trabaja principalmente sobre:

- `components/challenges/RetosScreen.tsx`
- `components/challenges/QuizGame.tsx`
- `components/challenges/FamilyChallenges.tsx`
- `lib/mock-data.ts`
- `components/ui/ConfettiSuccess.tsx`

Quiz obligatorio:

- Pregunta 1: "Que es mejor colacion?"
  - A: Jugo envasado.
  - B: Porcion de fruta entera.
  - Correcta: B.
  - Explicacion: "La fruta entera aporta fibra y ayuda a una absorcion mas gradual."
- Pregunta 2: "Que bebida conviene elegir con mayor frecuencia?"
  - A: Refresco.
  - B: Agua natural.
  - Correcta: B.
  - Explicacion: "Las bebidas azucaradas pueden aportar muchas calorias sin que lo notes."
- Pregunta 3: "Que plato se parece mas a una comida balanceada?"
  - A: Verduras, proteina y carbohidrato con fibra.
  - B: Solo pan dulce y refresco.
  - Correcta: A.
  - Explicacion: "Una comida balanceada ayuda a mantener saciedad y mejor control de glucosa."
- Pregunta 4: "Que ayuda mas a crear un habito saludable?"
  - A: Cambios pequenos y constantes.
  - B: Hacer todo perfecto desde el primer dia.
  - Correcta: A.
  - Explicacion: "La constancia vale mas que la perfeccion."
- Pregunta 5: "Que opcion puede aportar mas fibra?"
  - A: Lentejas con verduras.
  - B: Papas fritas.
  - Correcta: A.
  - Explicacion: "Las leguminosas y verduras ayudan a aumentar el consumo de fibra."

Al final del quiz:

- Mostrar puntaje.
- Mostrar racha.
- Mostrar mensaje: "Buen trabajo! Aprender tambien es parte de cuidarte."
- Si acierta, mostrar confeti/animacion simple y mensaje positivo.
- Si falla, mostrar mensaje amable y explicacion.

Retos familiares obligatorios:

- Reto Cero Refresco:
  - Objetivo: Evitar comprar refresco en casa entre semana y cambiarlo por agua natural o bebidas sin azucar.
  - Que hacer: Durante 7 dias, intentar no comprar refresco para la casa. Cada dia logrado suma un punto.
  - Meta: 5 dias sin comprar refresco.
- Caminata 10 en Familia:
  - Objetivo: Aumentar actividad fisica con caminatas cortas en familia.
  - Que hacer: Despues de comer o cenar, caminar 10 minutos.
  - Meta: 3 caminatas familiares durante la semana.
  - Pregunta diaria: "Hoy realice caminatas junto a algun familiar?"
- Comida sin Pantallas:
  - Objetivo: Comer sin television ni celular para comer con mas atencion.
  - Que hacer: Durante una comida al dia, guardar celulares, apagar television y comer sin pantallas.
  - Meta: 4 comidas sin pantallas durante la semana.
  - Pregunta diaria: "Alguien de mi familia ocupo alguna pantalla mientras comiamos?"
- Porcion Inteligente:
  - Objetivo: Controlar porciones sin prohibir alimentos usando una pausa antes de repetir.
  - Que hacer: Al terminar de comer, esperar 10 minutos antes de decidir si se necesita repetir.
  - Meta: 4 pausas en la semana.
  - Pregunta diaria: "Considero que comi mas de lo que debia?"

Mejoras esperadas:

- Presentar al inicio: "Elige un acuerdo familiar para esta semana" y explicar que debe ser realista por 7 dias.
- Hacer que cada reto tenga progreso visual de 7 dias con botones para marcar/desmarcar.
- Dar feedback positivo al completar dias y confeti al alcanzar meta.
- Guardar el progreso en estado local o `localStorage` si ya existe patron similar.
- Evitar castigar fallos: si un dia no se logra, mostrar que se puede intentar de nuevo.
- Mantener tarjetas grandes, amigables y claras para mobile.

Restricciones:

- No convertir los retos en obligaciones clinicas.
- No usar culpa o lenguaje punitivo.
- No agregar backend ni ranking real.
- No meter sonidos reales si complican la implementacion; una animacion visual es suficiente.

Criterios de aceptacion:

- El quiz se puede completar de inicio a fin.
- Cada respuesta muestra feedback inmediato.
- Los 4 retos tienen objetivo, accion, meta semanal y progreso de 7 dias.
- Al completar una meta aparece celebracion.
- El disclaimer medico sigue visible.

## Prompt 5 — Comida, emociones y pulido final de demo

Mejora la etapa final de GlucoAmigo integrando mejor las pantallas de comida, plato saludable, seguimiento emocional y pulido visual general. Usa `docs/DataOrigibal.md` como source of truth, especialmente "Que puedo comer si...", "Arma tu plato saludable", "Apoyo emocional", frases motivacionales y grupos de apoyo.

Objetivo: que las rutas secundarias `/comida` y `/emociones` se sientan completas, utiles y coherentes con la app principal, y que la demo final quede lista para revision visual y deploy en Vercel.

Trabaja principalmente sobre:

- `components/food/FoodScreen.tsx`
- `components/food/FoodSuggestions.tsx`
- `components/food/PlateBuilder.tsx`
- `components/emotions/EmotionalCheckIn.tsx`
- `components/ui/Disclaimer.tsx`
- `app/globals.css`
- `components/layout/MobileShell.tsx`
- `lib/mock-data.ts`

Contenido obligatorio de comida:

- Disclaimer especifico: "Estas son recomendaciones generales. Consulta con tu nutriologo para individualizar tu alimentacion."
- Seccion "Tengo poco tiempo":
  - Tostadas horneadas con frijoles, lechuga y pico de gallo.
  - Huevo con verduras y tortilla de maiz.
  - Atun con verduras y galletas integrales.
  - Yogurt natural con avena y fruta.
- Seccion "Opciones economicas":
  - Lentejas con verduras.
  - Tacos de frijoles con pico de gallo.
  - Avena con platano y canela.
  - Huevo con nopales.
  - Arroz con verduras y atun.
- Plato saludable interactivo:
  - Paso 1 proteina: Huevo 1-2 piezas, Pollo palma de la mano 90-120 g, Atun 1 lata en agua 100-120 g, Frijoles 1/2 a 1 taza cocidos no refritos, Lentejas 1/2 a 1 taza cocida, Queso fresco 40-60 g.
  - Paso 2 base: Tortilla de maiz 1-2 tortillas, Arroz 1/2 taza cocida, Avena 1/2 taza en seco o 3/4 ya preparada, Pan integral 1 rebanada, Papa cocida 1/2 papa mediana.
  - Paso 3 verduras/fruta: Nopales 1/2 a 1 taza, Lechuga 1-2 tazas, Jitomate 1/2 a 1 pieza, Zanahoria 1/2 taza, Calabacita 1/2 a 1 taza, Pepino 1/2 a 1 taza.
  - Resultado: "Tu plato de hoy: [opciones elegidas]".

Contenido obligatorio de emociones:

- Pantalla "Seguimiento emocional diario".
- Titulo: "Como te sientes hoy?"
- Subtitulo: "Tu bienestar emocional tambien es importante."
- Escala horizontal seleccionable:
  - Muy mal, Desanimado, Neutral, Bien, Muy bien.
- Campo opcional: "Quieres escribir como te sientes hoy?"
- Boton: "Registrar emocion".
- Mensajes motivacionales desde `DataOrigibal.md`, especialmente:
  - "Un mal dia no borra todo tu progreso."
  - "No te castigues por tener dias dificiles."
  - "Tu valor no depende de un numero."
  - "Escuchar a tu cuerpo tambien es cuidarte."
  - "Tu bienestar emocional importa tanto como tu glucosa."
  - "Cuidarse juntos hace el camino mas facil."
- Incluir una pequena seccion de apoyo/grupos sin prometer atencion directa, usando el dato local del source of truth:
  - Asociacion Mexicana de Diabetes en Nuevo Leon (AMDNL).
  - Mencionar que ofrece talleres de educacion en diabetes para pacientes y familiares, programas de apoyo y atencion multidisciplinaria.
  - Contacto local si se usa: Modesto Arreola No. 1040 Pte., Col. Centro, Monterrey, N.L. C.P. 64000.

Pulido visual esperado:

- Revisar que toda la app sea mobile-first y usable en desktop como telefono centrado.
- Mantener paleta calida: verde suave, azul claro, amarillo pastel, fondos blancos/gris claro; naranja/rojo solo para alertas sin alarmismo.
- Mejorar microinteracciones: presionado de botones, confeti moderado, transiciones suaves.
- Revisar accesibilidad basica: labels, botones claros, estados disabled, contraste suficiente.
- Evitar texto desbordado, cards anidadas innecesarias y saturacion visual.
- Mantener iconos/emojis de forma consistente y no excesiva.
- Confirmar que no haya backend, login, APIs externas ni datos sensibles.

Criterios de aceptacion:

- `/comida` permite elegir opciones y armar un plato con resultado claro.
- `/emociones` permite registrar una emocion y muestra respuesta empatica.
- La pantalla emocional no juzga al usuario y usa tono reconfortante.
- El contenido de comida conserva porciones y ejemplos del source of truth.
- La app completa mantiene disclaimer visible y coherencia visual.
- El proyecto compila y queda listo para deploy en Vercel.
