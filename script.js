$(function () {

   const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
   const timeString =  `${moment().hours()}:${moment().minutes()}`;
   const currentTime =  moment(timeString, 'HH:mm');
   const timeslots = [];
   let scheduledEvent = JSON.parse(window.localStorage.getItem('calendar')) ;

    // Get timeslots
    for(let i = 9 ; i < 18; i++) {
    
        if(i < 12) {
            // from 9AM t0 11AM
            timeslots.push({
                displayTime: i + `AM`,
                time: i + ':00',
                event: ''
            });
        } else if(i > 12) {
            // from 1PM to 5PM
            timeslots.push({
                displayTime: i - 12 + 'PM',
                time: i + ':00',
                event: ''
            });
        } else {
            // 12Pm
            timeslots.push({
                displayTime: i + 'PM',
                time: i + ':00',
                event: ''
            });
        }
    }
    
    if(!scheduledEvent) {
        window.localStorage.setItem('calendar', JSON.stringify(timeslots));
        scheduledEvent = JSON.parse(window.localStorage.getItem('calendar')) ;
    }
    
    
    // Create table row for each time slots
    for(let i = 0 ; i < timeslots.length ; i++) {

        //Compare calendarTime to current time
        const calendarTime =moment(timeslots[i].time, 'HH:mm'); ;
        const timeIsPassed = moment(currentTime).isAfter(calendarTime, 'hour');
        const timeIsNow = moment(currentTime).isSame(calendarTime, 'hour');

        $('#tablebody').append(`<tr>
                                    <th scope="row">${timeslots[i].displayTime}</th>
                                    <td class="middleCol" id="middleCol-${i}">
                                        <input type="text" class="input" id="event-${i}" value="${scheduledEvent[i].event}" />
                                    </td>
                                    <td class="rightCol">
                                        <button class="submitBtn" id="btn-${i}" >
                                            <i class="fas fa-calendar-plus"></i>
                                        </button>
                                    </td>
                                </tr>`);
        
    
      

        // Apply css based on input
        let inputValue = $(`#event-${i}`).val();

         // Apply css based on time
         if(timeIsPassed === true) {
            $('.middleCol').css('background-color', 'gray');
         }
 

        if(timeIsNow) {
            $(`#middleCol-${i}`).addClass('red');
        }

        // click events
        $(`#btn-${i}`).on('click', function(e) {
            e.preventDefault();
            //Get input field value
           inputValue = $(`#event-${i}`).val();
           scheduledEvent[i].event = inputValue;
           $(`#event-${i}`).val(inputValue);
          
           window.localStorage.setItem('calendar', JSON.stringify(scheduledEvent));

        });

       
    }

    

    $('#currentDay').text(date);

});