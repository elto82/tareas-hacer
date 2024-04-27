// helpers/message.mjs
import "colors";

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=========================".blue);
    console.log(" Seleccione una opcion ".green);
    console.log("=========================\n".blue);

    console.log(`${"1.".green} ${"Crear tarea".blue}`);
    console.log(`${"2.".green} ${"Listar tareas".blue}\n`);
    // Más código aquí...
    resolve(opt);
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
      // console.log({ opt });
      readLine.close();
      resolve(opt);
    });
  });
};

export { mostrarMenu, pausa };
