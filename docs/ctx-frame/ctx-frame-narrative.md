# CTX Frame — Narrative

---

## La tesis

La IA ya puede leer tu código.
El problema es que el código no contiene lo que más importa.

---

## Lo que la IA sí puede hacer hoy

Los modelos de lenguaje modernos son extraordinariamente capaces de leer código. Pueden inferir arquitecturas, entender dependencias, navegar sistemas complejos, y generar implementaciones coherentes con lo que ya existe.

Esto no es el problema.

El contexto técnico tampoco es el problema. Los equipos de ingeniería ya tienen documentación técnica: diagramas de arquitectura, READMEs, specs de API, comentarios en el código. La IA puede leer todo eso.

---

## Lo que no existe en ningún archivo técnico

El código documenta **el qué**.

Nunca documenta **el porqué**.

Ningún archivo técnico contiene:

- Por qué este módulo tiene este límite y no otro
- Qué regla de negocio está detrás de esta validación
- Por qué este flujo fue diseñado así y no de la forma más obvia
- Qué puede cambiar libremente y qué tiene consecuencias en regulación
- Cuál es la intención del producto detrás de esta feature

Eso vive en las cabezas de las personas que construyeron el sistema.

Cuando esas personas no están — en una sesión nueva, en un equipo nuevo, en seis meses — ese conocimiento desaparece.

---

## El contexto que existe vs. el contexto que falta

Hoy, un ingeniero que trabaja con IA tiene dos tipos de contexto disponibles:

**Contexto técnico** — el código, la arquitectura, las integraciones. La IA puede leerlo, inferirlo, y operar sobre él con razonable precisión.

**Contexto intencional de producto** — por qué el sistema existe, qué reglas lo gobiernan, qué comportamientos son no negociables, cómo se relacionan los dominios desde una perspectiva de producto. Este contexto **no existe en ningún formato estructurado**. No tiene un hogar.

El resultado es que la IA opera con la mitad del mapa.

Puede leer la implementación. No puede leer la intención.

---

## Qué pasa cuando la IA opera sin contexto intencional

La IA no improvisa mal. Improvisa *razonablemente bien*.

Y eso es exactamente el problema.

Cuando falta contexto intencional, el modelo hace lo que parece correcto técnicamente. La mayoría de las veces, el código funciona. Pasa los tests. Se ve bien en el diff.

Pero puede estar violando una restricción de negocio que nadie escribió en ningún lugar. Puede estar acoplando dos dominios que deben permanecer separados. Puede estar tomando la decisión de diseño más obvia — que fue descartada hace ocho meses por una razón que solo tres personas recuerdan.

El problema no es que la IA genere código malo.
Es que genera código que no puede saber si es correcto.

---

## El contexto intencional como rol de primera clase

CTX Frame parte de una idea simple pero radical:

**El contexto intencional de producto debe ser un artefacto explícito, estructurado, y versionado — al mismo nivel que el código.**

No como documentación. La documentación es una descripción del sistema después de que fue construido.

Como contexto vivo: un conjunto de archivos que definen la intención antes de que el código exista, que evolucionan junto con el sistema, y que cualquier modelo puede leer antes de actuar.

Cada concepto significativo del sistema tiene un archivo de contexto que responde:

- **Qué es esto** — y qué no es
- **Por qué existe** — la intención de producto, no la descripción técnica
- **Qué puede cambiar** y qué no puede cambiar bajo ninguna circunstancia
- **Con qué se relaciona** — dependencias explícitas, no inferidas
- **Qué haría un guardrail** — las restricciones que no son evidentes en el código

---

## Context-Driven Development

Cuando el contexto intencional existe como artefacto de primera clase, cambia algo más profundo que la calidad de los outputs de la IA.

Cambia el orden en que ocurre el desarrollo.

**En el desarrollo tradicional — incluso asistido por IA — el flujo es:**

```
Idea → conversación con la IA → código
```

El ingeniero describe lo que quiere. La IA genera. El ingeniero revisa.
El contexto existe solo en la conversación. Desaparece cuando termina la sesión.

**En Context-Driven Development, el flujo es:**

```
Idea → cambio en el contexto intencional → la IA refleja ese cambio en el código
```

El código deja de ser la interfaz primaria del sistema.
El contexto intencional lo es.

---

### Por qué esta inversión importa

En el flujo tradicional, la IA actúa sobre lo que se le dice en el momento. No tiene acceso a lo que el sistema *debe ser* — solo a lo que el sistema *es* en el código.

En Context-Driven Development, el ingeniero expresa la intención editando un archivo de contexto. Ese archivo define lo que debe cambiar, por qué debe cambiar, qué restricciones aplican, y qué otros dominios se ven afectados.

La IA lee ese cambio y lo traduce a código — no libremente, sino dentro de los límites que el contexto establece.

El resultado es un sistema donde ningún cambio puede violar las reglas intencionales de producto, porque esas reglas están escritas antes de que el código exista.

---

### El cambio de contexto como unidad de trabajo

En CTX Frame, la unidad de trabajo no es un prompt. No es un commit. No es un ticket.

Es un **cambio en el contexto intencional**.

Cuando un ingeniero quiere agregar un comportamiento, primero actualiza el archivo de contexto de la feature correspondiente. Define el nuevo flujo, sus contratos, sus guardrails. La IA lee ese diff y genera un plan de implementación estructurado. El ingeniero lo aprueba. El código cambia.

El contexto viene primero. Siempre.

Esto significa que cada cambio al sistema tiene dos registros:

1. **El registro de intención** — el contexto actualizado, con los porqués explícitos
2. **El registro de implementación** — el código que refleja esa intención

Ambos están en el repositorio. Ambos se versionan. Ambos son legibles por humanos y por máquinas.

---

### Qué garantiza este orden

Cuando el contexto viene primero, dos clases de errores dejan de ser posibles:

**Errores de impacto no visto** — la IA conoce las dependencias explícitas antes de actuar. Si el cambio de intención en una feature afecta a otra, eso está declarado en `depends_on`. El impacto es visible antes de que se escriba una línea de código.

**Errores de intención** — la IA opera dentro de los guardrails del contexto. Las restricciones de producto no son inferidas del código — están escritas. No pueden ser ignoradas accidentalmente.

El código resultante no solo funciona técnicamente.
Es correcto *por construcción* — desde la intención que lo originó.

---

### Context-Driven Development no ralentiza. Disciplina.

El flujo de trabajo no agrega fricción al desarrollo. Agrega *estructura* al punto donde la fricción ya existía.

La fricción ya existe hoy: en la explicación que el ingeniero tiene que darle a la IA antes de cada sesión, en la revisión que detecta que el código generado violó una restricción que nadie escribió, en las conversaciones de team review que reconstruyen el contexto que debería estar documentado.

Context-Driven Development mueve esa fricción hacia el único momento en que tiene sentido: antes de que el código exista.

---

## La jerarquía de la intención

El contexto intencional tiene niveles. No toda intención opera a la misma escala.

```
App → Capability → Module → Feature → Spec
```

**App** — por qué existe el producto. Sus principios, sus restricciones globales, el comportamiento que el modelo puede y no puede modificar.

**Capability** — un dominio transversal compartido por múltiples módulos. Sus límites, sus invariantes.

**Module** — qué posee este dominio, qué no posee, y por qué esa frontera existe.

**Feature** — el comportamiento concreto: su propósito, sus flujos, sus contratos, sus guardrails.

**Spec** — el detalle técnico exacto que no debe perderse en ninguna refactorización.

Cada nivel responde preguntas distintas. Cada nivel tiene su propio contrato.

---

## No es documentación. Es intención ejecutable.

La documentación describe lo que ya existe.

El contexto intencional de CTX Frame define **lo que debe ser cierto siempre** — independientemente de cómo evolucione la implementación.

Esa diferencia importa porque la documentación envejece y se desactualiza.
Los guardrails de producto no cambian con cada refactor.

Un módulo de pagos que nunca debe procesar una transacción sin validación KYC — eso no cambia porque alguien migre de REST a gRPC. Esa restricción vive en el contexto intencional, no en el código.

---

## La consecuencia de no tener esto

No es un colapso catastrófico. Es una erosión lenta.

Cada vez que un nuevo ingeniero llega a un sistema, pasa semanas reconstruyendo el mapa intencional que solo existe en las cabezas del equipo original.

Cada vez que la IA asiste en una feature, el ingeniero gasta tiempo explicando el contexto que debería estar escrito.

Cada vez que cambia un módulo que afecta a otro, alguien lo descubre en producción porque nadie tenía visibilidad del vínculo.

El sistema funciona. Pero cada cambio cuesta más de lo que debería.

---

## CTX Frame en una oración

CTX Frame es el sistema que convierte el contexto intencional de producto en un artefacto de primera clase — y lo pone como el origen de cada cambio al sistema, garantizando que el código resultante sea correcto tanto técnica como intencionalmente.