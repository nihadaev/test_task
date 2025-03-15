import gulp from 'gulp';
import replace from 'gulp-replace';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';

// Минификация JavaScript
gulp.task('scripts', () => {
    return gulp.src(['src/assets/js/*.js', 'src/assets/js/helpers/*.js', 'src/assets/js/services/*.js'])  // Укажи пути к своим JS файлам
        .pipe(terser())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(file => {
            // Определяем папку назначения на основе исходной папки
            if (file.dirname.includes('helpers')) {
                return 'dist/assets/js/helpers';
            }
            if (file.dirname.includes('services')) {
                return 'dist/assets/js/services';
            }
            return 'dist/assets/js';  // Если папка не matches, сохраняем в dist/js
        }));
});

// Минификация CSS
gulp.task('styles', () => {
    return gulp.src('src/assets/css/*.css')  // Укажи путь к своим CSS файлам
        .pipe(cleanCSS())  // Минификация CSS
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('dist/assets/css'));  // Папка для сохранения минифицированных файлов
});

// Оптимизация изображений
gulp.task('images', () => {
    return gulp.src('src/assets/images/*')  // Укажи путь к своим изображениям
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'));  // Папка для сохранения оптимизированных изображений
});

// Замена путей в минифицированных файлах
gulp.task('update-imports', () => {
    return gulp.src(['dist/**/*.js'])
        .pipe(replace(/(import\s*{[^}]+}\s*from\s*["'])(\.\/[\w/-]+?)(?<!\.min)(\.js["'])/g, '$1$2.min$3'))
        .pipe(gulp.dest('dist'));
});

// Минификация HTML
gulp.task('minify-html', () => {
    return gulp.src('src/**/*.html') // Пути к исходным HTML-файлам
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist')); // Сохраняем минифицированные файлы
});

// Обновление путей в HTML
gulp.task('update-html-imports', () => {
    return gulp.src(['dist/**/*.html'])
        .pipe(replace(/(<script\s+src=["'])(\.\/assets\/js\/[\w/-]+?)(?<!\.min)(\.js["'])/g, '$1$2.min$3'))
        .pipe(gulp.dest('dist'));
});

// Автоматическое выполнение всех задач
gulp.task('default', gulp.series('scripts', 'update-imports', 'styles', 'images', 'minify-html', 'update-html-imports'));  // Выполняем задачи по порядку