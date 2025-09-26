import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClaimProcess: React.FC = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [claimData, setClaimData] = useState({
    identityVerified: false,
    contactPhone: '',
    contactEmail: '',
    preferredCollection: 'pickup',
    collectionTime: '',
    additionalNotes: ''
  });

  // Mock match data
  const matchData = {
    id: matchId,
    item: 'Black Leather Wallet',
    confidence: 94,
    location: 'Dubai Mall - Food Court',
    foundBy: 'Dubai Mall Security',
    partnerContact: '+971 4 362 7500',
    partnerAddress: 'Dubai Mall, Downtown Dubai, Dubai',
    securityOffice: 'Level LG, Security Office near Fountain Entrance',
    openingHours: 'Daily: 10:00 AM - 12:00 AM',
    referenceNumber: 'DM-2024-001234',
    foundDate: 'Today, 2:30 PM',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&crop=center'
  };

  const styles = {
    container: {
      width: '100%',
      maxWidth: '800px',
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
      color: '#2d3748',
      marginBottom: '1rem',
      textAlign: 'center' as const
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem'
    },
    stepCircle: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 0.5rem',
      fontSize: '1rem',
      fontWeight: 'bold'
    },
    activeStep: {
      backgroundColor: '#3182ce',
      color: 'white'
    },
    completedStep: {
      backgroundColor: '#48bb78',
      color: 'white'
    },
    inactiveStep: {
      backgroundColor: '#e2e8f0',
      color: '#a0aec0'
    },
    matchInfo: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      padding: '1rem',
      backgroundColor: '#f7fafc',
      borderRadius: '0.5rem',
      border: '1px solid #e2e8f0'
    },
    matchImage: {
      width: '120px',
      height: '90px',
      objectFit: 'cover' as const,
      borderRadius: '0.375rem'
    },
    matchDetails: {
      flex: 1
    },
    badge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      backgroundColor: '#c6f6d5',
      color: '#22543d',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },
    form: {
      marginBottom: '2rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#2d3748'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      backgroundColor: 'white'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem',
      minHeight: '100px',
      resize: 'vertical' as const
    },
    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      marginRight: '0.75rem'
    },
    primaryButton: {
      backgroundColor: '#3182ce',
      color: 'white'
    },
    secondaryButton: {
      backgroundColor: '#f7fafc',
      color: '#4a5568',
      border: '1px solid #e2e8f0'
    },
    successCard: {
      backgroundColor: '#f0fff4',
      border: '2px solid #68d391',
      padding: '2rem',
      borderRadius: '0.5rem',
      textAlign: 'center' as const
    },
    infoSection: {
      backgroundColor: '#ebf8ff',
      padding: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '1rem'
    },
    mapPlaceholder: {
      width: '100%',
      height: '200px',
      backgroundColor: '#f7fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4a5568',
      fontSize: '1rem',
      marginBottom: '1rem'
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate claim submission
    setStep(4);
  };

  const renderStepIndicator = () => (
    <div style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((stepNum) => (
        <div
          key={stepNum}
          style={{
            ...styles.stepCircle,
            ...(stepNum === step ? styles.activeStep : 
                stepNum < step ? styles.completedStep : styles.inactiveStep)
          }}
        >
          {stepNum < step ? '✓' : stepNum}
        </div>
      ))}
    </div>
  );

  const renderMatchInfo = () => (
    <div style={styles.matchInfo}>
      <img 
        src={matchData.image} 
        alt={matchData.item}
        style={styles.matchImage}
      />
      <div style={styles.matchDetails}>
        <div style={styles.badge}>{matchData.confidence}% Match</div>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 'bold' }}>
          {matchData.item}
        </h3>
        <p style={{ margin: '0', fontSize: '0.875rem', color: '#4a5568' }}>
          <strong>Found at:</strong> {matchData.location}<br/>
          <strong>Reference:</strong> {matchData.referenceNumber}
        </p>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div>
      <h2 style={styles.title}>Identity Verification</h2>
      {renderMatchInfo()}
      
      <div style={styles.infoSection}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#3182ce' }}>🔐 UAE Pass Integration</h4>
        <p style={{ margin: '0', fontSize: '0.875rem', color: '#4a5568' }}>
          For security and compliance, we need to verify your identity before releasing the item.
          This ensures only the rightful owner can claim lost property.
        </p>
      </div>

      <div style={styles.form}>
        <div style={{
          padding: '2rem',
          backgroundColor: '#f7fafc',
          border: '2px dashed #cbd5e0',
          borderRadius: '0.5rem',
          textAlign: 'center' as const
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🇦🇪</div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#2d3748' }}>UAE Pass Verification</h3>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#4a5568' }}>
            Click below to verify your identity using UAE Pass
          </p>
          <button 
            style={{...styles.button, ...styles.primaryButton}}
            onClick={() => {
              // Simulate UAE Pass verification
              setTimeout(() => {
                setClaimData(prev => ({ ...prev, identityVerified: true }));
                handleNext();
              }, 2000);
            }}
          >
            Verify with UAE Pass
          </button>
        </div>
      </div>

      <div style={{
        fontSize: '0.875rem',
        color: '#4a5568',
        backgroundColor: '#fffaf0',
        padding: '1rem',
        borderRadius: '0.5rem',
        border: '1px solid #fed7aa'
      }}>
        <strong>Demo Mode:</strong> In production, this integrates with UAE Pass for secure identity verification.
        The system validates Emirates ID and cross-references with item description details.
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 style={styles.title}>Contact Information</h2>
      {renderMatchInfo()}

      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number *</label>
          <input
            type="tel"
            style={styles.input}
            placeholder="+971 50 123 4567"
            value={claimData.contactPhone}
            onChange={(e) => setClaimData(prev => ({ ...prev, contactPhone: e.target.value }))}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address *</label>
          <input
            type="email"
            style={styles.input}
            placeholder="your.email@example.com"
            value={claimData.contactEmail}
            onChange={(e) => setClaimData(prev => ({ ...prev, contactEmail: e.target.value }))}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Additional Notes (Optional)</label>
          <textarea
            style={styles.textarea}
            placeholder="Any additional information that might help verify ownership..."
            value={claimData.additionalNotes}
            onChange={(e) => setClaimData(prev => ({ ...prev, additionalNotes: e.target.value }))}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{...styles.button, ...styles.secondaryButton}} onClick={handleBack}>
          Back
        </button>
        <button 
          style={{...styles.button, ...styles.primaryButton}}
          onClick={handleNext}
          disabled={!claimData.contactPhone || !claimData.contactEmail}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 style={styles.title}>Collection Arrangement</h2>
      {renderMatchInfo()}

      <div style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Collection Method *</label>
          <select
            style={styles.select}
            value={claimData.preferredCollection}
            onChange={(e) => setClaimData(prev => ({ ...prev, preferredCollection: e.target.value }))}
          >
            <option value="pickup">Pick up from location</option>
            <option value="delivery">Home delivery (AED 25)</option>
            <option value="courier">Courier service (AED 15)</option>
          </select>
        </div>

        {claimData.preferredCollection === 'pickup' && (
          <div>
            <div style={styles.infoSection}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#3182ce' }}>📍 Collection Location</h4>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>
                <strong>{matchData.foundBy}</strong><br/>
                {matchData.partnerAddress}<br/>
                {matchData.securityOffice}
              </p>
              <p style={{ margin: '0', fontSize: '0.875rem', color: '#4a5568' }}>
                <strong>Hours:</strong> {matchData.openingHours}<br/>
                <strong>Contact:</strong> {matchData.partnerContact}
              </p>
            </div>

            <div style={styles.mapPlaceholder}>
              🗺️ Interactive Map (Dubai Mall Location)
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Preferred Collection Time</label>
              <select
                style={styles.select}
                value={claimData.collectionTime}
                onChange={(e) => setClaimData(prev => ({ ...prev, collectionTime: e.target.value }))}
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning (10:00 AM - 12:00 PM)</option>
                <option value="afternoon">Afternoon (12:00 PM - 6:00 PM)</option>
                <option value="evening">Evening (6:00 PM - 10:00 PM)</option>
                <option value="anytime">Anytime during opening hours</option>
              </select>
            </div>
          </div>
        )}

        {claimData.preferredCollection === 'delivery' && (
          <div style={styles.infoSection}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#3182ce' }}>🚚 Home Delivery</h4>
            <p style={{ margin: '0', fontSize: '0.875rem', color: '#4a5568' }}>
              Items will be delivered to your registered address within 24-48 hours.
              Delivery fee: AED 25 (payable on delivery)
            </p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{...styles.button, ...styles.secondaryButton}} onClick={handleBack}>
          Back
        </button>
        <button style={{...styles.button, ...styles.primaryButton}} onClick={handleSubmit}>
          Submit Claim
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.successCard}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
      <h2 style={{ margin: '0 0 1rem 0', color: '#22543d', fontSize: '1.5rem' }}>
        Claim Submitted Successfully!
      </h2>
      
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        textAlign: 'left' as const
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Next Steps:</h3>
        <ul style={{ margin: '0', paddingLeft: '1.5rem', color: '#4a5568' }}>
          <li>You'll receive SMS confirmation within 5 minutes</li>
          <li>Partner will prepare your item for collection</li>
          <li>Bring valid Emirates ID for final verification</li>
          <li>Reference number: <strong>{matchData.referenceNumber}</strong></li>
        </ul>
      </div>

      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap' as const
      }}>
        <button 
          style={{...styles.button, ...styles.primaryButton}}
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
        <button 
          style={{...styles.button, ...styles.secondaryButton}}
          onClick={() => window.print()}
        >
          Print Receipt
        </button>
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#ebf8ff',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        color: '#3182ce'
      }}>
        <strong>Demo Complete!</strong> This showcases the complete citizen journey from discovery to collection.
        In production, this integrates with payment gateways, SMS services, and partner management systems.
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {renderStepIndicator()}
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default ClaimProcess;
