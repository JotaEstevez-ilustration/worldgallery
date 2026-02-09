Personaliza el sistema de diseño del portfolio scrollytelling.

## 📎 CONTEXTO - Lee estos archivos adjuntos

1. **project-brief.md** → Sección "Identidad Visual"
   - Obtén: paleta de colores, tipografías, URLs Google Fonts

2. **assets/css/_variables.css** → Variables actuales
   - Identifica: qué variables actualizar

## INSTRUCCIÓN

Extrae de `project-brief.md` sección "Identidad Visual":
- Color primario, secundario, acentos 1-3 (hex codes)
- Fuente heading y body (nombres + URLs Google Fonts)
- Verificación de contraste (debe estar documentada)

## TAREAS

1. **Actualizar _variables.css:**
   ```css
   :root {
     /* Fuentes - usar las del brief */
     --font-family-heading: '[Fuente del brief]', var(--font-family-base);

     /* Colores - usar hex del brief */
     --color-primary: #[del brief];
     --color-primary-hover: #[generar variación oscura 10%];

     /* Gradientes - crear coherentes con la paleta */
     --gradient-hero: linear-gradient(135deg, #[primario] 0%, #[secundario] 100%);
     --gradient-chapter-1: linear-gradient(135deg, #[acento1], #[variación]);
     --gradient-chapter-2: linear-gradient(135deg, #[acento2], #[variación]);
     --gradient-chapter-3: linear-gradient(135deg, #[acento3], #[variación]);

     /* Acentos - usar del brief */
     --color-accent-blue: #[acento1 del brief];
     --color-accent-red: #[acento2 del brief];
     --color-accent-green: #[acento3 del brief];
   }
