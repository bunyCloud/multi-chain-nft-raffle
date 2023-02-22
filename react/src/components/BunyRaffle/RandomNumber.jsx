import { useState } from "react";

function RandomNumber() {
  const [num, setNum] = useState(0);

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleClick = () => {
    setNum(randomNumberInRange(1, 12));
  };

  return (
    <div>
      <h2>number is: {num}</h2>
      <button onClick={handleClick}>Generate random number</button>
    </div>
  );
}

export default RandomNumber;
