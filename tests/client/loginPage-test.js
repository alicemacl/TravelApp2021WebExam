const React = require('react');
const {mount, shallow} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const LoginPage = require('../../src/client/pages/LoginPage');
const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const rep = require('../../src/server/db/destinationRepository');
const app = require('../../src/server/app');

describe('<LoginPage /> with no props', () => {
  const container = mount(<LoginPage />);
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should have proper props for password field', () => {
    expect(container.find('input[type="password"]').props()).toEqual({
      type: 'password',
    });
  });

  it('should have proper props for password field', () => { /* Trimmed for less lines to read */ });
  it('should have a submit button', () => { /* */ });
  it('should have proper props for submit button', () => { /* */ });
});