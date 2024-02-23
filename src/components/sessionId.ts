export type sessionIdType = string | null;

export class SessionIdManager {
  private static _instance: SessionIdManager;
  private _sessionId: sessionIdType | null = null;

  private constructor() {}

  public static get instance(): SessionIdManager {
    if (!this._instance) {
      this._instance = new SessionIdManager();
    }
    return this._instance;
  }

  public get sessionId(): sessionIdType | null {
    return this._sessionId;
  }

  public set sessionId(value: sessionIdType | null) {
    this._sessionId = value;
  }
}
