# Portfolio

Aplicación de portafolio personal desarrollada con [Angular CLI](https://github.com/angular/angular-cli) versión 21.

## Tecnologías utilizadas

- **Angular 21** — Framework principal con componentes standalone
- **PrimeNG 21** — Librería de componentes UI
- **PrimeFlex** — Utilidades CSS
- **@ngx-translate** — Internacionalización (i18n) en inglés y español
- **SweetAlert2** — Notificaciones y alertas
- **RxJS** — Programación reactiva
- **HttpClient** — Comunicación HTTP (reemplaza `fetch` nativo)
- **Vitest** — Test runner moderno (migrado desde Karma)

## Páginas

| Ruta       | Descripción                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| `/`        | Página principal (home) con secciones de presentación, tecnologías, proyectos, experiencia y credenciales |
| `/contact` | Página de contacto con formulario reactivo                                                                |

## Características

- Lazy loading en todas las rutas
- Formulario de contacto con envío via [FormSubmit](https://formsubmit.co/)
- Soporte multilenguaje (ES / EN) mediante archivos en `src/assets/i18n/`
- Change detection con `OnPush` en todos los componentes
- Estado local con Signals de Angular

## Servidor de desarrollo

```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recarga automáticamente al cambiar los archivos fuente.

## Build

```bash
ng build
```

Los artefactos se generan en el directorio `dist/`.

### Build para GitHub Pages

```bash
npm run build:github
```

Genera el build con `--base-href ./` y copia los archivos a la carpeta `docs/` para el despliegue en GitHub Pages.

## Generar componentes

```bash
ng generate component component-name
```

## Ejecutar tests unitarios

```bash
ng test
```

Ejecuta los tests unitarios con [Vitest](https://vitest.dev/) en modo watch.

```bash
ng test --watch=false
```

Ejecuta los tests una sola vez.

```bash
ng test --coverage
```

Genera el informe de cobertura en `coverage/porfolio/`.

## Ayuda adicional

Para más información sobre Angular CLI usa `ng help` o consulta la [documentación oficial de Angular CLI](https://angular.dev/tools/cli).
