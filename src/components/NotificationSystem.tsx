import React, { useState, useEffect, createContext, useContext } from 'react';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  clearNotification: (id: string) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto-remove success notifications after 5 seconds
    if (notificationData.type === 'success') {
      setTimeout(() => {
        clearNotification(newNotification.id);
      }, 5000);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Simulate real-time notifications for demo
  useEffect(() => {
    const demoNotifications = [
      {
        type: 'info' as const,
        title: 'New Match Found!',
        message: 'A black wallet was found at Dubai Mall that matches your report.',
        actionUrl: '/matches/demo-item'
      },
      {
        type: 'success' as const,
        title: 'Partner Integration Active',
        message: 'Dubai International Airport is now connected to the platform.',
      },
      {
        type: 'info' as const,
        title: 'AI Enhancement',
        message: 'Smart matching algorithm updated with improved accuracy.',
      }
    ];

    // Add demo notifications with delays
    const timeouts = demoNotifications.map((notification, index) => 
      setTimeout(() => {
        addNotification(notification);
      }, (index + 1) * 8000) // 8, 16, 24 seconds
    );

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      clearNotification,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const NotificationBell: React.FC = () => {
  const { notifications, unreadCount, markAsRead, clearNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'info': return '🔔';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '📢';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          padding: '0.5rem',
          borderRadius: '0.375rem',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontSize: '1.25rem',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '0.5rem',
            width: '350px',
            maxHeight: '400px',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              padding: '1rem',
              borderBottom: '1px solid #e5e7eb',
              fontWeight: 'bold',
              backgroundColor: '#f9fafb'
            }}
          >
            Notifications ({unreadCount} unread)
          </div>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid #f3f4f6',
                    backgroundColor: notification.isRead ? 'white' : '#eff6ff',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl;
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        fontWeight: notification.isRead ? 'normal' : 'bold',
                        marginBottom: '0.25rem',
                        fontSize: '0.875rem'
                      }}>
                        {notification.title}
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        lineHeight: 1.4
                      }}>
                        {notification.message}
                      </div>
                      <div style={{ 
                        fontSize: '0.625rem',
                        color: '#9ca3af',
                        marginTop: '0.25rem'
                      }}>
                        {formatTime(notification.timestamp)}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        clearNotification(notification.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9ca3af',
                        fontSize: '1rem',
                        padding: '0.25rem'
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
