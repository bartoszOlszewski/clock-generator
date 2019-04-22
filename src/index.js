const time = new Date();
const realSeconds = time.getSeconds();
const realMinutes = time.getMinutes();
const realHours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();

let secTime = realSeconds;
let minTime = realMinutes;
let hourTime = realHours;

const twelve = ()=> {
hourTime = 0;
}

function* genSec() {
    if(secTime <= 59){
    while(true) {
        document.querySelector('.clock span').textContent = `${hourTime.toString().padStart(2, "0")}:${minTime.toString().padStart(2, "0")}:${secTime.toString().padStart(2, "0")}`;     
            if(secTime <= 58){
                yield secTime++;
            } else{
                secTime = 0;
                yield* genMin();   
            }
    }}
    else{secTime = 0}; 
}
function* genMin() {
    if(minTime <= 58) {
        yield minTime++;
    } else {
        yield* genHour();
        minTime = 0;
    }              
}
function* genHour() {
    if(hourTime <= 11) {
        yield hourTime++;
        if(hourTime = 12) {
            setTimeout(twelve, 10);
        }
        }
    else {
        hourTime = 1;
    }              
}
const seconds = genSec();
const start = setInterval(() =>{
    let nextValue = seconds.next();
    if(nextValue.done) {
        clearInterval(start);
    } else {
        console.log(nextValue.value); 
    }
}, 1000)
