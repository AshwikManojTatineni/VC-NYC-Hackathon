/**
 * Browser Notification Helper
 * Handles HTML5 Web Notification API permissions and triggers
 */

export const isNotificationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window;
};

export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) {
    console.warn('Browser notifications are not supported in this environment.');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      sendBrowserNotification('Notifications Enabled 🔔', {
        body: 'DealFlow 100% Ranker will notify you when new sourcing signals, due-diligence audits, or ranking shifts occur.',
        icon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
      });
    }
    return permission;
  } catch (error) {
    console.warn('Error requesting notification permission:', error);
    return 'denied';
  }
};

export const sendBrowserNotification = (
  title: string,
  options?: NotificationOptions
): Notification | null => {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return null;
  }

  try {
    const notif = new Notification(title, {
      icon: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
      badge: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
      ...options,
    });

    // Auto close after 5 seconds
    setTimeout(() => notif.close(), 5000);

    return notif;
  } catch (e) {
    console.warn('Could not trigger native browser notification:', e);
    return null;
  }
};
