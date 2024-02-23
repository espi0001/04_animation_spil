window.addEventListener("load", sidenVises);

// Opretter global variables
let point;
let liv;
let speed;

//opretter konstanter for mine elementer
const good1 = document.querySelector("#good_container1");
const good2 = document.querySelector("#good_container2");
const good3 = document.querySelector("#good_container3");

const bad1 = document.querySelector("#bad_container1");
const bad2 = document.querySelector("#bad_container2");
const bad3 = document.querySelector("#bad_container3");

const audio = document.querySelector("#sound_baggrundsmusik");

function sidenVises() {
  console.log("sidenVises");
  // Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  // Vis start skærm
  document.querySelector("#start").classList.remove("hide");
  // klik på play_knap
  document.querySelector("#play_knap").addEventListener("click", startGame);
}

function startGame() {
  console.log("startGame");
  // Skjul andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  // tilføj baggeundsmusik
  document.querySelector("#sound_baggrundsmusik").volume = 0.2;
  document.querySelector("#sound_baggrundsmusik").play();

  // Nulstil point og liv
  point = 0;
  liv = 3;

  // Skriv point og liv ud
  console.log("point: ", point);
  document.querySelector("#point").textContent = " = " + point;

  console.log("liv: ", liv);
  document.querySelector("#liv_tal").textContent = liv;

  //reset speed
  speed = 1;

  // Start timer -animation
  document.querySelector("#minut_viser").classList.add("minut_animation");
  document.querySelector("#time_viser").classList.add("time_animation");

  //Når animationen er færdig kaldes stopSpillet()
  document.querySelector("#minut_viser").addEventListener("animationend", stopSpillet);

  ////// GOOD element //////

  //Giv en random position, random delay til container og speed, start fald-animationer
  good1.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");
  //Lyt efter fald -animation er kørt en gang
  good1.addEventListener("animationiteration", goodFaldReset);
  // Lyt efter mousedown på goodClickHandler
  good1.addEventListener("mousedown", goodClickHandler);

  //Giv en random position, random delay til container og speed, start fald-animationer
  good2.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");
  //Lyt efter fald -animation er kørt en gang
  good2.addEventListener("animationiteration", goodFaldReset);
  // Lyt efter mousedown på goodClickHandler
  good2.addEventListener("mousedown", goodClickHandler);

  //Giv en random position, random delay til container og speed, start fald-animationer
  good3.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");
  //Lyt efter fald -animation er kørt en gang
  good3.addEventListener("animationiteration", goodFaldReset);
  // Lyt efter mousedown på goodClickHandler
  good3.addEventListener("mousedown", goodClickHandler);

  ////// BAD element //////

  //Giv en random position, random delay til container og speed, start fald-animationer
  bad1.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");
  //Lyt efter fald -animation er kørt en gang
  bad1.addEventListener("animationiteration", badFaldReset);
  // Lyt efter mousedown på goodClickHandler
  bad1.addEventListener("mousedown", badClickHandler);

  //Giv en random position, random delay til container og speed, start fald-animationer
  bad2.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");
  //Lyt efter fald -animation er kørt en gang
  bad2.addEventListener("animationiteration", badFaldReset);
  // Lyt efter mousedown på goodClickHandler
  bad2.addEventListener("mousedown", badClickHandler);

  //Giv en random position, random delay til container og speed, start fald-animationer
  bad3.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");
  //Lyt efter fald -animation er kørt en gang
  bad3.addEventListener("animationiteration", badFaldReset);
  // Lyt efter mousedown på goodClickHandler
  bad3.addEventListener("mousedown", badClickHandler);

  // Start baggrundsmusik
}

////// GOOD element //////

function goodClickHandler() {
  console.log("goodClickHandler");

  //gør så lyden kan køre igen hurtigt efter og ik skal vente til slut
  // Afspil lyd good

  document.querySelector("#sound_nooo").currentTime = 0;
  document.querySelector("#sound_nonono_non_quello").currentTime = 0;
  document.querySelector("#sound_no_che_fai").currentTime = 0;

  //vælger mellem 4 forskellige lyde

  let randomValue = Math.random();

  if (randomValue < 0.33) {
    document.querySelector("#sound_nooo").play();
  } else if (randomValue < 0.66) {
    document.querySelector("#sound_nonono_non_quello").play();
  } else {
    document.querySelector("#sound_no_che_fai").play();
  }

  // Gør så man kan klikke op den igen
  this.removeEventListener("mousedown", goodClickHandler);

  //frys (pause), op_ned-animationen
  this.classList.add("frys");

  // mist et liv og udskriv
  liv--;
  console.log("liv: ", liv);
  document.querySelector("#liv_tal").textContent = liv;

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("forsvindGood");

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", goodClickReset);

  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
    //kan også skrives if (0 >= liv) - næbet skal altid gå mod 0
  }
}

function goodClickReset() {
  console.log("goodClickReset");
  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position, random delay til container og speed, start fald-animationer
  this.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");

  //Lyt efter mousedown på element
  this.addEventListener("mousedown", goodClickHandler);
}

function goodFaldReset() {
  console.log("goodFaldReset");
  //ryd op, fjern alt er på container
  this.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position, random delay til container og speed, start fald-animationer
  this.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");
}

////// BAD element //////
function badClickHandler() {
  console.log("badClickHandler");
  // Gør så man kan klikke op den igen
  this.removeEventListener("mousedown", badClickHandler);

  document.querySelector("#sound_ottimo").currentTime = 0;
  document.querySelector("#sound_bravo").currentTime = 0;
  document.querySelector("#sound_siiiii").currentTime = 0;

  //vælger mellem 2 forskellige lyde

  let randomValue = Math.random();

  if (Math.random() < 0.33) {
    document.querySelector("#sound_ottimo").play();
  } else if (randomValue < 0.66) {
    document.querySelector("#sound_bravo").play();
  } else {
    document.querySelector("#sound_siiiii").play();
  }

  //frys (pause), op_ned-animationen
  this.classList.add("frys");

  //Tæl en op på points og udskriv
  point++;
  document.querySelector("#point").textContent = " = " + point;
  //Tjekker for speed og udskriver point

  if (point >= 15) {
    speed = 4;
  } else if (point >= 9) {
    speed = 3;
  } else if (point >= 5) {
    speed = 2;
  } else if (point >= 3) {
    speed = 1;
  }

  //Start forsvind-animationer på sprite element (firstElementChild er sprite elementet)
  this.firstElementChild.classList.add("forsvindBad");

  //Lyt efter forsvind-animationer er færdig
  this.addEventListener("animationend", badClickReset);
}

function badClickReset() {
  console.log("badClickReset");
  //ryd op, fjern alt er på container og sprite
  this.classList = "";
  this.firstElementChild.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position, random delay til container og speed, start fald-animationer
  this.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");

  //Lyt efter mousedown på element
  this.addEventListener("mousedown", badClickHandler);
}

function badFaldReset() {
  console.log("badFaldReset");

  // tilføj lydeffekt
  document.querySelector("#sound_mannaggia").currentTime = 0;
  document.querySelector("#sound_mannaggia").play();

  // mist et liv og udskriv
  liv--;
  console.log("liv: ", liv);
  document.querySelector("#liv_tal").textContent = liv;

  //ryd op, fjern alt er på container
  this.classList = "";

  //For at kunne genstarte fald animationen, da vi fjener og tilføjer den i samme function
  this.offsetLeft;

  //Giv en random position, random delay til container og speed, start fald-animationer
  this.classList.add("pos" + newRandNum(8), "delay" + newRandNum(6), "speed" + speed, "fald");

  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
    //kan også skrives if (0 >= liv) - næbet skal altid gå mod 0
  }
}

// STOPSPILLET //
function stopSpillet() {
  console.log("stopSpillet");

  //...til levelComplete eller gameOver

  //Reset timer
  document.querySelector("#minut_viser").classList.remove("minut_animation");
  document.querySelector("#time_viser").classList.remove("time_animation");
  document.querySelector("#minut_viser").removeEventListener("animationend", stopSpillet);

  //Slet alle classes og fjern alle event listernere fra good1
  good1.classList = "";
  good1.firstElementChild.classList = "";
  good1.removeEventListener("animationiteration", goodFaldReset);
  good1.removeEventListener("mousedown", goodClickHandler);
  good1.removeEventListener("animationend", goodClickReset);

  //Slet alle classes og fjern alle event listernere fra good2
  good2.classList = "";
  good2.firstElementChild.classList = "";
  good2.removeEventListener("animationiteration", goodFaldReset);
  good2.removeEventListener("mousedown", goodClickHandler);
  good2.removeEventListener("animationend", goodClickReset);

  //Slet alle classes og fjern alle event listernere fra good3
  good3.classList = "";
  good3.firstElementChild.classList = "";
  good3.removeEventListener("animationiteration", goodFaldReset);
  good3.removeEventListener("mousedown", goodClickHandler);
  good3.removeEventListener("animationend", goodClickReset);

  //Slet alle classes og fjern alle event listernere fra bad1
  bad1.classList = "";
  bad1.firstElementChild.classList = "";
  bad1.removeEventListener("animationiteration", badFaldReset);
  bad1.removeEventListener("mousedown", badClickHandler);
  bad1.removeEventListener("animationend", badClickReset);

  //Slet alle classes og fjern alle event listernere fra bad2
  bad2.classList = "";
  bad2.firstElementChild.classList = "";
  bad2.removeEventListener("animationiteration", badFaldReset);
  bad2.removeEventListener("mousedown", badClickHandler);
  bad2.removeEventListener("animationend", badClickReset);

  //Slet alle classes og fjern alle event listernere fra bad3
  bad3.classList = "";
  bad3.firstElementChild.classList = "";
  bad3.removeEventListener("animationiteration", badFaldReset);
  bad3.removeEventListener("mousedown", badClickHandler);
  bad3.removeEventListener("animationend", badClickReset);

  // hvis [point > 15] gå til levelComplete eller gå til gameOver()
  if (point >= 15) {
    levelComplete();
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("Du har tabt spillet");

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");

  if (point >= 10) {
    // vis point
    document.querySelector("#game_over_points").textContent = "Come on, you only got " + point + " points!";
    // Lydeffekt
    document.querySelector("#sound_mannaggia").currentTime = 0;
    document.querySelector("#sound_mamma_mia").addEventListener("ended", onMammamiaEnded);
    document.querySelector("#sound_mamma_mia").play();
  } else if (point >= 5) {
    // vis point
    document.querySelector("#game_over_points").textContent = "Do you call that a pizza?";
    // Lydeffekt
    document.querySelector("#sound_na_ma_che_faiiii").currentTime = 0;
    document.querySelector("#sound_mamma_mia").addEventListener("ended", onMammamiaEnded);
    document.querySelector("#sound_mamma_mia").play();
  } else {
    // vis point
    document.querySelector("#game_over_points").textContent = "Don't you know what to put on a pizza??!";
    // Lydeffekt
    document.querySelector("#sound_you_ruined_my_sunday").currentTime = 0;
    document.querySelector("#sound_mamma_mia").addEventListener("ended", onMammamiaEnded);
    document.querySelector("#sound_mamma_mia").play();
  }

  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", startGame);
}

function onMammamiaEnded() {
  if (point >= 10) {
    document.querySelector("#sound_mannaggia").play();
  } else if (point >= 5) {
    document.querySelector("#sound_na_ma_che_faiiii").play();
  } else {
    document.querySelector("#sound_you_ruined_my_sunday").play();
  }
}

function levelComplete() {
  console.log("Du har vundet spillet");

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");

  // lyd effekt
  document.querySelector("#sound_you_did_it").currentTime = 0;
  document.querySelector("#sound_mmmm_mi_piace").currentTime = 0;

  if (point >= 20) {
    // vis point
    document.querySelector("#level_complete_points").textContent = "You got " + point + " points. You are a true italian pizza maker";
    // Lydeffekt
    document.querySelector("#sound_you_did_it").currentTime = 0;
    document.querySelector("#sound_grazie_mille").addEventListener("ended", onGrazieMilleEnd);
    document.querySelector("#sound_grazie_mille").play();
  } else if (point >= 15) {
    // vis point
    document.querySelector("#level_complete_points").textContent = "You got " + point + " points! You are on your way to become a true italian pizza make";
    // Lydeffekt
    document.querySelector("#sound_mmmm_mi_piace").currentTime = 0;
    document.querySelector("#sound_grazie_mille").addEventListener("ended", onGrazieMilleEnd);
    document.querySelector("#sound_grazie_mille").play();
  }

  //Klik på genstart2
  document.querySelector("#genstart2").addEventListener("click", startGame);
}

function onGrazieMilleEnd() {
  if (point >= 20) {
    document.querySelector("#sound_you_did_it").play();
  } else if (point >= 15) {
    document.querySelector("#sound_mmmm_mi_piace").play();
  }
}

function newRandNum(max) {
  return Math.floor(Math.random() * max) + 1;
}
