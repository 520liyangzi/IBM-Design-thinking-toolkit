import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Scenario from './Scenario'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

// test('console logs "Sticker" when Sticker is clicked', () => {
//   render(<Scenario />)
//   fireEvent.click(screen.getByText(/Sticker/i))
//   expect(console.log).toHaveBeenCalledWith('Sticker')
// })

// test('console logs "Pen" when Pen is clicked', () => {
//   render(<Scenario />)
//   fireEvent.click(screen.getByText(/Pen/i))
//   expect(console.log).toHaveBeenCalledWith('Pen')
// })

// test('console logs "Laser" when Laser is clicked', () => {
//   render(<Scenario />)
//   fireEvent.click(screen.getByText(/Laser/i))
//   expect(console.log).toHaveBeenCalledWith('Laser')
// })

// test('console logs "Picture" when Picture is clicked', () => {
//   render(<Scenario />)
//   fireEvent.click(screen.getByText(/Picture/i))
//   expect(console.log).toHaveBeenCalledWith('Picture')
// })

// test('console logs "Eraser" when Eraser is clicked', () => {
//   render(<Scenario />)
//   fireEvent.click(screen.getByText(/Eraser/i))
//   expect(console.log).toHaveBeenCalledWith('Eraser')
// })

// test('console logs "Move Picture" when Move Picture is clicked', () => {
//   render(<Scenario />)
//   fireEvent.click(screen.getByText(/Move Picture/i))
//   expect(console.log).toHaveBeenCalledWith('Move Picture')
// })

// test('console logs "Move Sticker" when Move Sticker is clicked', () => {
//   render(<Scenario />)
//   fireEvent.click(screen.getByText(/Move Sticker/i))
//   expect(console.log).toHaveBeenCalledWith('Move Sticker')
// })
