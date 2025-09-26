import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const SimpleMatchesWorking: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(true);
  const [progress, setProgress] = useState(0);
  const [matches] = useState([
    {
      id: 1,
      title: 'Black Leather Wallet',
      location: 'Dubai Mall - Food Court',
      confidence: 94,
      foundBy: 'Dubai Mall Security',
      date: 'Today, 2:30 PM',
      description: 'Black leather bi-fold wallet with visible credit cards',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop&crop=center',
      features: ['Black leather', 'Bi-fold design', 'Credit cards visible', 'Slightly worn edges']
    },
    {
      id: 2,
      title: 'Dark Wallet/Purse',
      location: 'Dubai Metro - Business Bay Station',
      confidence: 78,
      foundBy: 'Metro Lost & Found',
      date: 'Yesterday, 6:45 PM',
      description: 'Dark colored wallet found on metro seat',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop&crop=center',
      features: ['Dark brown color', 'Compact size', 'Found on seat', 'No visible damage']
    },
    {
      id: 3,
      title: 'Small Black Wallet',
      location: 'Emirates Mall - Parking Level 2',
      confidence: 65,
      foundBy: 'Mall Security',
      date: 'Yesterday, 4:15 PM',
      description: 'Small black wallet found near car parking area',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop&crop=center',
      features: ['Small size', 'Black color', 'Found near cars', 'Contains some cards']
    }
  ]);

  useEffect(() => {
    const searchInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(searchInterval);
          setIsSearching(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(searchInterval);
  }, []);

  const styles = {
    container: {
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '1rem'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#22543d',
      marginBottom: '1rem',
      textAlign: 'center' as const
    },
    matchCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '1rem',
      border: '1px solid #e2e8f0'
    },
    matchHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem'
    },
    matchTitle: {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      color: '#2d3748'
    },
    badge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: 'bold'
    },
    greenBadge: {
      backgroundColor: '#c6f6d5',
      color: '#22543d'
    },
    yellowBadge: {
      backgroundColor: '#faf089',
      color: '#744210'
    },
    grayBadge: {
      backgroundColor: '#e2e8f0',
      color: '#4a5568'
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover' as const,
      borderRadius: '0.5rem',
      marginBottom: '1rem'
    },
    details: {
      marginBottom: '1rem'
    },
    detailRow: {
      marginBottom: '0.5rem',
      fontSize: '0.875rem'
    },
    features: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    featureBadge: {
      padding: '0.25rem 0.5rem',
      backgroundColor: '#ebf8ff',
      color: '#3182ce',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      border: '1px solid #bee3f8'
    },
    buttons: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap' as const
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      textDecoration: 'none',
      display: 'inline-block'
    },
    primaryButton: {
      backgroundColor: '#3182ce',
      color: 'white'
    },
    outlineButton: {
      backgroundColor: 'white',
      color: '#3182ce',
      border: '1px solid #3182ce'
    },
    grayButton: {
      backgroundColor: '#f7fafc',
      color: '#4a5568',
      border: '1px solid #e2e8f0'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e2e8f0',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '1rem'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#3182ce',
      transition: 'width 0.3s ease'
    }
  };

  if (isSearching) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>🔍 AI Search in Progress...</h1>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <p style={{marginBottom: '1rem', color: '#4a5568'}}>
              Searching our comprehensive database for items matching your description
            </p>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: `${progress}%`}} />
            </div>
            <p style={{fontSize: '0.875rem', color: '#718096'}}>
              {progress}% Complete - Analyzing {Math.floor(progress * 2.5)} potential matches
            </p>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', textAlign: 'center'}}>
            <div>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>🏢</div>
              <div style={{fontSize: '0.875rem', color: '#4a5568'}}>Checking partner locations</div>
            </div>
            <div>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>🤖</div>
              <div style={{fontSize: '0.875rem', color: '#4a5568'}}>AI similarity matching</div>
            </div>
            <div>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>📍</div>
              <div style={{fontSize: '0.875rem', color: '#4a5568'}}>Location-based filtering</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>✅ Search Complete - {matches.length} Matches Found!</h1>
        <p style={{textAlign: 'center', color: '#4a5568', marginBottom: '1rem'}}>
          Report ID: {itemId}
        </p>
      </div>

      {matches.map((match) => (
        <div key={match.id} style={styles.matchCard}>
          <div style={styles.matchHeader}>
            <h3 style={styles.matchTitle}>{match.title}</h3>
            <span style={{
              ...styles.badge,
              ...(match.confidence > 90 ? styles.greenBadge : 
                  match.confidence > 75 ? styles.yellowBadge : styles.grayBadge)
            }}>
              {match.confidence}% Match
            </span>
          </div>
          
          <img 
            src={match.image} 
            alt={match.title}
            style={styles.image}
          />
          
          <div style={styles.details}>
            <div style={styles.detailRow}>
              <strong>Location:</strong> {match.location}
            </div>
            <div style={styles.detailRow}>
              <strong>Found by:</strong> {match.foundBy}
            </div>
            <div style={styles.detailRow}>
              <strong>Date:</strong> {match.date}
            </div>
            <div style={styles.detailRow}>
              <strong>Description:</strong> {match.description}
            </div>
            
            <div style={{marginTop: '1rem'}}>
              <div style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Key Features:</div>
              <div style={styles.features}>
                {match.features.map((feature: string, idx: number) => (
                  <span key={idx} style={styles.featureBadge}>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div style={styles.buttons}>
            <button 
              style={{...styles.button, ...styles.primaryButton}}
              onClick={() => navigate(`/claim/${match.id}`)}
            >
              This looks like mine!
            </button>
            <button style={{...styles.button, ...styles.outlineButton}}>
              View Details
            </button>
            <button style={{...styles.button, ...styles.grayButton}}>
              Not my item
            </button>
          </div>
        </div>
      ))}
      
      <div style={{...styles.card, backgroundColor: '#f0fff4', border: '2px solid #68d391'}}>
        <p style={{textAlign: 'center', color: '#22543d'}}>
          <strong>Demo Complete!</strong> In the full system, clicking "This is Mine!" would start 
          identity verification via UAE Pass, schedule pickup/delivery, and generate digital certificates.
        </p>
        
        <div style={{textAlign: 'center', marginTop: '1rem'}}>
          <Link to="/" style={{...styles.button, ...styles.primaryButton}}>
            ← Back to Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SimpleMatchesWorking;
