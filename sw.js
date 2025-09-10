let reminders = [];

// Receive reminders from main page
self.addEventListener('message', event => {
  if (event.data.action === 'addReminder') {
    reminders.push({ ...event.data.reminder, notified: false });
  }
});

// Check reminders every minute
setInterval(() => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0,5);

  reminders.forEach((reminder, index) => {
    if (!reminder.notified && reminder.time === currentTime) {
      self.registration.showNotification('⏰ Time to take your medicine!', {
        body: reminder.name,
        icon: 'https://cdn-icons-png.flaticon.com/512/2966/2966489.png'
      });
      reminders[index].notified = true;
    }
  });
}, 60000);

// Optional: handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  clients.openWindow('/');
});