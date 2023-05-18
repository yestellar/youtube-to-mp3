const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=IYm3ATnFZ5c';
const audioFileName = 'output.mp3';

async function fetchVideo(url, audioFileName) {
	return new Promise((resolve, reject) => {
		const videoStream = ytdl(url, { quality: 'highestaudio' });

		const ffmpegCommand = ffmpeg(videoStream)
			.audioBitrate(128)
			.toFormat('mp3')
			.save(audioFileName)
			.on('end', () => {
				resolve();
			})
			.on('error', (err) => {
				reject(err);
			});

		ffmpegCommand.run();
	});
}

function main() {
	fetchVideo(YOUTUBE_URL, audioFileName)
		.then(() => {
			console.log('Done');
		})
		.catch((err) => {
			console.log('Error', err);
		});
}

main();