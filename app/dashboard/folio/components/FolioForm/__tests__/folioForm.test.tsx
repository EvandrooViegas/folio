import {  getByTestId, render, screen } from "@testing-library/react"
import FolioForm from ".."
describe("Testing NodeDataForm gallery component", () => {
    it("should show the form when a new image is being created", () => {
        render(<FolioForm />)
        const uploadImageInput = screen.getByTestId("uploadImageInput")
        expect(uploadImageInput).toBeInTheDocument()
    })
}) 