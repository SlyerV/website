// SFX
const sfxClick = new Audio("clicksfx.mp3") 
const sfxLevelUp = new Audio("levelupsfx.mp3")
// VARIABLES
let clicks = 0
let mIncr = 1
let mCost = 20
let aCost = 100
let aIncr = 0
let start = false
let mChanged = false
let aChanged = false
let mLevel = 0
let aLevel = 0
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const mCosts = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 50000, 100000, 1000000, "N/A"]
const aCosts = [200, 500, 1000, 5000, 10000, 100000, 1000000, "N/A"]
const mIncrs = [2, 3, 5, 10, 20, 50, 100, 200, 500, 1000, 5000, 10000, "MAX LEVEL"]
const aIncrs = [1, 2, 5, 10, 50, 100, 1000, 10000, "MAX LEVEL"]
// FUNCTIONS
function update() {
  document.getElementById("num").innerHTML = "Clicks: "+clicks
}
function cHover() {
  sfxClick.load()
}
function mOnHover() {
  if (document.getElementById("manup").style.backgroundColor == "red") {
    document.getElementById("manup").style.backgroundColor = "#FF5F5F"
  } else if (document.getElementById("manup").style.backgroundColor == "seagreen"){
    document.getElementById("manup").style.backgroundColor = "#00CC00"
  }
}
function mOffHover() {
  if (document.getElementById("manup").style.backgroundColor == "rgb(0, 204, 0)") {
    document.getElementById("manup").style.backgroundColor = "seagreen"
  } else if (document.getElementById("manup").style.backgroundColor == "rgb(255, 95, 95)") {
    document.getElementById("manup").style.backgroundColor = "red"
  }
}
function aOnHover() {
  if (document.getElementById("autoup").style.backgroundColor == "red") {
    document.getElementById("autoup").style.backgroundColor = "#FF5F5F"
  } else if (document.getElementById("autoup").style.backgroundColor == "seagreen"){
    document.getElementById("autoup").style.backgroundColor = "#00CC00"
  } else {
    alert(document.getElementById("autoup").style.backgroundColor)
  }
}
function aOffHover() {
  if (document.getElementById("autoup").style.backgroundColor == "rgb(0, 204, 0)") {
    document.getElementById("autoup").style.backgroundColor = "seagreen"
  } else if (document.getElementById("autoup").style.backgroundColor == "rgb(255, 95, 95)") {
    document.getElementById("autoup").style.backgroundColor = "red"
  }
}
function increase() {
  clicks = clicks+mIncr
  sfxClick.play()
  update()
}
function manbuy() {
  if ((clicks > (mCost-1)) && (mIncrs[mLevel] != "MAX")) {
    sfxLevelUp.play()
    clicks = clicks-mCost
    mCost = mCosts[mLevel]
    mIncr = mIncrs[mLevel]
    mLevel = mLevel + 1
    document.getElementById("manup").innerHTML = "Manual Upgrade! (Cost: "+mCost+", Clicks: "+mIncr+" → "+(mIncrs[mLevel])+")"
    update()
  }
}
function autobuy() {
  if ((clicks > (aCost-1)) && (aIncrs[aLevel] != "MAX")) {
    sfxLevelUp.play()
    clicks = clicks-aCost
    aCost = aCosts[aLevel]
    aIncr = aIncrs[aLevel]
    aLevel = aLevel + 1
    document.getElementById("autoup").innerHTML = "Auto Upgrade! (Cost: "+aCost+", CPS: "+aIncr+" → "+(aIncrs[aLevel])+")"
    update()
    if (start == false) {
      setautoclick()
      start = true
    }
  }
}
function autoclick() {
  clicks = clicks+aIncr
  update()
}
async function setautoclick() {
  setInterval(autoclick,1000)
}
async function bgchange() {
  while (true) {
    await sleep(1)
    if ((clicks > (mCost - 1)) && (mChanged == true)) {
      document.getElementById("manup").style.backgroundColor = "seagreen";
      mChanged = false
    } else {
      if ((clicks < (mCost-1)) && (mChanged == false)) {
        document.getElementById("manup").style.backgroundColor = "red";
        mChanged = true
      }
    }
    if ((clicks > (aCost - 1)) && (aChanged == true)) {
      document.getElementById("autoup").style.backgroundColor = "seagreen";
      aChanged = false
    } else {
      if ((clicks < (aCost-1)) && (aChanged == false)) {
        document.getElementById("autoup").style.backgroundColor = "red";
        aChanged = true
      }
    }
  }
}
update()
bgchange()
