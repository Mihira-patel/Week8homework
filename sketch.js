var net;
var video;
var currentResult;
var img;
var score = 0;
let xPos;
let yPos;

function setup() {
  createCanvas(800, 600);
  textSize(20);

  video = createCapture(VIDEO);

  video.elt.addEventListener("loadeddata", videoLoadedCallback);

  video.size(800, 600);
  video.hide();
  xPos = random(width);
  yPos = random(height);
}

function draw() {
  background(255);
  image(video, 0, 0, 800, 600);
  if (currentResult) {
    var nose = currentResult.keypoints[0].position;
    var leftEar = currentResult.keypoints[3].position;
    var rightEar = currentResult.keypoints[4].position;

    line(width / 2, 0, width / 2, height);

    if (nose.x < width / 2) fill(50, 55, 100);
    else fill("magenta");

  
    if (leftEar.y > rightEar.y) {
      text("Party mode", 5, 25);
      rect(random(width), random(height), 100, 50);
      rect(xPos, xPos, mouseX, mouseY);
    } else text("Work mode", 5, 25);

    ellipse(nose.x, nose.y, 20, 20);
  }
}

function pickRandom() {
  x = random(20, width - 20);
}


function videoLoadedCallback() {
  print("Video Loaded");
  posenet.load().then(loadedCallback);
}

function loadedCallback(model) {
  print("Model loaded!");
  net = model;
  net.estimateSinglePose(video.elt).then(estimateCallback);
}

function estimateCallback(result) {
  currentResult = result;
  net.estimateSinglePose(video.elt).then(estimateCallback);
}
//https://editor.p5js.org/Mihira-patel/full/wfuDKqEMK
