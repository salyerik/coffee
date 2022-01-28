// Получаем имя папки проекта
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = `./dist`
const srcFolder = `./src`

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		sass: `${srcFolder}/scss/style.scss`,
		pug: `${srcFolder}/html/*.html`,
		files: `${srcFolder}/files/**/*.*`,
		svgSprite: `${srcFolder}/svg-sprite/**/*.svg`,
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		sass: `${srcFolder}/scss/**/*.scss`,
		pug: `${srcFolder}/html/**/*.html`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		files: `${srcFolder}/files/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `test`
}