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
if (localStorage.getItem('clicks')!=null) {
  clicks = Number(localStorage.getItem('clicks'))
}
if (localStorage.getItem('aIncr')!=null) {
  aIncr = Number(localStorage.getItem('aIncr'))
}
if (localStorage.getItem('mIncr')!=null) {
  mIncr = Number(localStorage.getItem('mIncr'))
}
if (localStorage.getItem('aLevel')!=null) {
  aLevel = Number(localStorage.getItem('aLevel'))
}
if (localStorage.getItem('mLevel')!=null) {
  mLevel = Number(localStorage.getItem('mLevel'))
}
if (localStorage.getItem('aCost')!=null) {
  aCost = Number(localStorage.getItem('aCost'))
}
if (localStorage.getItem('mCost')!=null) {
  mCost = Number(localStorage.getItem('mCost'))
}
if (localStorage.getItem('start')!=null) {
  start = Number(localStorage.getItem('start'))
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const mCosts = [50, 100, 200, 500, 1000, 2000, 5000, 10000, 50000, 100000, 1000000, "N/A"]
const aCosts = [200, 500, 1000, 5000, 10000, 100000, 1000000, "N/A"]
const mIncrs = [2, 3, 5, 10, 20, 50, 100, 200, 500, 1000, 5000, 10000, "MAX LEVEL"]
const aIncrs = [1, 2, 5, 10, 50, 100, 1000, 10000, "MAX LEVEL"]
// FUNCTIONS
function update() {
  document.getElementById("clicks").innerHTML = "Clicks: "+clicks
  document.getElementById("mult").innerHTML = "Multiplier: x"+mIncr
  document.getElementById("cps").innerHTML = "CPS: "+aIncr
  document.getElementById("manup").innerHTML = "Manual Upgrade! (Cost: "+mCost+", Multiplier: x"+mIncr+" → x"+(mNext)+")"
  document.getElementById("autoup").innerHTML = "Auto Upgrade! (Cost: "+aCost+", CPS: "+aIncr+" → "+(aNext)+")"
  localStorage.setItem('clicks', clicks);
  localStorage.setItem('aIncr', aIncr);
  localStorage.setItem('mIncr',mIncr)
  localStorage.setItem('aLevel',aLevel)
  localStorage.setItem('mLevel',mLevel)
  localStorage.setItem('aCost',aCost)
  localStorage.setItem('mCost',mCost)
  localStorage.setItem('start',start)
}
function initupdate() {
  localStorage.setItem('clicks', clicks);
  localStorage.setItem('aIncr', aIncr);
  localStorage.setItem('mIncr',mIncr)
  localStorage.setItem('aLevel',aLevel)
  localStorage.setItem('mLevel',mLevel)
  localStorage.setItem('aCost',aCost)
  localStorage.setItem('mCost',mCost)
  localStorage.setItem('start',start)
  document.getElementById("clicks").innerHTML = "Clicks: "+clicks
  document.getElementById("mult").innerHTML = "Multiplier: x"+mIncr
  document.getElementById("cps").innerHTML = "CPS: "+aIncr
  document.getElementById("manup").innerHTML = "Manual Upgrade! (Cost: "+mCost+", Multiplier: x"+mIncr+" → x"+mIncrs[mLevel]+")"
  document.getElementById("autoup").innerHTML = "Auto Upgrade! (Cost: "+aCost+", CPS: "+aIncr+" → "+aIncrs[aLevel]+")"
  if (start) {
    alert("Autoclick restored")
    setautoclick()
  }
}
function autoclick() {
  clicks = clicks+aIncr
  update()
}
async function setautoclick() {
  setInterval(autoclick,1000)
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
function reset() {
  if (confirm("Are you sure you want to reset all of your progress?")) {
      clicks = 0
      mIncr = 1
      mCost = 20
      aCost = 100
      aIncr = 0
      mLevel = 0
      aLevel = 0
      start = false
      update()
  }
}
function manbuy() {
  if ((clicks > (mCost-1)) && (mIncrs[mLevel] != "MAX")) {
    sfxLevelUp.play()
    clicks = clicks-mCost
    mCost = mCosts[mLevel]
    mIncr = mIncrs[mLevel]
    mLevel = mLevel + 1
    document.getElementById("manup").innerHTML = "Manual Upgrade! (Cost: "+mCost+", Multiplier: x"+mIncr+" → x"+(mIncrs[mLevel])+")"
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
      start = true
      alert("start = true")
      setautoclick()
    }
  }
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
// INITIALIZATION
initupdate()
bgchange()
