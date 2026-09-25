# Guía de puesta en marcha del panel

Se hace una sola vez. Al final, Pía entra a `/admin` con su cuenta de GitHub y edita el sitio sola.

---

## 0 · Limpiar la estructura anterior (en tu PC)

Las fotos ahora están todas juntas en `src/assets/fotografia/`. Borra estas carpetas y archivo antiguos
(quedaron duplicados de la versión anterior):

- `src/assets/fotografia/casa-memoria/`
- `src/assets/fotografia/umbral/`
- `src/assets/fotografia/fragmentos/`
- `src/assets/fotografia/territorio/`
- `src/lib/fotos.ts`

## 1 · Subir el proyecto a GitHub

En una terminal, dentro de la carpeta `sitio-web`:

```bash
git init
git add .
git commit -m "Sitio de Pía Gallardo con panel de administración"
git branch -M main
git remote add origin https://github.com/Oguri-Dev/pia-gallery.git
git push -u origin main
```

(`node_modules/` y `dist/` no se suben; están en `.gitignore`.)

## 2 · Conectar Cloudflare al repositorio (publicación automática)

1. Cloudflare → **Workers & Pages** → **pia-gallery** → **Settings** → **Build**.
2. **Connect** → GitHub → autorizar → elegir `Oguri-Dev/pia-gallery`, rama `main`.
3. Build command: `npm run build`
4. Deploy command: `npx wrangler deploy`
5. Guardar. Cada push (o cada cambio guardado en el panel) publica el sitio en ~2 minutos.

## 3 · Probar el panel (tú)

1. Abre https://pia-gallery.almonacidleuquen.workers.dev/admin/
2. **Sign In Using Access Token** → sigue el enlace a GitHub para crear el token (permisos *Contents: Read and write*
   sobre `pia-gallery`) → pégalo.
3. Edita algo pequeño (por ejemplo la frase de Inicio), guarda, y en ~2 minutos debería verse en el sitio.

## 4 · Login con GitHub para Pía (autenticador)

Para que Pía entre con un botón, sin tokens:

1. Ve a https://github.com/sveltia/sveltia-cms-auth y usa el botón **Deploy to Cloudflare**.
   Queda en algo como `https://sveltia-cms-auth.almonacidleuquen.workers.dev`.
2. En GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**:
   - Application name: `Panel Pía Gallardo`
   - Homepage URL: `https://pia-gallery.almonacidleuquen.workers.dev`
   - Authorization callback URL: `https://sveltia-cms-auth.almonacidleuquen.workers.dev/callback`
   - Guardar y generar un **Client secret**.
3. En Cloudflare → Worker **sveltia-cms-auth** → **Settings → Variables and Secrets**:
   - `GITHUB_CLIENT_ID` = el Client ID
   - `GITHUB_CLIENT_SECRET` = el Client secret (tipo *Secret*)
   - `ALLOWED_DOMAINS` = `pia-gallery.almonacidleuquen.workers.dev`
4. En `public/admin/config.yml`, descomentar la línea `base_url:` con la URL del autenticador, hacer commit y push.

## 5 · Dar acceso a Pía

1. Pía crea una cuenta gratuita en https://github.com.
2. En el repositorio → **Settings → Collaborators → Add people** → su usuario, con permiso **Write**.
3. Pía acepta la invitación (le llega por correo).
4. Pía entra a `/admin` → **Sign In with GitHub**. Listo.

---

### Si algo sale mal

- Todo cambio queda en el historial de GitHub (pestaña *Commits*): se puede revertir.
- Si un build falla, el sitio sigue mostrando la última versión buena. El error aparece en Cloudflare → pia-gallery → *Deployments*.
