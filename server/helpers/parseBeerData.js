// Heavily influenced by https://github.com/harrisiirak/ratebeer-open-data
import fs from "fs";
import readline from "readline";
import { XmlEntities } from "html-entities";
import eachSeries from "async/eachSeries";
import { validateCreateBeer } from "./beerDataValidator";
import beerCtrl from "../controllers/beer";
import { BEER_DATA_FOLDER, BEER_TXT_FILE_NAME } from "../../constants";

let count = 0;
const range = [0, 500000];
const beerCollection = [];

function escapeBeerName(name) {
    return XmlEntities
    .decode(name)
    .replace(/\0/g, "")
    .replace(/’/g, "'")
    .trim();
}

function createBeer(beerCount, beerData, cb) {
    if (beerCount > 0) {
        beerCtrl.update(beerData, (error, result) => {
            if (error) console.error("update beer error: ", error);
            else console.log("Update beer: ", result);
            cb();
        });
    } else {
        beerCtrl.create(beerData, (error, result) => {
            if (error) console.error("create beer error: ", error);
            else console.log("Create beer: ", result);
            cb();
        });
    }
}

function parseData(beerCount) {
    const reader = readline.createInterface({
        input: fs.createReadStream(`${BEER_DATA_FOLDER}${BEER_TXT_FILE_NAME}`, { encoding: "utf-16le" }),
    });

    reader.on("line", (line) => {
      // Only process valid records
        const details = line.split("\t");
        if (details.length < 6) {
            return;
        }
        count++;

      // If range is enabled
        if ((range && range.length) && (count < range[0] || count > range[1])) {
            if (count > range[1]) {
                reader.close();
            }

            return;
        }

        const beerName = escapeBeerName(details[1]);
        const breweryName = escapeBeerName(details[3]);
        const beerFullName = `${breweryName} ${beerName}`;
        beerCollection.push({
            ratebeerId: +details[0],
            beerName,
            breweryName,
            beerFullName,
        });
    });

    reader.on("close", () => {
        eachSeries(beerCollection, (beerData, callback) => {
            const validationData = validateCreateBeer(beerData);
            if (validationData.error === null) {
                createBeer(beerCount, beerData, () => {
                    callback();
                });
            } else {
                console.error(beerData.beername, " validation error: ", validationData.error);
                callback();
            }
        });
    });
}

export default parseData;
