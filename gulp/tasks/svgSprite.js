import gulpSvgSprite from "gulp-svg-sprite"

export const svgSprite = () => {
	return app.gulp.src(`${app.path.src.svgSprite}`, {})
		.pipe(gulpSvgSprite({
			mode: {
				symbol: {
					sprite: `../sprite.svg`
				}
			}
		}))
		.pipe(app.gulp.dest(`${app.path.build.images}`))
}