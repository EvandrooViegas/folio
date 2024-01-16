import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DashboardPage from '../page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<DashboardPage />)
    const heading = screen.getByText('testing')
    expect(heading).toBeInTheDocument()
  })
})