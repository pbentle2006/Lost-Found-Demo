import React, { useState } from 'react';

const PartnerPortalWorking: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [registrationStep, setRegistrationStep] = useState(1);
  const [partnerData, setPartnerData] = useState({
    companyName: '',
    businessType: '',
    tradeNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    coordinates: { lat: '', lng: '' }
  });
  const [uploadData, setUploadData] = useState({
    itemName: '',
    category: '',
    description: '',
    location: '',
    foundDate: '',
    foundTime: '',
    condition: '',
    images: [] as File[]
  });

  const styles = {
    container: {
      width: '100%',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
      textAlign: 'center' as const
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#2d3748',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#4a5568',
      fontSize: '1.125rem'
    },
    tabContainer: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    },
    tabList: {
      display: 'flex',
      borderBottom: '1px solid #e2e8f0'
    },
    tab: {
      flex: 1,
      padding: '1rem',
      backgroundColor: '#f7fafc',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    activeTab: {
      backgroundColor: '#3182ce',
      color: 'white'
    },
    tabContent: {
      padding: '2rem'
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
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
    successButton: {
      backgroundColor: '#48bb78',
      color: 'white'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem'
    },
    statCard: {
      backgroundColor: '#f7fafc',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      border: '1px solid #e2e8f0',
      textAlign: 'center' as const
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#3182ce',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#4a5568',
      fontSize: '0.875rem'
    },
    uploadArea: {
      border: '2px dashed #cbd5e0',
      borderRadius: '0.5rem',
      padding: '2rem',
      textAlign: 'center' as const,
      backgroundColor: '#f7fafc',
      cursor: 'pointer',
      transition: 'border-color 0.2s'
    },
    uploadAreaHover: {
      borderColor: '#3182ce'
    },
    imagePreview: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '0.5rem',
      marginTop: '1rem'
    },
    previewImage: {
      width: '100px',
      height: '100px',
      objectFit: 'cover' as const,
      borderRadius: '0.375rem',
      border: '1px solid #e2e8f0'
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
    }
  };

  const renderDashboard = () => (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#2d3748' }}>
        Partner Dashboard
      </h2>
      
      <div style={styles.grid}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>47</div>
          <div style={styles.statLabel}>Items Submitted This Month</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>32</div>
          <div style={styles.statLabel}>Successful Matches</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>68%</div>
          <div style={styles.statLabel}>Match Rate</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>4.8/5</div>
          <div style={styles.statLabel}>Citizen Satisfaction</div>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Recent Activity</h3>
        <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
          <div style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
            ✅ Black leather wallet matched and claimed - 2 hours ago
          </div>
          <div style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
            📱 iPhone 13 Pro submitted for matching - 4 hours ago
          </div>
          <div style={{ padding: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
            🎒 Blue backpack successfully returned to owner - 1 day ago
          </div>
          <div style={{ padding: '0.75rem' }}>
            👜 Designer handbag pending verification - 2 days ago
          </div>
        </div>
      </div>
    </div>
  );

  const renderRegistration = () => {
    const renderStep1 = () => (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Company Information</h3>
        
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Company Name *</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Dubai Mall Management"
              value={partnerData.companyName}
              onChange={(e) => setPartnerData(prev => ({ ...prev, companyName: e.target.value }))}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Business Type *</label>
            <select
              style={styles.select}
              value={partnerData.businessType}
              onChange={(e) => setPartnerData(prev => ({ ...prev, businessType: e.target.value }))}
            >
              <option value="">Select business type</option>
              <option value="mall">Shopping Mall</option>
              <option value="hotel">Hotel</option>
              <option value="airport">Airport</option>
              <option value="transport">Transport Hub</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail Store</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Trade License Number *</label>
            <input
              type="text"
              style={styles.input}
              placeholder="CN-1234567"
              value={partnerData.tradeNumber}
              onChange={(e) => setPartnerData(prev => ({ ...prev, tradeNumber: e.target.value }))}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            style={{...styles.button, ...styles.primaryButton}}
            onClick={() => setRegistrationStep(2)}
            disabled={!partnerData.companyName || !partnerData.businessType || !partnerData.tradeNumber}
          >
            Continue
          </button>
        </div>
      </div>
    );

    const renderStep2 = () => (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Contact Information</h3>
        
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Person *</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Ahmed Al Mansouri"
              value={partnerData.contactPerson}
              onChange={(e) => setPartnerData(prev => ({ ...prev, contactPerson: e.target.value }))}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              style={styles.input}
              placeholder="contact@dubaimall.com"
              value={partnerData.email}
              onChange={(e) => setPartnerData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number *</label>
            <input
              type="tel"
              style={styles.input}
              placeholder="+971 4 362 7500"
              value={partnerData.phone}
              onChange={(e) => setPartnerData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            style={{...styles.button, ...styles.secondaryButton}}
            onClick={() => setRegistrationStep(1)}
          >
            Back
          </button>
          <button 
            style={{...styles.button, ...styles.primaryButton}}
            onClick={() => setRegistrationStep(3)}
            disabled={!partnerData.contactPerson || !partnerData.email || !partnerData.phone}
          >
            Continue
          </button>
        </div>
      </div>
    );

    const renderStep3 = () => (
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Location Information</h3>
        
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Business Address *</label>
            <textarea
              style={styles.textarea}
              placeholder="Dubai Mall, Downtown Dubai, Dubai, UAE"
              value={partnerData.address}
              onChange={(e) => setPartnerData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Latitude</label>
              <input
                type="text"
                style={styles.input}
                placeholder="25.197197"
                value={partnerData.coordinates.lat}
                onChange={(e) => setPartnerData(prev => ({ 
                  ...prev, 
                  coordinates: { ...prev.coordinates, lat: e.target.value }
                }))}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Longitude</label>
              <input
                type="text"
                style={styles.input}
                placeholder="55.279503"
                value={partnerData.coordinates.lng}
                onChange={(e) => setPartnerData(prev => ({ 
                  ...prev, 
                  coordinates: { ...prev.coordinates, lng: e.target.value }
                }))}
              />
            </div>
          </div>

          <div style={{
            backgroundColor: '#ebf8ff',
            padding: '1rem',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            color: '#3182ce'
          }}>
            <strong>Location Services:</strong> Accurate coordinates help citizens find your location easily
            and enable precise item-to-location matching for better search results.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            style={{...styles.button, ...styles.secondaryButton}}
            onClick={() => setRegistrationStep(2)}
          >
            Back
          </button>
          <button 
            style={{...styles.button, ...styles.successButton}}
            onClick={() => {
              // Simulate registration completion
              alert('Registration submitted successfully! You will receive approval confirmation within 24 hours.');
              setActiveTab('dashboard');
            }}
            disabled={!partnerData.address}
          >
            Submit Registration
          </button>
        </div>
      </div>
    );

    const renderStepIndicator = () => (
      <div style={styles.stepIndicator}>
        {[1, 2, 3].map((stepNum) => (
          <div
            key={stepNum}
            style={{
              ...styles.stepCircle,
              ...(stepNum === registrationStep ? styles.activeStep : 
                  stepNum < registrationStep ? styles.completedStep : styles.inactiveStep)
            }}
          >
            {stepNum < registrationStep ? '✓' : stepNum}
          </div>
        ))}
      </div>
    );

    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#2d3748' }}>
          Partner Registration
        </h2>
        
        {renderStepIndicator()}
        
        {registrationStep === 1 && renderStep1()}
        {registrationStep === 2 && renderStep2()}
        {registrationStep === 3 && renderStep3()}
      </div>
    );
  };

  const renderItemUpload = () => {
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      setUploadData(prev => ({ ...prev, images: [...prev.images, ...files] }));
    };

    const removeImage = (index: number) => {
      setUploadData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    };

    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#2d3748' }}>
          Submit Found Item
        </h2>

        <div style={styles.form}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Item Name *</label>
              <input
                type="text"
                style={styles.input}
                placeholder="Black leather wallet"
                value={uploadData.itemName}
                onChange={(e) => setUploadData(prev => ({ ...prev, itemName: e.target.value }))}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Category *</label>
              <select
                style={styles.select}
                value={uploadData.category}
                onChange={(e) => setUploadData(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">Select category</option>
                <option value="wallet">Wallet/Purse</option>
                <option value="phone">Mobile Phone</option>
                <option value="keys">Keys</option>
                <option value="bag">Bag/Backpack</option>
                <option value="jewelry">Jewelry</option>
                <option value="electronics">Electronics</option>
                <option value="documents">Documents</option>
                <option value="clothing">Clothing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Detailed Description *</label>
            <textarea
              style={styles.textarea}
              placeholder="Black bi-fold leather wallet, contains Emirates ID and credit cards, small scratch on bottom right corner..."
              value={uploadData.description}
              onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Found Location *</label>
            <input
              type="text"
              style={styles.input}
              placeholder="Food court, near Starbucks, table 15"
              value={uploadData.location}
              onChange={(e) => setUploadData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date Found *</label>
              <input
                type="date"
                style={styles.input}
                value={uploadData.foundDate}
                onChange={(e) => setUploadData(prev => ({ ...prev, foundDate: e.target.value }))}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Time Found *</label>
              <input
                type="time"
                style={styles.input}
                value={uploadData.foundTime}
                onChange={(e) => setUploadData(prev => ({ ...prev, foundTime: e.target.value }))}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Item Condition *</label>
            <select
              style={styles.select}
              value={uploadData.condition}
              onChange={(e) => setUploadData(prev => ({ ...prev, condition: e.target.value }))}
            >
              <option value="">Select condition</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Item Photos *</label>
            <div 
              style={styles.uploadArea}
              onClick={() => document.getElementById('imageUpload')?.click()}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>
                Click to upload photos
              </p>
              <p style={{ margin: '0', fontSize: '0.875rem', color: '#4a5568' }}>
                Upload clear photos from multiple angles (max 5 photos)
              </p>
            </div>
            <input
              id="imageUpload"
              type="file"
              multiple
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            
            {uploadData.images.length > 0 && (
              <div style={styles.imagePreview}>
                {uploadData.images.map((image, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      style={styles.previewImage}
                    />
                    <button
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#e53e3e',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{
          backgroundColor: '#f0fff4',
          border: '1px solid #68d391',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#22543d' }}>🤖 AI Enhancement</h4>
          <p style={{ margin: '0', fontSize: '0.875rem', color: '#22543d' }}>
            Our AI will automatically extract additional features from your photos and description
            to improve matching accuracy. This includes color analysis, brand detection, and
            distinctive feature identification.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            style={{...styles.button, ...styles.primaryButton}}
            onClick={() => {
              // Simulate item submission
              alert('Item submitted successfully! It will be processed by our AI matching system within 5 minutes.');
              // Reset form
              setUploadData({
                itemName: '',
                category: '',
                description: '',
                location: '',
                foundDate: '',
                foundTime: '',
                condition: '',
                images: []
              });
            }}
            disabled={!uploadData.itemName || !uploadData.category || !uploadData.description || 
                     !uploadData.location || !uploadData.foundDate || !uploadData.foundTime || 
                     !uploadData.condition || uploadData.images.length === 0}
          >
            Submit Item
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🏢 Partner Portal</h1>
        <p style={styles.subtitle}>
          Streamlined lost & found management for business partners
        </p>
      </div>

      <div style={styles.tabContainer}>
        <div style={styles.tabList}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'dashboard' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'registration' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('registration')}
          >
            📝 Registration
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'upload' ? styles.activeTab : {})
            }}
            onClick={() => setActiveTab('upload')}
          >
            📤 Submit Item
          </button>
        </div>

        <div style={styles.tabContent}>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'registration' && renderRegistration()}
          {activeTab === 'upload' && renderItemUpload()}
        </div>
      </div>

      <div style={{
        backgroundColor: '#fffaf0',
        border: '1px solid #fed7aa',
        padding: '1rem',
        borderRadius: '0.5rem',
        marginTop: '2rem',
        fontSize: '0.875rem',
        color: '#744210'
      }}>
        <strong>Demo Mode:</strong> This showcases the complete partner ecosystem including registration,
        item submission with AI enhancement, and performance analytics. In production, this integrates
        with partner management systems, payment processing, and automated compliance monitoring.
      </div>
    </div>
  );
};

export default PartnerPortalWorking;
