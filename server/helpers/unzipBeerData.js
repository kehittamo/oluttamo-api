import unzip from "unzip";
import fs from "fs";
import { BEER_DATA_FOLDER, BEER_ZIP_FILE_NAME, BEER_TXT_FILE_NAME } from "../../constants";

function unzipAction(cb) {
    fs.createReadStream(`${BEER_DATA_FOLDER}${BEER_ZIP_FILE_NAME}`)
    .pipe(unzip.Parse()) // eslint-disable-line new-cap
    .on("entry", (entry) => {
        const fileName = entry.path;
        if (fileName === BEER_TXT_FILE_NAME) {
            entry.pipe(fs.createWriteStream(`${BEER_DATA_FOLDER}${BEER_TXT_FILE_NAME}`));
            cb(true);
        } else {
            entry.autodrain();
            cb(false);
        }
    });
}

export default unzipAction;
