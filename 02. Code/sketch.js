let cap;
let d;

let vc2 = 2; //downsampling numbers
let vc3 = 4;
let vc4 = 6;

let increaseRect; //master bitcrush
let posterSlider; //colour stability

let invert1 = false; //boolean switches
let threshold1 = false;
let grid1 = false;
let cameraToggle = false;

let rectButton = false;
let softSquareButton = false;
let ellipseButton = false;
let triangleButton = false;
let stankowskiButton = false;
let dogtoothButton = false;

let triangleArray = []; //complex shapes
let stankowskiArray = []; let stankowskiSpacer = 1;
let dogtoothArray = []; let dogtoothXSpacer = 1; let dogtoothYSpacer = 1;

let input; //file handler variables
let img;

function preload(){
  cap = createCapture(VIDEO);
  cap.hide();
  //// initial image load (not working – has CORS issues)
  // img = createImg('03. Files/Sample Image (optional)/Jesus_Christ.jpeg','');
  // img.hide();
}

function setup() {
  createCanvas(640,480);
  d = pixelDensity(); //gets pixel density of your display
  rectMode(CENTER)
  ellipseMode(CENTER)
  noStroke();

  //sliders
  opacSlider4 = createSlider(0,255,50);
  opacSlider4.position(835,28);
      label4 = createP('04');
      label4.position(975,5);
      opacSlider4.addClass('slider')
  opacSlider3 = createSlider(0,255,80);
  opacSlider3.position(835,49);
      label3 = createP('03');
      label3.position(975,27);
      opacSlider3.addClass('slider')
  opacSlider2 = createSlider(0,255,100);
  opacSlider2.position(835,70);
      label2 = createP('02');
      label2.position(975,48);
      opacSlider2.addClass('slider')
  opacSlider1 = createSlider(0,255,255);
  opacSlider1.position(835,91);
      label1 = createP('0 1');
      label1.position(975,69);
      opacSlider1.addClass('slider')
  opacSlider5 = createSlider(0,255,0);
  opacSlider5.position(835,112);
      label5 = createP('00');
      label5.position(975,90);
      opacSlider5.addClass('slider')

  posterSlider = createSlider(2,40,40);
  posterSlider.position(775,174);
      label6 = createP('COLOUR &nbsp; &nbsp; STABILITY');
      label6.position(745,127);
      posterSlider.addClass('slider')
      
  increaseRect = createSlider(8,200,8);
  increaseRect.position(775,193);
      label6 = createP('MASTER &nbsp; &nbsp; BITCRUSHER');
      label6.position(730,198);
      increaseRect.addClass('slider')
    
      label7 = createP('BLEND &nbsp; >>');
      label7.position(672,5);
    
      label8 = createP('MODULES');
      label8.position(675,43);

//buttons
  gridButton = createButton('Display Matrix');
  gridButton.mousePressed(gridNow);
  gridButton.position(778,250)
  gridButton.style('padding-right:20px;padding-left:20px;')
  gridButton.addClass("buttonClass");

  threshold1Button = createButton('Threshold')
  threshold1Button.mousePressed(thresholdNow);
  threshold1Button.position(778,280);
  threshold1Button.style('padding-right:33px;padding-left:33px;')
  threshold1Button.addClass("buttonClass");
  
  invert1Button = createButton('Invert')
  invert1Button.mousePressed(invertNow);
  invert1Button.position(778,310);
  invert1Button.style('padding-right:47px;padding-left:47px;')
  invert1Button.addClass("buttonClass");
  
  //camera button
  cameraButton = createButton('Camera');
  cameraButton.mousePressed(cameraNow);
  cameraButton.position(778,408);
  cameraButton.style('padding-right:40px;padding-left:40px;');
  cameraButton.addClass("buttonClass");

  //upload button
  input = createFileInput(handleFile);
  input.position(738,435);
  input.addClass("inputButtonClass");
  
  //save button
  exportButton = createButton('Save');
  exportButton.position(778,468);
  exportButton.mousePressed(saveFrame);
  exportButton.style('padding-left:50px;padding-right:50px;')
  exportButton.addClass("saveButtonClass");
  
  //shape buttons
  softSquareButton = createButton('');
  softSquareButton.style('padding-left:20px; padding-bottom:5px;')
  softSquareButton.mousePressed(softSquareChange);
  softSquareButton.position(675,85);
  softSquareButton.addClass("moduleButtonClass");

  rectButton = createButton('');
  rectButton.style('padding-left:20px; padding-bottom:5px;')
  rectButton.mousePressed(rectChange);
  rectButton.position(710,85);
  rectButton.addClass("moduleButtonClass");
  
  ellipseButton = createButton('');
  ellipseButton.style('padding-left:20px; padding-bottom:5px;')
  ellipseButton.mousePressed(ellipseChange);
  ellipseButton.position(745,85);
  ellipseButton.addClass("moduleButtonClass");
  
  triangleButton = createButton('');
  triangleButton.style('padding-left:20px; padding-bottom:5px;')
  triangleButton.mousePressed(triangleChange);
  triangleButton.position(778,85);
  triangleButton.addClass("moduleButtonClass");
  
  stankowskiButton = createButton ('');
  stankowskiButton.style('padding-left:20px; padding-bottom:5px;')
  stankowskiButton.mousePressed(stankowskiChange);
  stankowskiButton.position(675,101);
  stankowskiButton.addClass("moduleButtonClass");

  dogtoothButton = createButton ('');
  dogtoothButton.style('padding-left:20px; padding-bottom:5px;')
  dogtoothButton.mousePressed(dogtoothChange);
  dogtoothButton.position(710,101);
  dogtoothButton.addClass("moduleButtonClass");
  
// //fullscreen option (not working yet)
//   button3 = createButton('Fullscreen');
//   button3.style('padding:10px;')  
//   button3.position(650,537);
//   button3.mousePressed(fullscreen01);
  
  //sets default on initialisation
  softSquareChange();
  softSquareButton = true;
}

function draw() {
  background(0);
  saveCanvas = createGraphics(width,height); //variable for exports
  
//Video Capture & Image Upload Display 01
    if ((img)&&(img.width < img.height)) { //detect portrait from landscape
    background(0); //set background to black
    imageMode(CENTER); //scale portrait proportionally
    image(img, width/2, height/2, img.width*height/img.height, height) 
    loadPixels();
    
  } else if ((img) && (img.width > img.height)){ //detect landscape from portrait
    background(0);
    imageMode(CENTER); //scale landscape proportionally
    image(img, width/2, height/2, width, img.height*width/img.width);
    loadPixels();
  } else {
    
    //Original Capture
    image(cap, 0, 0, cap.width, cap.height);
    tint(255, opacSlider5.value())
  }

  if (cameraToggle == true){
    img = null;
    cameraToggle = false;
  } else {
    imageMode(CORNER);
  }

  fill(0,0,0,255-opacSlider5.value()); //transparency for image upload
  rect(0,0,width*2,height*2);
  
  cap.loadPixels();
  
  for (let y = 0; y < cap.height; y += increaseRect.value()*dogtoothYSpacer) {
    for (let x = 0; x < cap.width; x += increaseRect.value()*stankowskiSpacer*dogtoothXSpacer) {
        let xpos = (x / cap.width) * width;
        let ypos = (y / cap.height) * height;
      if (img){ //for image upload
        let offset = ((y*d*cap.width*d)+x*d)*4; //scales image to pixel density of display
          let r = pixels[offset + 0];
          let g = pixels[offset + 1];
          let b = pixels[offset + 2];
        fill(r, g, b, opacSlider1.value());
      } else { //for camera display
        let offset = ((y * cap.width)+x)*4;
          let cR = cap.pixels[offset + 0];
          let cG = cap.pixels[offset + 1];
          let cB = cap.pixels[offset + 2];
        fill(cR, cG, cB, opacSlider1.value());
      }
      if (rectButton == true){
          rect(xpos, ypos, increaseRect.value(), increaseRect.value())
      } 
      if (softSquareButton == true ){
          rect(xpos, ypos, increaseRect.value(), increaseRect.value(), 
               increaseRect.value()/6);
      } 
      if (ellipseButton == true){
          ellipse(xpos, ypos, increaseRect.value(), increaseRect.value());
      }
      if (triangleButton == true){
          triangleArray[0] = new triangleNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
          triangleArray[0].display01();
      }
      if (stankowskiButton == true){
          stankowskiSpacer = 2;
          stankowskiArray[0] = new stankowskiNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
          stankowskiArray[0].display01();
      } else {
          stankowskiSpacer = 1;
      }
      if (dogtoothButton == true){
        dogtoothXSpacer = 2;
        dogtoothYSpacer = 2;
        dogtoothArray[0] = new dogtoothNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
        dogtoothArray[0].display01();
      } else {
        dogtoothXSpacer = 1;
        dogtoothYSpacer = 1;
      }
    }
  }  
  
//Video Capture & Image Upload Display 02
  for (let y = 0; y < cap.height; y += [increaseRect.value()*vc2]*dogtoothYSpacer) {
    for (let x = 0; x < cap.width; x += [increaseRect.value()*vc2]*stankowskiSpacer*dogtoothXSpacer) {
        let xpos = (x / cap.width) * width;
        let ypos = (y / cap.height) * height;
      if (img){ //for image upload
        let offset = ((y*d*cap.width*d)+x*d)*4;
          let r = pixels[offset + 0];
          let g = pixels[offset + 1];
          let b = pixels[offset + 2];
        fill(r, g, b, opacSlider2.value());
      } else { //for camera display
        let offset = ((y * cap.width)+x)*4;
          let cR = cap.pixels[offset + 0];
          let cG = cap.pixels[offset + 1];
          let cB = cap.pixels[offset + 2];
        fill(cR, cG, cB, opacSlider2.value());
      }
      if (rectButton == true){
          rect(xpos, ypos, increaseRect.value()*vc2, increaseRect.value()*vc2)
      } 
      
      if (softSquareButton == true ){
          rect(xpos, ypos, increaseRect.value()*vc2, 
               increaseRect.value()*vc2,increaseRect.value()*vc2/6);
      } 
      if (ellipseButton == true){
          ellipse(xpos, ypos, increaseRect.value()*vc2, increaseRect.value()*vc2);
      }
      if (triangleButton == true){
          triangleArray[0] = new triangleNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
          triangleArray[0].display02();
      }
      if (stankowskiButton == true){
          stankowskiSpacer = 2;
          stankowskiArray[0] = new stankowskiNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
          stankowskiArray[0].display02();
      } else {
          stankowskiSpacer = 1;
      }
      if (dogtoothButton == true){
        dogtoothXSpacer = 2;
        dogtoothYSpacer = 2;
        dogtoothArray[0] = new dogtoothNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
        dogtoothArray[0].display02();
      } else {
        dogtoothXSpacer = 1;
        dogtoothYSpacer = 1;
      }
    }
  }
  
//Video Capture & Image Upload Display 03
  for (let y = 0; y < cap.height; y += [increaseRect.value()*vc3]*dogtoothYSpacer) {
    for (let x = 0; x < cap.width; x += [increaseRect.value()*vc3]*stankowskiSpacer*dogtoothXSpacer) {
        let xpos = (x / cap.width) * width;
        let ypos = (y / cap.height) * height;
      if (img){ //for image upload
        let offset = ((y*d*cap.width*d)+x*d)*4;
          let r = pixels[offset + 0];
          let g = pixels[offset + 1];
          let b = pixels[offset + 2];
        fill(r, g, b, opacSlider3.value());
      } else { //for camera display
        let offset = ((y * cap.width)+x)*4;
          let cR = cap.pixels[offset + 0];
          let cG = cap.pixels[offset + 1];
          let cB = cap.pixels[offset + 2];
        fill(cR, cG, cB, opacSlider3.value());
      }
      if (rectButton == true){
          rect(xpos, ypos, increaseRect.value()*vc3, increaseRect.value()*vc3)
      } 
      if (softSquareButton == true ){
          rect(xpos, ypos, increaseRect.value()*vc3, 
               increaseRect.value()*vc3,increaseRect.value()*vc3/6);
      } 
      if (ellipseButton == true){
          ellipse(xpos, ypos, increaseRect.value()*vc3, increaseRect.value()*vc3);
      }
      if (triangleButton == true){
          triangleArray[0] = new triangleNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
          triangleArray[0].display03();
      }
      if (stankowskiButton == true){
          stankowskiSpacer = 2;
          stankowskiArray[0] = new stankowskiNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
          stankowskiArray[0].display03();
      } else {
          stankowskiSpacer = 1;
      }
      if (dogtoothButton == true){
        dogtoothXSpacer = 2;
        dogtoothYSpacer = 2;
        dogtoothArray[0] = new dogtoothNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
        dogtoothArray[0].display03();
      } else {
        dogtoothXSpacer = 1;
        dogtoothYSpacer = 1;
      }
    }
  }
  
//Video Capture & Image Upload Display 04
  for (let y = 0; y < cap.height; y += [increaseRect.value()*vc4]*dogtoothYSpacer) {
    for (let x = 0; x < cap.width; x += [increaseRect.value()*vc4]*stankowskiSpacer*dogtoothXSpacer) {
        let xpos = (x / cap.width) * width;
        let ypos = (y / cap.height) * height;
      if (img){ //for image upload
        let offset = ((y*d*cap.width*d)+x*d)*4;
          let r = pixels[offset + 0];
          let g = pixels[offset + 1];
          let b = pixels[offset + 2];
        fill(r, g, b, opacSlider4.value());
      } else { //for camera display
        let offset = ((y * cap.width)+x)*4;
          let cR = cap.pixels[offset + 0];
          let cG = cap.pixels[offset + 1];
          let cB = cap.pixels[offset + 2];
        fill(cR, cG, cB, opacSlider4.value());
      }
      if (rectButton == true){
          rect(xpos, ypos, increaseRect.value()*vc4, increaseRect.value()*vc4)
      } 
      if (softSquareButton == true ){
          rect(xpos, ypos, increaseRect.value()*vc4, 
               increaseRect.value()*vc4,increaseRect.value()*vc4/6);
      } 
      if (ellipseButton == true){
          ellipse(xpos, ypos, increaseRect.value()*vc4, increaseRect.value()*vc4);
      }
      if (triangleButton == true){
          triangleArray[0] = new triangleNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
          triangleArray[0].display04();
      }
      if (stankowskiButton == true){
          stankowskiSpacer = 2;
          stankowskiArray[0] = new stankowskiNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
          stankowskiArray[0].display04();
      } else {
          stankowskiSpacer = 1;
      }
      if (dogtoothButton == true){
        dogtoothXSpacer = 2;
        dogtoothYSpacer = 2;
        dogtoothArray[0] = new dogtoothNature(xpos,ypos,increaseRect,vc2,vc3,vc4)
        dogtoothArray[0].display04();
      } else {
        dogtoothXSpacer = 1;
        dogtoothYSpacer = 1;
      }
    }
  } cap.updatePixels();
  
  filter(POSTERIZE, posterSlider.value());
  
//filter switches
  if (invert1){
    filter(INVERT);
  } if (threshold1){
    filter(THRESHOLD,0.5);
  } if (grid1){
    stroke(255,255,255,50)
   } else {
    noStroke();
  }
  
//reset shape to default
  if (rectButton == false && softSquareButton == false && ellipseButton == false && 
      triangleButton == false && stankowskiButton == false && dogtoothButton == false) {
    softSquareChange();
  } 
}

function invertNow(){ //filters
  invert1 = !invert1;
} 

function thresholdNow(){
  threshold1 = !threshold1;
}

function posterizeNow(){
  posterize1 = !posterize1
}

function gridNow(){ //matrix
  grid1 = !grid1
} 

function cameraNow(){ //camera toggle
  cameraToggle = !cameraToggle;
} 

function handleFile(file) { //file uploader
    print(file);
    if (file.type === 'image') {
      img = createImg(file.data, '')
      img.hide();
    } else {
      img = null;
    }
} 

function rectChange(){ //shape buttons
  rectButton = !rectButton;
  softSquareButton = false;
  ellipseButton = false;
  triangleButton = false;
  stankowskiButton = false;
  dogtoothButton = false;
  console.log('|rect:', rectButton, '| softSquare:', softSquareButton, '| ellipse:', 
              ellipseButton,'| triangle:', triangleButton, '|stankowski:', stankowskiButton, 
              '|dogtooth:', dogtoothButton);
} 

function softSquareChange(){
  softSquareButton = !softSquareButton;
  rectButton = false;
  ellipseButton = false;
  triangleButton = false;
  stankowskiButton = false;
  dogtoothButton = false;
  console.log('|rect:', rectButton, '| softSquare:', softSquareButton, '| ellipse:', 
              ellipseButton,'| triangle:', triangleButton, '|stankowski:', stankowskiButton, 
              '|dogtooth:', dogtoothButton);
}

function ellipseChange(){
  ellipseButton = !ellipseButton;
  rectButton = false;
  softSquareButton = false;
  triangleButton = false;
  stankowskiButton = false;
  dogtoothButton = false;
  console.log('|rect:', rectButton, '| softSquare:', softSquareButton, '| ellipse:', 
              ellipseButton,'| triangle:', triangleButton, '|stankowski:', stankowskiButton, 
              '|dogtooth:', dogtoothButton);
}

function triangleChange(){
  triangleButton = !triangleButton;
  rectButton = false;
  softSquareButton = false;
  ellipseButton = false;
  stankowskiButton = false;
  dogtoothButton = false;
  console.log('|rect:', rectButton, '| softSquare:', softSquareButton, '| ellipse:', 
              ellipseButton,'| triangle:', triangleButton, '|stankowski:', stankowskiButton, 
              '|dogtooth:', dogtoothButton);
}

function stankowskiChange(){
  stankowskiButton = !stankowskiButton;
  rectButton = false;
  softSquareButton = false;
  ellipseButton = false;
  triangleButton = false;
  dogtoothButton = false;
  console.log('|rect:', rectButton, '| softSquare:', softSquareButton, '| ellipse:', 
              ellipseButton,'| triangle:', triangleButton, '|stankowski:', stankowskiButton, 
              '|dogtooth:', dogtoothButton);
}

function dogtoothChange(){
  dogtoothButton = !dogtoothButton;
  rectButton = false;
  softSquareButton = false;
  ellipseButton = false;
  triangleButton = false;
  stankowskiButton = false;
  
  console.log('|rect:', rectButton, '| softSquare:', softSquareButton, '| ellipse:', 
              ellipseButton,'| triangle:', triangleButton, '|stankowski:', stankowskiButton, 
              '|dogtooth:', dogtoothButton);
}

class triangleNature { //complex shapes
  constructor(xpos,ypos,increaseRect,vc2,vc3,vc4) {
    this.x = xpos
    this.y = ypos
    this.tri = increaseRect.value()
    this.vc2 = vc2
    this.vc3 = vc3
    this.vc4 = vc4
  }
  display01(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri,this.y+this.tri)
      vertex(this.x,this.y+this.tri);  
    endShape();
  }
  display02(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*this.vc2,this.y+this.tri*this.vc2)
      vertex(this.x,this.y+this.tri*this.vc2);  
    endShape();
  }
  display03(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*this.vc3,this.y+this.tri*this.vc3)
      vertex(this.x,this.y+this.tri*this.vc3);  
    endShape();
  }
  display04(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*this.vc4,this.y+this.tri*this.vc4)
      vertex(this.x,this.y+this.tri*this.vc4);  
    endShape();
  }
}

class stankowskiNature {
  constructor(xpos,ypos,increaseRect,vc2,vc3,vc4) {
    this.x = xpos
    this.y = ypos
    this.tri = increaseRect.value()
    this.vc2 = vc2
    this.vc3 = vc3
    this.vc4 = vc4
  }
  display01(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri,this.y);
      vertex(this.x-this.tri,this.y+this.tri*2);
      vertex(this.x-this.tri*2,this.y+this.tri*2);
    endShape();
  }
  display02(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*this.vc2,this.y);
      vertex(this.x-this.tri*this.vc2,this.y+this.tri*this.vc2*2);
      vertex(this.x-this.tri*this.vc2*2,this.y+this.tri*this.vc2*2);
    endShape();
  }
  display03(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*this.vc3,this.y);
      vertex(this.x-this.tri*this.vc3,this.y+this.tri*this.vc3*2);
      vertex(this.x-this.tri*this.vc3*2,this.y+this.tri*this.vc3*2);
    endShape();
  }
  display04(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*this.vc4,this.y);
      vertex(this.x-this.tri*this.vc4,this.y+this.tri*this.vc4*2);
      vertex(this.x-this.tri*this.vc4*2,this.y+this.tri*this.vc4*2);
    endShape();
  }
}

class dogtoothNature {
  constructor(xpos,ypos,increaseRect,vc2,vc3,vc4) {
    this.x = xpos;
    this.y = ypos;
    this.tri = increaseRect.value()/2;
    this.vc2 = vc2;
    this.vc3 = vc3;
    this.vc4 = vc4;
  }
  display01(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri,this.y);
      vertex(this.x+this.tri*2,this.y-this.tri);
      vertex(this.x+this.tri*2,this.y);
      vertex(this.x+this.tri*3,this.y);
      vertex(this.x+this.tri*2,this.y+this.tri);
      vertex(this.x+this.tri*2,this.y+this.tri*2);
      vertex(this.x,this.y+this.tri*4);
      vertex(this.x,this.y+this.tri*3);
      vertex(this.x+this.tri,this.y+this.tri*2);
      vertex(this.x,this.y+this.tri*2);
      vertex(this.x,this.y+this.tri);
      vertex(this.x-this.tri,this.y+this.tri*2);
      vertex(this.x-this.tri*2,this.y+this.tri*2);
    endShape();
  }
  display02(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*vc2,this.y);
      vertex(this.x+this.tri*2*vc2,this.y-this.tri*vc2);
      vertex(this.x+this.tri*2*vc2,this.y);
      vertex(this.x+this.tri*3*vc2,this.y);
      vertex(this.x+this.tri*2*vc2,this.y+this.tri*vc2);
      vertex(this.x+this.tri*2*vc2,this.y+this.tri*2*vc2);
      vertex(this.x,this.y+this.tri*4*vc2);
      vertex(this.x,this.y+this.tri*3*vc2);
      vertex(this.x+this.tri*vc2,this.y+this.tri*2*vc2);
      vertex(this.x,this.y+this.tri*2*vc2);
      vertex(this.x,this.y+this.tri*vc2);
      vertex(this.x-this.tri*vc2,this.y+this.tri*2*vc2);
      vertex(this.x-this.tri*2*vc2,this.y+this.tri*2*vc2);
    endShape();
  }
  display03(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*vc3,this.y);
      vertex(this.x+this.tri*2*vc3,this.y-this.tri*vc3);
      vertex(this.x+this.tri*2*vc3,this.y);
      vertex(this.x+this.tri*3*vc3,this.y);
      vertex(this.x+this.tri*2*vc3,this.y+this.tri*vc3);
      vertex(this.x+this.tri*2*vc3,this.y+this.tri*2*vc3);
      vertex(this.x,this.y+this.tri*4*vc3);
      vertex(this.x,this.y+this.tri*3*vc3);
      vertex(this.x+this.tri*vc3,this.y+this.tri*2*vc3);
      vertex(this.x,this.y+this.tri*2*vc3);
      vertex(this.x,this.y+this.tri*vc3);
      vertex(this.x-this.tri*vc3,this.y+this.tri*2*vc3);
      vertex(this.x-this.tri*2*vc3,this.y+this.tri*2*vc3);
    endShape();
}
  display04(){
    beginShape();
      vertex(this.x,this.y); 
      vertex(this.x+this.tri*vc4,this.y);
      vertex(this.x+this.tri*2*vc4,this.y-this.tri*vc4);
      vertex(this.x+this.tri*2*vc4,this.y);
      vertex(this.x+this.tri*3*vc4,this.y);
      vertex(this.x+this.tri*2*vc4,this.y+this.tri*vc4);
      vertex(this.x+this.tri*2*vc4,this.y+this.tri*2*vc4);
      vertex(this.x,this.y+this.tri*4*vc4);
      vertex(this.x,this.y+this.tri*3*vc4);
      vertex(this.x+this.tri*vc4,this.y+this.tri*2*vc4);
      vertex(this.x,this.y+this.tri*2*vc4);
      vertex(this.x,this.y+this.tri*vc4);
      vertex(this.x-this.tri*vc4,this.y+this.tri*2*vc4);
      vertex(this.x-this.tri*2*vc4,this.y+this.tri*2*vc4);
    endShape();
  }
}

function saveFrame() { //download function  
  if (exportButton) {
    let c = get(0, 0, width, height);
    saveCanvas.image(c, 0, 0);
    save(saveCanvas, "Frame "+frameCount+".png");
  }
} 

// function fullscreen01() { //NOT QUITE WORKING YET
//   let fs = fullscreen();
//   fullscreen(!fs);
  
//   if (fullscreen()){
//     createCanvas(640,480);
//   } else {
//     createCanvas(displayWidth, cap.height*displayWidth/cap.width);
//   }
// } 