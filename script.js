//PLAYERS
import  {players}  from "./playerList.js";
console.log(players);

//Rules
const shotTypes = [1, 2, 3, 4, 6, "duck", "wicket", "dotBall"];

const fantasyPointsSystem = {
  battingRules: {
    1: 1,
    2: 2,
    3: 3,
    4: 5,
    6: 8,
    duck: -2,
  },
  bowlingRules: {
    wicket: 10,
    dotBall: 1,
  },
};

//Getting team names
const team1Name = document.querySelector("#team1Name");
const team2Name = document.querySelector("#team2Name");
const teamBtn = document.querySelector(".teamNameBtn");

const tossBtn = document.querySelector(".tossBtn");
tossBtn.disabled = true;
// const teamNames = {};
const teamNames = [];
teamBtn.addEventListener("click", (e) => {
tossBtn.disabled = false;
  e.preventDefault();
  console.log(team1Name);
  if (team1Name.value === "" || team2Name.value === "") {
    alert("team name can't be empty");
    return;
  }
  if (
    !(
      team1Name.value.match(/^[A-Za-z]+$/) &&
      team2Name.value.match(/^[A-Za-z]+$/)
    )
  ) {
    alert("team name should be a string ");
    return;
  }
//   teamNames.team1 = team1Name.value;
//   teamNames.team2 = team2Name.value;
  teamNames[0] = team1Name.value;
  teamNames[1] = team2Name.value;
  team1Name.value = "";
  team2Name.value = "";
  teamBtn.disabled = true;
});

//creating team
const teams = [{
    players: [],
},{
    players: [],
}];
let count = 0;
let randomWinner;

//toss
const tossResult = document.querySelector(".tossResult");
const selectBtn = document.querySelector(".playersList");
tossBtn.addEventListener("click", (e) => {
    e.preventDefault();
    randomWinner = Math.round(Math.random()*1)
    console.log(randomWinner);
    tossResult.innerText = `${teamNames[randomWinner]} have won the toss and elected to BAT first\n Choose your 11 Players below `;
    tossBtn.disabled = true;
    createTeam(randomWinner);
    displayPlayers();
});

//creating team
function createTeam(teamIndex){
    if(count > 1) return;
    console.log(teamIndex);
    teams[teamIndex].teamName = teamNames[teamIndex];
    teams[teamIndex].haveWonToss = (count > 0 ? false : true);
    console.log(teams);
    count++;
    if(randomWinner == 0){
        createTeam(1);
    }else{
        createTeam(0);
    }

}
count = 0;
//display Players
const playerDiv = document.querySelector(".playersList");
function displayPlayers(){
    for(let player of players){
        // console.log(player.name);
        playerDiv.innerHTML += `<div class="player">
                                    <h2>${player.name}</h2>
                                    <span>(${player.playingRole})</span>
                                    <button value="select" class="select">select</button>
                                </div>`
    }
}

//select player
let playersCount = 0;
let bowlerCount = 0;
let batsmanCount = 0;
let wkCount = 1;
selectBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    playersCount++;
    if(playersCount > 11){ 
        alert("you have choosen 11 players :) ")    
        return
    };
    if(bowlerCount >= 5){
        alert("you have already choosen 5 bowlers");
        return;
    }
    if(batsmanCount >= 5){
        alert("you have already choosen 5 batsman");
        return;
    }
    if(wkCount > 1){
        alert("you have already choosen 1 Wicket Keeper");
        return;
    }
    let index = (randomWinner == 0) ? 1 : 0;
    console.log(index);
    if(e.target.value !== "select"){
        return;
    }
    let name = e.target.parentElement.firstElementChild.innerText;
    let playingRole;
    for(let player of players){
        if(name === player.name){
            playingRole = player.playingRole;
        }
    }
    console.log(playingRole);
    teams[randomWinner].players.push({
        name:name,
        type:players.playingRole,

    });
    console.log(playingRole);
    console.log(teams);
    count++;
    console.log(playingRole);
    // console.log("before",batsmanCount);
    if(playingRole === "Batsman"){

        batsmanCount++;
        console.log("insile",batsmanCount);
    }else if(playingRole === "Bowler"){
        bowlerCount++;
    }else if(playingRole === "Wicketkeeper"){
        console.log("inside");
        wkCount++;
    }
    e.target.parentElement.style.display = "none";
})
// const team = {
//   players: [{}],
// };
