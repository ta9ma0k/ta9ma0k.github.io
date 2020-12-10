let video;
let picture;
let poseNet;
let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;
let d = 0;
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  picture = loadImage('./sample.png');

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
    if (poses.length > 0) {
        let pose = poses[0].pose;
        eyelX = pose.leftEye.x;
        eyelY = pose.leftEye.y;
        eyerX = pose.rightEye.x;
        eyerY = pose.rightEye.y;
    }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
    d = dist(eyerX, eyerY, eyelX, eyelY) / 100;
    image(video, 0, 0);

    image(picture, eyelX - widthOfPicture() / 2, eyelY - heightOfPicture() / 2, widthOfPicture(), heightOfPicture());
    image(picture, eyerX - widthOfPicture() / 2, eyerY - heightOfPicture() / 2, widthOfPicture(), heightOfPicture());
}

function widthOfPicture() {
    return picture.width * d;
}

function heightOfPicture() {
    return picture.height * d;
}