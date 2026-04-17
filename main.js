/*
##############################
# WELCOME TO CLICKER CLICKER #
##############################
*/

// ----- SETUP -----

// GAME DATABASE
let upgrades = [
    { id: "ads", name: "Advertisements", baseCost: 10, bonus: 1, type: "cps" },
    { id: "yt_ch", name: "YouTube Channel", baseCost: 15, bonus: 1, type: "cpc" },
    { id: "yt_pro", name: "YouTube Promotion", baseCost: 100, bonus: 2, type: "cps" },
    { id: "auto", name: "Auto Clicker", baseCost: 200, bonus: 5, type: "cps" },
    { id: "cross", name: "Cross-Platform", baseCost: 500, bonus: 5, type: "cpc" },
    { id: "another", name: "ANOTHER Clicker", baseCost: 1000, bonus: 25, type: "cpc" },
    { id: "emp", name: "Employee", baseCost: 2000, bonus: 100, type: "cps" },
    { id: "gfx", name: "Better Graphics", baseCost: 10000, bonus: 75, type: "cpc" },
    { id: "merch", name: "Merchandise", baseCost: 15000, bonus: 150, type: "cps" },
    { id: "robot", name: "Ad Robot", baseCost: 20000, bonus: 100, type: "cpc" },
    { id: "ai", name: "AI Assistant", baseCost: 20000, bonus: 500, type: "cps" },
    { id: "ceo", name: "Substitute CEO", baseCost: 10000000, bonus: 0.1, type: "offline"},
    { id: "crossover", name: "Crossover", baseCost: 100000, bonus: '50%', type: "cpc-cap"}
];

let trophies = [
    { name: "A good start", requirement: 100, reqType: "score"},
    { name: "Getting there", requirement: 1000, reqType: "score"},
    { name: "Cha-ching!", requirement: 10000, reqType: "score"},
    { name: "Rolling in dough", requirement: 100000, reqType: "score"},
    { name: "WE'RE RICH!!", requirement: 1000000, reqType: "score"},
    { name: "Sit back, relax, and watch the money add up.", requirement: 100, reqType: "cps"},
    { name: "CLICKITY CLICK", requirement: 100, reqType: "cpc"},
    { name: "Now THAT'S fast!", requirement: 1000, reqType:"cps"},
    { name: "Click away!", requirement: 1000, reqType: "cpc"}
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
    v1.6.5: Fixed a bug where switching tabs would cause the upgrades/trophies to have a smaller vertical gap. Fixed the CPS and Score from becoming a decimal. Made all buttons larger so they are easier to click on mobile devices. Nerfed the offline bonus into the ground, it now only gives +10% per upgrade, costs $10 million now, and has a cap of 300% of normal earnings. This is because the offline bonus was way too overpowered, and it made the game too easy. Now, it is actually an upgrade that you have to work towards, instead of just something you get for free by leaving the game closed for a while.
`;

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
let currentPrices = {};
let speculationDate = null; // The date when the speculation bonus was activated, used to reset the bonus at the end of the day.

// bonus trackers
let frenzyTimeLeft = 0;
let speculationActive = false;
let highProductivityTimeLeft = 0;
let couponTimeLeft = 0;
let productivityMultiplier = 1;
let luckyClickTimeLeft = 0;

// ----- LOAD SAVED DATA -----

// MOST IMPORTANT
let gamePlayed = localStorage.getItem('clickerPlayed');

let resolveInput; // promise variable for the input alert

// Extract save data
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

// check to see if the speculation bonus should still be active (it should only last until the end of the day)
if (speculationDate) {
    let currentDate = new Date();
    if (currentDate.toDateString() !== speculationDate.toDateString()) {
        speculationActive = false;
        localStorage.removeItem('clickerSpeculation');
    } else {speculationActive = true;}
}

// Render the game after we finish extracting save data
updateScore();
updateStats();
updateName();
renderShop();
renderTrophies();

console.log("Save data loaded. Game officially started. Good luck!");
        
// ----- ENGINE & GAME LOOP -----

// VERY IMPORTANT FUNCTION: THE CLICK BUTTON
function onMainButtonClicked() {
    let currenntClickPower = (frenzyTimeLeft > 0) ? cpc * 777 : cpc; // If frenzy is active, we get 777x our normal CPC, otherwise we just get our normal CPC. The speculation bonus is applied in the checkGoldenOpportunity function, since it affects the luck stat, which is only used in that function and not in the main click function.
    score += currenntClickPower;

    // logic for free upgrades from lucky clicks
    if (luckyClickTimeLeft > 0) {
        if (Math.random() > 0.05) return; // 5% chance to get a free upgrade on click, if they don't get it, return so it doesn't break the game.
        console.log("Lucky Click! Attempting to give a free upgrade...");
        let freeUpg = upgrades[Math.floor(Math.random() * upgrades.length)];
        if (freeUpg.type === 'cps') {
            cps += freeUpg.bonus;
            cps = Math.round(cps);
            localStorage.setItem('clickerCps', cps);
            console.log(`Free CPS Upgrade: ${freeUpg.name} (+${freeUpg.bonus} CPS)`);
        } else if (freeUpg.type === 'cpc' && cpc < cpcCap) {
            cpc += freeUpg.bonus;
            if (cpc > cpcCap) cpc = cpcCap;
            localStorage.setItem('clickerCpc', cpc);
            console.log(`Free CPC Upgrade: ${freeUpg.name} (+${freeUpg.bonus} CPC)`);
        } else if (freeUpg.type === 'cpc-cap') {
            cpcCap += (cpcCap / 2);
            cpcCap = Math.round(cpcCap);
            localStorage.setItem('clickerCpcCap', cpcCap);
            console.log(`Free CPC Cap Upgrade: ${freeUpg.name} (+50% CPC Cap)`);
        } else if (freeUpg.type === 'offline' && offlineBonus < obCap) {
            offlineBonus += freeUpg.bonus;
            if (offlineBonus > obCap) offlineBonus = obCap;
            localStorage.setItem('clickerOfflineBonus', offlineBonus);
            console.log(`Free Offline Bonus Upgrade: ${freeUpg.name} (+${freeUpg.bonus * 100}% Offline Bonus)`);
        }
    }

    // This is the standard: after we change any of the main variables, re-render everything that might have changed.
    updateScore();
    renderShop();
}

// Shop logic
function buyUpgrade(upg) {
    let cost = currentPrices[upg.id];

    // This is to check if they can afford it
    if (score >= cost) {
        score -= cost;

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
            cpcCap += (cpcCap / 2); // 50% raise
            cpcCap = Math.round(cpcCap);
            localStorage.setItem('clickerCpcCap', cpcCap);
        } else if (upg.type === "offline") {
            offlineBonus += upg.bonus;
            if (offlineBonus > obCap) offlineBonus = obCap; // Ensure offline bonus does not exceed cap
            localStorage.setItem('clickerOfflineBonus', offlineBonus);
        }

        currentPrices[upg.id] = Math.ceil(cost * 1.2); // Make the prices increase so the game gets harder.

        if (couponTimeLeft <= 0) { // only update the saved price if the coupon isn't active so they don't get a permanent discount after buying a coupon
            localStorage.setItem('clickerPrices', JSON.stringify(currentPrices));
        } 
        // Re-render everything
        updateScore();
        updateStats();
        renderShop();
        unlockSecretUpgrade();
    } else return; // If they can't afford it, return.
}

// Since the CEO upgrade needs to have name yeeterson to access, we need a seperate function
function buyOfflineBonus() {
    if (score > 1000000) {
        score -= 1000000;
        offlineBonus += 0.5;
        localStorage.setItem('clickerOfflineBonus', offlineBonus);
    }
    updateScore();
    // We don't need to render the shop because the secret upgrade is rendered differently.
}

// Name changing logic
async function changeName() {
    let newName = await showInputAlert("Change Name", "Enter a new name", "Enter name here...", clickerName);
    
    if (newName) clickerName = newName;
    
    unlockSecretUpgrade();
    updateName();
}

function updateName() {
    document.getElementById('clicker-name').innerText = clickerName;
    localStorage.setItem('clickerName', clickerName);
}

// Unlock logic
function unlockSecretUpgrade() {
    let secretUpgrade = document.getElementById('secret-upgrade');
    // If the element doesn't exist, return so it doesn't break
    if (!secretUpgrade) return;

    if (!currentPrices["ceo"]) currentPrices["ceo"] = 10000000; // If the price is null, fix it

    // If the name is yeeterson
    if (clickerName.toLowerCase().trim() === "yeeterson") {
        let currentCost = currentPrices["ceo"];
        secretUpgrade.innerText = `Hire Substitute CEO - Cost: $${currentCost} | +10% Offline Earnings`;
        if (currentCost > score) {
            secretUpgrade.style.backgroundColor = "#ff4d4d"; // Red
        } else {
            secretUpgrade.style.backgroundColor = "#ffab00"; // Orange
        }

        secretUpgrade.onclick = function() {
            const ceoData = upgrades.find(u => u.id === 'ceo');
            buyUpgrade(ceoData);
        };
        secretUpgrade.style.display = "flex";
    } else {
        secretUpgrade.innerText = "???";
        secretUpgrade.onclick = null;
    }
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

// ----- RENDERER & GAME STATE UPDATE LOGIC -----

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
    renderShop();
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

function renderShop() {
    const store = document.getElementById('store-panel');
    const buttons = store.querySelectorAll('button');

    // Delete all existing buttons so we don't flood the panel with upgrades
    buttons.forEach(btn => btn.remove());

    // For every upgrade in the database
    upgrades.forEach(upg => {
        // Again, the CEO is rendered seperately so we don't need to bother rendering it.
        if (upg.id === "ceo") return;

        // If the price doesn't exist for some reason, set it to base cost to prevent crash
        if (!currentPrices[upg.id]) currentPrices[upg.id] = upg.baseCost;

        // Create the button for the upgrade
        let btn = document.createElement('button');
        let cost = currentPrices[upg.id];
        btn.innerText = `${upg.name} - Cost: $${cost} | + ${upg.bonus} ${upg.type.toUpperCase()}`;

        // Color it differently if they can't afford it
        if (cost > score) {
            btn.style.backgroundColor = "#ff4d4d";
        } else {
            btn.style.backgroundColor = "#ffab00"
        }

        // Make the button actually work, and add it to the shop
        btn.onclick = function() { buyUpgrade(upg); };
        store.appendChild(btn);
    });

    // Secret upgrade
    let secretBtn = document.createElement('button');
    secretBtn.id = 'secret-upgrade';
    secretBtn.style.display = 'none';
    store.appendChild(secretBtn)

    unlockSecretUpgrade();
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
        
        // Reset all of the variables
        score = 0;
        cps = 0;
        cpc = 1;
        cpcCap = 100;
        currentPrices = {};
        collectedTrophies = [];
        clickerName = "Clicker Clicker";

        // Redraw everything
        updateScore();
        updateStats();
        updateName();
        renderShop();
        renderTrophies();
    } else {
        showAlert("CANCELLED", "Deletion cancelled.");
    }
}

// Shortened helper functions
function showPatchNotes() { showAlert("PATCH NOTES", patchNotes) }
function closeAlert() { document.getElementById('custom-alert-overlay').style.display = 'none'; }
function updateSavedTime() { localStorage.setItem('clickerSavedTime', new Date()); }
function runAutoClick() { score += cps * productivityMultiplier; score = Math.round(score); updateScore(); }

// Alert
function showAlert(title, message) {
    document.getElementById('alert-title').innerText = title;
    document.getElementById('alert-message').innerText = message;
    document.getElementById('custom-alert-overlay').style.display = 'flex';
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

function closeInputAlert() {
    document.getElementById('custom-input-overlay').style.display = 'none';
}

// Tab switching
function switchTab(tab) {
    // Hide the previous tab and show the new one.
    document.getElementById(currentTab).style.display = 'none';
    document.getElementById(tab).style.display = 'flex';

    // Make sure to update this so it doesn't break in the future
    currentTab = tab;

    // Re-render all of the panels
    renderShop();
    renderTrophies();
}

function clamp(x, min, max) { // helper function to clamp a number between a min and max
    if (x < min) return min;
    if (x > max) return max;
    return x;
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
    
    updateScore();

    console.log(currentTime, pastTime, diffInSeconds, offlineEarnings, offlineBonus);

    // calculate the exact time they were gone
    let timeSinceLastPLayed = Math.floor(diffInSeconds / 3600) + " hours, " + Math.floor((diffInSeconds % 3600) / 60) + " minutes, and " + (diffInSeconds % 60) + " seconds";
    showAlert("Welcome back!", `It's been ${timeSinceLastPLayed} since you last played. While you were gone, you earned $${offlineEarnings} with an offline bonus of ${Math.round(offlineBonus * 100)}%, giving you a total of $${Math.floor(offlineEarnings * offlineBonus)}!`);
}

async function checkGoldenOpportunity() {
    if (!gamePlayed) return;
    let roll = Math.random();
    checkForTrophies(); // calculate luck first
    console.log(`Rolling for Golden Opportunity... Rolled a ${roll}, need under ${luck} to trigger.`);
    if (roll > luck) { console.log("No bonus for you!"); return; }
    
    console.log("Golden Opportunity triggered! Generating bonus options...");

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
        let jackpotAmount = Math.floor(Math.random() * 1000 * luck);
        score += jackpotAmount;
        updateScore();
        showAlert("Jackpot!", `You got $${jackpotAmount}!`);
    } else if (chosenBonus.id === "high-prod") {
        highProductivityTimeLeft = 70;
    } else if (chosenBonus.id === "frenzy") {
        frenzyTimeLeft = 15;
    } else if (chosenBonus.id === "lucky") {
        luckyClickTimeLeft = 60;
    } else if (chosenBonus.id === "spec") {
        speculationActive = true;
        localStorage.setItem('clickerSpeculation', new Date().toDateString()); // Save the date when the speculation bonus was activated, so we can reset it at the end of the day.
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
        renderShop();
    }
    showAlert("Bonus Applied!", `${chosenBonus.name} is now active!`);
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
    
    renderShop(); // Refresh the UI to show the higher prices
    showAlert("Coupon Expired", "The store prices have returned to normal.");
}

// When the game loads, render everything and check if they have previous save data
window.onload = function() {
    renderShop();
    unlockSecretUpgrade();
    renderTrophies();

    if (!gamePlayed) {
        showAlert("Welcome!", "Welcome to Clicker Clicker!");
        localStorage.setItem('clickerPlayed', true);
    } else if (savedTime) {
        calculateOfflineEarnings();
        
        // Use a timeout to ensure luck is calculated and the UI is ready
        setTimeout(() => {
            console.log("Forcing luck update before opportunity check...");
            checkForTrophies();
            checkGoldenOpportunity();
        }, 500); // 500ms delay is usually enough to bypass local file security lags
    }
};

// ----- INTERVALS -----
setInterval(checkForTrophies, 1000);
setInterval(runAutoClick, 1000);
setInterval(updateSavedTime, 1000);

// interval for timed bounuses
// interval for timed bonuses
setInterval(() => {
    if (frenzyTimeLeft > 0) frenzyTimeLeft--;
    if (highProductivityTimeLeft > 0) highProductivityTimeLeft--;
    
    // Handle Lucky Click toggle
    if (luckyClickTimeLeft > 0) luckyClickTimeLeft--;

    // Handle Coupon Reset
    if (couponTimeLeft > 0) {
        couponTimeLeft--;
        if (couponTimeLeft === 0) {
            resetPricesAfterCoupon(); // Call the reset function when time hits 0
        }
    }
}, 1000);