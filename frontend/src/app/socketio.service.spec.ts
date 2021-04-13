import { TestBed } from '@angular/core/testing';

import { WebSocketService } from './socketio.service';

describe('SocketioService', () => {
  let service: WebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
