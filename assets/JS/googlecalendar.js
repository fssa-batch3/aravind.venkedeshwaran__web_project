// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    // Get form values
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
  
    // Create an event object
    const event = {
      summary: eventName,
      start: {
        dateTime: `${eventDate}T${eventTime}:00`,
        timeZone: 'YOUR_TIME_ZONE' // Replace with your desired time zone
      },
      end: {
        dateTime: `${eventDate}T${eventTime}:00`,
        timeZone: 'YOUR_TIME_ZONE' // Replace with your desired time zone
      }
    };
  
    // Call the function to add the event to Google Calendar
    addEventToGoogleCalendar(event);
  }
  
  // Function to add an event to Google Calendar
  function addEventToGoogleCalendar(event) {
    gapi.client.init({
      apiKey: 'YOUR_API_KEY' // Replace with your Google API key
    }).then(function() {
      return gapi.client.request({
        path: 'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        method: 'POST',
        body: event
      });
    }).then(function(response) {
      console.log('Event created: ', response.result);
      alert('Event created successfully!');
      document.getElementById('eventForm').reset(); // Reset the form after successful submission
    }, function(reason) {
      console.error('Error creating event: ', reason.result.error.message);
      alert('Error creating event. Please try again.');
    });
  }
  
// Load the Google Calendar API
function loadCalendarAPI() {
    gapi.load('client', function() {
      gapi.client.load('calendar', 'v3', function() {
        console.log('Google Calendar API loaded successfully!');
        // Enable the form submission once the API is loaded
        document.getElementById('eventForm').addEventListener('submit', handleFormSubmission);
      }, function(error) {
        console.error('Error loading Google Calendar API:', error);
      });
    });
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    // Get form values
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
  
    // Create an event object
    const event = {
      summary: eventName,
      start: {
        dateTime: `${eventDate}T${eventTime}:00`,
        timeZone: 'YOUR_TIME_ZONE' // Replace with your desired time zone
      },
      end: {
        dateTime: `${eventDate}T${eventTime}:00`,
        timeZone: 'YOUR_TIME_ZONE' // Replace with your desired time zone
      }
    };
  
    // Call the function to add the event to Google Calendar
    addEventToGoogleCalendar(event);
  }
  
  // Function to add an event to Google Calendar
  function addEventToGoogleCalendar(event) {
    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event
    }).then(function(response) {
      console.log('Event created: ', response.result);
      alert('Event created successfully!');
      document.getElementById('eventForm').reset(); // Reset the form after successful submission
    }, function(reason) {
      console.error('Error creating event: ', reason.result.error.message);
      alert('Error creating event. Please try again.');
    });
  }
  
  // Initialize Google API client library and set up the API key
  gapi.client.init({
    apiKey: 'YOUR_API_KEY' // Replace with your Google API key
  }).then(function() {
    loadCalendarAPI();
  }, function(error) {
    console.error('Error initializing Google API client:', error);
  });
  