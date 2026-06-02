export const USER = {
  name: "Ana",
  diabetesType: "Tipo 2" as const,
};

export const MICROCOPY = {
  stepByStep: "Un paso a la vez",
  everyRecord: "Cada registro cuenta",
  patience: "Tu salud merece paciencia",
  todayCounts: "Hoy también cuenta",
} as const;

type PhraseCategory =
  | "general"
  | "hardDays"
  | "selfEsteem"
  | "healthyHabits"
  | "adherence"
  | "family";

export type MotivationalPhrase = {
  text: string;
  category: PhraseCategory;
};

export const MOTIVATIONAL_PHRASES: MotivationalPhrase[] = [
  // Generales
  { text: "Cada pequeño cambio cuenta.", category: "general" },
  { text: "Tu salud merece tiempo y paciencia.", category: "general" },
  { text: "Hoy también es un buen día para empezar.", category: "general" },
  { text: "No necesitas hacerlo perfecto, solo constante.", category: "general" },
  { text: "Tu progreso vale más que la perfección.", category: "general" },
  { text: "Un paso a la vez sigue siendo avance.", category: "general" },
  { text: "Cuidarte es una forma de quererte.", category: "general" },
  { text: "Tu bienestar importa.", category: "general" },
  { text: "Lo importante es no rendirse.", category: "general" },
  { text: "Cada hábito saludable suma.", category: "general" },
  { text: "Pequeñas decisiones crean grandes resultados.", category: "general" },
  { text: "Tu salud es prioridad.", category: "general" },
  { text: "Hoy puedes hacer algo bueno por ti.", category: "general" },
  { text: "Tu esfuerzo sí está valiendo la pena.", category: "general" },
  { text: "La constancia transforma.", category: "general" },
  { text: "Avanzar lento también es avanzar.", category: "general" },
  // Microcopy destacado
  { text: MICROCOPY.stepByStep, category: "general" },
  { text: MICROCOPY.everyRecord, category: "general" },
  { text: MICROCOPY.patience, category: "general" },
  { text: MICROCOPY.todayCounts, category: "general" },
  // Días difíciles
  { text: "Un mal día no borra todo tu progreso.", category: "hardDays" },
  { text: "No te castigues por tener días difíciles.", category: "hardDays" },
  { text: "Está bien avanzar poco a poco.", category: "hardDays" },
  { text: "Descansar también es parte del proceso.", category: "hardDays" },
  { text: "Mañana es una nueva oportunidad.", category: "hardDays" },
  { text: "Ser amable contigo también es importante.", category: "hardDays" },
  { text: "Tu valor no depende de un número.", category: "hardDays" },
  { text: "No estás solo en este proceso.", category: "hardDays" },
  { text: "Respira, sigue adelante.", category: "hardDays" },
  { text: "Cada intento cuenta.", category: "hardDays" },
  { text: "Un tropiezo no define tu camino.", category: "hardDays" },
  { text: "Sé paciente contigo.", category: "hardDays" },
  { text: "Incluso los pequeños avances importan.", category: "hardDays" },
  // Autoestima y amor propio
  { text: "Mereces sentirte bien física y emocionalmente.", category: "selfEsteem" },
  { text: "Tu cuerpo merece cuidado, no castigo.", category: "selfEsteem" },
  { text: "Cuidarte también es un acto de amor propio.", category: "selfEsteem" },
  { text: "Eres más fuerte de lo que crees.", category: "selfEsteem" },
  { text: "Tu salud mental también importa.", category: "selfEsteem" },
  { text: "Tu bienestar emocional importa tanto como tu glucosa.", category: "selfEsteem" },
  { text: "Tu progreso merece reconocimiento.", category: "selfEsteem" },
  { text: "Tu salud es un proceso, no un examen.", category: "selfEsteem" },
  { text: "No eres tus diagnósticos.", category: "selfEsteem" },
  // Hábitos saludables
  { text: "Tu yo del futuro agradecerá este esfuerzo.", category: "healthyHabits" },
  { text: "Moverte hoy ayuda a tu cuerpo mañana.", category: "healthyHabits" },
  { text: "Cada comida saludable es una inversión en tu salud.", category: "healthyHabits" },
  { text: "La actividad física también es medicina.", category: "healthyHabits" },
  { text: "Un hábito saludable a la vez.", category: "healthyHabits" },
  { text: "La constancia vale más que la intensidad.", category: "healthyHabits" },
  { text: "Cada caminata cuenta.", category: "healthyHabits" },
  { text: "Los pequeños logros también merecen celebrarse.", category: "healthyHabits" },
  { text: "Nunca es tarde para empezar a cuidarte.", category: "healthyHabits" },
  // Adherencia y tratamiento
  { text: "Tomar tu tratamiento también es quererte.", category: "adherence" },
  { text: "Controlar tu salud hoy previene complicaciones mañana.", category: "adherence" },
  { text: "Tu tratamiento es una herramienta, no un castigo.", category: "adherence" },
  { text: "Cada chequeo es una forma de cuidarte.", category: "adherence" },
  { text: "Prevenir también es sanar.", category: "adherence" },
  { text: "Cuidarte hoy puede cambiar tu mañana.", category: "adherence" },
  // Familia y apoyo
  { text: "Cuidarse juntos hace el camino más fácil.", category: "family" },
  { text: "Tu familia puede ser parte de tu bienestar.", category: "family" },
  { text: "El apoyo también sana.", category: "family" },
  { text: "No tienes que hacerlo solo.", category: "family" },
  { text: "Acompañar también es cuidar.", category: "family" },
];

const PHRASE_CATEGORY_LABELS: Record<PhraseCategory, string> = {
  general: "Motivación del día",
  hardDays: "Para días difíciles",
  selfEsteem: "Amor propio",
  healthyHabits: "Hábitos saludables",
  adherence: "Tu tratamiento",
  family: "Apoyo familiar",
};

export function getDailyPhrase(): MotivationalPhrase {
  const dayIndex = new Date().getDate() % MOTIVATIONAL_PHRASES.length;
  return MOTIVATIONAL_PHRASES[dayIndex];
}

export function getPhraseCategoryLabel(category: PhraseCategory): string {
  return PHRASE_CATEGORY_LABELS[category];
}

export const WEEKLY_GLUCOSE = [
  { day: "Lun", value: 142 },
  { day: "Mar", value: 130 },
  { day: "Mié", value: 126 },
  { day: "Jue", value: 165 },
  { day: "Vie", value: 118 },
  { day: "Sáb", value: 174 },
  { day: "Dom", value: 128 },
];

export const WEEKLY_SUMMARY = {
  records: 5,
  daysInRange: 4,
  streak: 3,
};

export const GLUCOSE_GOALS = {
  fasting: { min: 80, max: 130, label: "En ayunas" },
  postprandial: { max: 180, label: "2 h postprandial" },
};

export const LAST_GLUCOSE = {
  value: 126,
  status: "Dentro de objetivo" as const,
  message:
    "Vas bien. Mantener el registro te ayuda a conocer mejor tu cuerpo.",
};

export type GlucoseStatusLabel =
  | "Dentro de objetivo"
  | "Cerca del objetivo"
  | "Fuera de objetivo";

export const STATUS_MESSAGES: Record<
  GlucoseStatusLabel,
  { emoji: string; hint: string }
> = {
  "Dentro de objetivo": {
    emoji: "✓",
    hint: "Vas bien. Mantener el registro te ayuda a conocer mejor tu cuerpo.",
  },
  "Cerca del objetivo": {
    emoji: "→",
    hint: "Estás cerca. Registrar te ayuda a entender qué influye en tu glucosa.",
  },
  "Fuera de objetivo": {
    emoji: "◎",
    hint: "Un valor fuera de rango no define tu día. Sigue registrando y consulta a tu equipo de salud.",
  },
};

export type MeasurementMoment =
  | "En ayunas"
  | "Antes de comer"
  | "2 h después de comer"
  | "Antes de dormir";

export const MEASUREMENT_MOMENTS: MeasurementMoment[] = [
  "En ayunas",
  "Antes de comer",
  "2 h después de comer",
  "Antes de dormir",
];

export type EmotionalState =
  | "Muy mal"
  | "Desanimado"
  | "Neutral"
  | "Bien"
  | "Muy bien";

export const EMOTIONAL_STATES: {
  value: EmotionalState;
  emoji: string;
}[] = [
  { value: "Muy mal", emoji: "😞" },
  { value: "Desanimado", emoji: "😕" },
  { value: "Neutral", emoji: "😐" },
  { value: "Bien", emoji: "🙂" },
  { value: "Muy bien", emoji: "😄" },
];

export type GlucoseRecord = {
  id: string;
  value: number;
  moment: MeasurementMoment;
  emotion?: EmotionalState;
  date: string;
};

export type LessonCategory =
  | "Alimentación"
  | "Actividad física"
  | "Monitoreo"
  | "Descanso"
  | "Mitos y realidades"
  | "Prevención";

export type LessonContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; title?: string; items: string[] }
  | { type: "tags"; title?: string; items: string[] }
  | { type: "myth"; myth: string; reality: string }
  | {
      type: "visual";
      title: string;
      subtitle: string;
      emoji: string;
    }
  | { type: "tip"; text: string };

export type Lesson = {
  id: string;
  category: LessonCategory;
  title: string;
  summary: string;
  content: LessonContentBlock[];
  /** Approximate read time in minutes for UI badges */
  minutes: number;
};

export const LESSON_CATEGORIES: {
  id: LessonCategory;
  label: string;
  icon: string;
  hint: string;
}[] = [
  {
    id: "Alimentación",
    label: "Alimentación",
    icon: "🥗",
    hint: "Plato balanceado, fibra y bebidas inteligentes",
  },
  {
    id: "Actividad física",
    label: "Actividad",
    icon: "🏃",
    hint: "Aeróbico + fuerza a tu ritmo",
  },
  {
    id: "Monitoreo",
    label: "Monitoreo",
    icon: "📊",
    hint: "Rangos de glucosa en ayunas y postcomida",
  },
  {
    id: "Descanso",
    label: "Descanso",
    icon: "😴",
    hint: "Sueño reparador y hábitos nocturnos",
  },
  {
    id: "Mitos y realidades",
    label: "Mitos",
    icon: "💡",
    hint: "Aclara dudas comunes sin culpas",
  },
  {
    id: "Prevención",
    label: "Prevención",
    icon: "🛡️",
    hint: "Revisiones que cuidan tu salud a largo plazo",
  },
];

export const LESSONS: Lesson[] = [
  {
    id: "ali-plato",
    category: "Alimentación",
    title: "Arma tu plato balanceado",
    summary: "Mitad verduras, cuarta proteína, cuarta carbohidratos con fibra.",
    minutes: 2,
    content: [
      {
        type: "visual",
        title: "Plato saludable",
        subtitle: "½ verduras · ¼ proteína · ¼ carbohidratos con fibra",
        emoji: "🍽️",
      },
      {
        type: "paragraph",
        text: "Incluir carbohidratos, proteínas y grasas saludables en cada comida te da energía, ayuda a conservar músculo y mantiene la saciedad.",
      },
      {
        type: "tip",
        text: "Las comidas balanceadas suelen mantenerte satisfecho más tiempo y favorecen un mejor control de la glucosa.",
      },
    ],
  },
  {
    id: "ali-calorias",
    category: "Alimentación",
    title: "Pequeños ajustes diarios",
    summary: "Una reducción de 500–700 calorías puede ser un buen punto de partida.",
    minutes: 2,
    content: [
      {
        type: "paragraph",
        text: "Tu dieta debe ser individualizada con tu médico o nutriólogo. Como referencia general, reducir 500–700 calorías al día es un buen lugar para empezar.",
      },
      {
        type: "bullets",
        title: "¿Qué representa esa reducción?",
        items: [
          "Aprox. 2 refrescos y medio",
          "1 hamburguesa grande",
          "2 donas glaseadas",
          "100 g de chocolate con leche",
        ],
      },
      {
        type: "tip",
        text: "No se trata de privarte: se trata de elegir con intención. Consulta con tu nutriólogo para personalizar tu plan.",
      },
    ],
  },
  {
    id: "ali-ultraprocesados",
    category: "Alimentación",
    title: "Limita lo ultraprocesado",
    summary: "Menos calorías vacías, más saciedad con comida real.",
    minutes: 2,
    content: [
      {
        type: "paragraph",
        text: "Idealmente evita alimentos con muchas calorías y poca nutrición: suelen hacerte sentir hambre antes y dificultan tus metas de salud.",
      },
      {
        type: "tags",
        title: "Limita con frecuencia",
        items: [
          "Refrescos azucarados",
          "Jugos envasados",
          "Bebidas energéticas",
          "Papas fritas",
          "Comida frita o congelada",
          "Pizza y hamburguesas",
        ],
      },
    ],
  },
  {
    id: "ali-bebidas-fibra",
    category: "Alimentación",
    title: "Bebidas y fibra",
    summary: "Agua natural, menos azúcar y 20–30 g de fibra al día.",
    minutes: 2,
    content: [
      {
        type: "paragraph",
        text: "Las bebidas azucaradas (refrescos, jugos, energéticas) suman calorías sin que te des cuenta. Prefiere agua natural o bebidas sin azúcar.",
      },
      {
        type: "bullets",
        title: "Bebidas a limitar",
        items: [
          "Refrescos y jugos embotellados",
          "Bebidas energéticas",
          "Cerveza, vinos dulces y cócteles (calorías y azúcar extra)",
        ],
      },
      {
        type: "visual",
        title: "Meta de fibra",
        subtitle: "20–30 g al día · más saciedad y salud digestiva",
        emoji: "🌾",
      },
      {
        type: "tags",
        title: "Alimentos con fibra",
        items: [
          "Alcachofas",
          "Brócoli",
          "Zanahoria",
          "Coles de Bruselas",
          "Frijoles y lentejas",
          "Frutos rojos",
          "Manzana",
          "Jícama",
          "Pera",
        ],
      },
    ],
  },
  {
    id: "act-meta",
    category: "Actividad física",
    title: "Tu meta semanal",
    summary: "Ideal: 200–300 minutos por semana, distribuidos como te acomode.",
    minutes: 2,
    content: [
      {
        type: "visual",
        title: "200–300 min/semana",
        subtitle: "Ej.: 50 min × 4 días · 40 min × 5 días · lo que funcione para ti",
        emoji: "⏱️",
      },
      {
        type: "paragraph",
        text: "El ejercicio es fundamental para la obesidad y la diabetes. Lo importante es moverte con constancia, no hacerlo perfecto desde el primer día.",
      },
      {
        type: "tip",
        text: "Combina actividades que disfrutes: caminar en familia, bailar o nadar cuentan.",
      },
    ],
  },
  {
    id: "act-tipos",
    category: "Actividad física",
    title: "Aeróbico + fuerza",
    summary: "150 min aeróbico y 20–30 min de fuerza, 2–3 veces por semana.",
    minutes: 2,
    content: [
      {
        type: "bullets",
        title: "Aeróbico (~150 min/semana)",
        items: ["Caminar", "Nadar", "Correr", "Bailar"],
      },
      {
        type: "bullets",
        title: "Fuerza (20–30 min, 2–3×/semana)",
        items: [
          "Gimnasio",
          "Bandas elásticas",
          "Peso corporal",
          "Lagartijas",
          "Sentadillas",
        ],
      },
      {
        type: "visual",
        title: "La actividad también es medicina",
        subtitle: "Pequeñas sesiones suman a lo largo de la semana",
        emoji: "💪",
      },
    ],
  },
  {
    id: "mon-ayunas",
    category: "Monitoreo",
    title: "Glucosa en ayunas",
    summary: "Objetivo: 80–130 mg/dL antes de comer.",
    minutes: 2,
    content: [
      {
        type: "visual",
        title: "80–130 mg/dL",
        subtitle: "Medición antes del desayuno o de comer",
        emoji: "🌅",
      },
      {
        type: "paragraph",
        text: "Si tienes glucómetro en casa, revisar en ayunas te ayuda a conocer cómo amaneces y detectar patrones a tiempo.",
      },
      {
        type: "tip",
        text: "Registrar tus mediciones (como en la sección Glucosa) facilita conversar con tu médico.",
      },
    ],
  },
  {
    id: "mon-post",
    category: "Monitoreo",
    title: "Glucosa postcomida",
    summary: "Objetivo: menor a 180 mg/dL, 2 horas después de comer.",
    minutes: 2,
    content: [
      {
        type: "visual",
        title: "< 180 mg/dL",
        subtitle: "2 horas después de comer (postprandial)",
        emoji: "🍽️",
      },
      {
        type: "paragraph",
        text: "Esta medición muestra cómo responde tu cuerpo a lo que comes. No es para juzgarte: es información útil.",
      },
      {
        type: "tip",
        text: "Si un alimento te sube mucho la glucosa, anótalo y compártelo en tu próxima consulta.",
      },
    ],
  },
  {
    id: "des-horas",
    category: "Descanso",
    title: "Duerme lo suficiente",
    summary: "Entre 7 y 9 horas por noche regulan hambre y energía.",
    minutes: 2,
    content: [
      {
        type: "visual",
        title: "7–9 horas",
        subtitle: "Sueño reparador = mejor control de apetito y más energía",
        emoji: "🌙",
      },
      {
        type: "paragraph",
        text: "Dormir lo suficiente ayuda a regular las hormonas del hambre y la saciedad, y facilita moverte y mantener hábitos saludables durante el día.",
      },
      {
        type: "bullets",
        title: "Horarios regulares",
        items: [
          "Acostarte y levantarte a horas similares",
          "Sincroniza tu reloj biológico",
          "Mejora la calidad del descanso",
        ],
      },
    ],
  },
  {
    id: "des-habitos",
    category: "Descanso",
    title: "Rutina nocturna",
    summary: "Menos pantallas, menos cafeína y un cuarto cómodo.",
    minutes: 2,
    content: [
      {
        type: "bullets",
        title: "Antes de dormir",
        items: [
          "Deja celular, TV o computadora 30–60 min antes",
          "Evita café, energéticas o té negro por la tarde/noche",
        ],
      },
      {
        type: "bullets",
        title: "Tu habitación",
        items: [
          "Lo más oscura posible",
          "Silenciosa",
          "Fresca y cómoda",
        ],
      },
      {
        type: "tip",
        text: "Pequeños cambios en la noche pueden mejorar mucho cómo te sientes al día siguiente.",
      },
    ],
  },
  {
    id: "mito-fruta",
    category: "Mitos y realidades",
    title: "¿Puedo comer fruta?",
    summary: "Sí, entera y en porciones adecuadas.",
    minutes: 2,
    content: [
      {
        type: "myth",
        myth: "Las personas con diabetes no pueden comer fruta",
        reality:
          "Sí pueden consumir fruta, preferentemente entera y en porciones adecuadas. Aporta fibra, vitaminas y minerales.",
      },
    ],
  },
  {
    id: "mito-meds",
    category: "Mitos y realidades",
    title: "Medicamentos y dieta",
    summary: "Los medicamentos funcionan mejor con buenos hábitos.",
    minutes: 2,
    content: [
      {
        type: "myth",
        myth: "Si tomo medicamentos no necesito cuidar mi alimentación",
        reality:
          "Los medicamentos funcionan mejor cuando se acompañan de una alimentación saludable y actividad física regular.",
      },
    ],
  },
  {
    id: "mito-comidas",
    category: "Mitos y realidades",
    title: "¿Saltarse comidas ayuda?",
    summary: "Omitir comidas puede empeorar el control.",
    minutes: 2,
    content: [
      {
        type: "myth",
        myth: "Saltarse comidas ayuda a bajar de peso",
        reality:
          "Omitir comidas puede aumentar el hambre después y dificultar el control de la glucosa y del peso. Procura tener todas tus comidas.",
      },
    ],
  },
  {
    id: "mito-carbs",
    category: "Mitos y realidades",
    title: "Azúcar vs carbohidratos",
    summary: "No solo el azúcar afecta la glucosa.",
    minutes: 2,
    content: [
      {
        type: "myth",
        myth: "Solo el azúcar eleva la glucosa",
        reality:
          "Todos los carbohidratos — pan, tortillas, arroz, pasta y cereales — pueden aumentar los niveles de glucosa en sangre.",
      },
    ],
  },
  {
    id: "prev-revisiones",
    category: "Prevención",
    title: "Revisiones anuales",
    summary: "Orina, pies y ojos: al menos una vez al año.",
    minutes: 2,
    content: [
      {
        type: "paragraph",
        text: "Para cuidar posibles complicaciones, es importante acudir al menos una vez al año a seguimiento. La frecuencia exacta la define tu médico.",
      },
      {
        type: "tags",
        title: "Revisiones clave",
        items: [
          "Exámenes de orina",
          "Examinación de pies",
          "Revisión de ojos",
        ],
      },
      {
        type: "visual",
        title: "La prevención también salva vidas",
        subtitle: "Detectar a tiempo facilita el tratamiento",
        emoji: "🛡️",
      },
    ],
  },
  {
    id: "prev-tamizajes",
    category: "Prevención",
    title: "Tamizajes especializados",
    summary: "Albúmina, podología y oftalmología cada año.",
    minutes: 2,
    content: [
      {
        type: "bullets",
        title: "Controles recomendados",
        items: [
          "Tamizaje de albúmina en orina",
          "Revisión podológica anual",
          "Revisión oftalmológica anual",
        ],
      },
      {
        type: "tip",
        text: "Agenda estas citas con anticipación. Son por tu bienestar, no castigos.",
      },
    ],
  },
];

export function getLessonsByCategory(category: LessonCategory): Lesson[] {
  return LESSONS.filter((lesson) => lesson.category === category);
}

export const HEALTH_GOALS = [
  {
    icon: "📊",
    title: "Medir mi glucosa",
    detail: `Ayunas ${GLUCOSE_GOALS.fasting.min}–${GLUCOSE_GOALS.fasting.max} mg/dL · postcomida < ${GLUCOSE_GOALS.postprandial.max} mg/dL`,
    hint: "Registrar ayuda a identificar patrones y conversar con tu médico.",
  },
  {
    icon: "🥗",
    title: "Comer balanceado",
    detail: "Plato: ½ verduras, ¼ proteína, ¼ carbohidratos con fibra",
    hint: "Fibra 20–30 g/día · limita ultraprocesados y bebidas azucaradas.",
  },
  {
    icon: "🚶",
    title: "Moverme durante la semana",
    detail: "200–300 min/semana · 150 min aeróbico + fuerza 2–3×",
    hint: "Caminar, nadar, bailar o usar bandas en casa cuentan.",
  },
  {
    icon: "😴",
    title: "Dormir 7–9 horas",
    detail: "Horarios regulares · sin pantallas 30–60 min antes",
    hint: "Cuento oscuro, silencioso y fresco para descansar mejor.",
  },
  {
    icon: "🏥",
    title: "Ir a revisiones médicas",
    detail: "Anual: orina, pies, ojos · albúmina, podología, oftalmología",
    hint: "Tu médico puede indicar otra frecuencia según tu caso.",
  },
];

export type QuizQuestion = {
  id: number;
  question: string;
  options: { label: string; text: string; correct: boolean }[];
  explanation: string;
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Qué es mejor colación?",
    options: [
      { label: "A", text: "Jugo envasado", correct: false },
      { label: "B", text: "Porción de fruta entera", correct: true },
    ],
    explanation:
      "La fruta entera aporta fibra y ayuda a una absorción más gradual.",
  },
  {
    id: 2,
    question: "¿Qué bebida conviene elegir con mayor frecuencia?",
    options: [
      { label: "A", text: "Refresco", correct: false },
      { label: "B", text: "Agua natural", correct: true },
    ],
    explanation:
      "Las bebidas azucaradas pueden aportar muchas calorías sin que lo notes.",
  },
  {
    id: 3,
    question: "¿Qué plato se parece más a una comida balanceada?",
    options: [
      { label: "A", text: "Verduras, proteína y carbohidrato con fibra", correct: true },
      { label: "B", text: "Solo pan dulce y refresco", correct: false },
    ],
    explanation:
      "Una comida balanceada ayuda a mantener saciedad y mejor control de glucosa.",
  },
  {
    id: 4,
    question: "¿Qué ayuda más a crear un hábito saludable?",
    options: [
      { label: "A", text: "Cambios pequeños y constantes", correct: true },
      { label: "B", text: "Hacer todo perfecto desde el primer día", correct: false },
    ],
    explanation: "La constancia vale más que la perfección.",
  },
  {
    id: 5,
    question: "¿Qué opción puede aportar más fibra?",
    options: [
      { label: "A", text: "Lentejas con verduras", correct: true },
      { label: "B", text: "Papas fritas", correct: false },
    ],
    explanation: "Las leguminosas y verduras ayudan a aumentar el consumo de fibra.",
  },
];

export type DailyQuestionKind = "yes-success" | "no-success";

export type FamilyChallenge = {
  id: string;
  title: string;
  emoji: string;
  objective: string;
  action: string;
  goalLabel: string;
  goalDays: number;
  dailyQuestion?: string;
  dailyQuestionKind?: DailyQuestionKind;
};

export const FAMILY_CHALLENGES: FamilyChallenge[] = [
  {
    id: "cero-refresco",
    title: "Reto Cero Refresco",
    emoji: "💧",
    objective:
      "Evitar comprar refresco en casa entre semana y cambiarlo por agua natural o bebidas sin azúcar.",
    action:
      "Durante 7 días, intenta no comprar refresco para casa. Cada día logrado suma 1 punto.",
    goalLabel: "5 días sin comprar refresco",
    goalDays: 5,
  },
  {
    id: "caminata",
    title: "Caminata 10 en Familia",
    emoji: "🚶",
    objective:
      "Aumentar la actividad física de forma sencilla, con caminatas cortas en familia.",
    action:
      "Después de comer o cenar, caminar 10 minutos juntos (calle, parque, patio o casa).",
    goalLabel: "3 caminatas en la semana",
    goalDays: 3,
    dailyQuestion: "¿Hoy realicé caminatas junto a algún familiar?",
    dailyQuestionKind: "yes-success",
  },
  {
    id: "sin-pantallas",
    title: "Comida sin Pantallas",
    emoji: "🍽️",
    objective:
      "Comer sin TV ni celular para comer más despacio y reconocer mejor la saciedad.",
    action:
      "Una comida al día sin pantallas: celulares guardados y TV apagada.",
    goalLabel: "4 comidas sin pantallas en la semana",
    goalDays: 4,
    dailyQuestion: "¿Alguien de mi familia ocupó alguna pantalla mientras comíamos?",
    dailyQuestionKind: "no-success",
  },
  {
    id: "porcion",
    title: "Porción Inteligente",
    emoji: "⏱️",
    objective:
      "Controlar porciones sin prohibir alimentos, con una pausa antes de repetir.",
    action:
      "Sirve una porción moderada y espera 10 minutos antes de decidir si repites.",
    goalLabel: "4 pausas de 10 min en la semana",
    goalDays: 4,
    dailyQuestion: "¿Consideré que comí más de lo que debía?",
    dailyQuestionKind: "no-success",
  },
];

export const FOOD_DISCLAIMER =
  "Estas son recomendaciones generales. Consulta con tu nutriólogo para individualizar tu alimentación.";

export const FOOD_SUGGESTIONS = {
  quick: {
    title: "Tengo poco tiempo",
    items: [
      "Tostadas horneadas con frijoles, lechuga y pico de gallo",
      "Huevo con verduras y tortilla de maíz",
      "Atún con verduras y galletas integrales",
      "Yogurt natural con avena y fruta",
    ],
  },
  budget: {
    title: "Opciones económicas",
    items: [
      "Lentejas con verduras",
      "Tacos de frijoles con pico de gallo",
      "Avena con plátano y canela",
      "Huevo con nopales",
      "Arroz con verduras y atún",
    ],
  },
};

export type PlateOption = {
  id: string;
  name: string;
  portion: string;
};

export const PLATE_BUILDER_STEPS = [
  {
    step: 1,
    key: "protein" as const,
    title: "Proteína",
    prompt: "Elige una proteína",
    options: [
      { id: "huevo", name: "Huevo", portion: "1–2 piezas" },
      { id: "pollo", name: "Pollo", portion: "Palma de la mano (90–120 g)" },
      { id: "atun", name: "Atún", portion: "1 lata en agua (100–120 g)" },
      {
        id: "frijoles",
        name: "Frijoles",
        portion: "½ a 1 taza cocidos, no refritos",
      },
      { id: "lentejas", name: "Lentejas", portion: "½ a 1 taza cocida" },
      { id: "queso", name: "Queso fresco", portion: "40–60 g" },
    ],
  },
  {
    step: 2,
    key: "base" as const,
    title: "Base",
    prompt: "Elige una base",
    options: [
      { id: "tortilla", name: "Tortilla de maíz", portion: "1–2 tortillas" },
      { id: "arroz", name: "Arroz", portion: "½ taza cocida" },
      { id: "avena", name: "Avena", portion: "½ taza en seco o ¾ preparada" },
      { id: "pan", name: "Pan integral", portion: "1 rebanada" },
      { id: "papa", name: "Papa cocida", portion: "½ papa mediana" },
    ],
  },
  {
    step: 3,
    key: "veggies" as const,
    title: "Verduras / fruta",
    prompt: "Agrega verduras o fruta (2 a 3 opciones)",
    options: [
      { id: "nopales", name: "Nopales", portion: "½ a 1 taza" },
      { id: "lechuga", name: "Lechuga", portion: "1–2 tazas" },
      { id: "jitomate", name: "Jitomate", portion: "½ a 1 pieza" },
      { id: "zanahoria", name: "Zanahoria", portion: "½ taza rallada o cocida" },
      { id: "calabacita", name: "Calabacita", portion: "½ a 1 taza" },
      { id: "pepino", name: "Pepino", portion: "½ a 1 taza" },
    ],
  },
] as const;

/** Frases de apoyo para días difíciles (pantalla de emociones) */
export const DIFFICULT_EMOTION_SUPPORT = [
  "Un mal día no borra todo tu progreso.",
  "Tu valor no depende de un número.",
  "Escuchar a tu cuerpo también es cuidarte.",
] as const;

/** Frase rotativa en el encabezado de emociones */
export const EMOTION_HIGHLIGHT_PHRASES = [
  ...DIFFICULT_EMOTION_SUPPORT,
  "No te castigues por tener días difíciles.",
  "Tu bienestar emocional importa tanto como tu glucosa.",
  "Cuidarse juntos hace el camino más fácil.",
] as const;

export function isDifficultEmotion(state: EmotionalState): boolean {
  return state === "Muy mal" || state === "Desanimado";
}

export function isPositiveEmotion(state: EmotionalState): boolean {
  return state === "Bien" || state === "Muy bien";
}

export const EMOTION_MESSAGES: Record<EmotionalState, string> = {
  "Muy mal":
    "Gracias por compartirlo. Sentirte así es válido, y no define quién eres ni todo lo que has logrado.",
  Desanimado:
    "Los días pesados pasan. No te castigues: pedir ayuda o descansar también es cuidarte.",
  Neutral:
    "Está bien no estar en un extremo. Escuchar a tu cuerpo y a tus emociones también es cuidarte.",
  Bien: "Qué bueno que tomes un momento para ti. Sigue a tu ritmo.",
  "Muy bien":
    "Tu bienestar emocional importa tanto como tu glucosa. Celebra este momento contigo.",
};

export const AMDNL_SUPPORT = {
  name: "Asociación Mexicana de Diabetes en Nuevo León (AMDNL)",
  description:
    "Organización sin fines de lucro en Nuevo León. Los datos siguientes son solo referencia; consulta directamente con ellos para talleres y programas. No sustituye la atención de tu equipo de salud.",
  offerings: [
    "Talleres de educación en diabetes para pacientes y familiares",
    "Programas de apoyo para niños, jóvenes y adultos mayores",
    "Atención multidisciplinaria (nutrición, control médico)",
    "Programas de prevención en la zona metropolitana",
  ],
  address: "Modesto Arreola No. 1040 Pte., Col. Centro, Monterrey, N.L. C.P. 64000",
  phones: ["81 8343 0682", "81 8343 0692"],
  emails: ["direccion@amdnl.org", "info@amdnl.org"],
} as const;

export type EmotionEntry = {
  id: string;
  state: EmotionalState;
  note?: string;
  date: string;
};

export type GlucoseChartPoint = {
  day: string;
  value: number;
  moment?: MeasurementMoment;
  isUserRecord?: boolean;
};

export const GLUCOSE_STATUS_COLORS = {
  success: "#58cc02",
  warning: "#ff9600",
  danger: "#ff4b4b",
} as const;

export function getGlucoseStatus(
  value: number,
  moment?: MeasurementMoment,
): {
  label: GlucoseStatusLabel;
  color: "success" | "warning" | "danger";
} {
  if (moment === "Antes de dormir") {
    if (value >= 70 && value <= 200) {
      return { label: "Cerca del objetivo", color: "warning" };
    }
    return { label: "Fuera de objetivo", color: "danger" };
  }

  if (moment === "En ayunas") {
    if (
      value >= GLUCOSE_GOALS.fasting.min &&
      value <= GLUCOSE_GOALS.fasting.max
    ) {
      return { label: "Dentro de objetivo", color: "success" };
    }
    return { label: "Fuera de objetivo", color: "danger" };
  }

  const isPostprandial = moment === "2 h después de comer";

  if (isPostprandial) {
    if (value < GLUCOSE_GOALS.postprandial.max) {
      return { label: "Dentro de objetivo", color: "success" };
    }
    if (value <= 200) {
      return { label: "Cerca del objetivo", color: "warning" };
    }
    return { label: "Fuera de objetivo", color: "danger" };
  }

  if (value >= GLUCOSE_GOALS.fasting.min && value <= GLUCOSE_GOALS.fasting.max) {
    return { label: "Dentro de objetivo", color: "success" };
  }
  if (value >= 70 && value <= GLUCOSE_GOALS.postprandial.max) {
    return { label: "Cerca del objetivo", color: "warning" };
  }
  return { label: "Fuera de objetivo", color: "danger" };
}

export function isInRange(value: number, moment?: MeasurementMoment): boolean {
  if (moment === "Antes de dormir") {
    return false;
  }
  return getGlucoseStatus(value, moment).label === "Dentro de objetivo";
}

export function getGlucoseStatusHint(
  value: number,
  moment?: MeasurementMoment,
): string {
  if (moment === "Antes de dormir") {
    return "Registro para tu seguimiento. Comparte patrones con tu equipo de salud en la consulta.";
  }
  const { label } = getGlucoseStatus(value, moment);
  return STATUS_MESSAGES[label].hint;
}

const CHART_DAY_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: "short",
};

function chartDayLabel(isoOrDate: string | Date): string {
  const date = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  const label = date
    .toLocaleDateString("es-MX", CHART_DAY_FORMAT)
    .replace(/\./g, "");
  return label.charAt(0).toUpperCase() + label.slice(1, 3);
}

/**
 * Chart series for /glucosa:
 * - Sin registros guardados: solo WEEKLY_GLUCOSE (demo).
 * - Con registros: mock semanal + lecturas del usuario de los últimos 7 días
 *   (misma fuente que promedio / min / max / % en objetivo).
 */
export function buildGlucoseChartSeries(
  savedRecords: GlucoseRecord[],
): GlucoseChartPoint[] {
  const mockPoints: GlucoseChartPoint[] = WEEKLY_GLUCOSE.map((point) => ({
    day: point.day,
    value: point.value,
    isUserRecord: false,
  }));

  if (savedRecords.length === 0) {
    return mockPoints;
  }

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentUser = savedRecords
    .filter((record) => new Date(record.date).getTime() >= sevenDaysAgo)
    .map((record) => ({
      day: chartDayLabel(record.date),
      value: record.value,
      moment: record.moment,
      isUserRecord: true,
    }))
    .reverse();

  return [...mockPoints, ...recentUser];
}

export function computeWeeklyGlucoseStats(data: { value: number; moment?: MeasurementMoment }[]) {
  const values = data.map((d) => d.value);
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const high = Math.max(...values);
  const low = Math.min(...values);
  const withTarget = data.filter((d) => d.moment !== "Antes de dormir");
  const scorable = withTarget.length > 0 ? withTarget : data;
  const inRangeCount = scorable.filter((d) =>
    isInRange(d.value, d.moment),
  ).length;
  const total = scorable.length;
  const percent = total > 0 ? Math.round((inRangeCount / total) * 100) : 0;
  return { avg, high, low, percent, inRangeCount, total };
}

export function formatRecordDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
