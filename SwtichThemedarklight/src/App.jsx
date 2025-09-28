import Card from "./Card"
import useTheme from "./context/ThemeContext"
import ThemeBtn from "./ThemeBtn"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <ThemeProvider value={ { theme, toggleTheme }}>
        <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                  <ThemeBtn />
              </div>

              <div className="w-full max-w-sm mx-auto">
                  <Card />
              </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
