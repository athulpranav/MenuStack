import React from 'react';

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface Props {
  item: Item;
}

const ItemCard = ({ item }: Props) => {
  const styles = {
    card: {
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
      backgroundColor: '#fff',
      width: '100%',
      maxWidth: '300px',
      transition: 'transform 0.2s ease',
    } as React.CSSProperties,

    name: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '6px',
      color: '#111827',
    } as React.CSSProperties,

    price: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#16a34a',
      marginBottom: '8px',
    } as React.CSSProperties,

    description: {
      fontSize: '14px',
      color: '#6b7280',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.card}>
      <div style={styles.name}>{item.name}</div>
      <div style={styles.price}>₹{item.price.toFixed(2)}</div>
      <div style={styles.description}>{item.description}</div>
    </div>
  );
};

export default ItemCard;
