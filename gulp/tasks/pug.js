import webpHtml from "gulp-webp-html"
import versionNumber from "gulp-version-number"
import fileInclude from "gulp-file-include"
import htmlMin from "gulp-htmlmin"

export const pug = () => {
	return app.gulp.src(app.path.src.pug)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "PUG",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(fileInclude())
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpHtml()
			)
		)
		.pipe(
			htmlMin({ collapseWhitespace: true })
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream())
}