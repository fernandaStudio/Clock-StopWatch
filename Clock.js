const display = (id, msg) => {
  document.querySelector(id).innerHTML = msg;
};
const event = (id, type, f) => {
  document.querySelector(id).addEventListener(type, f);
};

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
const quote = () => {
  const wkDays = [
    { id: 0, text: "Fabulous!" },
    { id: 1, text: "Wonderful!" },
    { id: 2, text: "Beautiful!" },
    { id: 3, text: "Special!" },
    { id: 4, text: "Spectacular!" },
    { id: 5, text: "Magical!" },
    { id: 6, text: "Exciting!" },
    { id: 7, text: "Rejuvinating!" }
  ];

  let date = new Date();
  let day = date.getDay();

  const todayIs = wkDays
    .filter(wkDay => wkDay.id === day)
    .map(wkDay => display(".quote", wkDay.text));
};
const clock = () => {
  let date = new Date();
  let day = date.getDate();
  let year = date.getFullYear();
  let options = { month: "long" };
  let formatMonth = mth => {
    return new Intl.DateTimeFormat("en-US", options).format(mth);
  };

  let currentTime = display(".time", date.toLocaleTimeString());
  let currentDate = display(".date", formatMonth(date) + ` ${day}, ${year}`);
  let currentDay = display(".day", date.toString().split(" ")[0]);
};

greeting();
quote();
setInterval(clock, 1000);
