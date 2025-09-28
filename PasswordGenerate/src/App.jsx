import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [password, setPassword] = useState('')
  const [Length, setLength] = useState(8)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSpecialchar, setIncludeSpecialchar] = useState(false)
  const passwordRef = useRef(null)
  let randomGeneratepassword = useCallback(() => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let str = ''
    if (includeNumbers) {
      characters += "0123456789"
    }
    if (includeSpecialchar) {
      characters += "!@#$%^&*()"
    }
    for(let i = 0; i < Length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length + 1)
      str += characters.charAt(randomIndex)
     
    }
     setPassword(str)
  }, [Length, includeSpecialchar, includeNumbers, setPassword]);

  let copytoclipboard = useCallback(() => {
    const input = passwordRef.current;
    if (!input) return;

    // Focus and select the input text
    input.focus();
    input.select();
    input.setSelectionRange(0, input.value.length); // For mobile

    try {
      const successful = document.execCommand('copy'); // Fallback for clipboard
      if (!successful) throw new Error('Copy failed');
      passwordRef.current?.select();
      passwordRef.current.setSelectionRange(0, 99)
    } catch (err) {
      // Fallback: use navigator.clipboard
      navigator.clipboard.writeText(input.value)
        .then(() => alert('Password copied!'))
        .catch(() => alert('Copy failed.'));
    }
  }, [password])


  useEffect(() => {
    randomGeneratepassword()
  }, [randomGeneratepassword, Length, includeSpecialchar, includeNumbers]);


  return (
    <>
     <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
        <div className="w-max p-5 bg-slate-700 text-white rounded shadow-md">
          <h1 className="text-2xl font-bold text-center">Password Generator</h1>
          
          <div className="mt-4 flex items-center gap-2">
            <input
              ref={passwordRef}
              type="text"
              className="w-full border border-gray-300 p-2 rounded text-white"
              placeholder=""
              value={password}
              readOnly
            />
            <button onClick={copytoclipboard} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200">
              Copy
            </button>
          </div>
         <div className="mt-4">
            <div className="flex items-center gap-3 mb-2">
              <input
                type="range"
                min="8"
                max="100"
                value={Length}
                className="w-full cursor-pointer accent-blue-500"
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <span className="text-sm text-gray-300 whitespace-nowrap">Length: {Length}</span>
            </div>

            <div className="flex items-center gap-6 mt-4">
              {/* Letters Checkbox */}
              <label className="flex items-center gap-2 text-sm text-gray-200">
                <input type="checkbox" className="w-4 h-4 accent-blue-500" onChange= {() => {
                  setIncludeNumbers((prev) => !prev)
                }}/>
                Number {String(includeNumbers)}
              </label>

              {/* Characters Checkbox */}
              <label className="flex items-center gap-2 text-sm text-gray-200">
                <input type="checkbox" className="w-4 h-4 accent-blue-500" onChange= {() => {
                  setIncludeSpecialchar((prev) => !prev)
                }}/>
                Characters {String(includeSpecialchar)}
              </label>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
