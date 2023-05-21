// Load the Google Calendar API asynchronously
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }
  
  // Initialize the Google Calendar API client
  function initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyB-KNY4pNja2u2dh317PINNA2i0ZhJnJLY',
      clientId: '879687241176-kh9udu4dc6at9jqlmfohlrs0ovi01pms.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.events'
    }).then(() => {
      // Add event listener to the form
      document.getElementById('event-form').addEventListener('submit', createEvent);
    });
  }
  
  // Create a new Google Calendar event
  function createEvent(event) {
    event.preventDefault();
  
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
  
    const dateTime = new Date(`${date}T${time}:00`).toISOString();
  
    const eventDetails = {
      summary: title,
      start: {
        dateTime: dateTime
      },
      end: {
        dateTime: dateTime
      }
    };
  
    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: eventDetails
    }).then(() => {
      alert('Event created successfully!');
      document.getElementById('event-form').reset();
    }, error => {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again.');
    });
  }
  