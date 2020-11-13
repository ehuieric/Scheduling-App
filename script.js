var date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
var timeslots = [];

// Get timeslots
for(var i = 9 ; i < 18; i++) {
   
    if(i < 12) {
         // from 9AM t0 11AM
        timeslots.push(i + `AM`);
    }else if(i > 12) {
        // from 1PM to 5PM
        timeslots.push(i - 12 + 'PM');
    }else {
        // 12Pm
        timeslots.push(i + 'PM');
    }
}

// Create table row for each time slots
for(var i = 0 ; i < timeslots.length ; i++) {
    $('#tablebody').append(`<tr>
                                <th scope="row">${timeslots[i]}</th>
                                <td class="middleCol">
                                    <input type="text" class="input" />
                                </td>
                                <td class="rightCol">
                                    <button class="submitBtn">
                                        <i class="fas fa-calendar-plus"></i>
                                    </button>
                                </td>
                            </tr>`);
}

console.log('time', timeslots);

$('#currentDay').text(date);

