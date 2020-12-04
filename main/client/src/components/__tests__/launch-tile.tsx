import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { cleanup } from '../../test-utils';
import LaunchTile from '../launch-tile';

describe('Launch Tile', () => {
  // automatically unmount and cleanup DOM after the test is finished.
  afterEach(cleanup);

  it('renders without error', () => {

    // This is the old test
    // render(
    //   <LaunchTile
    //     launch={{
    //       __typename: 'Launch',
    //       isBooked: false,
    //       id: '1',
    //       mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
    //       rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
    //     }}
    //   />,
    // );

    // New tests
    const shallowWrapper = shallow(
        <LaunchTile
          launch={{
            __typename: 'Launch',
            isBooked: false,
            id: '1',
            mission: { name: 'the first one', __typename: 'Mission', missionPatch: null },
            rocket: { name: 'harambe', __typename: 'Rocket', id: '1' },
          }}
        />
    );

    console.log(shallowWrapper.debug());
    expect(shallowWrapper.find('Styled(Link)').length).toEqual(1);
    expect(shallowWrapper.find('h3').length).toEqual(1);
    expect(shallowWrapper.find('h5').length).toEqual(1);
    //
    expect(shallowWrapper.find('h3').text()).toEqual("the first one");
    expect(shallowWrapper.find('h5').text()).toEqual("harambe");
  });
});
