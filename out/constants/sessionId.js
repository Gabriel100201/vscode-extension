"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionIdManager = void 0;
class SessionIdManager {
    static _instance;
    _sessionId = null;
    constructor() { }
    static get instance() {
        if (!this._instance) {
            this._instance = new SessionIdManager();
        }
        return this._instance;
    }
    get sessionId() {
        return this._sessionId;
    }
    set sessionId(value) {
        this._sessionId = value;
    }
}
exports.SessionIdManager = SessionIdManager;
//# sourceMappingURL=sessionId.js.map