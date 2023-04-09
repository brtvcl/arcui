const gulp = require("gulp");
const ts = require("gulp-typescript");
const compileSaas = require("gulp-sass")(require("sass"));
const minifyCss = require("gulp-clean-css");
const sourceMaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const merge = require("merge-stream");

// Compile TyepScript


gulp.task("js", function () {
	let tsProject = ts.createProject("tsconfig.json", {
		declaration: true,
		declarationFiles: true
	});

	var tsResult = tsProject.src()
		.pipe(tsProject());

	return merge([
		tsResult.dts.pipe(gulp.dest("../dist")),
		tsResult.js.pipe(gulp.dest("../dist"))
	]);
});

// Compile SASS

gulp.task("css", () => {
	return gulp.src("../src/**/*.scss")
		.pipe(sourceMaps.init())
		.pipe(compileSaas().on("error", compileSaas.logError))
		.pipe(minifyCss())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest("../dist")) // Write individual css files
		.pipe(concat("bundle.css"))
		.pipe(gulp.dest("../dist")); // Write bundled css file
});

// Copy Svelte Files

gulp.task("svelte", () => {
	return gulp.src("../src/**/*.?(svelte|d.ts)")
		.pipe(gulp.dest("../dist"));
});

// Watch Core (Watch TypeScript, SASS)

gulp.task("watch:core", () => {
	gulp.watch("../src/**/*.ts", gulp.series("js"));
	gulp.watch("../src/**/*.scss", gulp.series("css"));
	return
});


// Watch Svelte (Watch TypeScript, SASS, Svelte)

gulp.task("watch:svelte", () => {
	gulp.watch("../src/**/*.ts", gulp.series("js"));
	gulp.watch("../src/**/*.scss", gulp.series("css"));
	gulp.watch("../src/**/*.?(svelte|d.ts)", gulp.series("svelte"));
	return
});