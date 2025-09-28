import { useState } from 'react'

import './App.css'
function App() {
 
// const [buttonColor, setButtonColor] = useState(Array(4).fill(""));
const [bgcolor, setBgcolor] = useState("bg-blue-400");
const [updatebgcolor, setUpdatebgcolor] = useState("");
// Function to generate random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let c = "#";
  for (let i = 0; i < 6; i++) {
    c += letters[Math.floor(Math.random() * 16)];
  }
  return c;
};
const [buttonColor, setButtonColor] = useState(
  Array(4).fill(null).map(() => getRandomColor())
);
const handleClick = (index) => {
  setUpdatebgcolor(buttonColor[index]);
  const newColors = [...buttonColor];
  newColors[index] = getRandomColor();
  setButtonColor(newColors);
};

  return (
    <>
      <div className={`w-screen h-screen flex items-center justify-center ${bgcolor}`} style={{backgroundColor: updatebgcolor}}>
        <div className="flex flex-row gap-4">
        {buttonColor.map((color, index) => (
          <button key={index}  onClick={() => handleClick(index)} className={`text-black p-3 rounded-md shadow-md`} style={{backgroundColor: color}}>
                {color}
          </button>
          ))}
      </div>
    </div>
    </>
  )
}

export default App
