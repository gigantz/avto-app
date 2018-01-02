class Socket {
  constructor(settings) {
    this.settings = settings;
    this.init = this.init.bind(this);
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
    this.userId = this.settings.userId || String(Math.random()).substr(3);
    this._message = this._message.bind(this);
    this.connected = false;
    this.closeConnection = this.closeConnection.bind(this);
  }

  init(){
    if(this.connected) {
      return false;
    }
    console.log('[Socket] Connecting...!');
    this.ws = new WebSocket(this.settings.server);
    this.ws.addEventListener('open', this._open);
    this.ws.addEventListener('close', this._close);
    this.ws.addEventListener('message', this._message);
  }

  closeConnection() {
    this.connected = false;
    const action = {
      type: "DISCONNECT_ME",
      payload: { userId: this.userId},
    };
    if(this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify(action));
    }
  }

  _open() {
    this.connected = true;
    const action = {
      type: "CONNECT_ME",
      payload: { userId: this.userId},
    };
    console.log('[Socket] We are Connected!');
    if(this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify(action));
    } 
  }

  _close() {
    this.connected = false;
    // const action = {
    //   type: "DISCONNECT_ME",
    //   payload: { _id: this.userId},
    // };
    // if(this.ws.readyState === this.ws.OPEN) {
    //   this.ws.send(JSON.stringify(action));
    // }

    console.log('[Socket] Lost connection!');
    this.startInterval = setTimeout(() => {
      this.invervalTimes = this.invervalTimes - 1;
      this.init();
    }, 10000);
  }

  _message(event) {
    const _data = JSON.parse(event.data);
    this.listeners(_data);
  }
}

export default Socket;