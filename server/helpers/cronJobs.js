import cron from "node-cron";
import mkdirp from "mkdirp";
import downloadBeerData from "./downloadBeerData";
import unzipBeerData from "./unzipBeerData";
import parseBeerData from "./parseBeerData";
import { BEER_DATA_FOLDER } from "../../constants";
import { countBeers } from "../controllers/beer";
/**
 * Start ratebeer cronjob
 * 1. Download beers.zip from ratebeer
 * 2. Unzip beers.zip -> beers.txt
 * 3. Loop thru beers.txt file and save beers to db
 */
function startBeerTasks() {
    // # ┌────────────── second (optional)
    // # │ ┌──────────── minute
    // # │ │ ┌────────── hour
    // # │ │ │ ┌──────── day of month
    // # │ │ │ │ ┌────── month
    // # │ │ │ │ │ ┌──── day of week
    // # │ │ │ │ │ │
    // # │ │ │ │ │ │
    // # * * * * * *
    // Run cronjob every sunday at 6:00 am
    cron.schedule("0 15 7 * * 3", () => {
        countBeers()
        .then((result) => {
            const beerCount = result;
            mkdirp(BEER_DATA_FOLDER, mkdirErr => {
                if (mkdirErr) console.error(mkdirErr);
                else {
                    const download = downloadBeerData();
                    download.on("error", (err) => {
                        console.error("err: ", err);
                    });
                    download.on("end", () => {
                        unzipBeerData((success) => {
                            if (success) {
                              // We need little timeout because beers.txt file is not readable immediately
                                setTimeout(() => {
                                    parseBeerData(beerCount);
                                }, 1000);
                            }
                        });
                    });
                    // download.on("start", (fileSize) => {
                    //     console.log("fileSize: ", fileSize);
                    // });
                    // download.on("progress", (progress) => {
                    //     console.log("progress: ", progress);
                    // });
                }
            });
        })
        .catch((error) => {
            console.error("startBeerTasks error: ", error);
        });
    });
}

export default startBeerTasks;
