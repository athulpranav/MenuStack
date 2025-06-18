import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Menu {
  _id: string;
  name: string;
  description: string;
}

const HomePage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get<Menu[]>('http://localhost:5000/api/menus');
      setMenus(res.data);
    } catch (err) {
      console.error('Error fetching menus:', err);
    }
  };

  const handleCreate = async () => {
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Both fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/menus', formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchMenus();
    } catch (err) {
      console.error('Error creating menu:', err);
    }
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 24px',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
    },
    heading: {
      fontSize: '32px',
      fontWeight: 600,
      color: '#111827',
    },
    primaryBtn: {
      backgroundColor: '#2563eb',
      color: '#fff',
      padding: '12px 20px',
      fontSize: '15px',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(37, 99, 235, 0.3)',
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      marginBottom: '36px',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      marginBottom: '16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '15px',
      backgroundColor: '#f9fafb',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
    },
    card: (hover: boolean) => ({
      border: '1px solid #e5e7eb',
      borderRadius: '14px',
      padding: '20px',
      background: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.25s ease',
      boxShadow: hover
        ? '0 6px 18px rgba(0, 0, 0, 0.1)'
        : '0 1px 6px rgba(0, 0, 0, 0.04)',
      transform: hover ? 'translateY(-4px)' : 'none',
    }),
    cardTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#111827',
      marginBottom: '6px',
    },
    cardText: {
      color: '#6b7280',
      fontSize: '14px',
      lineHeight: '1.5',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Menu Board</h1>
        <button style={styles.primaryBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Menu'}
        </button>
      </div>

      {showForm && (
        <div style={styles.form}>
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
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
          />
          <button style={styles.primaryBtn} onClick={handleCreate}>
            Create Menu
          </button>
        </div>
      )}

      <div style={styles.grid}>
        {menus.map((menu) => (
          <div
            key={menu._id}
            style={styles.card(hoveredCard === menu._id)}
            onClick={() => navigate(`/menus/${menu._id}`)}
            onMouseEnter={() => setHoveredCard(menu._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 style={styles.cardTitle}>{menu.name}</h3>
            <p style={styles.cardText}>{menu.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
