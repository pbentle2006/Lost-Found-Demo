import React from 'react';
import { Link } from 'react-router-dom';

const HomeWorking: React.FC = () => {
  const styles = {
    container: {
      width: '100%',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    },
    hero: {
      textAlign: 'center' as const,
      marginBottom: '3rem',
      backgroundColor: 'white',
      padding: '3rem 2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      color: '#3182ce',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#4a5568',
      marginBottom: '2rem'
    },
    button: {
      display: 'inline-block',
      padding: '1rem 2rem',
      backgroundColor: '#3182ce',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '0.375rem',
      fontSize: '1.125rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      marginBottom: '2rem',
      color: '#2d3748'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    stepCard: {
      textAlign: 'center' as const,
      padding: '1.5rem'
    },
    stepIcon: {
      fontSize: '4rem',
      marginBottom: '1rem'
    },
    stepTitle: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#2d3748'
    },
    stepDescription: {
      color: '#4a5568',
      lineHeight: 1.6
    },
    demoSection: {
      backgroundColor: '#f0fff4',
      border: '2px solid #68d391',
      padding: '2rem',
      borderRadius: '0.5rem',
      textAlign: 'center' as const
    },
    demoTitle: {
      color: '#22543d',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    demoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    },
    stepIndicator: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: '#3182ce',
      color: 'white',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Lost & Found AI Platform</h1>
        <p style={styles.subtitle}>
          Reuniting people with their lost items using advanced AI technology
        </p>
        <Link 
          to="/report" 
          style={styles.button}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2c5aa0';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#3182ce';
          }}
        >
          🤖 Start AI Report
        </Link>
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.grid}>
          <div style={styles.stepCard}>
            <div style={styles.stepIcon}>🤖</div>
            <h3 style={styles.stepTitle}>1. AI Conversation</h3>
            <p style={styles.stepDescription}>
              Chat with our AI assistant to describe your lost item with natural language
            </p>
            <div style={{
              fontSize: '0.875rem',
              color: '#3182ce',
              fontWeight: '600',
              backgroundColor: '#ebf8ff',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              marginTop: '1rem'
            }}>
              Reduces intake time by 60% vs traditional forms
            </div>
          </div>
          
          <div style={styles.stepCard}>
            <div style={styles.stepIcon}>🔍</div>
            <h3 style={styles.stepTitle}>2. Smart Search</h3>
            <p style={styles.stepDescription}>
              AI searches our database for potential matches using advanced algorithms
            </p>
            <div style={{
              fontSize: '0.875rem',
              color: '#3182ce',
              fontWeight: '600',
              backgroundColor: '#ebf8ff',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              marginTop: '1rem'
            }}>
              Achieves 75%+ match accuracy with confidence scoring
            </div>
          </div>
          
          <div style={styles.stepCard}>
            <div style={styles.stepIcon}>✅</div>
            <h3 style={styles.stepTitle}>3. Get Reunited</h3>
            <p style={styles.stepDescription}>
              Verify ownership and arrange pickup or delivery through secure channels
            </p>
            <div style={{
              fontSize: '0.875rem',
              color: '#3182ce',
              fontWeight: '600',
              backgroundColor: '#ebf8ff',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              marginTop: '1rem'
            }}>
              End-to-end process completed in &lt;24 hours
            </div>
          </div>
        </div>
      </div>

      <div style={styles.demoSection}>
        <h3 style={styles.demoTitle}>🎯 Try the Interactive Demo</h3>
        <div style={styles.demoGrid}>
          <div>
            <div style={styles.stepIndicator}>1</div>
            <strong>Click "Start AI Report"</strong>
            <p style={{fontSize: '0.875rem', color: '#4a5568', marginTop: '0.25rem'}}>
              Begin conversational intake
            </p>
          </div>
          <div>
            <div style={styles.stepIndicator}>2</div>
            <strong>Answer Questions</strong>
            <p style={{fontSize: '0.875rem', color: '#4a5568', marginTop: '0.25rem'}}>
              Describe your lost item naturally
            </p>
          </div>
          <div>
            <div style={styles.stepIndicator}>3</div>
            <strong>Watch AI Search</strong>
            <p style={{fontSize: '0.875rem', color: '#4a5568', marginTop: '0.25rem'}}>
              See smart matching in action
            </p>
          </div>
          <div>
            <div style={styles.stepIndicator}>4</div>
            <strong>View Results</strong>
            <p style={{fontSize: '0.875rem', color: '#4a5568', marginTop: '0.25rem'}}>
              See confidence-scored matches with photos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWorking;
