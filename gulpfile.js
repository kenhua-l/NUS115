const { src, dest, parallel, series, watch } = require("gulp"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  precss = require("precss"),
  cssnano = require("cssnano"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  bs = require("browser-sync"),
  reload = bs.reload,
  postcsspartialimport = require("postcss-partial-import")({ prefix: "_" }),
  sass = require("gulp-sass");
(fileinclude = require("gulp-file-include")),
  (prettyHtml = require("gulp-pretty-html"));

sass.compiler = require("node-sass");

function html() {
  return src("src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    .pipe(prettyHtml())
    .pipe(dest("dest"))
    .pipe(reload({ stream: true }));
}

function css() {
  const processors = [
    postcsspartialimport,
    autoprefixer,
    precss
    // cssnano
  ];
  return src("src/css/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(postcss(processors))
    .pipe(dest("dest/css"))
    .pipe(reload({ stream: true }));
}

function js() {
  return (
    src("src/js/*.js")
      // .pipe(uglify())
      // .pipe(rename({ suffix: '.min' }))
      .pipe(dest("dest/js"))
      .pipe(reload({ stream: true }))
  );
}

function serve() {
  bs.init({
    server: {
      baseDir: "dest",
      ghostMode: false
    }
  });
  watch("src/css/*.{css,scss}", css);
  watch("src/**/*.html", html);
  watch("src/js/*.js", js);
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = series(parallel(html, css, js), serve);
