function calculateWater() {
  var weight = document.getElementById("weight").value;
  var activity = document.getElementById("exercise").value;
  var requiredWaterOz = weight / 2 + (activity / 30) * 12;
  var waterBottles = requiredWaterOz / 16.9;
  var waterBottles2 = waterBottles.toFixed(2);
  if (isNaN(weight) || isNaN(activity)) {
    alert("Please enter only numeric values.");
  }
  else if (weight === "") {
    alert("Please enter your weight.");
  }
  else if (activity === "") {
    alert("Please enter your exercise time. If you have not been active, please enter 0.");
  }
  else {
    document.getElementById("required_water").value = requiredWaterOz;
    document.getElementById("water_bottles").value = waterBottles2;
  }
}
function resetForm() {
	document.getElementById("personal_info").reset();
}



const smallCups = document.querySelectorAll('.cup-small')
const liters = document.getElementById('liters')
const percentage = document.getElementById('percentage')
const remained = document.getElementById('remained')

var start = document.getElementById('start');
var reset = document.getElementById('reset');

var h = document.getElementById("hour");
var m = document.getElementById("minute");
var s = document.getElementById("sec");

updateBigCup()

reset.addEventListener('click', function(){
    h.value = 0;
    m.value = 0;
    s.value = 0;
    //stop the timer after pressing "reset"
    stopInterval()
})

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => {
        function startInterval(){
            startTimer = setInterval(function() {
                timer();
            }, 1000);
        }
        startInterval();
        h.value = 0;
        m.value = 1;
        s.value = 0;
        highlightCups(idx)
    })
})

function highlightCups(idx) {
    if (idx===7 && smallCups[idx].classList.contains("full")) idx--;
    else if(smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--
    }

    smallCups.forEach((cup, idx2) => {
        if(idx2 <= idx) {
            cup.classList.add('full')
        } else {
            cup.classList.remove('full')
        }
    })

    updateBigCup()
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length
    const totalCups = smallCups.length

    if(fullCups === 0) {
        percentage.style.visibility = 'hidden'
        percentage.style.height = 0
    } else {
        percentage.style.visibility = 'visible'
        percentage.style.height = `${fullCups / totalCups * 330}px`
        percentage.innerText = `${fullCups / totalCups * 100}%`
    }

    if(fullCups === totalCups) {
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    } else {
        remained.style.visibility = 'visible'
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`
    }
}

// <=====================>



//store a reference to the startTimer variable
var startTimer = null;

start.addEventListener('click', function(){
    //initialize the variable
    function startInterval(){
        startTimer = setInterval(function() {
            timer();
        }, 1000);
    }
    startInterval();
    h.value = 2;
})

reset.addEventListener('click', function(){
    h.value = 0;
    m.value = 0;
    s.value = 0;
    //stop the timer after pressing "reset"
    stopInterval()
})

function timer(){
    if(h.value == 0 && m.value == 0 && s.value == 0){
        h.value = 0;
        m.value = 0;
        s.value = 0;
    } else if(s.value != 0){
        s.value--;
    } else if(m.value != 0 && s.value == 0){
        s.value = 59;
        m.value--;
    } else if(h.value != 0 && m.value == 0){
        m.value = 60;
        h.value--;
    }
    return;
}

//stop the function after pressing the reset button, 
//so the time wont go down when selecting a new time after pressing reset
function stopInterval() {
    clearInterval(startTimer);
}
