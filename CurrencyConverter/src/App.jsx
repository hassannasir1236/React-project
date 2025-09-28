import { useCallback, useEffect, useState } from 'react'
import './App.css'
import InputBox from './InputBox'
import useCurrencyInfo from "./hooks/useCurrencyinfo";


function App() {
  const [FromAmount, onFromAmount] = useState(1)
  const [ToAmount, onToAmount] = useState(null)
  const [fromAmountUnit, setFromAmountUnit] = useState('USD')
  const [toAmountUnit, setToAmountUnit] = useState('PKR')
  const [selectedOptoin, setselectedOptoin] = useState("")

  const currencyInfo = useCurrencyInfo(fromAmountUnit)
  const options = Object.keys(currencyInfo)

  const ConvertAmountManualy = () => {
    const rate = currencyInfo[toAmountUnit];
    const result = FromAmount * rate;
    onToAmount(result)
    return result
  };
  
  const SwapUnit = () => {
    setFromAmountUnit(toAmountUnit)
    setToAmountUnit(fromAmountUnit)
    onFromAmount(ToAmount)
  }
 
  useEffect( () => {
    if(currencyInfo && toAmountUnit){
      ConvertAmountManualy();
    }
  }, [FromAmount, fromAmountUnit, toAmountUnit, ConvertAmountManualy])

  return (
    <>
      <div
        className="w-screen h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg')`,
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-y-2 px-4">
          {/* First InputBox */}
          
          <div className="text-white w-full max-w-2xl">
            <InputBox 
              label="From"
              amount={FromAmount}
              currencyOptions={options}
              onChangeAmount={onFromAmount}
              selectedOptoin = {fromAmountUnit}
              onChangeCurrencyOption = {setFromAmountUnit}

            />
          </div>

          {/* Switch Button */}
          <button
            type="button"
            className="px-6 py-3.5 text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            onClick={SwapUnit}
          >
            Switch
          </button>

          {/* Second InputBox */}
          <div className="text-white w-full max-w-2xl">
            <InputBox 
              label="To"
              amount={ToAmount}
              currencyOptions={options}
              selectedOptoin = {toAmountUnit}
              AmountDisabled = {true}
              onChangeAmount={onToAmount}
              onChangeCurrencyOption = {setToAmountUnit}
              
            />
          </div>
        </div>
      </div>



    </>
  )
}

export default App
