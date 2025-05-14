import type { MainApplication } from "./main";

/**
 * @function runServer
 *
 * @description This function will be the run server.
 * It will be used to run the server.
 *
 * @author Hapnium <contact@nearby.hapnium.com>
 */
export const runServer = (App: new () => MainApplication) => {
    const app = new App();
    const server = app.run();
    
    return server;
};