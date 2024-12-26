# sportclub-challenge-front

**sportclub-challenge-front** es una aplicación básica desarrollada con **Vite**, **React** y **TypeScript**. Se conecta a una API backend que se ejecuta en `localhost:3000`.

## Configuración del Proyecto

### Requisitos Previos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (se recomienda la versión 18 o superior)
- [npm](https://www.npmjs.com/) (viene incluido con Node.js)

### Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/your-repo/sportclub-challenge-front.git
   cd sportclub-challenge-front
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura la API backend:
   - Asegúrate de que el repositorio backend esté clonado y ejecutándose en `localhost:3000`.

## Scripts

Están disponibles los siguientes scripts de npm:

- **`npm run dev`**: Inicia el servidor de desarrollo con recarga en caliente.
- **`npm run build`**: Compila el proyecto para producción.
- **`npm run preview`**: Previsualiza la compilación de producción.

### Ejemplo de Uso

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Accede a la aplicación en `http://localhost:5173` (puerto predeterminado de Vite).

## Dependencias

### Dependencias Principales

- **React**: Biblioteca para construir interfaces de usuario.
- **React Router DOM**: Enrutamiento para aplicaciones React.
- **Axios**: Cliente HTTP para solicitudes API.

### Dependencias de Desarrollo

- **Vite**: Herramienta de desarrollo rápido para frontend.
- **TypeScript**: JavaScript tipado.
- **TailwindCSS**: Framework CSS basado en utilidades.

## Configuración para Desarrollo

### Configuración de Vite

Este proyecto utiliza la configuración predeterminada de Vite. Para personalizarla, modifica el archivo `vite.config.ts`.

### TailwindCSS

TailwindCSS está incluido para estilos. Configúralo en `tailwind.config.js` o `postcss.config.js`.

### TypeScript

TypeScript se utiliza para la seguridad de tipos. Modifica `tsconfig.json` para configuraciones personalizadas de TypeScript.

## Integración con la API

La aplicación se conecta a la API backend en `http://localhost:3000`. Asegúrate de que el backend esté en ejecución antes de interactuar con la aplicación.

## Contacto

Para preguntas o comentarios, abre un [issue](https://github.com/ChiarelliLuciano/sportclub-challenge-front/issues).

---

© 2024 Luciano Chiarelli. Todos los derechos reservados.
