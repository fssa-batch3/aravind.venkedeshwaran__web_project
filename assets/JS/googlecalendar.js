// Load the Google Calendar API
function loadCalendarAPI() {
    gapi.load('client:auth2', initClient);
  }
  
  // Initialize Google API client library and set up the API credentials
  function initClient() {
    gapi.client.init({
      clientId: '879687241176-kh9udu4dc6at9jqlmfohlrs0ovi01pms.apps.googleusercontent.com', // Replace with your own client ID
      scope: 'https://www.googleapis.com/auth/calendar'
    }).then(function() {
      console.log('Google API client initialized successfully!');
      // Enable the form submission once the API is initialized
      document.getElementById('eventForm').addEventListener('submit', handleFormSubmission);
    }, function(error) {
      console.error('Error initializing Google API client:', error);
    });
  }
  
  // Function to handle form submission
  function handleFormSubmission(submissionEvent) {
    submissionEvent.preventDefault(); // Prevent form from submitting normally
  
    // Get form values
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
  
    // Create an event object
    const event = {
      summary: eventName,
      start: {
        dateTime: `${eventDate}T${eventTime}:00`,
        timeZone: 'Asia/Kolkata' // Replace with your desired time zone
      },
      end: {
        dateTime: `${eventDate}T${eventTime}:00`,
        timeZone: 'Asia/Kolkata' // Replace with your desired time zone
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
  
  // Load Google API client library
  gapi.load('client', loadCalendarAPI);
  