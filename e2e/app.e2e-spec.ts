import { EADInclusivoPage } from './app.po';

describe('eadinclusivo App', function() {
  let page: EADInclusivoPage;

  beforeEach(() => {
    page = new EADInclusivoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
