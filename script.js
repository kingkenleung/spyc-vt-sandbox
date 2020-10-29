
//Panolens.js GitHub: https://pchen66.github.io/panolens.js/docs/
//3D Vector Visualiser: https://www.mikemunkyulee.com/three-vv/
//

// Step 1: Define Scenes
/**
 * Object structure:
 * path { String } The path to the image of the scene
 * initialLookAtPosition { THREE.Vector3 }
 * infospot { Object } Settings for infospot
 *  position { Array } 3D coordinates of the infospot
 *  hoverText { String } Text to show when the infospot is hovered
 *  link { String } The link the infospot will link to
 *  icon { String } The source of the icon of the infospot
 * sceneLinkage { Array }
 * 	id { int }
 * 	direction { Object } 3D coordinates of the arrow (equivalent to infospot)
 */

/* 

Three.Vector3(x,y,z)

	Forward is positive
					^
					|
					|
x: along axis of lens
					|
					|
					v
 Backward is negative

y: vertical axis

Left is positive <--- z: perpendicular to axis of lens ---> Right is negative

12 o'clock: (1500,0,0)
9 o'clock: (0,0,1500)
6 o'clock: (-1500,0,0)
3 o'clock: (0,0,-1500)
*/

const scenes = [
  {
    path: 'new_scenes/lt_stair_2.JPG',
    
    initialLookAtPosition: new THREE.Vector3(1500, 0, 0),
    infospot: {
      position: [300, 400, 500],
      hoverText: 'Shatin Pui Ying College',
      link: 'https://www2.pyc.edu.hk/index.php',
      icon: PANOLENS.DataImage.Info
    },
		sceneLinkage: [
			{id: 1, direction: new THREE.Vector3(0,0,-1500)},
		]
  },

	{
    path: 'new_scenes/lt_stair_1.JPG',
    initialLookAtPosition: new THREE.Vector3(-5, 0, 0),
    infospot: {
      position: [300, 400, 500],
      hoverText: 'Shatin Pui Ying College',
      link: 'https://www2.pyc.edu.hk/index.php',
      icon: PANOLENS.DataImage.Info
    } ,
		sceneLinkage: [
			{id: 0, direction: new THREE.Vector3(-1000, -300, -100)},
			{id: 0, direction: new THREE.Vector3(1000, -300, -100)},
		]
  }
  // Other scenes goes here
]

const progressElement = document.getElementById("progress");
const container = document.getElementById('container');
const viewer = new PANOLENS.Viewer({ output: 'console',container });

// Progress Bar Starts
function onEnter(event) {
  progressElement.style.width = 0;
  progressElement.classList.remove('finish');
}
function onProgress(event) {
  progress = event.progress.loaded / event.progress.total * 100;
  progressElement.style.width = progress + '%';
  if (progress === 100) {
      progressElement.classList.add('finish');
  }
}
// Progress Bar Ends

/**
 * Function to set settings of a panorama
 */
function setPanorama(path, initialLookAt) {
  console.log('Setting panorama');
  let panorama = new PANOLENS.ImagePanorama(path);
  panorama.addEventListener('enter-fade-start', () => {
		viewer.tweenControlCenter(initialLookAt, 1);
	});
  panorama.addEventListener('progress', onProgress);
	panorama.addEventListener('enter', onEnter);
	console.log('DONE!')
  return panorama;
}
/**
 * Function to set settings of a infospot
 */
function setInfospot(position, hoverText, link, icon) {
  console.log('Setting infospot');
  let infospot = new PANOLENS.Infospot(100, icon);
  infospot.position.set(position[0], position[1], position[2]);
  infospot.addHoverText(hoverText);
  infospot.addEventListener('click', () => {
    window.open(link);
  });
  console.log('DONE!')
  return infospot;
}

const panorama = []

for (let i = 0; i < scenes.length; i++) {
  let { path, initialLookAtPosition, infospot: infospotSettings } = scenes[i];
  //let panorama = setPanorama(path, initialLookAtPosition);
	panorama.push(setPanorama(path, initialLookAtPosition));
  let infospot = setInfospot(infospotSettings.position, infospotSettings.hoverText, infospotSettings.link, infospotSettings.icon);

  panorama[i].add(infospot);
  viewer.add(panorama[i]);
} 


for (let i = 0; i < scenes.length; i++) {
	for (let j = 0; j < scenes[i].sceneLinkage.length; j++) {
			panorama[i].link(panorama[scenes[i].sceneLinkage[j].id], scenes[i].sceneLinkage[j].direction)
	}
}



