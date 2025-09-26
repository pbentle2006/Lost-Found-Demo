import { Link as RouterLink } from 'react-router-dom';
import { LanguageToggle, useLanguage } from './LanguageToggle';
import { NotificationBell } from './NotificationSystem';

const NavbarWorking = () => {
  const { t } = useLanguage();
  
  const styles = {
    navbar: {
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      width: '100%',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      padding: '0 1rem',
      width: '100%'
    },
    logo: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#3182ce',
      textDecoration: 'none'
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    navLink: {
      padding: '0.5rem 1rem',
      textDecoration: 'none',
      color: '#4a5568',
      borderRadius: '0.375rem',
      transition: 'background-color 0.2s',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    primaryButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#3182ce',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <RouterLink to="/" style={styles.logo}>
          {t('nav.title')}
        </RouterLink>
        
        <div style={styles.nav}>
          <RouterLink 
            to="/partner" 
            style={styles.navLink}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f7fafc';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {t('nav.partner')}
          </RouterLink>
          <RouterLink 
            to="/government" 
            style={styles.navLink}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#f7fafc';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {t('nav.government')}
          </RouterLink>
          <RouterLink 
            to="/report" 
            style={styles.primaryButton}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2c5aa0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#3182ce';
            }}
          >
            {t('nav.report')}
          </RouterLink>
          <NotificationBell />
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavbarWorking;
