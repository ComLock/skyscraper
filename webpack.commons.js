'use strict';
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const find = require('find');
const path = require('path');
const process = require('process');

/**
 * @param {string} extension - The file type to search for ex: '.es6'
 * @param {[[]]} entryPath - sends an array of strings to complete the file path (relative to src/). see pathToSearch
 * @param {string[]} [customEntry] - is used to compile files that are located directly under a subFolder, ex: polyfills. optional
 */
module.exports.getEntryFiles = (extension, entryPath, customEntry) => {
    console.log("extension:"+extension);
    console.log("entryPath:"+entryPath);
    console.log("customEntry:"+customEntry);

    const allfiles = [], entry = {};
    const regex = new RegExp(extension);
    const slash = process.platform == 'win32' ? '\\' : '/';

    console.log(regex);
    console.log(slash);

    String.prototype.contains = function(str, ignoreCase) {
        return (ignoreCase ? this.toUpperCase() : this)
                .indexOf(ignoreCase ? str.toUpperCase() : str) >= 0;
    };

    if (customEntry) {
        Array.from(customEntry).forEach((file) => {
            const customFilePath = find.fileSync(file+extension, path.resolve('./src/main/resources/'));
            entry[file] = [customFilePath.toString()];
            allfiles.push(entry);
        });
    }

    Array.from(entryPath).forEach(entrypath => {

        const folders = entrypath[0].toString();
        const entryFolder = entrypath[1].toString();
        const pathToSearch = './src/'+ folders+'/';
        const files = find.fileSync(regex, path.resolve(pathToSearch));

        Array.from(files).forEach(file => {
            const directoryName = path.dirname(file).substring(path.dirname(file).lastIndexOf(slash+entryFolder+slash) + entryFolder.length+2);
            const fileName = file.substring(file.lastIndexOf(slash)+1, file.lastIndexOf('.'));
            let entryName = directoryName+slash+fileName;

            if (entryName.contains('assets')) {
                if ((fileName.contains('index') || (customEntry && customEntry.indexOf(fileName) != -1))) {
                    entryName = entryName.replace('assets'+slash, '');
                    entry[entryName] = [file];
                    allfiles.push(entry);
                }
            } else {
                if (!(customEntry && customEntry.indexOf(fileName) != -1)) {
                    entry[entryName] = file;
                    console.log("entry:"+entry[entryName]);
                    allfiles.push(entry);
                }
            }
        });
    });

    return Object.assign({}, allfiles)[0];
};

module.exports.getUglifyJsPlugin = () => {
    return new UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    });
};
