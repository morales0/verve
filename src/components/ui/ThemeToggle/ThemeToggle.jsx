import { useTheme } from "styled-components"
import { ThemeToggleWrapper } from "./styles"

const ThemeToggle = ({ setCurrTheme }) => {
   const theme = useTheme()

   return (
      <ThemeToggleWrapper htmlFor="themeToggle">
         {theme.name}
         <input
            type="checkbox"
            id="themeToggle" 
            onChange={(e) => setCurrTheme(e.target.checked ? 'dark' : 'light')}
         />
         <span />
      </ThemeToggleWrapper>
   )
}

export default ThemeToggle