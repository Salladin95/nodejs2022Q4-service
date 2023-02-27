# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Switching branch

```
git checkout develop
```

## Installing NPM modules

```
npm install
```

## Running application

```
<<<<<<< HEAD
docker compose up

=======
>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2
npm start
```

After starting the app on port (4000 as default) you can open
<<<<<<< HEAD
in your browser OpenAPI documentation by typing http://localhost:4000/swagger/.
=======
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

<<<<<<< HEAD
=======
To run all tests without authorization

>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2
```
npm run test
```

To run only one of all test suites

```
<<<<<<< HEAD
npm run test:users
npm run test:artists
npm run test:tracks
npm run test:albums
npm run test:favs
```

```
### Auto-fix and format
```

npm run lint
=======
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```
>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2

```
npm run format
```
<<<<<<< HEAD
=======

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
>>>>>>> 2e92b263cdcbc29a187b0409783d8d6fb7c7ade2
