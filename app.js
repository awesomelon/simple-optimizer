const imagemin = require('imagemin-keep-folder');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const glob = require('glob');
const uglifycss = require('uglifycss');
const fs = require('fs');

(async () => {
    let files = await imagemin(['**/**/*.{jpg,png,gif}'], {
        use: [imageminMozjpeg(), imageminPngquant(), imageminGifsicle()]
    });

    await glob('**/**/*.css', function(er, css) {
        if (er) {
            console.log(er);
        } else {
            css.forEach(element => {
                var uglified = uglifycss.processFiles(['./' + element], {
                    maxLineLen: 500,
                    expandVars: true
                });
                fs.writeFileSync('./' + element, uglified);
            });
        }
    });
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
})();
