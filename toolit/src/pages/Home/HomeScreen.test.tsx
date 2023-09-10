import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HomeScreen from './HomeScreen'
import { useNavigate } from 'react-router-dom'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }
const mockNavigate = jest.fn()
// beforeEach(() => {
//   ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
// })
// test('renders title', () => {
//   render(<HomeScreen />)
//   const titleElement = screen.getByText(/IBM Design Thinking Toolkit/i)
//   expect(titleElement).toBeInTheDocument()
// })
// test('navigates to /empathymap', () => {
//   render(<HomeScreen />)
//   const empathyMapBlock = screen.getByText(/Empathy Map/i)
//   fireEvent.click(empathyMapBlock)
//   expect(mockNavigate).toHaveBeenCalledWith('/empathymap')
// })
// test('navigates to /scenariomap', () => {
//   render(<HomeScreen />)
//   const empathyMapBlock = screen.getByText(/Scenario Map/i)
//   fireEvent.click(empathyMapBlock)
//   expect(mockNavigate).toHaveBeenCalledWith('/scenariomap')
// })
