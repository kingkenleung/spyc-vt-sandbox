
//https://pchen66.github.io/panolens.js/docs/

var panorama,
    panorama2,
    panorama3,
		panorama4,
		panorama5,
		panorama6,
		panorama7,
		panorama8,
    viewer,
    container,
    infospot,
    progress,
    progressElement;

//Progress Bar
progressElement = document.getElementById("progress");
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


var lookAtPositions = [
    new THREE.Vector3(4871.39, 1088.07, -118.41),
    new THREE.Vector3(4871.39, 1088.07, -118.41),
    new THREE.Vector3(4871.39, 1088.07, -118.41)
];

var infospotPositions = [
    new THREE.Vector3(2500, -300, -100),
    new THREE.Vector3(-2500, -300, -100),
];

container = document.querySelector('#container');

//scene 1
panorama = new PANOLENS.ImagePanorama('scenes/playground1.JPG');
panorama.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(lookAtPositions[0], 0);
});
panorama.addEventListener('progress', onProgress);
panorama.addEventListener('enter', onEnter);

//scene 2
panorama2 = new PANOLENS.ImagePanorama('scenes/playground2.JPG');
panorama2.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(lookAtPositions[1], 0);
});
panorama2.addEventListener('progress', onProgress);
panorama2.addEventListener('enter', onEnter);

//scene 3
panorama3 = new PANOLENS.ImagePanorama('scenes/playground3.JPG');
panorama3.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(lookAtPositions[2], 0);
});
panorama3.addEventListener('progress', onProgress);
panorama3.addEventListener('enter', onEnter);

//scene 4
panorama4 = new PANOLENS.ImagePanorama('scenes/playground4.JPG');
panorama4.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(lookAtPositions[2], 0);
});
panorama4.addEventListener('progress', onProgress);
panorama4.addEventListener('enter', onEnter);

//scene 5
panorama5 = new PANOLENS.ImagePanorama('scenes/playground5.JPG');
panorama5.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(lookAtPositions[2], 0);
});
panorama5.addEventListener('progress', onProgress);
panorama5.addEventListener('enter', onEnter);

//scene 6
panorama6 = new PANOLENS.ImagePanorama('scenes/playground6.JPG');
panorama6.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(lookAtPositions[2], 0);
});
panorama6.addEventListener('progress', onProgress);
panorama6.addEventListener('enter', onEnter);

//scene 7
panorama7 = new PANOLENS.ImagePanorama('scenes/playground7.JPG');
panorama5.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(lookAtPositions[2], 0);
});
panorama7.addEventListener('progress', onProgress);
panorama7.addEventListener('enter', onEnter);

//scene 8
panorama8 = new PANOLENS.ImagePanorama('scenes/playground8.JPG');
panorama8.addEventListener('enter-fade-start', function () {
    viewer.tweenControlCenter(lookAtPositions[2], 0);
});
panorama8.addEventListener('progress', onProgress);
panorama8.addEventListener('enter', onEnter);

//Linkage from scene to scene
//0: go forth
//1: go back
panorama.link(panorama2, infospotPositions[0]);
panorama2.link(panorama, infospotPositions[1]);

panorama2.link(panorama3, infospotPositions[0]);
panorama3.link(panorama2, infospotPositions[1]);

panorama3.link(panorama4, infospotPositions[0]);
panorama4.link(panorama3, infospotPositions[1]);

panorama4.link(panorama5, infospotPositions[0]);
panorama5.link(panorama4, infospotPositions[1]);

panorama5.link(panorama6, infospotPositions[0]);
panorama6.link(panorama5, infospotPositions[1]);

panorama6.link(panorama7, infospotPositions[0]);
panorama7.link(panorama6, infospotPositions[1]);

panorama7.link(panorama8, infospotPositions[0]);
panorama8.link(panorama7, infospotPositions[1]);

//Infospots Setting
infospot = new PANOLENS.Infospot(700, PANOLENS.DataImage.Info);
infospot.position.set(0, 500, -5000);
infospot.addHoverText("Shatin Pui Ying College");
infospot.addEventListener('click', function () {
    window.open("https://www2.pyc.edu.hk/index.php");
});

panorama.add(infospot);






viewer = new PANOLENS.Viewer({ output: 'console', container: container });
viewer.add(
	panorama, 
	panorama2, 
	panorama3, 
	panorama4, 
	panorama5,
	panorama6,
	panorama7, 
	panorama8
);

