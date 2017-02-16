import {Devices} from './devices';

describe('Devices', () => {
  it('should create an instance', () => {
    expect(new Devices()).toBeTruthy();
  });

it('should accept values in the constructor', () => {
    let device = new Devices({
      title: 'hello',
      id:23
      
    });
    expect(device.title).toEqual('hello');
    expect(device.id).toEqual(23);
  });

});
