import wget from "wget-improved";
import { BEER_DATA_FOLDER, BEER_ZIP_FILE_NAME, BEER_ZIP_URL } from "../../constants";

function downloadBeerData() {
    return wget.download(`${BEER_ZIP_URL}`, `${BEER_DATA_FOLDER}${BEER_ZIP_FILE_NAME}`, {});
}

export default downloadBeerData;
