import { useState } from 'react';

interface Props {
  onSubmit: (formData: { name: string; description: string }) => void;
  onCancel: () => void;
}

const MenuForm = ({ onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Both fields are required.');
      return;
    }
    onSubmit(formData);
    setFormData({ name: '', description: '' });
  };

  const styles = {
    wrapper: {
      backgroundColor: '#f9fafb',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      maxWidth: '400px',
      margin: '0 auto 32px auto',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '12px',
      fontSize: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
    },
    buttonPrimary: {
      backgroundColor: '#2563eb',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      fontSize: '15px',
      borderRadius: '8px',
      cursor: 'pointer',
    },
    buttonSecondary: {
      backgroundColor: '#f3f4f6',
      color: '#111827',
      border: 'none',
      padding: '10px 16px',
      fontSize: '15px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginLeft: '12px',
    },
  };

  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        placeholder="Menu Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        style={styles.input}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
      />
      <div>
        <button style={styles.buttonPrimary} onClick={handleSubmit}>
          Create Menu
        </button>
        <button style={styles.buttonSecondary} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MenuForm;
