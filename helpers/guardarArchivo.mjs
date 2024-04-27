import fs from "fs/promises";

const archivo = "./db/data.json";

const guardarDB = async (data) => {
  try {
    await fs.writeFile(archivo, JSON.stringify(data));
    // console.log("DB guardada");
  } catch (error) {
    console.error("Error al guardar la DB:", error);
  }
};

const leerDB = async () => {
  try {
    const info = await fs.readFile(archivo, { encoding: "utf-8" });
    const data = JSON.parse(info);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      // El archivo no existe, retornar un array vacío
      return [];
    } else {
      console.error("Error al leer la DB:", error);
      return [];
    }
  }
};

export { guardarDB, leerDB };
