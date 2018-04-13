{
  "empty_c": {
    "files": [
      {
        "name": "README.md",
        "data": "# Empty C Project\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.compileFile(project.getFile(\"src/main.c\"), \"c\", \"wasm\", \"-g -O3\");\n  const outWasm = project.newFile(\"out/main.wasm\", \"wasm\", true);\n  outWasm.setData(data.wasm);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/empty_c\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Empty C Project\",\n    \"description\": \"# Empty C Project\",\n    \"icon\": \"c-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "src/main.c",
        "data": "#define WASM_EXPORT __attribute__((visibility(\"default\")))\n\nWASM_EXPORT\nint main() {\n  return 42;\n}\n"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body {\n      background-color: rgb(255, 255, 255);\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>"
      },
      {
        "name": "src/main.js",
        "data": "fetch('../out/main.wasm').then(response =>\n  response.arrayBuffer()\n).then(bytes => WebAssembly.instantiate(bytes)).then(results => {\n  instance = results.instance;\n  document.getElementById(\"container\").innerText = instance.exports.main();\n});"
      }
    ]
  },
  "empty_rust": {
    "files": [
      {
        "name": "README.md",
        "data": "# Empty Rust Project\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.compileFile(project.getFile(\"src/main.rs\"), \"rust\", \"wasm\", \"-g -O\");\n  const outWasm = project.newFile(\"out/main.wasm\", \"wasm\", true);\n  outWasm.setData(data.wasm);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/empty_rust\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Empty Rust Project\",\n    \"description\": \"# Empty Rust Project\",\n    \"icon\": \"rust-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body {\n      background-color: rgb(255, 255, 255);\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>"
      },
      {
        "name": "src/main.js",
        "data": "fetch('../out/main.wasm').then(response =>\n  response.arrayBuffer()\n).then(bytes => WebAssembly.instantiate(bytes)).then(results => {\n  instance = results.instance;\n  document.getElementById(\"container\").innerText = instance.exports.add_one(41);\n});"
      },
      {
        "name": "src/main.rs",
        "data": "#[no_mangle]\npub extern \"C\" fn add_one(x: i32) -> i32 {\n    x + 1\n}"
      }
    ]
  },
  "empty_ts": {
    "files": [
      {
        "name": "README.md",
        "data": "# Empty AssemblyScript Project\n"
      },
      {
        "name": "assembly/main.ts",
        "data": "declare function sayHello(): void;\n\nsayHello();\n\nexport function add(x: i32, y: i32): i32 {\n  return x + y;\n}\n"
      },
      {
        "name": "assembly/tsconfig.json",
        "data": "{\n  \"extends\": \"../node_modules/assemblyscript/std/assembly.json\",\n  \"include\": [\n    \"./**/*.ts\"\n  ]\n}\n"
      },
      {
        "name": "gulpfile.js",
        "data": "const gulp = require(\"gulp\");\n\ngulp.task(\"build\", callback => {\n  const asc = require(\"assemblyscript/bin/asc\");\n  asc.main([\n    \"main.ts\",\n    \"--baseDir\", \"assembly\",\n    \"--binaryFile\", \"../out/main.wasm\",\n    \"--sourceMap\",\n    \"--measure\"\n  ], callback);\n});\n\ngulp.task(\"default\", [\"build\"]);\n\ngulp.task(\"project:load\", () => { // WebAssembly Studio only\n  const utils = require(\"@wasm/studio-utils\");\n  eval(utils.project.getFile(\"setup.js\").getData());\n});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/empty_ts\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp\"\n  },\n  \"devDependencies\": {\n    \"assemblyscript\": \"AssemblyScript/assemblyscript\",\n    \"gulp\": \"^3.9.1\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Empty AssemblyScript Project\",\n    \"description\": \"# Empty AssemblyScript Project\\n\\n[AssemblyScript](https://github.com/AssemblyScript/assemblyscript) compiles strictly typed TypeScript to WebAssembly using Binaryen.\\n\\nSee the [AssemblyScript wiki](https://github.com/AssemblyScript/assemblyscript/wiki) for further instructions and documentation.\",\n    \"icon\": \"typescript-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "setup.js",
        "data": "// WebAssembly Studio only\nrequire.config({\n  paths: {\n    \"binaryen\": \"https://rawgit.com/AssemblyScript/binaryen.js/master/index\",\n    \"assemblyscript\": \"https://rawgit.com/AssemblyScript/assemblyscript/master/dist/assemblyscript\",\n    \"assemblyscript/bin/asc\": \"https://rawgit.com/AssemblyScript/assemblyscript/master/dist/asc\"\n  }\n});\nlogLn(\"Loading AssemblyScript compiler ...\");\nrequire([\"assemblyscript/bin/asc\"], asc => {\n  monaco.languages.typescript.typescriptDefaults.addExtraLib(asc.definitionFiles.assembly);\n  asc.main = (main => (args, options, fn) => {\n    if (typeof options === \"function\") {\n      fn = options;\n      options = undefined;\n    }\n    return main(args, options || {\n      stdout: asc.createMemoryStream(),\n      stderr: asc.createMemoryStream(logLn),\n      readFile: (filename) => {\n        const file = project.getFile(filename.replace(/^\\//, \"\"));\n        return file ? file.data : null;\n      },\n      writeFile: (filename, contents) => {\n        const name = filename.startsWith(\"/\") ? filename.substring(1) : filename;\n        const type = fileTypeForExtension(name.substring(name.lastIndexOf(\".\") + 1));\n        project.newFile(name, type, true).setData(contents);\n      },\n      listFiles: (dirname) => []\n    }, fn);\n  })(asc.main);\n  logLn(\"AssemblyScript compiler is ready!\");\n});\n"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n</head>\n<body style=\"background: #fff\">\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>\n"
      },
      {
        "name": "src/main.js",
        "data": "WebAssembly.instantiateStreaming(fetch(\"../out/main.wasm\"), {\n  env: {\n    sayHello: function() {\n      console.log(\"Hello from WebAssembly!\");\n    },\n    abort: function(msg, file, line, column) {\n      console.error(\"abort called at main.ts:\" + line + \":\" + column);\n    }\n  }\n}).then(result => {\n  const exports = result.instance.exports;\n  document.getElementById(\"container\").innerText = \"Result: \" + exports.add(19, 23);\n});\n"
      }
    ]
  },
  "empty_wat": {
    "files": [
      {
        "name": "README.md",
        "data": "# Empty Wat Project\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.assembleWat(project.getFile(\"src/main.wat\").getData());\n  const outWasm = project.newFile(\"out/main.wasm\", \"wasm\", true);\n  outWasm.setData(data);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/empty_wat\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Empty Wat Project\",\n    \"description\": \"# Empty Wat Project\",\n    \"icon\": \"wat-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body {\n      background-color: rgb(255, 255, 255);\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>"
      },
      {
        "name": "src/main.js",
        "data": "fetch('../out/main.wasm').then(response =>\n  response.arrayBuffer()\n).then(bytes => WebAssembly.instantiate(bytes)).then(results => {\n  instance = results.instance;\n  document.getElementById(\"container\").innerText = instance.exports.add(1,1);\n});\n"
      },
      {
        "name": "src/main.wat",
        "data": "(module\n  (func $add (param $lhs i32) (param $rhs i32) (result i32)\n    get_local $lhs\n    get_local $rhs\n    i32.add)\n  (export \"add\" (func $add))\n)"
      }
    ]
  },
  "game_of_life_rust": {
    "files": [
      {
        "name": "README.md",
        "data": "# Conway's Game of Life in Rust\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.compileFile(project.getFile(\"src/main.rs\"), \"rust\", \"wasm\");\n\n  const outWasm = project.newFile(\"out/main_bg.wasm\", \"wasm\", true);\n  outWasm.setData(data.wasm);\n  const outJs = project.newFile(\"out/main.js\", \"js\", true);\n  outJs.setData(data.wasmBindgenJs);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/game_of_life_rust\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Conway's Game of Life in Rust\",\n    \"description\": \"# Conway's Game of Life in Rust\",\n    \"icon\": \"rust-lang-file-icon\"\n  }\n}\n"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n    <head>\n        <meta content=\"text/html;charset=utf-8\" http-equiv=\"Content-Type\"/>\n        <style>\n            body {\n                width: 100%;\n                height: 100%;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: center;\n                background: white;\n            }\n            .controls button, .controls input, .controls div {\n              display: inline-block;\n            }\n            .controls button {\n                margin: 10px;\n            }\n        </style>\n    </head>\n    <body>\n        <div class='controls'>\n          <button id=\"tick\">tick</button>\n          <button id=\"clear\">clear</button>\n          <button id=\"play-pause\"></button>\n          <button id=\"random\">random</button>\n          <input id='speed' type='range' value='16'/>\n          <div>\n            <span id='tps'>0</span> tps\n          </div>\n          &middot;\n          <div>\n            <span id='fps'>0</span> fps\n          </div>\n        </div>\n        <canvas id=\"game-of-life-canvas\"></canvas>\n        <script src=\"../out/main.js\"></script>\n        <script src=\"./main.js\"></script>\n    </body>\n</html>\n"
      },
      {
        "name": "src/main.js",
        "data": "const { Universe } = wasm_bindgen;\n\nconst CELL_SIZE = 10;\nconst GRID_COLOR = \"#CCCCCC\";\nconst DEAD_COLOR = \"#FFFFFF\";\nconst ALIVE_COLOR = \"#000000\";\n\n// These must match `Cell::Alive` and `Cell::Dead` in `src/lib.rs`.\nconst DEAD = 0;\nconst ALIVE = 1;\n\nlet universe;\nlet width;\nlet height;\nconst canvas = document.getElementById(\"game-of-life-canvas\");\nconst ctx = canvas.getContext('2d');\nconst speed = document.getElementById('speed');\nlet fps = [];\nlet animationId = null;\nlet fuel = 0;\nlet lastRender = performance.now();\nlet memory;\n\nwasm_bindgen('../out/main_bg.wasm').then(() => {\n  universe = Universe.new();\n  width = universe.width();\n  height = universe.height();\n  memory = wasm_bindgen.wasm.memory;\n\n  // Initialize the canvas with room for all of our cells and a 1px border\n  // around each of them.\n  canvas.height = (CELL_SIZE + 1) * height + 1;\n  canvas.width = (CELL_SIZE + 1) * width + 1;\n\n  play();\n});\n\nconst renderLoop = () => {\n  const now = performance.now();\n  const frameTime = now - lastRender;\n  fps.push(1000 / frameTime);\n  if (fps.length > 100)\n    fps.shift();\n  lastRender = now;\n\n  draw();\n\n  // const cps = Math.pow(1 / (Math.pow(8, speed.value / 100.0) - 1), 3);\n  const gas = Math.pow(speed.value, 1.7);\n  fuel += Math.min(gas, gas / (1000 / frameTime));\n  document.getElementById('tps').innerHTML = Math.floor(gas);\n  while (fuel >= 1) {\n    universe.tick();\n    fuel -= 1;\n  }\n\n  animationId = requestAnimationFrame(renderLoop);\n};\n\nsetInterval(() => {\n  let sum = 0;\n  for (let i = 0; i < fps.length; i++) {\n    sum += fps[i];\n  }\n  document.getElementById('fps').innerHTML = Math.floor(sum / fps.length);\n}, 500);\n\nconst draw = () => {\n  drawGrid();\n  drawCells();\n};\n\nconst drawGrid = () => {\n  ctx.beginPath();\n  //ctx.lineWidth = 1 / window.devicePixelRatio;\n  ctx.lineWidth = 1;\n  ctx.strokeStyle = GRID_COLOR;\n\n  // Vertical lines.\n  for (let i = 0; i <= width; i++) {\n    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);\n    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);\n  }\n\n  // Horizontal lines.\n  for (let j = 0; j <= height; j++) {\n    ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);\n    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);\n  }\n\n  ctx.stroke();\n};\n\nconst getIndex = (row, column) => {\n  return row * width + column;\n};\n\nlet prev = [];\n\nconst drawCells = () => {\n  const cellsPtr = universe.cells();\n  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);\n\n  ctx.beginPath();\n\n  const color = (color, val) => {\n    ctx.fillStyle = color;\n    for (let row = 0; row < height; row++) {\n      for (let col = 0; col < width; col++) {\n        const idx = getIndex(row, col);\n        if (cells[idx] !== val || prev[idx] === val)\n          continue\n        prev[idx] = val;\n        ctx.fillRect(\n          col * (CELL_SIZE + 1) + 1,\n          row * (CELL_SIZE + 1) + 1,\n          CELL_SIZE,\n          CELL_SIZE\n        );\n      }\n    }\n  };\n\n  color(DEAD_COLOR, DEAD);\n  color(ALIVE_COLOR, ALIVE);\n\n  ctx.stroke();\n};\n\nconst playPauseButton = document.getElementById(\"play-pause\");\n\nconst isPaused = () => {\n  return animationId === null;\n};\n\nconst play = () => {\n  playPauseButton.textContent = \"⏸\";\n  renderLoop();\n};\n\nconst pause = () => {\n  playPauseButton.textContent = \"▶\";\n  draw();\n  cancelAnimationFrame(animationId);\n  animationId = null;\n};\n\nplayPauseButton.addEventListener(\"click\", event => {\n  if (isPaused()) {\n    play();\n  } else {\n    pause();\n  }\n});\n\ncanvas.addEventListener(\"click\", event => {\n  const relativeLeft = event.pageX - event.target.offsetLeft;\n  const relativeTop = event.pageY - event.target.offsetTop;\n\n  const row = Math.min(Math.floor(relativeTop / (event.target.clientHeight / height)), height - 1);\n  const col = Math.min(Math.floor(relativeLeft / (event.target.clientWidth / width)), width - 1);\n\n  if (event.shiftKey) {\n    universe.add_glider(row, col);\n  } else {\n    universe.toggle_cell(row, col);\n  }\n\n  draw();\n});\n\ndocument.getElementById('clear').addEventListener(\"click\", event => {\n  universe.clear();\n  draw();\n});\n\ndocument.getElementById('random').addEventListener(\"click\", event => {\n  universe.randomize();\n  draw();\n});\n\ndocument.getElementById('tick').addEventListener(\"click\", event => {\n  universe.tick();\n  draw();\n});\n"
      },
      {
        "name": "src/main.rs",
        "data": "#![feature(proc_macro, wasm_custom_section, wasm_import_module)]\n\nextern crate wasm_bindgen;\n\nuse std::iter;\nuse std::mem;\n\nuse wasm_bindgen::prelude::*;\n\n#[wasm_bindgen]\nextern {\n    #[wasm_bindgen(js_namespace = Math)]\n    fn random() -> f64;\n}\n\n#[repr(u8)]\n#[derive(Clone, Copy, Debug, PartialEq, Eq)]\npub enum Cell {\n    Dead = 0,\n    Alive = 1,\n}\n\nimpl Cell {\n    fn toggle(&mut self) {\n        *self = match *self {\n            Cell::Dead => Cell::Alive,\n            Cell::Alive => Cell::Dead,\n        };\n    }\n}\n\nconst WIDTH: u32 = 64;\nconst HEIGHT: u32 = 64;\n\n#[wasm_bindgen]\npub struct Universe {\n    cells: Box<[Cell; (WIDTH * HEIGHT) as usize]>,\n    next: Box<[Cell; (WIDTH * HEIGHT) as usize]>,\n    alive: Box<[u8; (WIDTH * HEIGHT) as usize]>,\n}\n\n/// Public methods, exported to JavaScript.\n#[wasm_bindgen]\nimpl Universe {\n    pub fn new() -> Universe {\n        let mut cells = Box::new([Cell::Alive; (WIDTH * HEIGHT) as usize]);\n        let next = Box::new([Cell::Alive; (WIDTH * HEIGHT) as usize]);\n\n        for (i, slot) in cells.iter_mut().enumerate() {\n            *slot = if i % 2 == 0 || i % 7 == 0 {\n                Cell::Alive\n            } else {\n                Cell::Dead\n            };\n        }\n\n        Universe {\n            next,\n            cells,\n            alive: Box::new([0; (WIDTH * HEIGHT) as usize]),\n        }\n    }\n\n    pub fn width(&self) -> u32 {\n        WIDTH\n    }\n\n    pub fn height(&self) -> u32 {\n        HEIGHT\n    }\n\n    pub fn cells(&self) -> *const Cell {\n        self.cells.as_ptr()\n    }\n\n    pub fn tick(&mut self) {\n        self.update_alive();\n\n        for idx in 0..self.cells.len() {\n            let cell = self.cells[idx];\n            // let live_neighbors = self.live_neighbor_count(row, col);\n            let live_neighbors = self.alive[idx];\n\n            let next_cell = match (cell, live_neighbors) {\n                // Rule 1: Any live cell with fewer than two live neighbours\n                // dies, as if caused by underpopulation.\n                (Cell::Alive, x) if x < 2 => Cell::Dead,\n                // Rule 2: Any live cell with two or three live neighbours\n                // lives on to the next generation.\n                (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,\n                // Rule 3: Any live cell with more than three live\n                // neighbours dies, as if by overpopulation.\n                (Cell::Alive, x) if x > 3 => Cell::Dead,\n                // Rule 4: Any dead cell with exactly three live neighbours\n                // becomes a live cell, as if by reproduction.\n                (Cell::Dead, 3) => Cell::Alive,\n                // All other cells remain in the same state.\n                (otherwise, _) => otherwise,\n            };\n\n            self.next[idx] = next_cell;\n        }\n\n        mem::swap(&mut self.next, &mut self.cells)\n    }\n\n    fn update_alive(&mut self) {\n        for i in self.alive.iter_mut() {\n            *i = 0;\n        }\n\n        // NB: this is super funky but it gets LLVM to avoid bounds checks 100%\n        // of the time.\n\n        macro_rules! i {\n            ($a:expr, $b:expr) => {\n                ($a as usize) * (HEIGHT as usize) + ($b as usize)\n            }\n        }\n\n        let zero = 0;\n        let one = 1;\n        let width = WIDTH as usize;\n        let height = HEIGHT as usize;\n        let width_minus_one = width - 1;\n        macro_rules! update {\n            (@cell $r:ident $ri:ident $c:ident $n:ident $e:ident $s:ident $w:ident) => ({\n                if let Cell::Alive = self.cells[i!($ri, $c)] {\n                    $n[$w] += 1;\n                    $n[$c] += 1;\n                    $n[$e] += 1;\n                    $r[$w] += 1;\n                    $r[$e] += 1;\n                    $s[$w] += 1;\n                    $s[$c] += 1;\n                    $s[$e] += 1;\n                }\n            });\n\n            (@row $r:ident $ri:ident $n:ident $s:ident) => ({\n                update!(@cell $r $ri zero $n one $s width_minus_one);\n                for i in 0..(width - 2) {\n                    let w = i;\n                    let e = i + 2;\n                    let c = i + 1;\n                    update!(@cell $r $ri c $n e $s w);\n                }\n                let width_minus_two = width - 2;\n                update!(@cell $r $ri width_minus_one $n zero $s width_minus_two);\n            })\n        }\n        let height_minus_one = height - 1;\n        {\n            let (r, rest) = self.alive.split_at_mut(width);\n            let (s, rest) = rest.split_at_mut(width);\n            let (_rest, n) = rest.split_at_mut(width * height - 3 * width);\n            assert_eq!(n.len(), width);\n            update!(@row r zero n s);\n        }\n        for i in 0..(height - 2) {\n            let (rest, s) = self.alive.split_at_mut((i + 2) * width);\n            let (s, _) = s.split_at_mut(width);\n            let (rest, r) = rest.split_at_mut((i + 1) * width);\n            let (_rest, n) = rest.split_at_mut(i * width);\n            let ri = i + 1;\n            update!(@row r ri n s);\n        }\n        {\n            let (s, rest) = self.alive.split_at_mut(width);\n            let (_x, rest) = rest.split_at_mut(width * height - 3 * width);\n            let (n, r) = rest.split_at_mut(width);\n            update!(@row r height_minus_one n s);\n        }\n    }\n\n    pub fn toggle_cell(&mut self, row: u32, column: u32) {\n        let idx = self.get_index(row, column);\n        if let Some(cell) = self.cells.get_mut(idx) {\n            cell.toggle();\n        }\n    }\n\n    pub fn clear(&mut self) {\n        for slot in self.cells.iter_mut() {\n            *slot = Cell::Dead;\n        }\n    }\n\n    pub fn randomize(&mut self) {\n        let bits = iter::repeat(())\n            .map(|()| (random() * ((1u64 << 32) as f64)).to_bits())\n            .flat_map(|i| (0..32).map(move |j| (i & (1 << j)) != 0))\n            .map(|b| if b { Cell::Dead } else { Cell::Alive });\n        for (slot, value) in self.cells.iter_mut().zip(bits) {\n            *slot = value;\n        }\n    }\n\n    pub fn add_glider(&mut self, r: u32, c: u32) {\n        let x = [\n            (r, c),\n            (r, c + 1),\n            (r, c + 2),\n            (r, c + 3),\n            (r, c + 4),\n            (r, c + 5),\n            (r + 1, c),\n            (r + 1, c + 1),\n            (r + 1, c + 2),\n            (r + 1, c + 3),\n            (r + 1, c + 4),\n        ];\n        for (r, c) in x.iter().cloned() {\n            let i = self.get_index(r % HEIGHT, c % WIDTH);\n            self.cells[i] = Cell::Alive;\n        }\n    }\n\n    fn get_index(&self, row: u32, column: u32) -> usize {\n        (row * WIDTH + column) as usize\n    }\n}\n"
      }
    ]
  },
  "hello_world_c": {
    "files": [
      {
        "name": "README.md",
        "data": "# Hello World in C\n\nLevel: *Advanced*\n\nThis project prints `\"Hello World\"` using the well known C `printf` function. This function in turn uses several POSIX APIs that are implemented in JavaScript using DOM APIs.\n\n### Project Overview\n\n* `main.c` - Imports `stdio.h` and calls `printf(\"Hello World\")`.\n* `main.js` - Initializes a runtime environment for the WebAssembly module and implements the necessary WebAssembly imports.\n\n### Things to Explore\n\n1. Click Build to compile `main.c` file to `out/main.wasm`.\n\n2. Open the `out/main.wasm` file and notice that there's quite a bit of code. This is somewhat surprising given that our program is so small. The vast majority of this code implements the `printf` function. \n\n3. Notice the imports section, these are SysCalls. To get this WebAssembly module running you'll have to implement these functions first. However, note that these import names don't actually tell you what SysCalls are used, they are merely function stubs (one for each number of parameters). \n\n```\n  (import \"env\" \"__syscall0\" (func $env.__syscall0 (type $t2)))\n  (import \"env\" \"__syscall3\" (func $env.__syscall3 (type $t5)))\n  (import \"env\" \"__syscall1\" (func $env.__syscall1 (type $t8)))\n  ...\n```\n\n4. To figure that out which SysCalls are being used, you'll have to run the module. I ran it and got `45`, `146` and `192`. You can figure out what these numbers mean by looking them up in the [Linux SysCall Reference](https://syscalls.kernelgrok.com/). They are [brk()](http://man7.org/linux/man-pages/man2/brk.2.html), [writev()](http://man7.org/linux/man-pages/man2/writev.2.html) and [mmap()](http://man7.org/linux/man-pages/man2/mmap2.2.html). To make this WebAssembly module run, you'll just have to implement a tiny Linux kernel in JavaScript, no biggie.\n\n5. Take a look at `src/main.js`, this file emulates these basic SysCalls in JavaScript.\n\n6. `brk()` can be stubbed to return `0`, which is the success error code. `brk()` is used to allocate more memory to a process. WebAssembly does handles memory differently, so there's no need to do special here. \n\n7. `mmap2()` is used to request more memory within the process. In our example, it's implemented as a call to the WebAssembly `memory.grow()` function.\n\n8. `writev()` is used to write data to files. Its signature is `writev(int fd, const struct iovec *iov, int iovcnt)`. We can ignore the `fd` file descriptor parameter, and focus on the `iov` structure. The problem here is that on the JavaScript side we have a hard time pulling the `struct iovec` abart. We could figure it out, but a neat hack is to call back into the WebAssembly module and have some C code unpack it for us.\n\n9. Click Run\n\n```\nHello World\n```"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.compileFile(project.getFile(\"src/main.c\"), \"c\", \"wasm\", \"-g -O3\");\n  const outWasm = project.newFile(\"out/main.wasm\", \"wasm\", true);\n  outWasm.setData(data.wasm);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/hello_world_c\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Hello World in C\",\n    \"description\": \"# Hello World in C\\n\\nPrint \\\\`Hello World\\\\` using a minimal POSIX API.\\nLevel: *Advanced*\\nTopics: Low-Level, Memory, Linux, System Calls\",\n    \"icon\": \"c-lang-file-icon\"\n  }\n}"
      },
      {
        "name": "src/main.c",
        "data": "#include <stdio.h>\n#include <sys/uio.h>\n\n#define WASM_EXPORT __attribute__((visibility(\"default\")))\n\nWASM_EXPORT\nint main() {\n  printf(\"Hello World\\n\");\n}\n\n/* External function that is implemented in JavaScript. */\nextern putc_js(char c);\n\n/* Basic implementation of the writev sys call. */ \nWASM_EXPORT\nsize_t writev_c(int fd, const struct iovec *iov, int iovcnt) {\n  size_t cnt = 0;\n  for (int i = 0; i < iovcnt; i++) {\n    for (int j = 0; j < iov[i].iov_len; j++) {\n      putc_js(((char *)iov[i].iov_base)[j]);\n    }\n    cnt += iov[i].iov_len;\n  }\n  return cnt;\n}"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset='utf-8'>\n  <style>\n    body {\n        background-color: green;\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"./main.js\"></script>\n</body>\n</html>"
      },
      {
        "name": "src/main.js",
        "data": "let x = '../out/main.wasm';\n\nlet instance = null;\nlet memoryStates = new WeakMap();\n\nfunction syscall(instance, n, args) {\n  switch (n) {\n    default:\n      // console.log(\"Syscall \" + n + \" NYI.\");\n      break;\n    case /* brk */ 45: return 0;\n    case /* writev */ 146:\n      return instance.exports.writev_c(args[0], args[1], args[2]);\n    case /* mmap2 */ 192:\n      debugger;\n      const memory = instance.exports.memory;\n      let memoryState = memoryStates.get(instance);\n      const requested = args[1];\n      if (!memoryState) {\n        memoryState = {\n          object: memory,\n          currentPosition: memory.buffer.byteLength,\n        };\n        memoryStates.set(instance, memoryState);\n      }\n      let cur = memoryState.currentPosition;\n      if (cur + requested > memory.buffer.byteLength) {\n        const need = Math.ceil((cur + requested - memory.buffer.byteLength) / 65536);\n        memory.grow(need);\n      }\n      memoryState.currentPosition += requested;\n      return cur;\n  }\n}\n\nlet s = \"\";\nfetch(x).then(response =>\n  response.arrayBuffer()\n).then(bytes =>\n  WebAssembly.instantiate(bytes, {\n    env: {\n      __syscall0: function __syscall0(n) { return syscall(instance, n, []); },\n      __syscall1: function __syscall1(n, a) { return syscall(instance, n, [a]); },\n      __syscall2: function __syscall2(n, a, b) { return syscall(instance, n, [a, b]); },\n      __syscall3: function __syscall3(n, a, b, c) { return syscall(instance, n, [a, b, c]); },\n      __syscall4: function __syscall4(n, a, b, c, d) { return syscall(instance, n, [a, b, c, d]); },\n      __syscall5: function __syscall5(n, a, b, c, d, e) { return syscall(instance, n, [a, b, c, d, e]); },\n      __syscall6: function __syscall6(n, a, b, c, d, e, f) { return syscall(instance, n, [a, b, c, d, e, f]); },\n      putc_js: function (c) {\n        c = String.fromCharCode(c);\n        if (c == \"\\n\") {\n          console.log(s);\n          s = \"\";\n        } else {\n          s += c;\n        }\n      }\n    }\n  })\n).then(results => {\n  instance = results.instance;\n  document.getElementById(\"container\").innerText = instance.exports.main();\n});\n"
      }
    ]
  },
  "hello_world_rust": {
    "files": [
      {
        "name": "README.md",
        "data": "# \"Hello, World!\" Rust Project\n\nThis is a sample Rust project which uses the [`wasm_bindgen` crate][crate] to\nenable richer interactions between Rust and JS such as communicating with\nstrings rather than just numbers.\n\nTypically `wasm-bindgen` is paired with a bundler but here we're not using a\nbundler so you can poke around all the raw output!\n\nSome files you may be interested in are:\n\n* `main.rs` - this is the main body of Rust code, annotated with\n  `#[wasm_bindgen]` to have its functionality exported to JS.\n* `main.js` - this is the application's supporting JS, automatically run by\n  `main.html`. Here you'll import items implemented in Rust through the\n  `wasmBindgen` global.\n\nWhen building the project you'll get `out/main_bg.wasm`, the generated wasm\nfiltered through the `wasm-bindgen` CLI tool, as well as `out/main.js` which is\nan auxiliary JS file generated by the `wasm-bindgen` tool, included by default\nin `main.html`. The `out/main.js` file is responsible for creating the\n`wasmBindgen` global and filling it in.\n\n[crate]: https://github.com/rustwasm/wasm-bindgen\n"
      },
      {
        "name": "build.ts",
        "data": "import * as gulp from \"gulp\";\nimport { Service, project } from \"@wasm/studio-utils\";\n\ngulp.task(\"build\", async () => {\n  const data = await Service.compileFile(project.getFile(\"src/main.rs\"), \"rust\", \"wasm\");\n\n  const outWasm = project.newFile(\"out/main_bg.wasm\", \"wasm\", true);\n  outWasm.setData(data.wasm);\n  const outJs = project.newFile(\"out/main.js\", \"js\", true);\n  outJs.setData(data.wasmBindgenJs);\n});\n\ngulp.task(\"default\", [\"build\"], async () => {});\n"
      },
      {
        "name": "package.json",
        "data": "{\n  \"name\": \"@wasm/hello_world_rust\",\n  \"description\": \"\",\n  \"version\": \"1.0.0\",\n  \"scripts\": {\n    \"build\": \"gulp --gulpfile ./build.ts\"\n  },\n  \"devDependencies\": {\n    \"@wasm/studio-utils\": \"*\",\n    \"gulp\": \"~3.9.1\",\n    \"ts-node\": \"~5.0.0\",\n    \"typescript\": \"~2.7.2\"\n  },\n  \"wasmStudio\": {\n    \"name\": \"Hello World Rust Project\",\n    \"description\": \"# Hello World Rust Project\",\n    \"icon\": \"rust-lang-file-icon\"\n  }\n}\n"
      },
      {
        "name": "src/main.html",
        "data": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"utf-8\">\n  <style>\n    body {\n      background-color: rgb(255, 255, 255);\n    }\n  </style>\n</head>\n<body>\n  <span id=\"container\"></span>\n  <script src=\"../out/main.js\"></script>\n  <script src=\"./main.js\"></script>\n</body>\n</html>\n"
      },
      {
        "name": "src/main.js",
        "data": "const { greet } = wasm_bindgen;\n\nfunction runApp() {\n  greet('World');\n}\n\n// Load and instantiate the wasm file, and we specify the source of the wasm\n// file here. Once the returned promise is resolved we're ready to go and\n// use our imports.\nwasm_bindgen('../out/main_bg.wasm').then(runApp);\n"
      },
      {
        "name": "src/main.rs",
        "data": "// Current prelude for using `wasm_bindgen`, and this'll get smaller over time!\n#![feature(proc_macro, wasm_custom_section, wasm_import_module)]\nextern crate wasm_bindgen;\nuse wasm_bindgen::prelude::*;\n\n// Here we're importing the `alert` function from the browser, using\n// `#[wasm_bindgen]` to generate correct wrappers.\n#[wasm_bindgen]\nextern {\n    fn alert(s: &str);\n}\n\n// Here we're exporting a function called `greet` which will display a greeting\n// for `name` through a dialog.\n#[wasm_bindgen]\npub fn greet(name: &str) {\n    alert(&format!(\"Hello, {}!\", name));\n}\n"
      }
    ]
  }
}