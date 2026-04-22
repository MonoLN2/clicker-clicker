const ver = "1.6.8"; // version stored here
document.title = "Clicker Clicker v" + ver;

/*
##############################
# WELCOME TO CLICKER CLICKER #
##############################
*/

// ----- SETUP -----

// GAME DATABASE
let upgrades = [
    { id: "ads", name: "Advertisements", baseCost: 10, bonus: 1, type: "cps", desc: "Advertisments for your clicker."},
    { id: "yt_ch", name: "YouTube Channel", baseCost: 15, bonus: 1, type: "cpc", desc: "A YouTube channel to promote your clicker." },
    { id: "yt_pro", name: "YouTube Promotion", baseCost: 100, bonus: 2, type: "cps", desc: "A promotion on another YouTuber's video." },
    { id: "auto", name: "Auto Clicker", baseCost: 200, bonus: 5, type: "cps", desc: "Add an autoclick feature to your clicker." },
    { id: "cross", name: "Cross-Platform", baseCost: 500, bonus: 5, type: "cpc", desc: "'Now availible on console and mobile!'" },
    { id: "another", name: "ANOTHER Clicker", baseCost: 1000, bonus: 25, type: "cpc", desc: "Because one wasn't enough." },
    { id: "emp", name: "Employee", baseCost: 2000, bonus: 100, type: "cps", desc: "An employee to maintain your game." },
    { id: "gfx", name: "Better Graphics", baseCost: 10000, bonus: 75, type: "cpc", desc: "Cool shadows and glow!" },
    { id: "merch", name: "Merchandise", baseCost: 15000, bonus: 150, type: "cps", desc: "'Get your OFFICIAL merchandise today at coolestclicker.com!'" },
    { id: "robot", name: "Ad Robot", baseCost: 20000, bonus: 100, type: "cpc", desc: "A robot to spam advertiesments!" },
    { id: "ai", name: "AI Assistant", baseCost: 20000, bonus: 500, type: "cps", desc: "An AI assistant to help you with development." },
    { id: "quantum", name: "Quantum Clicking", baseCost: 40000, bonus: 500, type: "cpc", desc:"Cutting-edge mouse technology." },
    { id: "ceo", name: "Substitute CEO", baseCost: 10000000, bonus: 0.1, type: "offline", desc: "Going on vacation? Hire someone to manage your employees for you!" },
    { id: "crossover", name: "Crossover", baseCost: 100000, bonus: 0.5, type: "cpc-cap", desc:"'BREAKING NEWS: NEW CLICKER CROSSOVER!'" },
    { id: "lego", name: "LEGO set", baseCost: 5000000, bonus: 1, type: "cpc-cap", desc: "Official clicker lego set!" }
];

let trophies = [
    { name: "A good start", requirement: 100, reqType: "score"},
    { name: "Getting there", requirement: 1000, reqType: "score"},
    { name: "Cha-ching!", requirement: 10000, reqType: "score"},
    { name: "Rolling in dough", requirement: 100000, reqType: "score"},
    { name: "WE'RE RICH!!", requirement: 1000000, reqType: "score"}, // one million
    { name: "Richest person on Earth", requirement: 1000000000, reqType: "score"}, // one billion
    { name: "Aren't you running out of space to put all of that cash?", requirement: 1000000000000, reqType: "score"}, // one trillion
    { name: "uh.....", requirement: 1000000000000000, reqType: "score"}, // one quadrillion
    { name: "You ARE going to stop soon. Right?", requirement: 1000000000000000000, reqType: "score"}, // one quintillion
    { name: "1e+21 (1 SEXTILLION) DOLLARS!!! WE ARE OFFICIAL IN SCIENTIFIC NOTATION TERRITORY!", requirement: 1000000000000000000000, reqType: "score"}, // one sextillion
    { name: "Sit back, relax, and watch the money add up.", requirement: 100, reqType: "cps"},
    { name: "Now THAT'S fast!", requirement: 1000, reqType:"cps"},
    { name: "You don't even need to click anymore", requirement: 100000, reqType: "cps"},
    { name: "SHOOOOOOOOOOOOOOOOMMMM!!! (that was your income)", requirement: 1000000, reqType: "cps"}, // one million
    { name: "I'm kind of running out of names for these achivements. And actually, there's no hard limit to how long these achivement names can be, just so you know.", requirement: 1000000000, reqType: 'cps'}, // one billion
    { name: "one trillion cps.... 😯", requirement: 1000000000000, reqType: "cps"},
    { name: "CLICKITY CLICK", requirement: 100, reqType: "cpc"},
    { name: "Click away!", requirement: 1000, reqType: "cpc"},
    { name: "click click click click click click click click click click click click click click click click click click click click click click click click click click click click click click ", requirement: 100000, reqType: "cpc"},
    { name: "*clicking intensifies*", requirement: 1000000, reqType: "cpc"}, // one million
    { name: "Manual Labor", requirement: 1000000000, reqType: "cpc"}, // one billion
    { name: "AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", requirement: 1000000000000, reqType: "cpc"} // one trillion cpc! wow
];

let bonuses = [
    { id: "jackpot", name: "Jackpot", description: "Gain a random amount of money. The higher your luck stat, the more money you can get.", rarity: 0.5 }, // Rarity in percentage.
    { id: "high-prod", name: "High Productivity", description: "For the next 70 seconds, your CPS is multiplied by a number between 10 and 30. The higher your luck stat, the higher the multiplier will be.", rarity: 0.3 },
    { id: "frenzy", name: "Frenzy", description: "For the next 15 seconds, gain 777x your normal CPC, regardless of the cap.", rarity: 0.2 },
    { id: "lucky", name: "Lucky Click", description: "For the next 60 seconds, there is a 5% chance that a click gives you a random upgrade for free. (It won't give you upgrades that you have hit the cap on).", rarity: 0.2 },
    { id: "spec", name: "Speculation", description: "Gain a 20% boost to your luck stat that resets at the end of the day.", rarity: 0.15},
    { id: "coupon", name: "Lucky Coupon", description: "Get discounted prices for all upgrades for the next 5 minutes. The higher your luck stat, the bigger the discount. Discounts can vary.", rarity: 0.05 }
];

const patchNotes = `
    v1.0.0: Game release\n
    v1.1.0: Added this display, and fixed a few typos in one of the upgrades.\n
    v1.1.5: Decreased the cost increase from 1.3x -> 1.2x.\n
    v1.2.0: Made it so that upgrades that you cannot afford are red.\n
    v1.2.1: Fixed a bug where the upgrade colors would not change.\n
    v1.3.0: Added Achievements.\n
    v1.3.1: Fixed a bug where the progress deletion wouldn't work immediately.\n
    v1.3.5: Increased the base price of some of the upgrades for a more balanced game.\n
    v1.3.6: Decreased the CPC bonus of some upgrade.\n
    v1.3.7: Made it so that, on your first time playing, it doesn't show you your offline earnings and instead shows you a welcome screen. Also got rid of the display where you don't have enough money to buy something, as it is now just shown in red.\n
    v1.4.0: Added a cap to the CPC, because it was too broken. Right now, this cap cannot be raised, but it will in the future. Also added a couple more achievements.\n
    v1.4.5: Added an upgrade that lets you raise the CPC cap, fixed the name changing bug, and added a CPC cap display.\n
    v1.5.0: Added a tab system to make the layout cleaner.\n
    v1.5.1: Fixed several bugs and cleaned up some code.\n
    v1.5.2: Made the main button and tab buttons larger, and fixed the CPC cap from becoming a decimal.\n
    v1.5.5: Finally finished the custom input prompt.\n
    v1.6.0 (v1.6.5 pre-release): Nerfed offline bonus, added early version of bonus upgrade. fixed bugs like sticky upgrades & achievements and rounded out decimals.\n
    v1.6.2 (v1.6.5 pre-release): Fixed critical bugs with the bonus engine.\n
    v1.6.3 (v1.6.5 pre-release): Fixed critical bugs with the bonus engine.\n
    v1.6.4 (v1.6.5 pre-release): Added some new upgrades, and fixed not getting refunded for the offline bonus if you hit the cap. Also added a notification panel for less important messages. Also added cutting-edge CSS filters for a better experience.\n
    v1.6.5: Added a new settings and patch notes panel. Upgraded the CSS for more fancy looks. Added sound effects and music, and fixed a few bugs. Also, added version tracking, which will be useful for future updates.\n
    v1.6.6: Fixed a bug where some new upgrdes wouldn't work on some older saves, and added lots of new achievements.
`;

const versions = [
    'v1.0.0',
    'v1.1.0',
    'v1.1.5',
    'v1.2.0',
    'v1.2.1',
    'v1.3.0',
    'v1.3.1',
    'v1.3.5',
    'v1.3.6',
    'v1.3.7',
    'v1.4.0',
    'v1.4.5',
    'v1.5.0',
    'v1.5.1',
    'v1.5.2',
    'v1.5.5',
    'v1.6.5',
    'v1.6.8'
];

const currentVersionID = versions.length; // the version's id

// display the patch notes
const patchPanel = document.getElementById('patch-panel');
let patchNotesElement = document.createElement('p');
patchNotesElement.innerText = patchNotes;
patchPanel.appendChild(patchNotesElement);

// Main variables
let score = 0;
let cps = 0;
let cpc = 1;
let clickerName = "Clicker Clicker";
let offlineBonus = 0.5;
let luck = 0.01; // Luck starts at 0.1
let obCap = 3.0; // Offline bonus cap, there will be an upgrade to raise this in the future, but for now it is just 3.0 (300% of normal earnings)
let cpcCap = 100;
let currentTab = 'store-panel';
let collectedTrophies = [];
let notifications = [];
let currentPrices = {};
let speculationDate = null; // The date when the speculation bonus was activated, used to reset the bonus at the end of the day.

// bonus trackers
let frenzyTimeLeft = -1; // Time left for the frenzy bonus, in seconds. Starts at -1 so it doesn't trigger the end alert on the first load. Same goes for all of the other timed bonuses.
let speculationActive = false;
let highProductivityTimeLeft = -1;
let couponTimeLeft = -1;
let productivityMultiplier = 1;
let luckyClickTimeLeft = -1;

// settings defualts
let settings = {
    RCMenuDisabled: true, // right-click menu
    performanceMode: false,
    sfx: true,
    music: false,
}

// audio
const audio = {
    "click": new Audio('assets/click.mp3'),
    "hover": new Audio('assets/hover.wav')
};

const music = new Audio('assets/music.mp3');
music.loop = true; // turn on the loop

let hoverTimeout;
let hoverPitch = 1.0;

// ----- LOAD SAVED DATA -----

// MOST IMPORTANT
let gamePlayed = localStorage.getItem('clickerPlayed');

let resolveInput; // promise variable for the input alert

// intialize prices
if (Object.keys(currentPrices).length === 0) {
    upgrades.forEach(upg => {
        currentPrices[upg.id] = upg.baseCost;
    });
}

// Extract save data (we don't need to save notifications)
const savedScore = localStorage.getItem('clickerScore');
const savedCps = localStorage.getItem('clickerCps');
const savedCpc = localStorage.getItem('clickerCpc');
const savedClickerName = localStorage.getItem('clickerName');
const savedTime = localStorage.getItem('clickerSavedTime');
const savedOfflineBonus = localStorage.getItem('clickerOfflineBonus');
const savedPrices = localStorage.getItem('clickerPrices');
const savedTrophies = localStorage.getItem('clickerTrophies');
const savedCpcCap = localStorage.getItem('clickerCpcCap');
const savedSpeculation = localStorage.getItem('clickerSpeculation');
const savedSettings = localStorage.getItem('clickerSettings');
const savedVersion = localStorage.getItem('clickerSavedVersion');
const savedBonusTime = localStorage.getItem('clickerSavedBonusTime');

// Apply save data     
if (savedPrices) currentPrices = JSON.parse(savedPrices);
if (savedScore) score = parseInt(savedScore);
if (savedCps) cps = parseInt(savedCps);
if (savedCpc) cpc = parseInt(savedCpc);
if (savedClickerName) clickerName = savedClickerName;
if (savedOfflineBonus) { offlineBonus = parseFloat(savedOfflineBonus); } else { offlineBonus = 0.5; }
if (savedTrophies) collectedTrophies = JSON.parse(savedTrophies);
if (savedCpcCap) cpcCap = parseFloat(savedCpcCap);
if (offlineBonus > obCap) offlineBonus = obCap; // If the offline bonus is above the cap, set it to the cap (this is in case they nerfed the offline bonus after you bought some upgrades, it would be unfair to let you keep a 500% bonus when they nerfed it to 300%)
if (savedSpeculation) speculationDate = new Date(savedSpeculation);
if (savedSettings) settings = JSON.parse(savedSettings);

// check to see if the speculation bonus should still be active (it should only last until the end of the day)
if (speculationDate) {
    let currentDate = new Date();
    if (currentDate.toDateString() !== speculationDate.toDateString()) {
        speculationActive = false;
        localStorage.removeItem('clickerSpeculation');
    } else {speculationActive = true;}
}

const upgNotif = document.getElementById('upg-notifier');

// Render the game after we finish extracting save data
render();

console.log("Save data loaded. Game officially started. Good luck!");        

// failsafe if upgrades were added after the player's save was generated
upgrades.forEach(upg => {
    if (currentPrices[upg.id] === undefined) currentPrices[upg.id] = upg.baseCost;
});

// ----- ENGINE & GAME LOOP -----

// VERY IMPORTANT FUNCTION: THE CLICK BUTTON
function onMainButtonClicked() {
    let currentClickPower = (frenzyTimeLeft > 0) ? cpc * 777 : cpc; // If frenzy is active, we get 777x our normal CPC, otherwise we just get our normal CPC. The speculation bonus is applied in the checkGoldenOpportunity function, since it affects the luck stat, which is only used in that function and not in the main click function.
    score += currentClickPower;
    

    // logic for free upgrades from lucky clicks
    if (luckyClickTimeLeft > 0) {
        if (Math.random() < 0.05) {
            console.log("Lucky Click! Attempting to give a free upgrade...");
            let freeUpg = upgrades[Math.floor(Math.random() * upgrades.length)];
            if (freeUpg.type === 'cps') {
                cps += freeUpg.bonus;
                cps = Math.round(cps);
                localStorage.setItem('clickerCps', cps);
                notify("Free upgrade!", `Free CPS Upgrade: ${freeUpg.name} (+${freeUpg.bonus} CPS)`, new Date());
            } else if (freeUpg.type === 'cpc' && cpc < cpcCap) {
                cpc += freeUpg.bonus;
                if (cpc > cpcCap) cpc = cpcCap;
                localStorage.setItem('clickerCpc', cpc);
                notify("Free upgrade!", `Free CPC Upgrade: ${freeUpg.name} (+${freeUpg.bonus} CPC)`, new Date());
            } else if (freeUpg.type === 'cpc-cap') {
                cpcCap += (cpcCap / 2);
                cpcCap = Math.round(cpcCap);
                localStorage.setItem('clickerCpcCap', cpcCap);
                notify("Free upgrade!", `Free CPC Cap Upgrade: ${freeUpg.name} (+50% CPC Cap)`, new Date());
            } else if (freeUpg.type === 'offline' && offlineBonus < obCap) {
                offlineBonus += freeUpg.bonus;
                if (offlineBonus > obCap) offlineBonus = obCap;
                localStorage.setItem('clickerOfflineBonus', offlineBonus);
                notify("Free upgrade!", `Free Offline Bonus Upgrade: ${freeUpg.name} (+${freeUpg.bonus * 100}% Offline Bonus)`, new Date());
            }
        }
    }

    // This is the standard for the rest of the game: after we change any of the main variables, re-render everything.
    render();
    
}

// Shop logic
function buyUpgrade(upg) {
    let cost = currentPrices[upg.id];

    // This is to check if they can afford it
    if (score >= cost) {
        score -= cost; // first subtract the score

        // Different types of upgrades
        if (upg.type === "cps") {
            cps += upg.bonus;
            cps = Math.round(cps); // round it
            // Save the stats to local storage
            localStorage.setItem('clickerCps', cps);
        } else if (upg.type === "cpc") {
            //If we are already at the CPC cap, refund the money
            let refund = (cpc >= cpcCap);
            cpc += upg.bonus;
            if (cpc > cpcCap) {
                cpc = cpcCap;
                if (refund) score += cost;
                return; // We don't need to include an else block since we're going to return either way.
            }
            localStorage.setItem('clickerCpc', cpc);
        } else if (upg.type === "cpc-cap") {
            cpcCap += (cpcCap * upg.bonus); // raise based on the bonus
            cpcCap = Math.round(cpcCap);
            localStorage.setItem('clickerCpcCap', cpcCap);
        } else if (upg.type === "offline") {
            offlineBonus += upg.bonus;
            if (offlineBonus > obCap)  {
                offlineBonus = obCap;
                score += cost; // refund the upgrade
            }
            localStorage.setItem('clickerOfflineBonus', offlineBonus);
        }

        currentPrices[upg.id] = Math.ceil(cost * 1.2); // Make the prices increase so the game gets harder.

        if (couponTimeLeft <= 0) { // only update the saved price if the coupon isn't active so they don't get a permanent discount after buying a coupon
            localStorage.setItem('clickerPrices', JSON.stringify(currentPrices));
        } 

        localStorage.setItem('clickerScore', score);
        render();
    } else return; // If they can't afford it, return.
}

// Name changing logic
async function changeName() {
    let newName = await showInputAlert("Change Name", "Enter a new name", "Enter name here...", clickerName);
    if (newName) clickerName = newName;
    render();
}

function checkForTrophies() {
    // counter for the luck
    let trphBonus = 0;
    // Locked by default
    let trphCollected = false

    // Repeat for every trophy
    trophies.forEach(trph => {
        // Different trophy requirements
        if (trph.reqType === "score") {
            if (score >= trph.requirement) {
                trphCollected = true;
                trphBonus+= trph.requirement / 100000; // For every hundred thousand dollars they have, they get 0.1% extra luck, so if they have 10 million, they get 1% extra luck, etc.
                // If we don't have the trophy yet, add it
                if (!collectedTrophies.includes(trph.name)) collectedTrophies.push(trph.name);
            }
        } else if (trph.reqType === "cps") {
            if (cps >= trph.requirement) {
                trphCollected = true;
                trphBonus+= trph.requirement / 1000; // For every thousand CPS they have, they get 0.1% extra luck, so if they have 1000 CPS, they get 1% extra luck, etc. 
                if (!collectedTrophies.includes(trph.name)) collectedTrophies.push(trph.name);
            }
        } else {
            if (cpc >= trph.requirement) {
                trphCollected = true;
                trphBonus+= trph.requirement / 100; // For every hundred CPC they have, they get 0.1% extra luck, so if they have 100 CPC, they get 1% extra luck, etc.
                if (!collectedTrophies.includes(trph.name)) collectedTrophies.push(trph.name);
            }
        }
    });

    // Don't bother saving it and re-rendering the menu if they haven't gotten any
    if (trphCollected) localStorage.setItem('clickerTrophies', JSON.stringify(collectedTrophies));
    if (trphCollected) renderTrophies();

    // Update the luck based on how many trophies they have, the more trophies they have, the higher the luck.
    luck = 0.01 + trphBonus;

    if (luck > 0.5) luck = 0.5; // Cap the luck at 50% because otherwise it would be way too overpowered, and it would break the game.
}

// ----- GAME STATE UPDATE LOGIC -----

function updateStats() {
    // Get the HTML elements
    let cpsDisplay = document.getElementById('cps');
    let cpcDisplay = document.getElementById('cpc');
    let cpcCapDisplay = document.getElementById('cpc-cap');

    cpsDisplay.innerText = `CPS: ${cps}`;
    cpcCapDisplay.innerText = `CPC CAP: ${cpcCap}`;
    if (cpc === cpcCap) {
        // If they hit the max let them know (this might be removed in the future, since we have the CPC cap display now)
        cpcDisplay.innerText = `CPC: MAX (${cpc})`;
    } else {
        cpcDisplay.innerText = `CPC: ${cpc}`;
    }
}

function updateScore() {
    let scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = `Score: $${score}`;
    localStorage.setItem('clickerScore', score)
}

function updateBonuses() {
    // high productivity bonus
    if (highProductivityTimeLeft > 0) {
        let multiplier = Math.random() * 20 + 10 + luck;
        multiplier = clamp(multiplier, 10, 30);
        if (luck > 0.5) luck = 0.5; // Cap the luck at 50% because otherwise it would be way too overpowered, and it would break the game.
        productivityMultiplier = multiplier;
    } else {
        productivityMultiplier = 1;
    }
}

function updateName() {
    document.getElementById('clicker-name').innerText = clickerName + ` (v${ver})`;
    localStorage.setItem('clickerName', clickerName);
}

// ----- RENDERER LOGIC -----

// this just calls all of the render and update functions
function render() {
    renderShop();
    renderTrophies();
    renderNotifications();
    renderBonusNotif();

    updateScore();
    updateStats();
    updateBonuses();
    updateName();

    // settings button update logic
    document.getElementById('rc-status').innerText = settings.RCMenuDisabled ? "OFF" : "ON";
    document.getElementById('perf-status').innerText = settings.performanceMode ? "OFF" : "ON";
    document.getElementById('sfx-status').innerText = settings.sfx ? "ON": "OFF";
    document.getElementById('msc-status').innerText = settings.music ? "ON" : "OFF";
}

function renderShop() {
    const store = document.getElementById('store-panel');

    upgrades.forEach(upg => {
        if (upg.id === "ceo" && clickerName.toLowerCase().trim() !== "yeeterson") {
            let existingCeo = document.getElementById(`btn-ceo`);
            if (existingCeo) existingCeo.remove();
            return;
        }

        let btn = document.getElementById(`btn-${upg.id}`);
        let cost = currentPrices[upg.id] || upg.baseCost;
        let extraText = (upg.type === 'cpc-cap') ? `${upg.bonus * 100}%` : upg.bonus;

        if (!btn) {
            btn = document.createElement('button');
            btn.id = `btn-${upg.id}`;
            btn.onclick = () => { buyUpgrade(upg); }; 
            store.appendChild(btn);
        }

        btn.innerText = `${upg.name} - Cost: $${cost} | + ${extraText} ${upg.type.toUpperCase()}`;
        btn.title = upg.desc;

        if (score >= cost) {
            btn.style.backgroundColor = "#ffab00"; // Orange (Affordable)
        } else {
            btn.style.backgroundColor = "#ff4d4d"; // Red (Too expensive)
        }
    });
}

function renderNotifications() {
    const notificationPanel = document.getElementById('notification-panel');
    const cards = notificationPanel.querySelectorAll('div');
    cards.forEach(crd => crd.remove()); // remove cards first so we don't have duplicates

    notifications.forEach(ntf => {
        let crd = document.createElement('div');
        let header = ntf.header;
        let message = ntf.message;
        let timestamp = ntf.timestamp;
        crd.className = "notification-card";

        crd.innerHTML = `
        <p>${timestamp}</p>
        <p class="trophy-header">${header}</p>
        <p>${message}</p>
        `;
        notificationPanel.appendChild(crd);

    });
}

function renderTrophies() {
    // Similar logic for trophies
    const trophyPanel = document.getElementById('trophy-panel');
            
    const cards = trophyPanel.querySelectorAll('div');
    cards.forEach(crd => crd.remove());

    trophies.forEach(trph => {
        // Don't bother trying to draw the trophies if the user hasn't collected it.
        if (!collectedTrophies.includes(trph.name)) { return; }

        let crd = document.createElement('div');
        let reqText = ""
        crd.className = "trophy-card";

        if (trph.reqType === "score") {
            reqText = `Reach a score of $${trph.requirement}.`;
        } else if (trph.reqType === "cps") {
            reqText = `Reach a CPS of ${trph.requirement}.`;
        } else {
            reqText = `Reach a CPC of ${trph.requirement}.`;
        };
                
        crd.innerHTML = `
        <p class="trophy-header">${trph.name}</p>
        <p>${reqText}</p>`;
        trophyPanel.appendChild(crd);
    });
}

function renderBonusNotif() {
    const notifs = upgNotif.querySelectorAll('p');
    notifs.forEach(notif => notif.remove());

    let activeBonuses = [];

    if (luckyClickTimeLeft > 0) activeBonuses.push({ name: "Lucky Click", time: luckyClickTimeLeft + "s" });
    if (couponTimeLeft > 0) activeBonuses.push({ name: "Lucky Coupon", time: couponTimeLeft + "s" });
    if (speculationActive) activeBonuses.push({ name: "Speculation", time: "rest of the day" });
    if (frenzyTimeLeft > 0) activeBonuses.push({ name: "Frenzy", time: frenzyTimeLeft + "s" });
    if (highProductivityTimeLeft > 0) activeBonuses.push({ name: "High Productivity", time: highProductivityTimeLeft + "s" });

    if (activeBonuses.length === 0) {
        upgNotif.innerHTML = "<p>No bonuses currently active.</p>";
        return;
    }

    let header = document.createElement('p');
    header.innerText = "Bonuses currently active:";
    upgNotif.appendChild(header);

    activeBonuses.forEach(bonus => {
        let newNotif = document.createElement('p');
        newNotif.innerText = `${bonus.name}, time remaining: ${bonus.time}`;
        upgNotif.appendChild(newNotif);
    });
}

// ----- HELPER FUNCTIONS -----

async function resetProgress() {
    let reset = await showInputAlert("DELETE PROGRESS", "Are you sured you want to delete your progress? This action cannot be undone. Type CONFIRM to delete.", "Confirm here....", "CONFIRM");

    if (reset === "CONFIRM") {
        showAlert("DELETED", "Deleted progress.");

        // Delete everything from local storage
        localStorage.removeItem('clickerScore');
        localStorage.removeItem('clickerCps');
        localStorage.removeItem('clickerCpc');
        localStorage.removeItem('clickerName');
        localStorage.removeItem('clickerSavedTime');
        localStorage.removeItem('clickerOfflineBonus');
        localStorage.removeItem('clickerPrices');
        localStorage.removeItem('clickerTrophies');
        localStorage.removeItem('clickerCpcCap');
        localStorage.removeItem('clickerSpeculation');
        localStorage.removeItem('clickerSettings');
        
        // Reset all of the variables
        score = 0;
        cps = 0;
        cpc = 1;
        cpcCap = 100;
        currentPrices = {};
        collectedTrophies = [];
        clickerName = "Clicker Clicker";

        // Reset all of the bonuses
        luckyClickTimeLeft = -1;
        couponTimeLeft = -1;
        frenzyTimeLeft = -1;
        highProductivityTimeLeft = -1
        speculationActive = false;

        notifications = [];
        
        settings = {
            RCMenuDisabled: true,
            performanceMode: false,
            sfx: true,
            music: false
        };

        // Redraw everything
        render();
    } else {
        showAlert("CANCELLED", "Deletion cancelled.");
    }
}

// Shortened helper functions
function showPatchNotes() { showAlert("PATCH NOTES", patchNotes) }
function closeInputAlert() { document.getElementById('custom-input-overlay').style.display = 'none'; }
function updateSavedTime() { localStorage.setItem('clickerSavedTime', new Date()); }
function runAutoClick() { score += cps * productivityMultiplier; score = Math.round(score); render(); }
function resetHoverPitch() { hoverPitch = 1.0; }

function playAudio(name) {
    if (!settings.sfx) return;
    
    let sfx = audio[name];
    
    // 1. Pause and reset first
    sfx.pause(); 
    sfx.currentTime = 0; 

    // 2. Set the rate before playing
    if (name === 'hover') {
        sfx.playbackRate = Math.min(hoverPitch, 2.0);
    } else {
        sfx.playbackRate = 1.0; // Keep clicks at normal pitch
    }

    // 3. Play (with a catch for browser "autoplay" blocks)
    sfx.play().catch(e => console.log("Audio play blocked: ", e)); 
}
// Alert
function showAlert(title, message) {
    document.getElementById('alert-title').innerText = title;
    document.getElementById('alert-message').innerText = message;
    document.getElementById('custom-alert-overlay').style.display = 'flex';
}

function closeAlert() {
     document.getElementById('custom-alert-overlay').style.display = 'none'; 
     if (settings.music) music.play(); // only play if they have the music setting turned on.
}

// Input alert
function showInputAlert(title, message, textPlaceholder, textValue) {
    document.getElementById('input-alert-title').innerText = title;
    document.getElementById('input-alert-message').innerText = message;
    
    const textarea = document.getElementById('input-textarea');
    textarea.placeholder = textPlaceholder;
    textarea.value = textValue;

    document.getElementById('custom-input-overlay').style.display = 'flex';

    return new Promise((resolve) => {
        resolveInput = resolve;
    });
}

function confirmInputAlert() {
    const text = document.getElementById('input-textarea').value;
    document.getElementById('custom-input-overlay').style.display = 'none';

    if (resolveInput) {
        resolveInput(text);
    }
}

// this gives a notification
function notify(header, message, timestamp) {
    console.log(`Recieved notification w/ title: ${header}, message: ${message}, and timestamp: ${timestamp}.`)
    let newMessage = { header: header, message: message, timestamp: timestamp };
    notifications.push(newMessage);
    render();
}

// Tab switching
function switchTab(tab) {
    // Hide the previous tab and show the new one.
    document.getElementById(currentTab).style.display = 'none';
    document.getElementById(tab).style.display = 'flex';

    // Make sure to update this so it doesn't break in the future
    currentTab = tab;

    // Re-render all of the panels
    render();
}

// helper function to clamp a number between a min and max
function clamp(x, min, max) { 
    if (x < min) return min; // if x is less than the minimum, return the minimum
    if (x > max) return max; // if x is greater then the maximum, return the maximum
    return x; // otherwise, return x
}

function calculateOfflineEarnings() {
    if (!savedTime) return; // If the time is corrupted, return to prevent a crash

    // Create two times
    let currentTime = new Date();
    let pastTime = new Date(savedTime);

    // Find their difference and calculate the earnings
    let diffInSeconds = Math.floor((currentTime - pastTime) / 1000);
    let offlineEarnings = Math.floor((diffInSeconds * cps));

    score += offlineEarnings * offlineBonus;
    
    render();

    console.log(currentTime, pastTime, diffInSeconds, offlineEarnings, offlineBonus);

    // calculate the exact time they were gone
    let timeSinceLastPLayed = Math.floor(diffInSeconds / 3600) + " hours, " + Math.floor((diffInSeconds % 3600) / 60) + " minutes, and " + (diffInSeconds % 60) + " seconds";
    showAlert("Welcome back!", `It's been ${timeSinceLastPLayed} since you last played. While you were gone, you earned $${offlineEarnings} with an offline bonus of ${Math.round(offlineBonus * 100)}%, giving you a total of $${Math.floor(offlineEarnings * offlineBonus)}!`);
    notify("Welcome back!", `It's been ${timeSinceLastPLayed} since you last played. While you were gone, you earned $${offlineEarnings} with an offline bonus of ${Math.round(offlineBonus * 100)}%, giving you a total of $${Math.floor(offlineEarnings * offlineBonus)}!`, currentTime);
}

async function checkGoldenOpportunity() {
    if (!gamePlayed) return;

    let currentTime = Date.now();

    localStorage.setItem('clickerSavedBonusTime', currentTime); // set the timer if they did get the bonus
    let roll = Math.random();
    checkForTrophies(); // calculate luck first
    console.log(`Rolling for Golden Opportunity... Rolled a ${roll}, need under ${luck} to trigger.`);
    if (roll > luck) { console.log("No bonus for you!"); return; }
    
    console.log("Golden Opportunity triggered! Generating bonus options...");

     // calculate if the bonus should trigger or not
    let timePassed = currentTime - JSON.parse(savedBonusTime);
    if (timePassed < 3600000) { // if it has been less than an hour, don't give them the bonus
        console.log("Bonus on cooldown!");
        return; 
    }

    localStorage.setItem('clickerSavedBonusTime', currentTime); // set the timer if they did get the bonus

    let bonusOptions = [];
    let attempts = 0;

    // Ensure we get 3 UNIQUE options
    while (bonusOptions.length < 3 && attempts < 100) {
        attempts++;
        let randomBonus = bonuses[Math.floor(Math.random() * bonuses.length)];
        // Check rarity and ensure it's not already in our list
        if (Math.random() < randomBonus.rarity && !bonusOptions.includes(randomBonus)) {
            bonusOptions.push(randomBonus);
        }
    }

    if (bonusOptions.length < 3) return;

    console.log("Bonus options generated:", bonusOptions);

    let optionsText = "You got a Golden Opportunity! Choose one:\n\n";
    bonusOptions.forEach((bonus, index) => {
        optionsText += `${index + 1}. ${bonus.name}: ${bonus.description}\n\n`;
    });

    // New internal function to handle the prompt and validation
    async function promptSelection(msg) {
        let choice = await showInputAlert("Golden Opportunity!", msg, "Enter 1, 2, or 3...", "");
        
        let index = parseInt(choice) - 1;
        let chosenBonus = bonusOptions[index];

        if (!chosenBonus) {
            // If they typed it wrong, call the prompt again with a warning!
            return promptSelection("INVALID CHOICE. Please enter 1, 2, or 3:\n\n" + optionsText);
        }
        
        return applyChosenBonus(chosenBonus);
    }

    await promptSelection(optionsText);
}

function applyChosenBonus(chosenBonus) {
    if (chosenBonus.id === "jackpot") {
        let jackpotAmount = Math.floor(Math.random() * 1000 * (luck + Math.random() * 10));
        score += jackpotAmount;
        updateScore();
        showAlert("Jackpot!", `You got $${jackpotAmount}!`);
    } else if (chosenBonus.id === "high-prod") {
        highProductivityTimeLeft = 70;
        showAlert("High Productivity!", "You have a temporary boost in productivity!");
    } else if (chosenBonus.id === "frenzy") {
        frenzyTimeLeft = 15;
        showAlert("Frenzy!", "For the next 15 seconds, gain 777x your normal CPC, regardless of the cap!");
    } else if (chosenBonus.id === "lucky") {
        luckyClickTimeLeft = 60;
        showAlert("Lucky Click!", "For the next 60 seconds, there is a 5% chance that a click gives you a random upgrade for free!");
    } else if (chosenBonus.id === "spec") {
        speculationActive = true;
        localStorage.setItem('clickerSpeculation', new Date().toDateString()); // Save the date when the speculation bonus was activated, so we can reset it at the end of the day.
        showAlert("Speculation!", "Gain a 20% boost to your luck stat that resets at the end of the day!");
    } else if (chosenBonus.id === "coupon") {
        let discount = Math.floor(luck * 100);
        for (let key in currentPrices) {
            let upgradeTemplate = upgrades.find(u => u.id === key);
            if (upgradeTemplate) {
                let newPrice = Math.ceil(currentPrices[key] * (1 - (discount / 100)));
                currentPrices[key] = Math.max(1, newPrice);
            }
        }
        couponTimeLeft = 300;
        render();
        showAlert("Coupon Activated!", "You have a 20% discount on all upgrades for the next 5 minutes!");
    }
}

function resetPricesAfterCoupon() {
    if (savedPrices) {
        // Restore the original prices from the save file
        currentPrices = JSON.parse(savedPrices);
    } else {
        // Fallback: If no save exists, reset to base costs
        upgrades.forEach(upg => {
            currentPrices[upg.id] = upg.baseCost;
        });
    }
    
    render();
    notify("Coupon Expired", "The store prices have returned to normal.");
}

// When the game loads, render everything and check if they have previous save data
window.onload = function() {
    renderShop();
    renderTrophies();

    if (!gamePlayed) {
        showAlert("Welcome!", "Welcome to Clicker Clicker!");
        localStorage.setItem('clickerPlayed', true);
        // Set the version for new players immediately
        localStorage.setItem('clickerSavedVersion', currentVersionID); 
    } else {
        // Run offline earnings check if time exists
        if (savedTime) calculateOfflineEarnings();

        // Delay luck/golden opportunity checks
        setTimeout(() => {
            checkForTrophies();
            checkGoldenOpportunity();
        }, 500); 
    }

    if (settings.performanceMode) document.body.classList.add('low-perf');
};

// ----- INTERVALS -----
setInterval(checkForTrophies, 1000);
setInterval(runAutoClick, 1000);
setInterval(updateSavedTime, 1000);
setInterval(renderBonusNotif, 1000);
setInterval(resetHoverPitch, 1000);

// interval for timed bounuses
// interval for timed bonuses
setInterval(() => {
    // decrease the times
    if (frenzyTimeLeft > 0) frenzyTimeLeft--;
    if (highProductivityTimeLeft > 0) highProductivityTimeLeft--;
    if (luckyClickTimeLeft > 0) luckyClickTimeLeft--;
    if (couponTimeLeft > 0) couponTimeLeft--;

    // show an alert when any of the bonuses have ended
    if (frenzyTimeLeft === 0) {
        showAlert("Frenzy Ended", "The Frenzy bonus has ended. Your CPC has returned to normal.");
        frenzyTimeLeft = -1; // Set it to -1 so it doesn't keep triggering the alert every second after it ends
        console.log("Frenzy bonus ended.");
    }
    if (highProductivityTimeLeft === 0) {
        showAlert("High Productivity Ended", "The High Productivity bonus has ended. Your CPS has returned to normal.");
        highProductivityTimeLeft = -1; // Set it to -1 so it doesn't keep triggering the alert every second after it ends
        console.log("High Productivity bonus ended.");
    }
    if (luckyClickTimeLeft === 0) {
        showAlert("Lucky Click Ended", "The Lucky Click bonus has ended. No more free upgrades.");
        luckyClickTimeLeft = -1; // Set it to -1 so it doesn't keep triggering the alert every second after it ends
        console.log("Lucky Click bonus ended.");
    }
    if (couponTimeLeft === 0) {
        resetPricesAfterCoupon();
        showAlert("Coupon Ended", "The Lucky Coupon bonus has ended. Store prices have returned to normal.");
        couponTimeLeft = -1; // Set it to -1 so it doesn't keep triggering the alert every second after it ends
        console.log("Coupon bonus ended, prices reset.");
    }

}, 1000);


// ----- SETTINGS LOGIC -----

function saveSettings() { localStorage.setItem('clickerSettings', JSON.stringify(settings)); }

function toggleRightClick() {
    settings.RCMenuDisabled = !settings.RCMenuDisabled;
    saveSettings();
    render();
}

function togglePerformance() {
    settings.performanceMode = !settings.performanceMode;
    document.body.classList.toggle('low-perf', settings.performanceMode);
    saveSettings();
    render();
}

function toggleSFX() {
    settings.sfx = !settings.sfx;
    saveSettings();
    render();
}

function toggleMusic() {
    settings.music = !settings.music;
    
    if (settings.music) {
        // Try to play. Use .play().catch to prevent console errors if it fails
        music.play().catch(e => {
            console.log("Music play blocked until user interaction.");
            settings.music = false; // Reset setting if it failed
        });
    } else {
        music.pause();
    }
    
    saveSettings();
    render();
}

// disable rightclick
window.oncontextmenu = function(e) {
    if(settings.RCMenuDisabled) return false;
};

// check for clicking button
window.addEventListener('click', (e) => {
    if (e.target.tagName === "BUTTON") playAudio('click');
});

window.addEventListener('mouseover', (e) => {
    if (e.target.tagName === "BUTTON") {
        // Clear the reset timer because the user is still hovering
        clearTimeout(hoverTimeout); 
        
        playAudio('hover');
        hoverPitch += 0.1; // Increase for the NEXT hover

        // If they don't hover over another button within 500ms, reset the pitch
        hoverTimeout = setTimeout(() => {
            hoverPitch = 1.0;
        }, 500); 
    }
});