import { type CorsOptions } from "cors";

import { ENV } from "./env.ts";

const whiteList = ENV.FRONTEND_URL ? [ENV.FRONTEND_URL] : [];
export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    if (process.argv[2] === "--api") {
      console.log("Origin undefined accepted on development!");
      const haveUndefined = whiteList.includes(origin);
      if (!haveUndefined) whiteList.push(origin);
    }

    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error from the origin ${origin}`));
    }
  },
};
