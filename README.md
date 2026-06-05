# Mandachuva
N703-Téc de integração de sistemas - API de Agregação de Dados Climáticos e Geográficos

## Arquitetura web

- Backend: Node.js com Express
- Testes: Vitest
- Frontend: Vite + React

## Como rodar o projeto:
1) Instale as dependências com `npm install`
2) Rode o servidor backend com `npm run server`
3) Rode os testes com `npm run test:run`
4) Rode o frontend com `npm run dev`


## Organização das Pastas
```
.
├── components.json
├── docs
│   └── MandaChuva.postman_collection.json
├── eslint.config.js
├── index.html
├── INTEGRANTES.md
├── package.json
├── package-lock.json
├── public
│   ├── favicon.svg
│   └── icons.svg
├── README.md
├── src
|    ├── backend
|     ├── brasilApi.js
|     ├── openMeteoApi.js
|     └── server.js
│   ├── api
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── index.css
│   ├── lib
│   ├── main.jsx
│   └── pages
├── tests
│   └── backendApi.test.js
├── tsconfig.json
└── vite.config.js

12 directories, 20 files
```
