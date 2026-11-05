(() => {
 const viewer = document.querySelector('#robot-model');
 const load = document.querySelector('#load-robot');
 const reset = document.querySelector('#reset-robot');
 const status = document.querySelector('#robot-status');
 load.addEventListener('click', async () => {
  load.disabled = true;
  status.textContent = 'Loading 3D model. This may take a moment.';
  try {
   if (!customElements.get('model-viewer')) await import('https://ajax.googleapis.com/ajax/libs/model-viewer/4.4.0/model-viewer.min.js');
   viewer.src = viewer.closest('.robot-viewer').querySelector('a[download]').href;
  } catch (error) { fail(); }
 });
 function fail() {
  status.textContent = 'The 3D model could not load. Please try again, or download the model below.';
  load.disabled = false;
  load.textContent = 'Retry loading';
 }
 viewer.addEventListener('error', fail);
 viewer.addEventListener('progress', event => {
  status.textContent = `Loading 3D model: ${Math.round(event.detail.totalProgress * 100)}%`;
 });
 viewer.addEventListener('load', () => {
  load.hidden = true;
  reset.disabled = false;
  status.textContent = 'Model ready. Drag to rotate, scroll or pinch to zoom. Use arrow keys when the viewer is focused.';
 });
 reset.addEventListener('click', () => {
  viewer.cameraOrbit = '0deg 75deg 105%';
  viewer.cameraTarget = 'auto auto auto';
  viewer.fieldOfView = 'auto';
 });
})();
