import React from 'react'

const contextInit = {
  login: true,
  clients: false,
  petCart: false,
  print: false,
  goTo: (page: 'login' | 'clients' | 'petCart' | 'print') => {}
}

export const NavigatorContext = React.createContext(contextInit)

type Props = {
  child: JSX.Element
}

export const ContexProvider: React.FC<Props> = ({child}) => {
  const [navigator, setNavigator] = React.useState({
    login: true,
    clients: false,
    petCart: false,
    print: false,
  })
  type TPage = keyof typeof navigator
  const goTo = (page: TPage) => {
    const newNavigator = Object.keys(navigator).reduce((acc, item) => {
      if (item === page) return {...acc, [item]: true}
      else return {...acc, [item]: false}
    }, {} as typeof navigator)
    setNavigator(newNavigator)
  }
  return <NavigatorContext.Provider value={{...navigator, goTo}}>
      {child}
    </NavigatorContext.Provider>
}