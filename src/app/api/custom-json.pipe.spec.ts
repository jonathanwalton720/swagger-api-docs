import { CustomJsonPipe } from './custom-json.pipe';

describe('CustomJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new CustomJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
