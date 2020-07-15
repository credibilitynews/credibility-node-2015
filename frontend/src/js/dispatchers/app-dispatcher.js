import { Dispatcher } from "flux";
import assign from "object-assign";

import { PayloadSources } from "../constants/app-constants";

Dispatcher.prototype = assign(Dispatcher.prototype, {
  handleViewAction(action) {
    // console.log("dispatch view");
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action,
    });
  },
  handleServerAction(action) {
    // console.log("dispatch server");
    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action,
    });
  },
  waitForAll(myself) {
    const tokens = this.getAllTokens().filter((token) => myself !== token);
    return this.waitFor(tokens);
  },
  getAllTokens() {
    // console.log(this);
    return Object.keys(this._callbacks);
  },
});

export default new Dispatcher();
