import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders correctly', () => {
    const instance = renderer.create(<App />);
    const rendered = instance.toJSON();
    expect(rendered).toBeTruthy();
    expect(rendered).toMatchSnapshot();
  });
});
