const express = require('express');
const app = express();
app.use(express.json());
const ytdl = require('ytdl-core');

const videoDownload = (req, res) => {
    try {
        const videoURL = req.body.video;
        console.log("Server side videourl is ", videoURL);
        const videoID = ytdl.getVideoID(videoURL);
        const stream = ytdl(videoID);

        res.header('Content-Type', 'video/mp4');
        stream.pipe(res);
    } catch (error) {
        console.log("req.query.url is", req.body.video);
        console.log("server side download error ", error)
    }
};

module.exports = videoDownload;


