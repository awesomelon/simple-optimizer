const imagemin = require('imagemin-keep-folder');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const globby = require('globby');
const uglifycss = require('uglifycss');
const minifyHtml = require('html-minifier').minify;
const fs = require('fs');

(async () => {
    await globby(['**/**/*.html', '!node_modules']).then(html => {
        html.forEach(element => {
            let files = fs.readFileSync('./' + element, (encoding = 'utf8'));
            let result = minifyHtml(files, {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                html5: true,
                // preserveLineBreaks: true,
                processConditionalComments: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeTagWhitespace: true,
                trimCustomFragments: true,
                removeComments: true,
                minifyJS: true
            });
            fs.writeFileSync('./' + element, result);
        });
    });

    await globby(['**/**/*.css', '!node_modules']).then(css => {
        css.forEach(element => {
            let uglified = uglifycss.processFiles(['./' + element], {
                maxLineLen: 500,
                expandVars: true
                // uglyComments: false
            });
            fs.writeFileSync('./' + element, uglified);
        });
    });

    let png = await imagemin(['**/**/*.{jpg,png}'], {
        use: [imageminMozjpeg(), imageminPngquant()]
    });

    await imagemin(['**/**/*.gif'], {
        use: [imageminGifsicle()]
    });

    console.log('==================Complete=================');
    console.log(png);
    // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();
