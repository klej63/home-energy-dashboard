import http from "node:http";
import { readFile } from "node:fs/promises";

const port = Number(process.env.PORT || 3000);
const homeWizardIp = process.env.HOMEWIZARD_P1_IP || "192.168.32.8";

function sendJson(res, status, data) {
  res.writeHead(status, {
    "content-type": "application/json",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(data));
}

async function fetchMeasurement() {
  const response = await fetch(`http://${homeWizardIp}/api/measurement`);
  if (!response.ok) throw new Error(`HomeWizard returned HTTP ${response.status}`);
  return response.json();
}

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/measurement") {
    try {
      sendJson(res, 200, await fetchMeasurement());
    } catch (error) {
      sendJson(res, 502, { error: error.message });
    }
    return;
  }

  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    try {
      const html = await readFile(new URL("./public/index.html", import.meta.url));
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(html);
    } catch (error) {
      sendJson(res, 500, { error: error.message });
    }
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(port, () => {
  console.log(`Dashboard running at http://localhost:${port}`);
});
