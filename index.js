let ended = 0;
let alreadySet = 0;
let windowloaded = 0;

/* Time stuff */
const fmtS = (s) => {
  let   hours = Math.floor(s / 3600)
  let       m = Math.floor((s % 3600) / 60)
  let    sex2 = s % 60

  if(hours<10) hours  = `0${hours}`;
  if(m<10)     m      = `0${m}`;
  if(sex2<10)  sex2   = `0${sex2}`;
  return `${hours}:${m}:${sex2}`
}

/* Cookie stuff */
const setCookie = (name, value, expiredate) => {
  const d = new Date();
  d.setTime(d.getTime() + (expiredate*24*60*60*1000));
  let expires = `expires=${d.toUTCString}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/* Fast stuff */
const startfast = () => {
  // Create a cookie with the starting fast name
  ended = 0;
  setCookie("fasting", Date.now(), 4000); // Expires in 4,000 days lol
  setCookie("endedfast", "0", 4000);
}

const endfast = () => {
  ended = 1;
  windowloaded = 0;
  setCookie("endedfast", "1", 4000);
}

window.onload = () => {
  windowloaded = 1;
  setInterval(() => {
    let z = document.getElementById("fast-length");
    let m = document.getElementById("running");
    if(z.innerHTML == NaN) ended = 1;

    let funnymath = Math.floor((Date.now() - parseInt(getCookie("fasting"), 10))/1000);
    if(getCookie("endedfast") == 0){
      alreadySet = 0;
      setCookie("endedfast", "0", 4000);
      z.innerHTML = fmtS(funnymath);
      m.innerHTML = "seconds fasted";
    } else {
      setCookie("endedfast", "1", 4000);
      if(alreadySet == 0 && windowloaded != 1){
        if(isNaN(parseInt(getCookie("totaldata")))){
          // Set it to zero
          setCookie("totaldata", 0, 4000);
        }

        console.log("ok2");

        // Calculate difference.
        let newmath = parseInt(getCookie("totaldata")) + funnymath;
        setCookie("totaldata", newmath, 4000);
        alreadySet = 1;
      }

      z.innerHTML = "";
      m.innerHTML = "No fast running";
    }

    // Show totaldata
    let z1 = document.getElementById("totallength");
    z1.innerHTML = `Total time spent fasting: ${fmtS(getCookie("totaldata"))}`;

  }, 1000);
}

const reset = () => {
  setCookie("totaldata", 0, 4000);
  alert("Everything has been reset:)");
}
