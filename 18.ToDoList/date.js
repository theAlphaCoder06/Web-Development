module.exports = getDate;

function getDate(){

    let today = new Date();
    let currentDay = today.getDay();
    
    const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
    }
    
    const day = today.toLocaleDateString("en-US", options);
    
    return day;
}
