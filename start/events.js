const Event = use('Event');

Event.on('user::register', 'Registration.method');

Event.on('user::passReset', 'PassReset.method');
Event.on('user::passUpdate', 'PassUpdate.method');