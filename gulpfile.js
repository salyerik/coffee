// Основной путь
import gulp from "gulp"
// Импорт путей
import { path } from "./gulp/config/path.js"
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js"

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

// Импорт задач
import { files } from "./gulp/tasks/files.js"
import { reset } from "./gulp/tasks/reset.js"
import { pug } from "./gulp/tasks/pug.js"
import { server } from "./gulp/tasks/server.js"
import { sass } from "./gulp/tasks/sass.js"
import { js } from "./gulp/tasks/js.js"
import { images } from "./gulp/tasks/images.js"
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"
import { svgSprite } from "./gulp/tasks/svgSprite.js"
import { zip } from "./gulp/tasks/zip.js"
import { ftp } from "./gulp/tasks/ftp.js"

// Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, files)
	gulp.watch(path.watch.pug, pug) // gulp.series(pug, ftp)
	gulp.watch(path.watch.sass, sass)
	gulp.watch(path.watch.js, js)
	gulp.watch(path.watch.images, images)
}

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

// Основные задачи
const mainTasks = gulp.series(fonts, gulp.parallel(files, pug, sass, js, images, svgSprite))

// Построение сPriceриев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks, server)
const deployZIP = gulp.series(reset, mainTasks, zip)
const deployFTP = gulp.series(reset, mainTasks, ftp)

// Экспорт сPriceриев
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Выполнение сPriceрия по умолчанию
gulp.task('default', dev)