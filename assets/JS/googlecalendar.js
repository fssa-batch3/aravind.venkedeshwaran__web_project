document.getElementById('eventForm').addEventListener('submit', createEvent);

function createEvent(event) {
    event.preventDefault();
    
    var eventTitle = document.getElementById('eventTitle').value;
    var eventDate = document.getElementById('eventDate').value;
    var eventTime = document.getElementById('eventTime').value;

    var eventDateTime = new Date(eventDate + ' ' + eventTime);
    var eventStart = eventDateTime.toISOString();
    var eventEnd = new Date(eventDateTime.getTime() + 60 * 60 * 1000).toISOString();

    gapi.load('client:auth2', initClient);

    function initClient() {
        gapi.client.init({
            apiKey: 'AIzaSyB-KNY4pNja2u2dh317PINNA2i0ZhJnJLY',
            clientId: '879687241176-kh9udu4dc6at9jqlmfohlrs0ovi01pms.apps.googleusercontent.com',
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
            scope: 'https://www.googleapis.com/auth/calendar.events'
        }).then(function () {
            gapi.auth2.getAuthInstance().signIn().then(function () {
                var event = {
                    'summary': eventTitle,
                    'start': {
                        'dateTime': eventStart,
                        'timeZone': 'Asia/Kolkata'
                    },
                    'end': {
                        'dateTime': eventEnd,
                        'timeZone': 'Asia/Kolkata'
                    }
                };

                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event
                });

                request.execute(function (event) {
                    alert('Event created successfully!');
                });
            });
        });
    }
}
