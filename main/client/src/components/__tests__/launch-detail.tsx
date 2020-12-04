import React from 'react';
import { shallow } from 'enzyme';

import { cleanup } from '../../test-utils';
import LaunchDetail from '../launch-detail';

describe('Launch Detail View', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {
    // This is the old test
    // render(
    //   <LaunchDetail
    //     id={'1'}
    //     site={'earth'}
    //     rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
    //   />,
    // );

    // New tests
    const shallowWrapper = shallow(
        <LaunchDetail
            id={'1'}
            site={'earth'}
            rocket={{ name: 'that one', type: 'big', __typename: 'Rocket', id: '1' }}
        />
    );

    expect(shallowWrapper.find('Styled(div)').length).toEqual(1);
    expect(shallowWrapper.find('h3').length).toEqual(1);
    expect(shallowWrapper.find('h5').length).toEqual(1);

    expect(shallowWrapper.find('h3').text()).toEqual("that one (big)");
    expect(shallowWrapper.find('h5').text()).toEqual("earth");
  });
});
