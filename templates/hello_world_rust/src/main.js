const { greet, init } = window.wasmBindgen;

function runApp() {
  greet('World');
}

// Load and instantiate the wasm file, and we specify the source of the wasm
// file here. Once the returned promise is resolved we're ready to go and
// use our imports.
init('../out/main_bg.wasm').then(runApp);
