const display = (id, msg) => {
  document.querySelector(id).innerHTML = msg;
};
const event = (id, type, f) => {
  document.querySelector(id).addEventListener(type, f);
};
const createNode = (node) => {
  return document.createElement(node);
}
const appendNode = (id, node) => {
  document.querySelector(id).appendChild(node);
}
const tagNode = (id, tag) => {
    return document.querySelector(id).getElementsByTagName(tag);
}

const greeting = () => {
  let date = new Date();
  let hours = date.getHours();

  const greaterEqual = (h, n) => h >= n;
  const lessThan = (h, n) => h < n;
  const greeting = (x, y) => greaterEqual(hours, x) && lessThan(hours, y);

  greeting(5, 12)
    ? display(".greet", "Morning")
    : greeting(12, 17)
      ? display(".greet", "Afternoon")
      : greeting(17, 23)
        ? display(".greet", "Evening")
        : display(".greet", "Night");
};
const clock = () => {
  const days = [
    { id: 0, text: "Sunday" },
    { id: 1, text: "Monday" },
    { id: 2, text: "Tuesday" },
    { id: 3, text: "Wednesday" },
    { id: 4, text: "Thursday" },
    { id: 5, text: "Friday" },
    { id: 6, text: "Saturday" }
  ];

  let date = new Date();
  let timeString = date.toLocaleTimeString();
  let strLen = timeString.length;
  let timeLen = timeString.split(" ")[0].length;

  let day = date.getDate();
  let dayNum = date.getDay();
  let year = date.getFullYear();
  let options = { month: "long" };
  let formatMonth = mth => {
    return new Intl.DateTimeFormat("en-US", options).format(mth);
  };

  let currentTime = display(".num", timeString.substring(0, strLen - 5));
  let currentSec = display(".sec", timeString.split(" ")[0].substring(8, timeLen-2));
  let currentAbrv = display(".abrv", timeString.split(" ")[1]);
  let currentDate = display(".date", formatMonth(date) + ` ${day}, ${year}`);
  let currentDay = days
    .filter(dayId => dayId.id === dayNum)
    .map(dayId => display(".day", dayId.text));
};
const quote = () => {
  const wkDays = [
    { id: 0, text: "Fabulous!" },
    { id: 1, text: "Wonderful!" },
    { id: 2, text: "Beautiful!" },
    { id: 3, text: "Special!" },
    { id: 4, text: "Spectacular!" },
    { id: 5, text: "Exciting!" },
    { id: 6, text: "Magical!" }
  ];
  const quotes = [
    { id: 0, text: "“Happiness is not a goal... it's a by-product of a life well lived.”" },
    { id: 1, text: "“Yesterday is gone. Tomorrow has not yet come. We have only today. Let us begin.”" },
    { id: 2, text: "“We are shaped by our thoughts; we become what we think. When the mind is pure, joy follows like a shadow that never leaves.”" },
    { id: 3, text: "“Look at situations from all angles, and you will become more open.”" },
    { id: 4, text: "“When it hurts, observe. Life is trying to teach you something.”" },
    { id: 5, text: "“Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you.”" },
    { id: 6, text: "“You never know which of life's great surprises are right around the corner”" }
  ];
  const quoter = [
    { id: 0, text: " — Eleanor Roosevelt" },
    { id: 1, text: " — Mother Teresa" },
    { id: 2, text: " — Buddha" },
    { id: 3, text: " — Dalai Lama" },
    { id: 4, text: " — Buddha" },
    { id: 5, text: " — Mary Lou Retton" },
    { id: 6, text: " — Fernanda Cox" }
  ];
  const ui = [
    { day: 0, color: "burg", letter: "s" },
    { day: 1, color: "drkred", letter: "m" },
    { day: 2, color: "rouge", letter: "t" },
    { day: 3, color: "rose", letter: "w" },
    { day: 4, color: "char", letter: "t" },
    { day: 5, color: "grey", letter: "f" },
    { day: 6, color: "lgrey", letter: "s" }
  ];

  let date = new Date();
  let day = date.getDay();

  const filterId = (val) => item => item.id === val;
  const mapItem = (id) => item => display(id, item.text);

  const insertTodayIs = wkDays
    .filter(filterId(day))
    .map(mapItem(".dayQuote"));

  const insertQuotes = quotes
    .filter(filterId(day))
    .map(mapItem(".quote"));

  const insertQuoter = quoter
    .filter(filterId(day))
    .map(mapItem(".quoter"));

  ui.map(days => {
      let circElem = createNode("li");
      let letter = circElem.innerText = `${days.letter}`;
      circElem.classList.add("circ",`${days.color}`,`${days.letter}`);
      appendNode(".circs", circElem);
      event(`.${days.color}`, "click", () => {
        const anim = () => {
          document.querySelector(".quote").classList.add("fadeIn");
          document.querySelector(".quoter").classList.add("fadeIn");
          const removeClass = () => {
            document.querySelector(".quote").classList.remove("fadeIn");
            document.querySelector(".quoter").classList.remove("fadeIn");
          }
          setTimeout(removeClass, 1000);
      }
        quotes.filter(filterId(days.day)).map(mapItem(".quote"));
        quoter.filter(filterId(days.day)).map(mapItem(".quoter"));
        anim();
      })
    });
};

greeting();
quote();
setInterval(clock, 1000);

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

	return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + '.' + pad(ms, 2);
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
const laps = () => {
  let tag = tagNode('.displayLaps', "li");
  let lap = createNode('li');
  lap.innerText = formatTime(w.time());
  if(tag.length < 7) appendNode('.displayLaps', lap);
}
const clear = () => {
  display('.displayLaps', "");
}

let starter = event(".start", "click", start);
let stopper = event(".stop", "click", stop);
let resetter = event(".reset", "click", reset);
let lapper = event(".lap", "click", laps);
let clearAll = event(".clear", "click", clear);

const lapUI = () => {
  const lapNumber = [
    { id: 0, text: "Lap 1:" },
    { id: 1, text: "Lap 2:" },
    { id: 2, text: "Lap 3:" },
    { id: 3, text: "Lap 4:" },
    { id: 4, text: "Lap 5:" },
    { id: 5, text: "Lap 6:" },
    { id: 6, text: "Lap 7:" }
  ];
    let lapNumbers = lapNumber.map(lap => {
    let lapNum = createNode("li");
    lapNum.innerText = `${lap.text}`;
    appendNode(".lapNumber", lapNum);
  });
}

update();
lapUI();
