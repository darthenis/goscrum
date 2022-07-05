import {render, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Register from './Register';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

import '@testing-library/jest-dom/extend-expect';

const {REACT_APP_API_URL} = process.env;

const server = setupServer(
    rest.get(REACT_APP_API_URL+'/auth/data', (req, res, ctx) => {
        return res(ctx.json({
            result:{
                continente: ["America", "Europa", "Otro"],
                region: ["Otro", "Brazil", "Latam", "America del norte"],
                role: ["Team Member", "Team Leader"]
            }
        }));
    })
)

beforeAll(() => server.listen());
afterAll(() => server.close());

it('fetch options', async () =>{

    render(<Register/>, {wrapper: MemoryRouter})

    expect(screen.getByRole('option', {name : 'Seleccione rol...'})).toBeInTheDocument();

    expect( await screen.findByRole('option', {name : 'Europa'})).toBeInTheDocument();

})