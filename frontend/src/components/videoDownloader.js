import axios from "axios";
const FileDownload = require("js-file-download");

export default function VideoDownloader({ video }) {
  const { _id, title, thumbnail } = video;
    console.log("ID ", _id);
  const downloadVideo = async (event) => {
    axios
      .get("download/" + _id + "/downloadfile", {
        responseType: "blob",
      })
      .then((response) => {
        FileDownload(response.data, `${title}.mp4`);
      });
  };

  downloadVideo()
}
