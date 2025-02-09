export class Observable {
  private subscribers: Set<any>;

  constructor() {
    this.subscribers = new Set();
  }

  public subscribe<T>(callback: T) {
    this.subscribers.add(callback);

    return () => this.subscribers.delete(callback);
  }

  public notify<T>(data: T) {
    this.subscribers.forEach((callback) => callback(data));
  }
}
