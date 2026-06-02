Crea una landing/app web mobile-first, hosteable en Vercel, que simule una aplicación móvil para pacientes con diabetes mellitus tipo 1 y tipo 2. No debe tener backend, base de datos, autenticación real ni APIs externas. Todo debe ser frontend con datos mockeados en memoria/local state. El objetivo es que parezca una app real en una demo.

Nombre tentativo de la app: GlucoAmigo

Stack:
- Next.js con App Router
- TypeScript
- Tailwind CSS
- Componentes reutilizables
- Diseño 100% responsive, pero optimizado principalmente para móvil
- Debe verse como una app móvil dentro del navegador
- Puede usar local state para simular registros
- Puede usar una librería simple de gráficas como Recharts
- Debe estar lista para desplegarse en Vercel

Estilo visual:
- Inspiración tipo Duolingo: amigable, colorido, didáctico, con tarjetas grandes, botones redondeados, microinteracciones, progreso visual, íconos, lenguaje simple y motivador.
- No copiar branding exacto de Duolingo.
- Usar una estética de salud cálida y humana.
- Paleta sugerida:
  - Verde principal suave
  - Azul claro
  - Amarillo pastel para logros
  - Blanco / gris muy claro de fondo
  - Rojo o naranja solo para alertas de glucosa alta, sin hacerlo alarmista
- Tipografía moderna, clara y amigable.
- Interfaz con sensación de app nativa.
- Usar navegación inferior tipo mobile app con 4 tabs:
  1. Inicio
  2. Glucosa
  3. Aprende
  4. Retos

Importante:
- Es una demo visual/interactiva, no un sistema médico real.
- Incluir un pequeño disclaimer visible en alguna sección: “Esta app es una herramienta educativa y de seguimiento. No sustituye la orientación de tu médico o nutriólogo.”
- No incluir login.
- No incluir dashboard de doctor.
- No incluir backend.
- No incluir base de datos.
- No pedir datos sensibles reales.
- Todo debe funcionar con datos de ejemplo.

Funcionalidades principales:

1. Pantalla de inicio
Crear una pantalla principal estilo Duolingo con:
- Saludo: “Hola, Ana”
- Frase motivacional del día, por ejemplo:
  “Cada pequeño cambio cuenta.”
  “Tu progreso vale más que la perfección.”
  “Tu bienestar emocional importa tanto como tu glucosa.”
- Tarjeta grande de estado actual:
  - “Última glucosa registrada”
  - Valor mock: 126 mg/dL
  - Estado: “Dentro de objetivo”
  - Mensaje: “Vas bien. Mantener el registro te ayuda a conocer mejor tu cuerpo.”
- Tarjeta de objetivos:
  - Glucosa en ayunas: 80–130 mg/dL
  - Glucosa 2 horas después de comer: menor a 180 mg/dL
- Botón principal: “Registrar glucosa”
- Mini resumen semanal con 3 métricas mock:
  - Registros esta semana: 5
  - Días dentro de objetivo: 4
  - Racha saludable: 3 días
- Componente visual de racha tipo Duolingo, con fuego o estrella.

2. Pantalla de registro de glucosa
Crear una pantalla donde el usuario pueda simular registrar su glucosa.
Campos:
- Nivel de glucosa en mg/dL
- Momento de medición:
  - En ayunas
  - Antes de comer
  - 2 horas después de comer
  - Antes de dormir
- Estado emocional opcional:
  - 😞 Muy mal
  - 😕 Desanimado
  - 😐 Neutral
  - 🙂 Bien
  - 😄 Muy bien
- Botón: “Guardar registro”

Comportamiento:
- Al guardar, agregar el registro a un arreglo local en memoria.
- Mostrar una animación o mensaje de éxito:
  “Registro guardado. Cada dato te ayuda a cuidar mejor tu salud.”
- No persistir en base de datos.
- Puede persistir en localStorage si es sencillo, pero no es obligatorio.

3. Pantalla de gráfica de glucosa
En la tab “Glucosa”, mostrar:
- Gráfica de línea con datos mockeados de los últimos 7 días.
- Eje Y con mg/dL.
- Puntos de ejemplo:
  Día 1: 142
  Día 2: 130
  Día 3: 126
  Día 4: 165
  Día 5: 118
  Día 6: 174
  Día 7: 128
- Mostrar líneas o bandas de referencia:
  - Rango objetivo en ayunas: 80–130 mg/dL
  - Postprandial recomendado: menor a 180 mg/dL
- Debajo de la gráfica, mostrar interpretación sencilla:
  “Tus niveles se han mantenido cerca del objetivo la mayor parte de la semana.”
- Mostrar tarjetas:
  - Promedio semanal
  - Lectura más alta
  - Lectura más baja
  - Porcentaje dentro de objetivo
- Diseño claro, no técnico, orientado a pacientes.

4. Pantalla de objetivos educativos
Crear una sección llamada “Mis objetivos”.
Debe explicar de forma sencilla por qué importan los objetivos:
- “Registrar tu glucosa te ayuda a identificar patrones.”
- “Mantener la glucosa en ayunas entre 80 y 130 mg/dL puede ayudarte a mejorar tu control diario.”
- “Después de comer, buscar niveles menores a 180 mg/dL ayuda a detectar cómo respondes a ciertos alimentos.”
- “La alimentación, la actividad física, el descanso y el tratamiento trabajan juntos.”

Incluir tarjetas educativas con íconos:
- Medir mi glucosa
- Comer balanceado
- Moverme durante la semana
- Dormir 7 a 9 horas
- Ir a revisiones médicas

Usar el siguiente contenido educativo:
- Glucosa en ayunas objetivo: 80–130 mg/dL.
- Glucosa 2 horas postprandial: menor a 180 mg/dL.
- Dormir entre 7 y 9 horas por noche.
- Actividad física ideal: 200–300 minutos por semana.
- Revisión anual de orina, pies y ojos para prevenir complicaciones.

5. Pantalla “Aprende”
Crear una pantalla con mini cápsulas educativas en formato tarjetas desbloqueables tipo Duolingo.
Categorías:
- Alimentación saludable
- Actividad física
- Mitos y realidades
- Descanso
- Complicaciones y prevención

Cada tarjeta debe abrir un modal o vista simple con explicación corta.

Contenido para las cápsulas:

Alimentación saludable:
- “Procura que la mitad de tu plato tenga verduras, una cuarta parte proteína y la otra cuarta parte carbohidratos ricos en fibra.”
- “Limitar bebidas azucaradas como refrescos, jugos envasados y bebidas energéticas puede ayudarte a controlar mejor tu peso y glucosa.”
- “Los alimentos con fibra como frijoles, lentejas, brócoli, zanahoria, manzana, pera y frutos rojos ayudan a sentir saciedad.”

Actividad física:
- “Caminar, nadar, correr o bailar son ejemplos de ejercicio aeróbico.”
- “Los ejercicios de fuerza pueden incluir lagartijas, sentadillas, bandas o gimnasio.”
- “Puedes distribuir tu actividad en varios días de la semana. Lo importante es hacerlo de forma constante.”

Descanso:
- “Dormir suficiente ayuda a regular el hambre, la saciedad y la energía durante el día.”
- “Evita pantallas 30 a 60 minutos antes de dormir.”
- “Mantener horarios regulares puede mejorar la calidad del sueño.”

Mitos y realidades:
- Mito: “Las personas con diabetes no pueden comer fruta.”
  Realidad: “Sí pueden consumir fruta, preferentemente entera y en porciones adecuadas.”
- Mito: “Si tomo medicamentos no necesito cuidar mi alimentación.”
  Realidad: “Los medicamentos funcionan mejor cuando se acompañan de alimentación saludable y actividad física.”
- Mito: “Saltarse comidas ayuda a bajar de peso.”
  Realidad: “Omitir comidas puede aumentar el hambre y dificultar el control de glucosa.”
- Mito: “Solo el azúcar eleva la glucosa.”
  Realidad: “Todos los carbohidratos, incluyendo pan, tortillas, arroz, pasta y cereales, pueden aumentar la glucosa.”

6. Mini juego didáctico
Crear una sección estilo Duolingo llamada “Reto rápido”.
Debe tener preguntas de opción múltiple donde el usuario elige entre dos opciones.
Mostrar feedback inmediato:
- Si acierta: confeti, sonido visual o animación simple, mensaje positivo.
- Si falla: mensaje amable explicando la mejor opción.

Preguntas de ejemplo:

Pregunta 1:
“¿Qué es mejor colación?”
Opción A: “Un jugo envasado”
Opción B: “Una porción de fruta entera”
Respuesta correcta: B
Explicación: “La fruta entera aporta fibra y ayuda a una absorción más gradual.”

Pregunta 2:
“¿Qué bebida conviene elegir con mayor frecuencia?”
Opción A: “Refresco”
Opción B: “Agua natural”
Respuesta correcta: B
Explicación: “Las bebidas azucaradas pueden aportar muchas calorías sin que lo notes.”

Pregunta 3:
“¿Qué plato se parece más a una comida balanceada?”
Opción A: “Verduras, proteína y carbohidrato con fibra”
Opción B: “Solo pan dulce y refresco”
Respuesta correcta: A
Explicación: “Una comida balanceada ayuda a mantener saciedad y mejor control de glucosa.”

Pregunta 4:
“¿Qué ayuda más a crear un hábito saludable?”
Opción A: “Cambios pequeños y constantes”
Opción B: “Hacer todo perfecto desde el primer día”
Respuesta correcta: A
Explicación: “La constancia vale más que la perfección.”

Pregunta 5:
“¿Qué opción puede aportar más fibra?”
Opción A: “Lentejas con verduras”
Opción B: “Papas fritas”
Respuesta correcta: A
Explicación: “Las leguminosas y verduras ayudan a aumentar el consumo de fibra.”

Al final del quiz:
- Mostrar puntaje
- Mostrar racha
- Mostrar mensaje motivacional:
  “¡Buen trabajo! Aprender también es parte de cuidarte.”

7. Pantalla de retos familiares
Crear una sección de retos tipo juego semanal.
Mostrar tarjetas para elegir un reto:
- Reto Cero Refresco
- Caminata 10 en Familia
- Comida sin Pantallas
- Porción Inteligente

Cada reto debe tener:
- Objetivo
- Qué tengo que hacer
- Meta semanal
- Progreso visual de 7 días
- Botones para marcar día como completado

Contenido:

Reto Cero Refresco:
Objetivo: Evitar comprar refresco en casa entre semana y cambiarlo por agua natural o bebidas sin azúcar.
Meta: Lograr 5 días sin comprar refresco.

Caminata 10 en Familia:
Objetivo: Aumentar actividad física con caminatas cortas en familia.
Qué hacer: Después de comer o cenar, caminar 10 minutos.
Meta: Hacer 3 caminatas familiares durante la semana.

Comida sin Pantallas:
Objetivo: Comer sin televisión ni celular para comer con más atención.
Meta: Completar 4 comidas sin pantallas durante la semana.

Porción Inteligente:
Objetivo: Controlar porciones sin prohibir alimentos.
Qué hacer: Al terminar de comer, esperar 10 minutos antes de repetir.
Meta: Hacer la pausa 4 veces en la semana.

Cuando el usuario complete una meta:
- Mostrar confeti
- Mensaje: “¡Lo lograste! Los hábitos saludables también se construyen en familia.”

8. Pantalla “¿Qué puedo comer si…?”
Crear una sección con recomendaciones visuales.
Mostrar disclaimer:
“Estas son recomendaciones generales. Consulta con tu nutriólogo para individualizar tu alimentación.”

Categorías:
- Tengo poco tiempo
- Busco algo económico
- Arma tu plato saludable

Tengo poco tiempo:
- Tostadas horneadas con frijoles, lechuga y pico de gallo
- Huevo con verduras y tortilla de maíz
- Atún con verduras y galletas integrales
- Yogurt natural con avena y fruta

Opciones económicas:
- Lentejas con verduras
- Tacos de frijoles con pico de gallo
- Avena con plátano y canela
- Huevo con nopales
- Arroz con verduras y atún

Arma tu plato saludable:
Crear una mini interacción donde el usuario elige:
Proteína:
- Huevo
- Pollo
- Atún
- Frijoles
- Lentejas
- Queso fresco

Base:
- Tortilla de maíz
- Arroz
- Avena
- Pan integral
- Papa cocida

Verduras o fruta:
- Nopales
- Lechuga
- Jitomate
- Zanahoria
- Calabacita
- Pepino

Al final mostrar:
“Tu plato de hoy: [proteína] + [base] + [verduras/fruta]”

9. Pantalla de seguimiento emocional
Crear una pantalla moderna y amigable:
Título:
“¿Cómo te sientes hoy?”
Subtítulo:
“Tu bienestar emocional también es importante.”

Escala horizontal con 5 emociones:
- 😞 Muy mal
- 😕 Desanimado
- 😐 Neutral
- 🙂 Bien
- 😄 Muy bien

Agregar:
- Campo opcional: “¿Quieres escribir cómo te sientes hoy?”
- Botón: “Registrar emoción”
- Al registrar, mostrar mensaje motivador dependiendo de la emoción:
  - Si está mal: “Un mal día no borra tu progreso.”
  - Si neutral: “Escuchar cómo te sientes también es cuidarte.”
  - Si bien: “Qué bueno verte avanzar. Sigue así.”

10. Componentes y estructura sugerida
Crear componentes:
- MobileShell
- BottomNav
- HomeScreen
- GlucoseScreen
- GlucoseForm
- GlucoseChart
- GoalCard
- LearningScreen
- LessonCard
- QuizGame
- FamilyChallenges
- FoodSuggestions
- PlateBuilder
- EmotionalCheckIn
- ProgressRing
- ConfettiSuccess
- MotivationalCard

Estructura de rutas sugerida:
- /
- /glucosa
- /aprende
- /retos
- /emociones
- /comida

Pero también puede hacerse como single-page app con tabs internas.

11. Detalles de UX
- Botones grandes y fáciles de tocar.
- Cards con sombra suave.
- Animaciones sutiles al seleccionar respuestas.
- Estados visuales claros:
  - Dentro de objetivo
  - Cerca del objetivo
  - Fuera de objetivo
- Evitar lenguaje alarmista.
- Usar frases positivas.
- Usar microcopy tipo:
  - “Vas bien”
  - “Un paso a la vez”
  - “Cada registro cuenta”
  - “Tu salud merece paciencia”
  - “Hoy también cuenta”

12. Datos mock
Incluir datos de ejemplo para que la app se vea viva desde el primer render:
- Usuario: Ana
- Diabetes: Tipo 2
- Última glucosa: 126 mg/dL
- Registros semanales: 5
- Racha: 3 días
- Datos de gráfica de 7 días
- Retos parcialmente completados
- Quiz con progreso
- Frase motivacional diaria

13. Resultado esperado
Entregar una demo visual muy pulida, mobile-first, con apariencia de app real, pero sin backend.
Debe sentirse como una app educativa de salud gamificada, amigable para pacientes, inspirada en Duolingo, enfocada en:
- Registro de glucosa
- Visualización de progreso
- Educación en diabetes
- Recordatorio de objetivos
- Retos saludables
- Mini juego de decisiones
- Apoyo emocional
