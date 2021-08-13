const React = require('react');
const {mount, shallow} = require('enzyme');
const {MemoryRouter} = require('react-router-dom');

const Home = require('../../src/client/pages/Home');
const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const rep = require('../../src/server/db/destinationRepository');
const app = require('../../src/server/app');

test("Test failed fetch", async () => {

    stubFetch(500, {}, null);

    await flushPromises();

    const html = mount(<MemoryRouter><Home /></MemoryRouter>).html();

    expect(html).toMatch("Issue");
});