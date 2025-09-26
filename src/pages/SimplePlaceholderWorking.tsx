import React from 'react';

interface SimplePlaceholderWorkingProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const SimplePlaceholderWorking: React.FC<SimplePlaceholderWorkingProps> = ({ 
  title, 
  description, 
  icon, 
  features 
}) => {
  const styles = {
    container: {
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      textAlign: 'center' as const
    },
    card: {
      backgroundColor: 'white',
      padding: '3rem 2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    icon: {
      fontSize: '4rem',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#2d3748',
      marginBottom: '1rem'
    },
    description: {
      fontSize: '1.125rem',
      color: '#4a5568',
      marginBottom: '2rem',
      lineHeight: 1.6
    },
    featuresTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#2d3748',
      marginBottom: '1rem'
    },
    featuresList: {
      textAlign: 'left' as const,
      maxWidth: '600px',
      margin: '0 auto'
    },
    feature: {
      padding: '0.75rem',
      marginBottom: '0.5rem',
      backgroundColor: '#f7fafc',
      borderRadius: '0.375rem',
      borderLeft: '4px solid #3182ce',
      fontSize: '0.875rem',
      color: '#2d3748'
    },
    comingSoon: {
      marginTop: '2rem',
      padding: '1rem',
      backgroundColor: '#ebf8ff',
      borderRadius: '0.5rem',
      border: '1px solid #bee3f8'
    },
    comingSoonText: {
      color: '#3182ce',
      fontWeight: '500',
      fontSize: '1rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>{icon}</div>
        <h1 style={styles.title}>{title}</h1>
        <p style={styles.description}>{description}</p>
        
        <div>
          <h2 style={styles.featuresTitle}>Key Features</h2>
          <div style={styles.featuresList}>
            {features.map((feature, index) => (
              <div key={index} style={styles.feature}>
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.comingSoon}>
          <p style={styles.comingSoonText}>
            <strong>Coming Soon:</strong> This advanced dashboard will be available in the full MVP release. 
            The current demo focuses on the core citizen experience and AI matching capabilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimplePlaceholderWorking;
