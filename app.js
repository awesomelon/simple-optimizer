const imagemin = require('imagemin-keep-folder');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const globby = require('globby');
const uglifycss = require('uglifycss');
const fs = require('fs');

(async () => {
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
