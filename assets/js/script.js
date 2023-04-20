// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// Time and date variables

var todaysDate = dayjs().format("dddd, MMM D, YYYY");
var currentYear = dayjs().year();
var currentMonth = dayjs().format("MMM");
var currentDay = dayjs().day();
var currentDayName = dayjs().format("dddd");
var currentHour = dayjs().format("HH");

var timeBlocks = [
  {id: '#hour 9', hour: 9},
  {id: '#hour 10', hour: 10},
  {id: '#hour 11', hour: 11},
  {id: '#hour 12', hour: 12},
  {id: '#hour 13', hour: 13},
  {id: '#hour 14', hour: 14},
  {id: '#hour 15', hour: 15},
  {id: '#hour 16', hour: 16},
  {id: '#hour 17', hour: 17}
];

var recoveredUserEntry = [];

// Putting current date at the top of the page

$('#currentDay').text(todaysDate);

// Assignement of colors based on time of day

$.each(timeBlocks, function (key, value) {
  var presentHour = value.id;

  if(value.hour < currentHour) {
    $(presentHour).removeClass("future");
    $(presentHour).removeClass("present");
    $(presentHour).addClass("past");
  
  } else if(value.hour === currentHour) {
    $(presentHour).removeClass("future");
    $(presentHour).removeClass("past");
    $(presentHour).addClass("present");

  } else {
    $(presentHour).removeClass("past");
    $(presentHour).removeClass("present");
    $(presentHour).addClass("future");

  }
});


$(function () {

  // Info in local storage appears on page refresh

  if(localStorage.getItem("daily-events") !== null) {
    recoveredUserEntry = JSON.parse(localStorage.getItem("daily-events"));

    localStorage.setItem("daily-events",JSON.stringify(recoveredUserEntry));

    $.each(recoveredUserEntry, function (key, value) {
      if(value.day === todaysDate) {
        var record = `#${value.hour}`;
        $(record).find("textarea").text(value.event);
      }
    });
  }
  });


// Clicking the save icon

$('.saveBtn').click(function () {
  var saveBtn = $(this).parent().attr("id");
  var saveBtnId = `#${saveBtn}`;
  var textInput = $(saveBtnId).find("textarea").val();
  var userEntry = {
    day: currentDay,
    hour: saveBtn,
    event: textInput,
  };
})

// Confirmation Message

var confirmationMessage = $("#confirmationMessage");
var storageMessage = $("#storage-message");

confirmationMessage.css("color", "black");
storageMessage.css("color", "red");

setTimeout(function() {
  confirmationMessage.css("color", "transparent");
  storageMessage.css("color", "transparent")
}, 2000);


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
