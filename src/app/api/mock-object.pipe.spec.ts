import { MockObjectPipe } from './mock-object.pipe';

describe('MockObjectPipe', () => {
  it('create an instance', () => {
    const pipe = new MockObjectPipe();
    expect(pipe).toBeTruthy();
  });
});
