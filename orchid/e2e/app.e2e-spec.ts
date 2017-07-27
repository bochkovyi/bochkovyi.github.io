import { OrchidPage } from './app.po';

describe('orchid App', () => {
  let page: OrchidPage;

  beforeEach(() => {
    page = new OrchidPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
