import { getEntry, getCollection } from 'astro:content';

// Accesos rápidos a las páginas editables (cada una es un único archivo .md)
export const getGeneral = async () => (await getEntry('general', 'general'))!.data;
export const getInicio = async () => (await getEntry('inicio', 'inicio'))!.data;
export const getSobreMi = async () => (await getEntry('sobreMi', 'sobre-mi'))!;
export const getInvestigacion = async () => (await getEntry('investigacion', 'investigacion'))!.data;
export const getSeries = async () =>
  (await getCollection('series')).sort((a, b) => a.data.orden - b.data.orden);
