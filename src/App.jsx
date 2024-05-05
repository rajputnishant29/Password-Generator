import React, { useState,useCallback ,useEffect,useRef} from 'react'

function App() {
  const [length , setlength] = useState(8)
  const [number , setnumber] = useState(false)
  const [char , setchar] = useState(false)
  const [password , setpassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGen = useCallback(() =>{
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) string += "0123456789"
    if(char) string += "!@#$%^&*_+"

    for (let i = 1; i < length; i++){
      let char = Math.floor(Math.random()*string.length + 1)


      pass += string.charAt(char)
1     
    }
    setpassword(pass)


  }, [length,number,char,setpassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGen()
  },[length,number,char, passwordGen])



  return (
    <div>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>Password Generator
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard}>
            copy
          </button>
        </div>

        <div className='flex test-sm gap-x-2'>
          <div className='flex items-center gap-x-1'></div>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{
              setlength(e.target.value)
            }}

            />
            <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1 '>
          <input 
          type="checkbox"
          checked={number}
          id="numberInput"
          on onChange={() => {
            setnumber((prev) => !prev)
          }} 
          />
          <label htmlFor="number">Number</label>

          <input 
          type="checkbox"
          checked={char}
          id="charInput"
          on onChange={() => {
            setchar((prev) => !prev)
          }} 
          />
          <label htmlFor="char">Characters</label>
          <input 
          type="checkbox"
          defaultChecked={number}
          id="charInput"
          on onChange={() => {
            setnumber((prev) => !prev)
          }} 
          />

        </div>
      </div>
    </div>
  )
}

export default App