import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleDemoWorking: React.FC = () => {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [itemData, setItemData] = useState({
    item: '',
    description: '',
    location: '',
    date: '',
    uniqueFeatures: '',
    itemType: ''
  });
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hi there! I\'m your AI assistant, and I\'m here to help you find your lost item. I know losing something important can be stressful, so let\'s work together to get it back. What did you lose?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  // Enhanced natural conversation flow
  const getAIResponse = (userResponse: string, currentStep: number) => {
    const responses = [
      // Step 0: Initial item identification with empathy
      () => {
        const item = userResponse.toLowerCase();
        setItemData(prev => ({ ...prev, item: userResponse, itemType: item }));
        
        if (item.includes('phone') || item.includes('mobile')) {
          return 'Oh no, losing your phone is really inconvenient! Let me help you find it. Can you tell me what brand and model it is? Also, does it have a case, screen protector, or any stickers on it?';
        } else if (item.includes('wallet') || item.includes('purse')) {
          return 'I understand how worrying it must be to lose your wallet. Let\'s get it back to you quickly. What color is it, and what material is it made of? Does it have any distinctive features like logos, patterns, or wear marks?';
        } else if (item.includes('key') || item.includes('keys')) {
          return 'Keys can be tricky to describe, but every set is unique! How many keys are on the keychain? Are there any distinctive keychains, tags, or accessories attached? Maybe a car key fob or gym membership card?';
        } else if (item.includes('bag') || item.includes('backpack')) {
          return 'Bags often have lots of identifying features. What color and size is it? Does it have any logos, patches, stickers, or distinctive wear patterns? Are there any items inside that might help identify it?';
        } else {
          return `I see you lost your ${userResponse}. Every item has unique characteristics that help us identify it. Can you describe what it looks like? Think about color, size, brand, and any special features or markings it might have.`;
        }
      },
      
      // Step 1: Deep dive into unique features
      () => {
        setItemData(prev => ({ ...prev, description: userResponse }));
        const item = itemData.itemType;
        
        if (item.includes('phone')) {
          return 'Great details! Now, does your phone have any cracks, scratches, or dents? Any custom wallpaper or apps on the home screen? Sometimes people remember if they had a specific photo as their lock screen too.';
        } else if (item.includes('wallet')) {
          return 'Perfect! Those details will help a lot. Does your wallet have any cards sticking out, receipts, or photos visible? Is it worn in any particular spots from being in your pocket or bag?';
        } else {
          return 'Excellent description! Now, are there any small details that make it uniquely yours? Things like scratches, stickers, wear patterns, or even how you\'ve customized or used it? These personal touches are often the best identifiers.';
        }
      },
      
      // Step 2: Location with context
      () => {
        setItemData(prev => ({ ...prev, uniqueFeatures: userResponse }));
        return 'Those unique details are really helpful - they\'ll make identification much easier! Now, let\'s narrow down where you might have lost it. Can you walk me through your day? Where were you when you last remember having it, and what were you doing at the time?';
      },
      
      // Step 3: Time and final search
      () => {
        setItemData(prev => ({ ...prev, location: userResponse }));
        return 'Perfect! That gives us a great search area. One last question - approximately what time was this, and have you been back to check that location? Sometimes items get moved to lost and found desks or security offices nearby.';
      },
      
      // Step 4: Initiate search
      () => {
        setItemData(prev => ({ ...prev, date: userResponse }));
        return 'Excellent! I have all the information I need. Let me search our comprehensive database of found items from that area and timeframe. I\'ll use AI to match your description with items that have been turned in. This should just take a moment...';
      }
    ];
    
    return responses[currentStep]();
  };

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text: userInput }]);
    
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response = getAIResponse(userInput, step);
        setMessages(prev => [...prev, { type: 'ai', text: response }]);
        
        if (step === 4) {
          setTimeout(() => navigate('/matches/demo-item'), 2500);
        } else {
          setStep(step + 1);
        }
      }, Math.random() * 1000 + 1500); // Variable typing delay for realism
    }, 500);
    
    setUserInput('');
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
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    title: {
      color: '#3182ce',
      marginBottom: '1rem',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center' as const
    },
    chatBox: {
      border: '1px solid #e2e8f0',
      borderRadius: '0.5rem',
      padding: '1rem',
      minHeight: '400px',
      marginBottom: '1rem',
      backgroundColor: '#f7fafc'
    },
    message: {
      marginBottom: '1rem',
      padding: '0.75rem',
      borderRadius: '0.375rem',
      maxWidth: '80%'
    },
    aiMessage: {
      backgroundColor: '#ebf8ff',
      color: '#2d3748',
      marginRight: 'auto'
    },
    userMessage: {
      backgroundColor: '#3182ce',
      color: 'white',
      marginLeft: 'auto'
    },
    inputContainer: {
      display: 'flex',
      gap: '0.75rem'
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.375rem',
      fontSize: '1rem'
    },
    button: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#3182ce',
      color: 'white',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500'
    },
    progress: {
      textAlign: 'center' as const,
      color: '#4a5568',
      fontSize: '0.875rem',
      marginBottom: '1rem'
    },
    typing: {
      fontStyle: 'italic',
      color: '#718096',
      fontSize: '0.875rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Lost Item Report - AI Assistant</h1>
        
        <div style={styles.chatBox}>
          {messages.map((message, index) => (
            <div 
              key={index}
              style={{
                ...styles.message,
                ...(message.type === 'ai' ? styles.aiMessage : styles.userMessage)
              }}
            >
              {message.text}
            </div>
          ))}
          
          {isTyping && (
            <div style={{...styles.message, ...styles.aiMessage, ...styles.typing}}>
              AI is typing...
            </div>
          )}
        </div>
        
        <div style={styles.progress}>
          Step {step + 1} of 5 - {step < 4 ? 'Gathering details' : 'Ready to search'}
        </div>
        
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your response..."
            style={styles.input}
          />
          <button 
            onClick={handleSubmit}
            style={styles.button}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#2c5aa0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#3182ce';
            }}
          >
            Send
          </button>
        </div>
        
        <div style={{
          padding: '1rem',
          backgroundColor: '#fef5e7',
          borderRadius: '0.5rem',
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#744210'
        }}>
          <strong>Demo Mode:</strong> This showcases the conversational AI intake process. 
          The full system includes photo upload, smart matching, and real-time partner integrations.
        </div>
      </div>
    </div>
  );
};

export default SimpleDemoWorking;
