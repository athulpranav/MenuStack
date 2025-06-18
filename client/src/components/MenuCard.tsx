import { useNavigate } from 'react-router-dom';

interface Menu {
  _id: string;
  name: string;
  description: string;
}

interface Props {
  menu: Menu;
}

const MenuCard = ({ menu }: Props) => {
  const navigate = useNavigate();

  const styles = {
    card: {
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '20px',
      width: '280px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    } as React.CSSProperties,
    title: {
      fontSize: '18px',
      fontWeight: 600,
      marginBottom: '8px',
      color: '#1f2937',
    },
    description: {
      fontSize: '14px',
      color: '#4b5563',
      lineHeight: '1.4',
    },
  };

  const handleClick = () => {
    navigate(`/menus/${menu._id}`);
  };

  return (
    <div
      style={styles.card}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
      }}
    >
      <h3 style={styles.title}>{menu.name}</h3>
      <p style={styles.description}>{menu.description}</p>
    </div>
  );
};

export default MenuCard;
