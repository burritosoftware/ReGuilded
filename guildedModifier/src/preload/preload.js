const { ipcRenderer } = require("electron");

const ReGuilded = require("../ReGuilded/Index.js");
const badges = require("../ReGuilded/badges.js");

global.ReGuilded = new ReGuilded();

if (document.readyState === "loading") {
    // Once DOM loads, initiate ReGuilded
    document.addEventListener("DOMContentLoaded", () => {
        global.ReGuilded.init()
    });
} else {
    global.ReGuilded.init();
}

// Sets ReGuilded staff members
fetch('https://gist.githubusercontent.com/IdkGoodName/feb175e9d74320cb61a72bf2ad60fc81/raw/b9fd6edd73da1634530872b407ed7ec123453ce2/staff.json')
    .then(x => x.json())
    .then(x => badges.members.staff = x)

document.addEventListener('readystatechange', () => {
    // When bundle loads
    if(document.readyState === 'interactive') {
        global.bundle.addEventListener('load', () => {
            // FIXME: NO SVGS ANYMORE BECAUSE OF THIS
            // Push a new module to it
            global.webpackJsonp.push([ [151], { 1393:
                (module, exports, webpackRequire) => {
                    // Start loading it
                    console.log('Loading')
                    // Makes `c` globally available
                    global.bundleGet = webpackRequire
                    // Gets the User class
                    const {UserModel} = webpackRequire(115)
                    // Generates function for getting badges
                    const badgeGetter = badges.genBadgeGetter(UserModel.prototype.__lookupGetter__('badges'))
                    // Adds ReGuilded staff badges
                    badges.injectBadgeGetter(UserModel.prototype, badgeGetter)
                }
            }])
        })
    }
})


const preload = ipcRenderer.sendSync('REGUILDED_GET_PRELOAD');
if (preload) {
    require(preload);
}