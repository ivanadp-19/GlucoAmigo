# GlucoAmigo — Especificación del proyecto

> **Demo visual/interactiva** para pacientes con diabetes mellitus tipo 1 y tipo 2.  
> No es un sistema médico real. Sin backend, base de datos, autenticación ni APIs externas.

---

## Resumen

| Campo | Valor |
|-------|-------|
| Nombre tentativo | **GlucoAmigo** |
| Objetivo | Simular una app móvil educativa de seguimiento de glucosa |
| Deploy | Vercel |
| Enfoque | Mobile-first, frontend only, datos mockeados |

### Disclaimer (visible en la app)

> Esta app es una herramienta educativa y de seguimiento. No sustituye la orientación de tu médico o nutriólogo.

### Lo que NO incluye

- Login / autenticación
- Dashboard de doctor
- Backend / base de datos
- APIs externas
- Datos sensibles reales

---

## Stack técnico

- **Next.js** con App Router
- **TypeScript**
- **Tailwind CSS**
- Componentes reutilizables
- **Recharts** (o similar) para gráficas
- Estado local / `localStorage` opcional
- Listo para **Vercel**

---

## Estilo visual

Inspiración tipo Duolingo (sin copiar branding): amigable, colorido, didáctico.

| Elemento | Detalle |
|----------|---------|
| Sensación | App nativa dentro del navegador |
| Tarjetas | Grandes, sombra suave, botones redondeados |
| Interacciones | Microinteracciones, progreso visual, íconos |
| Tono | Lenguaje simple y motivador |
| Estética | Salud cálida y humana |

### Paleta sugerida

- Verde principal suave
- Azul claro
- Amarillo pastel (logros)
- Blanco / gris muy claro (fondo)
- Rojo o naranja solo para alertas de glucosa alta (sin alarmismo)

### Navegación inferior (4 tabs)

1. **Inicio**
2. **Glucosa**
3. **Aprende**
4. **Retos**

### Rutas sugeridas

```
/           → Inicio
/glucosa    → Gráfica + registro
/aprende    → Cápsulas educativas
/retos      → Quiz + retos familiares
/emociones  → Seguimiento emocional
/comida     → ¿Qué puedo comer si…?
```

> Alternativa: single-page app con tabs internas.

---

## Datos mock (estado inicial)

| Campo | Valor |
|-------|-------|
| Usuario | Ana |
| Diabetes | Tipo 2 |
| Última glucosa | 126 mg/dL |
| Registros esta semana | 5 |
| Días dentro de objetivo | 4 |
| Racha saludable | 3 días |

### Gráfica — últimos 7 días (mg/dL)

| Día | Valor |
|-----|-------|
| 1 | 142 |
| 2 | 130 |
| 3 | 126 |
| 4 | 165 |
| 5 | 118 |
| 6 | 174 |
| 7 | 128 |

### Objetivos de glucosa

- **En ayunas:** 80–130 mg/dL
- **2 h postprandial:** &lt; 180 mg/dL

### Frases motivacionales (rotar)

- "Cada pequeño cambio cuenta."
- "Tu progreso vale más que la perfección."
- "Tu bienestar emocional importa tanto como tu glucosa."

---

## Funcionalidades

### 1. Pantalla de inicio (`/`)

- Saludo: **"Hola, Ana"**
- Frase motivacional del día
- **Tarjeta de estado actual**
  - Última glucosa: 126 mg/dL
  - Estado: "Dentro de objetivo"
  - Mensaje: "Vas bien. Mantener el registro te ayuda a conocer mejor tu cuerpo."
- **Tarjeta de objetivos** (rangos en ayunas y postprandial)
- Botón principal: **"Registrar glucosa"**
- **Mini resumen semanal**
  - Registros esta semana: 5
  - Días dentro de objetivo: 4
  - Racha saludable: 3 días
- Componente visual de racha (fuego / estrella estilo Duolingo)

---

### 2. Registro de glucosa

**Campos:**

| Campo | Opciones |
|-------|----------|
| Nivel | mg/dL (input numérico) |
| Momento | En ayunas · Antes de comer · 2 h después de comer · Antes de dormir |
| Estado emocional (opcional) | 😞 Muy mal · 😕 Desanimado · 😐 Neutral · 🙂 Bien · 😄 Muy bien |

**Comportamiento:**

- Al guardar → agregar a arreglo en memoria (opcional: `localStorage`)
- Animación / mensaje de éxito: *"Registro guardado. Cada dato te ayuda a cuidar mejor tu salud."*

---

### 3. Pantalla de glucosa (`/glucosa`)

- Gráfica de línea (7 días) con Recharts
- Eje Y: mg/dL
- Bandas de referencia:
  - Ayunas: 80–130
  - Postprandial: &lt; 180
- Interpretación: *"Tus niveles se han mantenido cerca del objetivo la mayor parte de la semana."*
- Tarjetas de resumen:
  - Promedio semanal
  - Lectura más alta
  - Lectura más baja
  - % dentro de objetivo

**Estados visuales:**

- Dentro de objetivo
- Cerca del objetivo
- Fuera de objetivo

---

### 4. Mis objetivos (sección educativa)

**Por qué importan:**

- Registrar glucosa ayuda a identificar patrones
- Ayunas 80–130 mg/dL mejora el control diario
- Postprandial &lt; 180 mg/dL detecta respuesta a alimentos
- Alimentación, actividad, descanso y tratamiento trabajan juntos

**Tarjetas con íconos:**

- Medir mi glucosa
- Comer balanceado
- Moverme durante la semana
- Dormir 7–9 horas
- Ir a revisiones médicas

**Contenido educativo:**

- Glucosa en ayunas: 80–130 mg/dL
- Postprandial: &lt; 180 mg/dL
- Sueño: 7–9 h/noche
- Actividad: 200–300 min/semana
- Revisión anual: orina, pies y ojos

---

### 5. Aprende (`/aprende`)

Cápsulas desbloqueables tipo Duolingo. Categorías:

| Categoría | Contenido |
|-----------|-----------|
| Alimentación saludable | Ver abajo |
| Actividad física | Ver abajo |
| Mitos y realidades | Ver abajo |
| Descanso | Ver abajo |
| Complicaciones y prevención | (placeholder o contenido breve) |

Cada tarjeta abre modal o vista con explicación corta.

#### Alimentación saludable

- Mitad del plato verduras, cuarta proteína, cuarta carbohidratos con fibra
- Limitar bebidas azucaradas (refrescos, jugos, energéticas)
- Fibra: frijoles, lentejas, brócoli, zanahoria, manzana, pera, frutos rojos

#### Actividad física

- Aeróbico: caminar, nadar, correr, bailar
- Fuerza: lagartijas, sentadillas, bandas, gimnasio
- Distribuir actividad en la semana; la constancia importa

#### Descanso

- Dormir suficiente regula hambre, saciedad y energía
- Evitar pantallas 30–60 min antes de dormir
- Horarios regulares mejoran calidad del sueño

#### Mitos y realidades

| Mito | Realidad |
|------|----------|
| No pueden comer fruta | Sí pueden, entera y en porciones adecuadas |
| Con medicamentos no necesito cuidar alimentación | Medicamentos funcionan mejor con alimentación y actividad |
| Saltarse comidas ayuda a bajar de peso | Omitir comidas aumenta hambre y dificulta control |
| Solo el azúcar eleva glucosa | Todos los carbohidratos (pan, tortillas, arroz, pasta) pueden subir glucosa |

---

### 6. Reto rápido (quiz)

Preguntas de opción múltiple (2 opciones). Feedback inmediato:

- **Acierto:** confeti / animación + mensaje positivo
- **Error:** mensaje amable + explicación

#### Preguntas

**1.** ¿Qué es mejor colación?  
- A: Jugo envasado  
- B: Porción de fruta entera ✅  
- *Explicación:* La fruta entera aporta fibra y absorción más gradual.

**2.** ¿Qué bebida conviene elegir con mayor frecuencia?  
- A: Refresco  
- B: Agua natural ✅  
- *Explicación:* Las bebidas azucaradas aportan muchas calorías sin que lo notes.

**3.** ¿Qué plato se parece más a una comida balanceada?  
- A: Verduras, proteína y carbohidrato con fibra ✅  
- B: Solo pan dulce y refresco  
- *Explicación:* Una comida balanceada ayuda a saciedad y control de glucosa.

**4.** ¿Qué ayuda más a crear un hábito saludable?  
- A: Cambios pequeños y constantes ✅  
- B: Hacer todo perfecto desde el primer día  
- *Explicación:* La constancia vale más que la perfección.

**5.** ¿Qué opción puede aportar más fibra?  
- A: Lentejas con verduras ✅  
- B: Papas fritas  
- *Explicación:* Leguminosas y verduras aumentan el consumo de fibra.

**Al final:** puntaje, racha, mensaje: *"¡Buen trabajo! Aprender también es parte de cuidarte."*

---

### 7. Retos familiares (`/retos`)

Tarjetas de reto semanal con progreso visual (7 días) y botón para marcar día completado.

#### Reto Cero Refresco

- **Objetivo:** Evitar comprar refresco en casa; cambiar por agua o bebidas sin azúcar
- **Meta:** 5 días sin comprar refresco

#### Caminata 10 en Familia

- **Objetivo:** Aumentar actividad con caminatas cortas en familia
- **Qué hacer:** Después de comer o cenar, caminar 10 minutos
- **Meta:** 3 caminatas familiares en la semana

#### Comida sin Pantallas

- **Objetivo:** Comer sin TV ni celular
- **Meta:** 4 comidas sin pantallas en la semana

#### Porción Inteligente

- **Objetivo:** Controlar porciones sin prohibir alimentos
- **Qué hacer:** Esperar 10 minutos antes de repetir
- **Meta:** 4 pausas en la semana

**Al completar meta:** confeti + *"¡Lo lograste! Los hábitos saludables también se construyen en familia."*

---

### 8. ¿Qué puedo comer si…? (`/comida`)

> Disclaimer: *Estas son recomendaciones generales. Consulta con tu nutriólogo para individualizar tu alimentación.*

#### Tengo poco tiempo

- Tostadas horneadas con frijoles, lechuga y pico de gallo
- Huevo con verduras y tortilla de maíz
- Atún con verduras y galletas integrales
- Yogurt natural con avena y fruta

#### Busco algo económico

- Lentejas con verduras
- Tacos de frijoles con pico de gallo
- Avena con plátano y canela
- Huevo con nopales
- Arroz con verduras y atún

#### Arma tu plato saludable (interactivo)

| Proteína | Base | Verduras/fruta |
|----------|------|----------------|
| Huevo | Tortilla de maíz | Nopales |
| Pollo | Arroz | Lechuga |
| Atún | Avena | Jitomate |
| Frijoles | Pan integral | Zanahoria |
| Lentejas | Papa cocida | Calabacita |
| Queso fresco | | Pepino |

**Resultado:** *"Tu plato de hoy: [proteína] + [base] + [verduras/fruta]"*

---

### 9. Seguimiento emocional (`/emociones`)

- **Título:** ¿Cómo te sientes hoy?
- **Subtítulo:** Tu bienestar emocional también es importante.

Escala horizontal (5 emociones): 😞 · 😕 · 😐 · 🙂 · 😄

- Campo opcional: *"¿Quieres escribir cómo te sientes hoy?"*
- Botón: **Registrar emoción**

**Mensajes según emoción:**

| Emoción | Mensaje |
|---------|---------|
| Mal | Un mal día no borra tu progreso. |
| Neutral | Escuchar cómo te sientes también es cuidarte. |
| Bien | Qué bueno verte avanzar. Sigue así. |

---

## Componentes sugeridos

```
MobileShell
BottomNav
HomeScreen
GlucoseScreen
GlucoseForm
GlucoseChart
GoalCard
LearningScreen
LessonCard
QuizGame
FamilyChallenges
FoodSuggestions
PlateBuilder
EmotionalCheckIn
ProgressRing
ConfettiSuccess
MotivationalCard
```

---

## Microcopy UX

- "Vas bien"
- "Un paso a la vez"
- "Cada registro cuenta"
- "Tu salud merece paciencia"
- "Hoy también cuenta"

---

## Plan de implementación por etapas

### Etapa 0 — Bootstrap

- [x] Crear proyecto Next.js (App Router + TypeScript + Tailwind)
- [x] Configurar fuentes y tokens de color (paleta)
- [x] `MobileShell` + `BottomNav` (4 tabs)
- [x] Layout mobile-first con max-width tipo teléfono
- [x] README + deploy Vercel

### Etapa 1 — Inicio + navegación

- [x] `HomeScreen` con saludo, frase motivacional, tarjetas de estado
- [x] `MotivationalCard`, `GoalCard`, `ProgressRing` (racha)
- [x] Resumen semanal mock
- [x] Enlace a registro de glucosa

### Etapa 2 — Glucosa (registro + gráfica)

- [x] `GlucoseForm` con campos y validación básica
- [x] Estado local / `localStorage` para registros
- [x] `GlucoseChart` con Recharts + bandas de referencia
- [x] Tarjetas de resumen (promedio, min, max, % objetivo)
- [x] `ConfettiSuccess` al guardar

### Etapa 3 — Aprende

- [x] `LearningScreen` con categorías y tarjetas
- [x] `LessonCard` + modal con contenido educativo
- [x] Sección "Mis objetivos" integrada o en sub-ruta

### Etapa 4 — Retos (quiz + familiares)

- [x] `QuizGame` con 5 preguntas y feedback
- [x] `FamilyChallenges` con 4 retos y progreso 7 días
- [x] Confeti al completar meta

### Etapa 5 — Comida + emociones

- [x] `FoodSuggestions` (categorías tiempo / económico)
- [x] `PlateBuilder` interactivo
- [x] `EmotionalCheckIn` con escala y mensajes

### Etapa 6 — Pulido

- [x] Microinteracciones y animaciones sutiles
- [x] Disclaimer visible
- [x] Revisión responsive
- [x] QA visual mobile
- [ ] Deploy final Vercel

---

## Resultado esperado

Demo visual pulida, mobile-first, con apariencia de app real. Enfoque en:

- Registro y visualización de glucosa
- Educación en diabetes
- Objetivos y recordatorios
- Retos saludables gamificados
- Mini juego de decisiones
- Apoyo emocional

---

*Última actualización: junio 2026*
