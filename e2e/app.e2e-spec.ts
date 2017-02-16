import { IotappPage } from './app.po';

describe('iotapp App', function() {
  let page: IotappPage;

  beforeEach(() => {
    page = new IotappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
