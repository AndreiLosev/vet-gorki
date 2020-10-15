import React from 'react'

export const useShowNicely = (visible: boolean, duration: number) => {
  const [inside, setInside] = React.useState(visible)
  const [outside, setOutside] = React.useState(visible)
  React.useEffect(() => {
    if (visible) {
      setInside(true)
      setTimeout(() => setOutside(true), 100)
    } else {
      setOutside(false)
      setTimeout(() => setInside(false), duration)
    }
  }, [visible, duration])

  return [inside, outside]
}