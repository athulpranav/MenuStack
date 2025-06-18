import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface Menu {
  _id: string;
  name: string;
  description: string;
  items: Item[];
}

const MenuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [menu, setMenu] = useState<Menu | null>(null);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });
  const [editMode, setEditMode] = useState(false);
  const [editMenuData, setEditMenuData] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get<Menu>(`http://localhost:5000/api/menus/${id}`);
      setMenu(res.data);
      setEditMenuData({ name: res.data.name, description: res.data.description });
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name.trim() || !newItem.description.trim() || !newItem.price) {
      alert('All fields are required.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/menus/${id}/items`, {
        ...newItem,
        price: parseFloat(newItem.price),
      });
      setNewItem({ name: '', description: '', price: '' });
      fetchMenu();
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/menus/${id}/items/${itemId}`);
      fetchMenu();
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleUpdateMenu = async () => {
    try {
      await axios.put(`http://localhost:5000/api/menus/${id}`, editMenuData);
      setEditMode(false);
      fetchMenu();
    } catch (error) {
      console.error('Failed to update menu:', error);
    }
  };

  if (!menu) return <p style={{ padding: '20px' }}>Loading...</p>;

  return (
    <div style={{ padding: '24px', fontFamily: 'Segoe UI, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '8px 14px',
          background: '#374151',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        ← Back
      </button>

      {/* Menu Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {editMode ? (
          <>
            <input
              value={editMenuData.name}
              onChange={(e) => setEditMenuData({ ...editMenuData, name: e.target.value })}
              style={{ fontSize: '24px', padding: '6px 10px', width: '300px' }}
            />
            <button onClick={handleUpdateMenu} style={{ background: 'green', color: '#fff', padding: '8px 14px' }}>
              Save
            </button>
          </>
        ) : (
          <>
            <h2>{menu.name}</h2>
            <button
              onClick={() => setEditMode(true)}
              style={{ background: '#2563eb', color: '#fff', padding: '8px 14px', border: 'none' }}
            >
              Edit Menu
            </button>
          </>
        )}
      </div>

      {editMode ? (
        <textarea
          value={editMenuData.description}
          onChange={(e) => setEditMenuData({ ...editMenuData, description: e.target.value })}
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
        />
      ) : (
        <p>{menu.description}</p>
      )}

      <hr style={{ margin: '20px 0' }} />

      {/* Add New Item Section */}
      <h3>Add New Item</h3>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <textarea
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={handleAddItem} style={{ background: '#10b981', color: '#fff', padding: '8px 16px' }}>
        Add Item
      </button>

      {/* Menu Items */}
      <h3 style={{ marginTop: '30px' }}>Menu Items</h3>
      {menu.items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {menu.items.map((item) => (
            <li
              key={item._id}
              style={{
                padding: '12px',
                marginBottom: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
              }}
            >
              <strong>{item.name}</strong> – ₹{item.price}
              <p style={{ margin: '6px 0' }}>{item.description}</p>
              <button
                onClick={() => handleDeleteItem(item._id)}
                style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuDetails;
