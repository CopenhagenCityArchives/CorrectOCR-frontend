import { AsyncTimestampPipe } from './async-timestamp.pipe';

describe('AsyncTimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new AsyncTimestampPipe();
    expect(pipe).toBeTruthy();
  });
});
