# MB Odontología — Sitio web estático

Sitio web institucional para Clínica MB Odontología, desarrollado como proyecto estático en HTML, CSS y JavaScript. Está preparado para publicarse en GitHub Pages, Cloudflare Pages, Netlify u otro hosting estático equivalente.

## Estado del proyecto

Versión optimizada del sitio con imágenes principales convertidas a WebP, formulario conectado a Formspree, página de campañas independiente y footer compacto.

El sitio mantiene una arquitectura simple para facilitar edición manual desde Visual Studio Code sin depender de frameworks, compiladores ni backend propio.

## Estructura de archivos

```text
/
├── index.html              # Home principal
├── servicios.html          # Servicios odontológicos
├── equipo.html             # Página del equipo / nosotros
├── agendar.html            # Página de agendamiento y formulario
├── campanas.html           # Landing de campañas
├── privacidad.html         # Política de privacidad
├── 404.html                # Página de error 404
├── en-construccion.html    # Página transitoria para secciones pendientes
├── sitemap.xml             # Sitemap del sitio
├── robots.txt              # Reglas básicas para buscadores
├── llms.txt                # Resumen legible para agentes IA
├── README.md               # Documentación del proyecto
└── assets/
    ├── css/
    │   └── styles.css      # Estilos globales del sitio
    ├── js/
    │   └── scripts.js      # Funciones JS: menú, carruseles, formularios, animaciones
    └── img/
        ├── *.webp          # Imágenes optimizadas del sitio
        ├── favicon.ico
        ├── favicon-32.png
        ├── favicon-192.png
        └── og-image.jpg
```

## Páginas principales

### `index.html`
Home institucional. Incluye hero con carrusel de imágenes, bloque de propósito, carrusel de servicios, accesos rápidos, ubicación con Google Maps, CTA final y footer.

### `servicios.html`
Página de servicios clínicos. Contiene tarjetas con imagen, título, descripción y CTA.

### `equipo.html`
Página del equipo profesional. Mantiene grilla editable de profesionales.

### `agendar.html`
Página de conversión principal. Incluye hero con botón WhatsApp, formulario de contacto y bloque de ubicación con Google Maps.

### `campanas.html`
Landing independiente para campañas/promociones. No aparece en el header principal. Incluye breadcrumbs para volver al inicio, hero propio, tarjetas de campañas, formulario conectado a Formspree y bloque de ubicación.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript vanilla
- Formspree para recepción de formularios
- Google Maps Embed mediante iframe
- Imágenes WebP optimizadas

No usa React, Bootstrap, Tailwind, WordPress ni backend propio.

## Formulario de contacto

Los formularios están conectados a Formspree mediante el endpoint:

```text
https://formspree.io/f/mvzyvwob
```

Los formularios usan la clase:

```html
<form class="contact-form" action="https://formspree.io/f/mvzyvwob" method="POST">
```

El archivo `assets/js/scripts.js` gestiona:

- validación básica de campos obligatorios;
- envío real a Formspree;
- mensaje de éxito o error;
- bloqueo temporal del botón para evitar doble envío;
- soporte para múltiples formularios `.contact-form` en una misma página;
- campo honeypot anti-spam.

Si se cambia el endpoint de Formspree, actualizar el atributo `action` en los formularios correspondientes.

## WhatsApp

Los botones de WhatsApp usan enlaces con formato:

```text
https://wa.me/56946213158?text=MENSAJE_CODIFICADO
```

Para cambiar el número, reemplazar:

```text
56946213158
```

por el nuevo número en los archivos HTML.

## Google Maps

El mapa incrustado usa iframe con la dirección:

```text
José Miguel Carrera 186, San Bernardo, Chile
```

El bloque de ubicación está presente en `index.html`, `agendar.html` y `campanas.html`.

Para modificar la dirección, buscar en los HTML:

```text
José Miguel Carrera 186
```

y actualizar también la URL del iframe de Google Maps si corresponde.

## Imágenes

Las imágenes principales del sitio están en `assets/` y fueron optimizadas a formato `.webp`.

Ejemplos relevantes:

```text
assets/img/hero-home-atencion-movil.webp
assets/img/hero-home-equipo-movil.webp
assets/img/hero-home-sede-san-bernardo.webp
assets/img/hero-home-clinica-movil.webp
assets/img/hero-agendar-calendario.webp
assets/img/hero-campanas-consulta.webp
assets/img/servicio-card-01.webp
...
assets/img/servicio-card-09.webp
```

Para reemplazar una imagen:

1. Crear la nueva imagen con el mismo ratio visual.
2. Guardarla preferentemente como `.webp`.
3. Reemplazar el archivo manteniendo el mismo nombre, o actualizar la ruta en HTML/CSS.
4. Revisar en desktop y móvil antes de publicar.

## Carruseles y animaciones

El sitio usa JavaScript vanilla en `assets/js/scripts.js` para:

- carrusel del hero en `index.html`;
- carrusel de servicios;
- fade-in de tarjetas durante el scroll;
- rotación de textos en el bloque “Nuestro propósito”, cuando corresponde.

Los textos y slides están en el HTML. Los estilos principales están en `assets/css/styles.css`.

## SEO básico

El sitio incluye:

- title y meta description por página;
- canonical por página;
- Open Graph básico;
- `sitemap.xml`;
- `robots.txt`;
- schema JSON-LD en el home.

`campanas.html` fue agregado al sitemap para permitir rastreo por buscadores.

## Publicación

### Opción recomendada: GitHub Pages

1. Subir todos los archivos del proyecto a un repositorio GitHub.
2. Activar GitHub Pages desde la rama principal.
3. Configurar dominio personalizado si corresponde.
4. Verificar que los archivos estén en la raíz del proyecto, no dentro de una carpeta adicional.

### Validaciones después de publicar

Revisar:

- carga correcta de imágenes;
- funcionamiento del menú móvil;
- envío del formulario;
- botones de WhatsApp;
- Google Maps;
- enlaces internos;
- visualización en móvil.

## Checklist antes de producción

- [ ] Confirmar textos finales del cliente.
- [ ] Revisar que no queden textos internos o de maqueta.
- [ ] Confirmar número de WhatsApp.
- [ ] Confirmar correo de contacto.
- [ ] Probar formulario Formspree con envío real.
- [ ] Confirmar dirección y mapa.
- [ ] Revisar imágenes en móvil.
- [ ] Revisar `sitemap.xml`.
- [ ] Subir a producción.
- [ ] Probar el sitio publicado desde navegador y teléfono.

## Mantenimiento recomendado

- Mantener imágenes en WebP y bajo peso.
- No incrustar texto dentro de imágenes de hero o tarjetas.
- Mantener el header limpio, priorizando el CTA de agendamiento.
- Usar `campanas.html` como landing comercial sin cargar el menú principal.
- Evitar pop-ups invasivos.
- Revisar enlaces y formularios después de cada actualización.

## Notas de edición rápida

### Cambiar textos
Editar directamente el archivo HTML correspondiente.

### Cambiar estilos
Editar:

```text
assets/css/styles.css
```

### Cambiar comportamiento JS
Editar:

```text
assets/js/scripts.js
```

### Cambiar imágenes
Reemplazar archivos dentro de:

```text
assets/img/
```

Mantener nombres si no se quiere modificar HTML/CSS.

## Autoría y propiedad

Sitio preparado para MB Odontología. El contenido, imágenes, identidad visual y configuraciones deben ser validados por el responsable del proyecto antes de publicación definitiva.
