import * as gulp from "gulp";
import { Service, project } from "@wasm/studio-utils";

gulp.task("build", async () => {
  const data = await Service.compileFile(project.getFile("src/main.rs"), "rust", "wasm", "-g -O");
  const outWasm = project.newFile("out/main.wasm", "wasm", true);
  outWasm.setData(data.wasm);
});

gulp.task("default", ["build"], async () => {});
