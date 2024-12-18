// Exemplo de código de criação de servidor usando apenas node.js
// import { createServer } from "node:http";
//
// const server = createServer((request, response) => {
//   response.write("Hello world!");
//
//   return response.end();
// });
//
// server.listen(3333);

// Criação de servidor usando o fastify
import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory();

server.post("/videos", (request, reply) => {
  const { title, description, duration } = request.body;

  database.create({
    title, // = title: title // short syntaxe
    description,
    duration,
  });

  return reply.status(201).send();
});

server.get("/videos", (request) => {
  const search = request.query.search;

  const videos = database.list(search);

  return videos;
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send();
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id;

  database.delete(videoId);

  return reply.status(204).send();
});

server.listen({
  port: 3333,
});
