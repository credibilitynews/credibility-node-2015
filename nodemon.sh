NODE_PATH=node_modules:frontend/src/js DATABASE_URL=postgres://localhost:5432/credibility nodemon --watch backend --ignore backend/public backend/cluster.js
