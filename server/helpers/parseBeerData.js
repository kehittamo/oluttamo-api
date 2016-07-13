// Heavily influenced by https://github.com/harrisiirak/ratebeer-open-data
import fs from "fs";
import readline from "readline";
import { XmlEntities } from "html-entities";
import { validateCreateBeer } from "./beerDataValidator";
import beerCtrl from "../controllers/beer";
import { BEER_DATA_FOLDER, BEER_TXT_FILE_NAME } from "../../constants";

let count = 0;
const range = [0, 10000];
const searchCollection = [];

function escapeBeerName(name) {
    return XmlEntities
    .decode(name)
    .replace(/\0/g, "")
    .trim();
}

function createBeer(beerCount, beerData) {
    if (beerCount > 0) {
        beerCtrl.update(beerData, (error, result) => {
            if (error) console.error("update beer error: ", error);
            else console.log("Result: ", result);
        });
    } else {
        beerCtrl.create(beerData, (error, result) => {
            if (error) console.error("create beer error: ", error);
            else console.log("Result: ", result);
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
        searchCollection.push({
            ratebeerId: +details[0],
            beerName,
            breweryName,
            beerFullName,
        });
    });

    reader.on("close", () => {
        for (const beerData of searchCollection) {
            const validationData = validateCreateBeer(beerData);
            if (validationData.error === null) {
                createBeer(beerCount, beerData);
            } else {
                console.error(beerData.beername, " validation error: ", validationData.error);
            }
        }
    });
}

export default parseData;
