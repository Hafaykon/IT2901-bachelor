import { render, screen } from '@testing-library/react';
import { Leaderboard } from './Leaderboard';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import '@testing-library/jest-dom/extend-expect';

jest.mock('node-fetch');

describe('Leaderboard component', () => {
  beforeEach(() => {
    const mockData = {
      leaderboard: [
        {
          organization: 'IT-tjenester',
          active_percentage: 50.1,
          rank: 5
        },
        {
          organization: 'Berg skole',
          active_percentage: 7.6,
          rank: 101
        }
      ]
    };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    render(
      <MemoryRouter>
        <RecoilRoot>
          <Leaderboard />
        </RecoilRoot>
      </MemoryRouter>
    );
  });

  test('displays the correct organization', async () => {
    const org1 = await screen.findByText('IT-tjenester');
    const org2 = await screen.findByText('Berg skole');
    expect(org1).toBeInTheDocument();
    expect(org2).toBeInTheDocument();
  });

  test('displays the correct percentage', async () => {
    const org1Perc = await screen.findByText('50.1');
    expect(org1Perc).toBeInTheDocument();
    const org2Perc = await screen.findByText('7.6');
    expect(org2Perc).toBeInTheDocument();
  });

  test('displays the correct ranking', async () => {
    const org1Rank = await screen.findByText('5');
    expect(org1Rank).toBeInTheDocument();
    const org2Rank = await screen.findByText('101');
    expect(org2Rank).toBeInTheDocument();
  });

  test('displays the correct header', async () => {
    expect(await screen.findByText('Topplisten')).toBeInTheDocument();
  });
});
