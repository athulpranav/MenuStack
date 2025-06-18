import { useState } from 'react';

interface Props {
  onSubmit: (item: { name: string; description: string; price: number }) => void;
  onCancel: () => void;
}

const ItemForm = ({ onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.price.trim()) {
      alert('All fields are required.');
      return;
    }
    onSubmit({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
    });
    setFormData({ name: '', description: '', price: '' });
  };

  const styles = {
    wrapper: {
      backgroundColor: '#f9fafb',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      maxWidth: '400px',
      margin: '0 auto 32px auto',
    } as React.CSSProperties,
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '12px',
      fontSize: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
    } as React.CSSProperties,
    buttonPrimary: {
      backgroundColor: '#2563eb',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      fontSize: '15px',
      borderRadius: '8px',
      cursor: 'pointer',
    } as React.CSSProperties,
    buttonSecondary: {
      backgroundColor: '#f3f4f6',
      color: '#111827',
      border: 'none',
      padding: '10px 16px',
      fontSize: '15px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginLeft: '12px',
    } as React.CSSProperties,
    buttonContainer: {
      display: 'flex',
      gap: '12px',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        placeholder="Item Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        style={styles.input}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        style={styles.input}
      />
      <div style={styles.buttonContainer}>
        <button style={styles.buttonPrimary} onClick={handleSubmit}>
          Add Item
        </button>
        <button style={styles.buttonSecondary} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ItemForm;
