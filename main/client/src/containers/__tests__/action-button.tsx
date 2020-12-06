import React from 'react';
import { shallow } from 'enzyme';

import { renderApolloEnzyme, cleanup } from '../../test-utils';
import ActionButton from '../action-button';
import { cartItemsVar } from '../../cache';

describe('action button', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    let shallowWrapper = shallow(<ActionButton isBooked={true} id={'1'}/>);
    expect(shallowWrapper.find('CancelTripButton').length).toEqual(1);
    
    shallowWrapper = shallow(<ActionButton isBooked={false} id={'2'}/>);
    expect(shallowWrapper.find('ToggleTripButton').length).toEqual(1);
  });

  it('shows correct label', () => {
    // example of using renderApolloEnzyme method
    let mountWrapper = renderApolloEnzyme(<ActionButton />)
    expect(mountWrapper.find('.css-wwcn44').text()).toEqual("Add to Cart")

    // rerender with different props to same container
    cartItemsVar(['1']);
    mountWrapper = renderApolloEnzyme(<ActionButton id="1"/>);
    expect(mountWrapper.find('.css-wwcn44').text()).toEqual("Remove from Cart");

    // rerender with different props to same container
    cartItemsVar([]);
    mountWrapper = renderApolloEnzyme(<ActionButton isBooked={true}/>);
    expect(mountWrapper.find('.css-wwcn44').text()).toEqual("Cancel This Trip");
  });
});
