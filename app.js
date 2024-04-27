import { guardarDB, leerDB } from "./helpers/guardarArchivo.mjs";
import {
  confirmar,
  inquirerMenu,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoChecklist,
  pausa,
} from "./helpers/inquirer.mjs";
import Tareas from "./models/tareas.mjs";
import colors from "colors";
// import { mostrarMenu, pausa } from "./helpers/message.mjs";

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = await leerDB();

  if (Array.isArray(tareasDB)) {
    // Verifica que tareasDB sea un array
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;

      case "2":
        // console.log(tareas.listadoArr);
        tareas.listadoCompleto();
        break;

      case "3":
        // console.log("Listar tareas completadas");
        tareas.listarPendientesCompletadas(true);
        break;

      case "4":
        // console.log("Listar tareas pendientes");
        tareas.listarPendientesCompletadas(false);
        break;

      case "5":
        // console.log("Completar tarea(s)");
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        // console.log(ids);
        tareas.toogleCompletadas(ids);
        break;
      case "6":
        // console.log("Borrar tarea");
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Está seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }

        // console.log({ id });
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
