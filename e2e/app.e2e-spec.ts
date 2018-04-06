import { SwaggerApiDocPage } from './app.po';

describe('swagger-api-docs App', () => {
  let page: SwaggerApiDocPage;

  beforeEach(() => {
    page = new SwaggerApiDocPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
