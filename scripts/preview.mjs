import http from "node:http";
import worker from "../dist/server/index.js";

const host = "127.0.0.1";
const port = Number(process.env.PORT || 4190);

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${host}:${port}`);
    const body = request.method === "GET" || request.method === "HEAD"
      ? undefined
      : request;
    const workerRequest = new Request(url, {
      method: request.method,
      headers: request.headers,
      body,
      duplex: body ? "half" : undefined,
    });
    const workerResponse = await worker.fetch(workerRequest);

    response.writeHead(
      workerResponse.status,
      Object.fromEntries(workerResponse.headers),
    );
    response.end(Buffer.from(await workerResponse.arrayBuffer()));
  } catch (error) {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end(`Preview error: ${error.message}`);
  }
});

server.listen(port, host, () => {
  console.log(`G Server preview: http://${host}:${port}`);
});
