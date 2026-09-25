import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
 * Todo el contenido se edita desde el panel /admin (Sveltia CMS)
 * o directamente en estos archivos Markdown.
 * Las imágenes viven en src/assets/ y se referencian con ruta relativa.
 */

const pagina = (archivo: string) => glob({ pattern: archivo, base: './src/content/paginas' });

const general = defineCollection({
  loader: pagina('general.md'),
  schema: z.object({
    nombre: z.string(),
    disciplinas: z.string(),
    descripcion: z.string(),
    email: z.string(),
    instagram: z.string(),
  }),
});

const inicio = defineCollection({
  loader: pagina('inicio.md'),
  schema: ({ image }) =>
    z.object({
      etiqueta: z.string().default(''),
      frase: z.string(),
      imagen: image(),
      imagen_obra: image().optional(),
      imagen_fotografia: image(),
      imagen_investigacion: image(),
    }),
});

const sobreMi = defineCollection({
  loader: pagina('sobre-mi.md'),
  schema: ({ image }) =>
    z.object({
      rol: z.string(),
      frase: z.string(),
      retrato: image().optional(),
      formacion: z.array(z.object({ texto: z.string() })).default([]),
      exposiciones: z.array(z.object({ texto: z.string() })).default([]),
    }),
});

const investigacion = defineCollection({
  loader: pagina('investigacion.md'),
  schema: ({ image }) =>
    z.object({
      etiqueta: z.string().default(''),
      titulo: z.string(),
      bajada: z.string(),
      conceptos: z.array(z.string()).default([]),
      recorrido: z
        .array(z.object({ imagen: image(), fecha: z.string().default(''), bitacora: z.string().default('') }))
        .default([]),
      comparacion: z
        .object({
          mostrar: z.boolean().default(true),
          titulo: z.string().default(''),
          antes: image(),
          antes_pie: z.string().default(''),
          despues: image(),
          despues_pie: z.string().default(''),
        })
        .optional(),
    }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      subtitulo: z.string().default(''),
      orden: z.number().default(0),
      portada: image(),
      fotos: z.array(z.object({ imagen: image(), pie: z.string().default('') })).default([]),
    }),
});

const obras = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/obras' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      año: z.number(),
      categoria: z.enum(['pintura', 'dibujo']),
      serie: z.string().optional(),
      tecnica: z.string(),
      dimensiones: z.string(),
      imagen: image().optional(),
      orden: z.number().default(0),
      ejemplo: z.boolean().default(false),
    }),
});

export const collections = { general, inicio, sobreMi, investigacion, series, obras };
