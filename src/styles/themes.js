const themes = {
   "light": {
      name: 'light',
      fg: '#333',
      bg: '#85a0bb',
      app_bg: '#fefefe',
      gray: '#adadad',
      buttons: {
         base: {
            color: '#4a4242',
            bgColor: 'transparent',
            bgColorHover: '#d7d7e733',
            bgColorFocus: '#d7d7e733',
            borderColor: '#a1a2b1',
            borderColorHover: '#898ca3',
            borderColorFocus: '#898ca3',
         },
         danger: {
            color: 'white',
            bgColor: '#c75757',
            bgColorHover: '#c75757',
            bgColorFocus: '#c75757',
            borderColor: 'transparent',
            borderColorHover: 'transparent',
            borderColorFocus: 'transparent',
         },
         success: {
            color: 'white',
            bgColor: '#6cb366',
            bgColorHover: '#97d192',
            bgColorFocus: '#97d192',
            borderColor: 'transparent',
            borderColorHover: 'transparent',
            borderColorFocus: 'transparent',
         },
      }
   },
   "dark": {
      name: 'dark',
      fg: '#fff', // Used for foreground white text
      bg: '#333', // Used for background black
      app_bg: '#434343',
      gray: '#adadad',
      buttons: {
         base: {
            color: 'white',
            bgColor: 'transparent',
            bgColorHover: '#d7d7e733',
            bgColorFocus: '#d7d7e733',
            borderColor: '#a1a2b1',
            borderColorHover: '#898ca3',
            borderColorFocus: '#898ca3',
         },
         danger: {
            color: 'white',
            bgColor: '#c75757',
            bgColorHover: '#c75757',
            bgColorFocus: '#c75757',
            borderColor: 'transparent',
            borderColorHover: 'transparent',
            borderColorFocus: 'transparent',
         },
         success: {
            color: 'white',
            //bgColor: '#97d192',
            bgColor: '#6cb366',
            bgColorHover: '#97d192',
            bgColorFocus: '#97d192',
            borderColor: 'transparent',
            borderColorHover: 'transparent',
            borderColorFocus: 'transparent',
         },
      }
   }
}

export default themes