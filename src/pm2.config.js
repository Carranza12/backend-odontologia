module.exports = {
    apps: [
      {
        name: 'nombre_de_tu_app',
        script: 'dist/main.js', // La ruta al punto de entrada de tu aplicación Nest.js
        watch: true,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };