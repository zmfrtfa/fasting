let ended = 0;
let alreadySet = 0;

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
}

const endfast = () => {
  ended = 1;
}

window.onload = () => {
  setInterval(() => {
    let z = document.getElementById("fast-length");
    let m = document.getElementById("running");
    if(z.innerHTML == NaN) ended = 1;

    let funnymath = Math.floor((Date.now() - parseInt(getCookie("fasting"), 10))/1000);
    if(ended != 1){
      alreadySet = 0;
      z.innerHTML = funnymath;
      m.innerHTML = "seconds fasted";
    } else {
      if(alreadySet == 0){
        if(isNaN(parseInt(getCookie("totaldata")))){
          // Set it to zero
          setCookie("totaldata", 0, 4000);
        }
        console.log(getCookie("totaldata"));

        // Calculate difference.
        let newmath = parseInt(getCookie("totaldata")) + funnymath;
        setCookie("totaldata", newmath, 4000);
        alreadySet = 1;
      }
      z.innerHTML = "";
      m.innerHTML = "No fast running";
      console.log("Hi");
    }


    // Show totaldata
    let z1 = document.getElementById("totallength");
    z1.innerHTML = `Total time spent fasting: ${getCookie("totaldata")}`;

  }, 1000);
}