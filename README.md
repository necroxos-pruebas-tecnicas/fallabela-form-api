## Forms API
Este MicroServicio está encargado de la creación de formularios y sus respuestas.


## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Levantar una base de datos postgres
  - Se puede usar una imagen de docker como en docker-compose
```
forms-db:
  container_name: forms_database
  image: postgres:16.2
  restart: always
  volumes:
    - ./postgres:/var/lib/postgresql/data
  ports:
    - 5432:5432
  environment:
    - POSTGRES_USER=postgres
    - POSTGRES_PASSWORD=123456
    - POSTGRES_DB=forms-db
```
4. Crear un archivo `.env` basado en el `env.template`
5. Levantar proyecto con `npm run start:dev`

## Docker
- Para levantar todo el proyecto con docker usar el comando, tener en cuenta que la versión de docker revisa los test y lint.
```
docker-compose up -d
```

- Nota: Esta versión de docker es para dev

## Consideraciones

- El proyecto fue creado para manejar la creación de formularios y sus respuestas por lo que sólo se hizo un módulo para frormularios y otro para respuestas.

- En los requerimientos no hacía alución a modificaciones de formularios ni respuestas, esto incluye eliminación, por lo que en los módulos sólo se implementó la creación y obtención de formularios y respuestas.

- Se consideró guardar el id del formualario en las respuestas para realizar busquedas más simples, pero decidí que era usar más memoria, en caso de ser necesario se puede indexar la columna de los fieldId (relación con los campos del formulario).

- El proyecto fue creado para responder a la necesidad básica, por lo que no se implementaron muchas funciones como para habilitar un formulario luego de cierta fecha, caducarlo, etc.