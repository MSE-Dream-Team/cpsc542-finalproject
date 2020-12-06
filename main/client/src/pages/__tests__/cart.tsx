import React from 'react';

import {
  renderApollo,
  renderApolloEnzyme,
  cleanup,
  waitForElement
} from '../../test-utils';
import Cart from '../cart';
import { GET_LAUNCH } from '../../containers/cart-item';
import { cache, cartItemsVar } from '../../cache';

const mockLaunch = {
  __typename: 'Launch',
  id: 1,
  isBooked: true,
  rocket: {
    id: 1,
    name: 'tester',
  },
  mission: {
    name: 'test mission',
    missionPatch: '/',
  },
};

describe('Cart Page', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders with message for empty carts', () => {

    // Old test
    // const { getByTestId } = renderApollo(<Cart />, { cache });
    //
    // return waitForElement(() => getByTestId('empty-message'));

    // New enzyme test
    const mountWrapper = renderApolloEnzyme(<Cart />, { cache });

    // Checks that the page renders the basic components
    expect(mountWrapper.exists('Cart')).toBe(true);
    expect(mountWrapper.exists('Styled(div)')).toBe(true);
    expect(mountWrapper.exists('.css-14estru')).toBe(true);
    expect(mountWrapper.exists('Styled(img)')).toBe(true);
    expect(mountWrapper.exists('img')).toBe(true);

    // Checks for h2 header and h2 text
    expect(mountWrapper.exists('h2')).toBe(true);
    const h2HeaderText = "My Cart";
    expect(mountWrapper.find('h2').children().text()).toBe(h2HeaderText);

    // Check for empty cart message
    expect(mountWrapper.exists('[data-testid="empty-message"]')).toBe(true);
    const emptyCartMessage = "No items in your cart";
    expect(mountWrapper.find('[data-testid="empty-message"]').children().text()).toBe(emptyCartMessage);

    expect(mountWrapper.find({'data-testid':"empty-message"}).text()).toEqual("No items in your cart")
  });

  it('renders cart', async () => {
    let mocks = [
      {
        request: { query: GET_LAUNCH, variables: { id: '1' } },
        result: { data: { launch: mockLaunch } },
      },
    ];

    // Old test

    // const { getByTestId } = renderApollo(<Cart />, { cache, mocks });
    // cartItemsVar(['1']);
    // return waitForElement(() => getByTestId('book-button'));


    // New enzyme test

    cartItemsVar(['1']);
    const mountWrapper = renderApolloEnzyme(<Cart />, { mocks, cache } );
    await new Promise(resolve => setTimeout(resolve, 0));
    mountWrapper.update();
    // Checks that the page renders the basic components
    expect(mountWrapper.exists('Cart')).toBe(true);
    expect(mountWrapper.exists('Styled(div)')).toBe(true);
    expect(mountWrapper.exists('.css-14estru')).toBe(true);
    expect(mountWrapper.exists('Styled(img)')).toBe(true);
    expect(mountWrapper.exists('img')).toBe(true);

    // Checks for h2 header and h2 text
    expect(mountWrapper.exists('h2')).toBe(true);
    const h2HeaderText = "My Cart";
    expect(mountWrapper.find('h2').children().text()).toBe(h2HeaderText);

    // Checks for cart
    expect(mountWrapper.exists('CartItem')).toBe(true);
    expect(mountWrapper.exists('[launchId="1"]')).toBe(true);
    expect(mountWrapper.exists('[data-testid="book-button"]')).toBe(true);
    const bookAllText = "Book All";
    expect(mountWrapper.find('button').text()).toBe(bookAllText);


    expect(mountWrapper.find({'data-testid':"book-button", 'className': "css-wwcn44"}).text()).toEqual("Book All")
  });
});
