[Link al repo con el backend](https://github.com/KevinC911/Mirkat-API-DB)

# Guia de instalacion

## .ENV
Para que el cliente se comunique con el server, se necesita crear un .env dentro del cliente y otro en el server

### Para el cliente

> VITE_API_BASE_URL=/api/

> **Si se cambia la configuracion de Nginx en la ruta relativa del proxy (en location) cambiar debidamente esta variable al correcto, sino dejarlo asi**

### Para el server
JWT_KEY= Tu key para JWT
DB_NAME= Nombre del DB (dentro de la carpeta db)
**La base de datos trabaja en sqlite**

## Docker
Luego de haber creado los .env, recordar renombrar la carpeta que contiene al servidor como **api**, luego entrar en la carpeta del cliente y ejecutar:

> docker compose up -d .

Para levantar ambas instancias de cliente y servidor

# Notas
- La aplicacion trabaja con certificados firmados por sí mismo, por ello aunque esté en https, sigue siendo inseguro
- La aplicación todavía no tiene dominio, por lo que usa la IP pública del servidor

> Para cambiar el certificado y los nombres de dominio, estos se deben modificar en **nginx.conf** y el **Dockerfile** que estan dentro del cliente
