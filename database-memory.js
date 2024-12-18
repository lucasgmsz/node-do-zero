import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map(); // # indica chave privada

  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const data = videoArray[1];

        return {
          id,
          ...data, // ... (ES6 - Spread Operator)
        };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        } else {
          return true;
        }
      });
  }

  create(video) {
    const videoId = randomUUID();

    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
