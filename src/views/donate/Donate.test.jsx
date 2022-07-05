import { render, screen } from '@testing-library/react';
import Donate from './Donate';
import '@testing-library/jest-dom/extend-expect';


describe("render on Donate", () => {

    it('renders one h1', () => {

        render(<Donate/>)
    
        expect(screen.getByRole('heading', {level: 2, name: "Colaborá con el proyecto"})).toBeInTheDocument();
    
    })
    
    it('renders one a con href', () => {
    
    
        render(<Donate/>)
    
        expect(screen.getByRole('link')).toHaveAttribute('href', "https://mpago.la/1CS6Lii");
    
    })

    it('renders one a con target _blank', () => {
    
    
        render(<Donate/>)
    
        expect(screen.getByRole('link')).toHaveAttribute('target', "_blank");
    
    })

})


