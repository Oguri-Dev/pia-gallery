# Pía Gallardo · sitio web

Portafolio / galería digital hecho con [Astro](https://astro.build), con panel de administración
([Sveltia CMS](https://sveltiacms.app)) para que Pía edite textos, fotos y obras desde el navegador.
Diseño basado en *Propuesta_pagina_web_Pia_Gallardo.pdf*.

- Sitio (revisión): https://pia-gallery.almonacidleuquen.workers.dev/
- Panel: https://pia-gallery.almonacidleuquen.workers.dev/admin/
- Repositorio: https://github.com/Oguri-Dev/pia-gallery

## Cómo funciona

```
Pía edita en /admin  →  commit en GitHub  →  Cloudflare compila (npm run build)  →  sitio actualizado (~2 min)
```

No hay base de datos ni servidor: todo el contenido son archivos Markdown e imágenes dentro del repositorio,
con historial completo de cambios (cualquier cosa se puede recuperar).

## Qué se edita desde el panel

| Panel | Archivo | Contenido |
|---|---|---|
| Páginas → Datos generales | `src/content/paginas/general.md` | Nombre, disciplinas, correo, Instagram |
| Páginas → Inicio | `src/content/paginas/inicio.md` | Frase, imagen principal, imágenes de los accesos |
| Páginas → Sobre mí | `src/content/paginas/sobre-mi.md` | Retrato, bio, formación, exposiciones |
| Páginas → Investigación | `src/content/paginas/investigacion.md` | Título, conceptos, recorrido foto + bitácora, antes/después |
| Series fotográficas | `src/content/series/*.md` | Crear/borrar series, portada, intro, fotos (subir, quitar, reordenar, pie de foto) |
| Obra | `src/content/obras/*.md` | Pinturas y dibujos con ficha técnica |

Imágenes: fotografías en `src/assets/fotografia/`, obras en `src/assets/obra/`.
Se convierten automáticamente a WebP en 640/1200/1800 px al compilar.

## Estructura

```
public/admin/            ← panel (index.html + config.yml)
src/content/             ← contenido editable (Markdown)
src/assets/              ← imágenes originales
src/pages/               ← páginas del sitio
src/components/          ← cabecera, pie, visor, detalle de tejuela
src/lib/contenido.ts     ← lectura del contenido
src/styles/global.css    ← paleta y tipografía
scripts/                 ← limpieza post-build
wrangler.jsonc           ← configuración de Cloudflare Workers
```

## Trabajar en local

Requiere Node.js 22.12+.

```bash
npm install
npm run dev      # http://localhost:4321 (y el panel en /admin)
npm run build    # sitio final en dist/
npm run deploy   # compila y publica manualmente (requiere npx wrangler login)
```

En local, el panel ofrece **"Work with Local Repository"** (Chrome/Edge): se elige la carpeta del proyecto y
los cambios se escriben directo en los archivos, sin tocar GitHub. Útil para probar.

## Puesta en marcha (una sola vez)

Ver **GUIA-PANEL.md**.
