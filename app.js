const imagemin = require('imagemin-keep-folder');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const globby = require('globby');
const uglifycss = require('uglifycss');
const minifyHtml = require('html-minifier').minify;
const fs = require('fs');

(async () => {
    let htmlFiles = await globby(['**/**/*.html', '!node_modules']).then(html => {
        html.forEach(element => {
            let files = fs.readFileSync('./' + element, (encoding = 'utf8'));
            let result = minifyHtml(files, {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                // preserveLineBreaks: true,
                processConditionalComments: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true,
                minifyJS: true
            });
            fs.writeFileSync('./' + element, result);
        });
    });

    let cssFiles = await globby(['**/**/*.css', '!node_modules']).then(css => {
        css.forEach(element => {
            let uglified = uglifycss.processFiles(['./' + element], {
                maxLineLen: 500,
                expandVars: true
            });
            fs.writeFileSync('./' + element, uglified);
        });
    });

    let files = await imagemin(['**/**/*.{jpg,png,gif}'], {
        use: [imageminMozjpeg(), imageminPngquant(), imageminGifsicle()]
    });
    // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();
