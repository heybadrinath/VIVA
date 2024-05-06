import { useEffect, useRef, useState } from "react";
import "./App.css";
import Cookies from "universal-cookie";

function App() {
  let [time, setTime] = useState(0);
  let timer = useRef(time);
  let interval;
  const cookies = new Cookies();
  function start() {
    if (!interval) {
      interval = setInterval(changeTime, 2000);
    }
  }

  function bgColor() {
    const letter = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letter[Math.floor(Math.random() * 16)];
    }
    const div = document.getElementsByClassName("main")[0];

    if (timer.current % 2 == 0 && timer.current != 0) {
      div.style.backgroundColor = color;
      console.log("color change");
    }
  }

  function pauseChange() {
    clearInterval(interval);
    console.log("clear", interval);
  }

  function clearTimer() {
    clearInterval(interval);
    cookies.remove("time");
    console.log("clear", interval);
  }
  function changeTime() {
    setTime(time++);
    timer.current = time;
    cookies.set("time", timer.current);
    document.getElementsByClassName("display")[0].innerHTML = time;
    console.log(time, timer, interval);
  }

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    bgColor();
  }, [time]);

  return (
    <>
      <div className="main">
        <h1 className="display">0</h1>
        <button onClick={() => pauseChange()}>pause</button>
        <button onClick={() => clearTimer()}>Stop</button>
      </div>
    </>
  );
}

export default App;
