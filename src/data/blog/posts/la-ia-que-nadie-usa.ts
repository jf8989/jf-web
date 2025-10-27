/// Path: src/data/blog/posts/la-ia-que-nadie-usa.ts
/// Role: Bilingual article data with three image placeholders mapped to nice figure blocks.

import type { BlogPost } from "@/data/blog/types";

const post: BlogPost = {
  slug: "la-ia-que-nadie-usa",
  title: {
    en: "The AI Nobody Uses: Why Your Dashboards Are Worth Nothing",
    es: "La IA que nadie usa: Por qué sus dashboards no valen nada",
  },
  description: {
    en: "If your AI didn’t force a different decision this week, you don’t have an AI project — you have an expensive hobby.",
    es: "Si su equipo no tomó una decisión diferente esta semana gracias a la IA, no tiene un proyecto: tiene un hobby caro.",
  },
  publishedAt: "2025-10-27T00:00:00.000Z",
  tags: ["AI", "Decision-Making", "Ops", "Strategy"],
  blocks: [
    {
      type: "image",
      src: "/images/blog/la-ia-que-nadie-usa/hero.jpg",
      alt: {
        en: "A quiet control room full of unused dashboards.",
        es: "Una sala de control silenciosa llena de dashboards sin uso.",
      },
      caption: {
        en: "Dashboards don’t decide. People with calendars do.",
        es: "Los dashboards no deciden. Las personas con calendario sí.",
      },
      width: 1600,
      height: 900,
      priority: true,
    },

    {
      // La regla del lunes
      type: "p",
      text: {
        en: "The Monday Rule: If your team didn’t make a different decision this week because of AI, you don’t have an AI project. You have an expensive hobby.",
        es: "La regla del lunes: Si su equipo no tomó una decisión diferente esta semana gracias a la IA, usted no tiene un proyecto de IA. Tiene un hobby caro.",
      },
    },

    {
      type: "h2",
      text: { en: "The Innovation Theater", es: "El teatro de la innovación" },
    },
    {
      type: "p",
      text: {
        en: "I know the pattern. Six months building an ML model. Hiring talent, buying infra, quarterly demos. The model works. Accuracy is 87%. Everyone applauds.",
        es: "Conozco el patrón. Lo he visto varias veces: una empresa invierte seis meses desarrollando un modelo de machine learning. Contratan talento, compran infraestructura, hacen presentaciones trimestrales. El modelo funciona. La precisión es del 87%. Todos aplauden.",
      },
    },
    {
      type: "p",
      text: {
        en: "Six months later, nobody uses it.",
        es: "Seis meses después, nadie lo usa.",
      },
    },
    {
      type: "p",
      text: {
        en: "The issue was never technical. We build AI to impress, not to decide: dashboards nobody checks, alerts nobody acts on, predictions nobody folds into the workflow.",
        es: "El problema no es técnico. Nunca lo fue. El problema es que construimos IA para impresionar, no para decidir. Creamos dashboards que nadie consulta, alertas que nadie atiende, predicciones que nadie incorpora en su flujo de trabajo.",
      },
    },
    {
      type: "p",
      text: {
        en: "Uncomfortable question: What specific decision will be different because of this?",
        es: "La pregunta incómoda que nadie hace: ¿Qué decisión específica va a cambiar gracias a esto?",
      },
    },

    {
      type: "image",
      src: "/images/blog/la-ia-que-nadie-usa/middle.jpg",
      alt: {
        en: "A sticky note on a monitor reading: What decision changes?",
        es: "Un post-it en un monitor que dice: ¿Qué decisión cambia?",
      },
      caption: {
        en: "If no decision changes, nothing changes.",
        es: "Si no cambia la decisión, no cambia nada.",
      },
      width: 1400,
      height: 900,
    },

    {
      type: "h2",
      text: {
        en: "Three Lies We Tell Ourselves",
        es: "Las tres mentiras que nos contamos",
      },
    },
    {
      type: "p",
      text: {
        en: "Lie #1: “We need more data before deciding.” No — you need the minimum viable signal to act. If you wait for certainty, your competitors already moved with 70% of the info.",
        es: 'Mentira #1: "Necesitamos más datos antes de decidir" No. Se necesita el dato mínimo viable para actuar. Si espera certeza absoluta, sus competidores ya tomaron la decisión con el 70% de la información que usted está esperando.',
      },
    },
    {
      type: "p",
      text: {
        en: "Lie #2: “We need more accuracy.” Will 84% vs 87% really change the decision? If not, stop optimizing and start implementing.",
        es: 'Mentira #2: "Nuestro modelo necesita más precisión" ¿En serio? ¿La diferencia entre 84% y 87% de precisión va a cambiar su decisión? Porque si no la cambia, es momento de dejar de optimizar y empezar a implementar.',
      },
    },
    {
      type: "p",
      text: {
        en: "Lie #3: “We’ll run a pilot first.” The perpetual pilot: six months, then “we need to refine,” then another pilot — while the original problem remains unsolved.",
        es: 'Mentira #3: "Vamos a hacer un piloto primero" El piloto perpetuo. Seis meses de piloto, luego "necesitamos refinar". Otro piloto. Mientras tanto, el problema que intentaban resolver sigue ahí, sin resolver.',
      },
    },

    {
      type: "h2",
      text: { en: "The Monday System", es: "El sistema de los lunes" },
    },
    {
      type: "p",
      text: {
        en: "AI only matters if it forces different decisions — and decisions only matter on a calendar.",
        es: "Aquí está la verdad incómoda: la IA solo importa si obliga a tomar decisiones diferentes. Y las decisiones solo importan si tienen calendario.",
      },
    },
    {
      type: "p",
      text: {
        en: `Seen this work well: every Monday at 9 AM, make one AI-informed decision with clear follow-through.

- **Week 1:** Predicted cart abandonment 12–16% → double live chat for Electronics over the weekend → down to 9%.
- **Week 2:** Inventory signals show a product will stock out in 8–11 days → pause paid ads for that SKU and reallocate budget → save $4,200 in wasted clicks.
- **Week 3:** Region drops at shipping step → A/B test a free-shipping threshold at $X → +22% conversion in that region.`,
        es: `He visto cómo funciona esto en empresas que lo aplican bien. Por ejemplo: cada lunes a las 9 AM, una decisión obligatoria informada por IA:

- **Semana 1:** El modelo predice 12–16% de abandono de carrito en electrónicos. **Decisión:** duplicar chat en vivo el fin de semana. **Resultado:** bajó a 9%.
- **Semana 2:** Señales de inventario muestran quiebre en 8–11 días. **Decisión:** pausar pauta para ese SKU y redirigir presupuesto. **Ahorro:** $4,200 en clics desperdiciados.
- **Semana 3:** Cierta región abandona en envío. **Decisión:** test A/B con envío gratis sobre $X. **Conversión:** +22% en esa región.`,
      },
    },
    {
      type: "p",
      text: {
        en: "See the pattern? Each week, a decision. Not “insights.” Not “interesting observations.” Decisions.",
        es: '¿Se nota el patrón? Cada semana, una decisión. No "insights". No "observaciones interesantes". Decisiones.',
      },
    },

    {
      type: "h2",
      text: {
        en: "The Invisible Cost of Not Deciding",
        es: "El costo invisible de no decidir",
      },
    },
    {
      type: "p",
      text: {
        en: "What nobody logs in executive reports: the cost of not deciding.",
        es: "Aquí está lo que nadie registra en sus reportes: cuánto cuesta no tomar una decisión.",
      },
    },
    {
      type: "p",
      text: {
        en: "It repeats in HR over and over.",
        es: "Es un patrón que se repite constantemente en los departamentos de RRHH. El diálogo suele ser así:",
      },
    },
    {
      type: "p",
      text: {
        en: "HR Director: “We know 15% of new hires will churn in the first three months, but we don’t know who.”",
        es: 'Director de RRHH: "Sabemos que el 15% de nuestros nuevos empleados van a renunciar en los primeros tres meses, pero no tenemos certeza de quiénes."',
      },
    },
    {
      type: "p",
      text: {
        en: "Consultant: “And how much to replace each one?”",
        es: 'Consultor: "¿Y cuánto cuesta reemplazar a cada uno?"',
      },
    },
    {
      type: "p",
      text: {
        en: "HR Director: “About $12,000 across recruiting, training, and lost productivity.”",
        es: 'Director de RRHH: "Aproximadamente $12,000 entre reclutamiento, entrenamiento y productividad perdida."',
      },
    },
    {
      type: "p",
      text: {
        en: "Consultant: “If you could identify even half of that 15% early enough, what would you do differently?”",
        es: 'Consultor: "Entonces, si pudiera identificar aunque sea a la mitad de ese 15% con suficiente anticipación, ¿qué haría diferente?"',
      },
    },
    {
      type: "p",
      text: {
        en: "HR Director: “…Assign a senior mentor, do weekly check-ins, reset expectations.”",
        es: 'Director de RRHH: (Silencio) "...Asignaríamos un mentor senior. Haríamos check-ins semanales. Ajustaríamos expectativas."',
      },
    },
    {
      type: "p",
      text: {
        en: "Consultant: “And the cost?”",
        es: 'Consultor: "¿Y el costo de eso?"',
      },
    },
    {
      type: "p",
      text: {
        en: "HR Director: “Roughly $800 per employee.”",
        es: 'Director de RRHH: "Tal vez alrededor de $800 por empleado."',
      },
    },
    {
      type: "p",
      text: {
        en: "The math is brutal: each churn costs ~$12,000; intervening costs ~$800. Inaction due to uncertainty burns money.",
        es: 'La matemática es brutal: cada empleado que se va cuesta $12,000. Intervenir cuesta $800. Pero no se interviene porque "no hay certeza".',
      },
    },
    {
      type: "p",
      text: {
        en: "That uncertainty is costing a company like this roughly $180,000 a year.",
        es: "Esa incertidumbre le está costando a una empresa así unos $180,000 al año.",
      },
    },

    {
      type: "image",
      src: "/images/blog/la-ia-que-nadie-usa/final.jpg",
      alt: {
        en: "A traffic-light dashboard (green, yellow, red) replacing decimals.",
        es: "Un panel con semáforos (verde, amarillo, rojo) reemplazando decimales.",
      },
      caption: {
        en: "Trade decimals for traffic lights: green/amber/red thresholds drive action.",
        es: "Cambie decimales por semáforos: umbrales verde/amarillo/rojo impulsan acciones.",
      },
      width: 1400,
      height: 900,
    },

    {
      type: "h2",
      text: { en: "Three Non-Negotiables", es: "Tres reglas no negociables" },
    },
    {
      type: "p",
      text: {
        en: "If you will implement AI in your company, these rules are non-negotiable:",
        es: "Si va a implementar IA en su empresa, estas tres reglas son innegociables:",
      },
    },

    {
      type: "h3",
      text: {
        en: "Rule #1: Start from the decision, not the data.",
        es: "Regla #1: Empezar por el final: La Decisión",
      },
    },
    {
      type: "p",
      text: {
        en: "Don’t start with “we have these data.” Start with “this decision is stuck,” then find the minimum data to unblock it.",
        es: 'No empezar con "tenemos estos datos". Empezar con "esta decisión nos está paralizando". Luego, buscar los datos mínimos para desbloquearla.',
      },
    },
    {
      type: "p",
      text: { en: "One-liner format:", es: "Formato de una línea:" },
    },
    {
      type: "p",
      text: {
        en: `> "If [metric] is between [X–Y], then [concrete action] before [deadline]."`,
        es: `> "Si [métrica] está entre [X–Y], entonces [acción concreta] antes de [plazo]."`,
      },
    },
    {
      type: "p",
      text: {
        en: "Example: “If churn risk is between 15–20%, then contact at-risk accounts within 48 hours.”",
        es: "Ejemplo: “Si el riesgo de cancelación está entre 15–20%, entonces contactar a cuentas en riesgo en las próximas 48 horas.”",
      },
    },

    {
      type: "h3",
      text: {
        en: "Rule #2: Drop decimals, adopt traffic lights.",
        es: "Regla #2: Abandonar los decimales, adoptar los semáforos",
      },
    },
    {
      type: "p",
      text: {
        en: `- **Green (0–5%)**: Do nothing.
- **Amber (5–12%)**: Monitor and prepare contingencies.
- **Red (12%+)**: Immediate action.`,
        es: `- **Verde (0–5%)**: No hacer nada.
- **Amarillo (5–12%)**: Monitorear y preparar contingencias.
- **Rojo (12%+)**: Acción inmediata.`,
      },
    },
    {
      type: "p",
      text: {
        en: "This kills endless meetings debating whether 8.7% is different from 8.9%.",
        es: "Este sistema elimina reuniones interminables debatiendo si 8.7% es realmente diferente de 8.9%.",
      },
    },

    {
      type: "h3",
      text: {
        en: "Rule #3: If it takes more than 15 minutes, it’s debate, not decision.",
        es: "Regla #3: Si dura más de 15 minutos, es un debate, no una decisión",
      },
    },
    {
      type: "p",
      text: {
        en: "If your decision meeting runs longer, it’s a discovery session in disguise.",
        es: "Si su reunión de toma de decisiones dura más, no es una reunión de decisiones. Es una sesión de exploración disfrazada.",
      },
    },
    { type: "p", text: { en: "Real agenda:", es: "Agenda real:" } },
    {
      type: "p",
      text: {
        en: `- **Minutes 0–5:** What does the model say?
- **Minutes 5–10:** What options do we have?
- **Minutes 10–15:** Which one do we pick and who owns it?`,
        es: `- **Minutos 0–5:** ¿Qué dice el modelo?
- **Minutos 5–10:** ¿Qué opciones tenemos?
- **Minutos 10–15:** ¿Cuál elegimos y quién ejecuta?`,
      },
    },

    {
      type: "h2",
      text: {
        en: "What to Really Measure",
        es: "Lo que realmente se debe medir",
      },
    },
    {
      type: "p",
      text: {
        en: "Forget F1 scores and confusion matrices in executive reports. These are the only metrics that matter:",
        es: "Olvidarse de F1 scores y matrices de confusión en los reportes ejecutivos. Estas son las únicas métricas que importan:",
      },
    },
    {
      type: "p",
      text: {
        en: `- Decisions made this week: **minimum target = 1**.
- Time from insight to decision: **under 72 hours**.
- Reversion rate: how many decisions had to be reverted? *(Shouldn’t be zero; otherwise you’re not taking enough risk.)*
- Decisions that wouldn’t exist without AI: **the one that actually matters**.`,
        es: `- Decisiones tomadas esta semana: **objetivo mínimo = 1**.
- Tiempo desde insight hasta decisión: **< 72 horas**.
- Tasa de reversión: ¿cuántas decisiones se revirtieron? *(No debe ser cero; o no se está arriesgando lo suficiente)*.
- Decisiones que no se habrían tomado sin IA: **la métrica que realmente importa**.`,
      },
    },

    { type: "h2", text: { en: "The Final Question", es: "La pregunta final" } },
    {
      type: "p",
      text: {
        en: "The definitive test for your AI project:",
        es: "Aquí está el test definitivo para su proyecto de IA:",
      },
    },
    {
      type: "p",
      text: {
        en: "If your model died tomorrow, would a critical decision lose support within 48 hours?",
        es: "Si mañana su modelo deja de funcionar, ¿alguien lo notaría en las primeras 48 horas porque una decisión crítica quedó sin respaldo?",
      },
    },
    {
      type: "p",
      text: {
        en: "If not, you don’t have a strategic AI project — you have an interesting experiment consuming resources.",
        es: "Si la respuesta es no, no tiene un proyecto de IA estratégico. Tiene un experimento interesante que está consumiendo recursos.",
      },
    },
    {
      type: "p",
      text: {
        en: "Interesting experiments don’t pay salaries.",
        es: "Y experimentos interesantes no pagan salarios.",
      },
    },
    {
      type: "p",
      text: {
        en: "AI isn’t a technology asset. It’s a decision asset. Start treating it like one.",
        es: "La IA no es un activo tecnológico. Es un activo de decisión. Es hora de empezar a tratarla como tal.",
      },
    },
    {
      type: "p",
      text: {
        en: "Ready to stop having an expensive hobby? Define the one decision your AI must force this Monday.",
        es: "¿Estamos listos para dejar de tener un hobby caro?  Piense y defina la única decisión que su IA debe forzar este lunes.",
      },
    },
    {
      type: "p",
      text: {
        en: "This article proposes a shift: judge AI not by technical sophistication but by the decisions it enables.",
        es: "Este artículo propone un cambio de paradigma: medir el éxito de la IA no por su sofisticación técnica, sino por las decisiones que habilita.",
      },
    },
  ],
};

export default post;
