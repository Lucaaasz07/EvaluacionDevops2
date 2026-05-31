const request = require("supertest");
const server = require("../index");

describe("GET /notas", () => {
  test("devuelve un arreglo vacío al inicio", async () => {
    const res = await request(server).get("/notas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /notas", () => {
  test("crea una nota correctamente", async () => {
    const res = await request(server)
      .post("/notas")
      .send({ texto: "Mi primera nota" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("fecha");
    expect(res.body.texto).toBe("Mi primera nota");
  });

  test("rechaza nota sin campo texto", async () => {
    const res = await request(server)
      .post("/notas")
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("El campo texto es obligatorio");
  });

  test("rechaza nota con texto vacío", async () => {
    const res = await request(server)
      .post("/notas")
      .send({ texto: "   " });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("El campo texto es obligatorio");
  });

  test("GET /notas devuelve la nota recién creada", async () => {
    await request(server).post("/notas").send({ texto: "Nota para listar" });
    const res = await request(server).get("/notas");
    const textos = res.body.map(n => n.texto);
    expect(textos).toContain("Nota para listar");
  });
});
