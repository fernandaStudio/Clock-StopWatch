const	stopWatch = function() {
  let	startAt	= 0;	// Time of last start / resume. (0 if not running)
  let lapTime	= 0;	// Time on the clock when last stopped in milliseconds
  let	now	= () => new Date().getTime(); 

  this.start = () => startAt = startAt ? startAt : now();
  this.stop = () => {
    lapTime = startAt ? lapTime + now() - startAt : lapTime;
    startAt = 0;
  } 
  this.reset = () => lapTime = startAt = 0; 
  this.time = () => lapTime + (startAt ? now() - startAt : 0); 
};
const w = new stopWatch();

let interval;

const formatTime = (time) => {
  const pad = (num, size) => {
    let zero = "0000" + num;
    return zero.substr(zero.length - size);
  }
	let h = m = s = ms = 0;

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;

	return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
}
const update = () => {
	return display('.counter', formatTime(w.time()));
}
const start = () => {
	interval = setInterval("update()", 1);
  w.start();
}
const stop = () => {
	w.stop();
	clearInterval(interval);
}
const reset = () => {
	stop();
	w.reset();
	update();
}

let starter = event(".start", "click", start);
let stopper = event(".stop", "click", stop);
let resetter = event(".reset", "click", reset);

update();
