import Menu from '../models/Menu.js';
import Item from '../models/Item.js';

// ✅ Create new menu
export const createMenu = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const menu = new Menu({ name, description });
    await menu.save();

    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create menu', error: error.message });
  }
};

// ✅ Get all menus
export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate('items');
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menus', error: error.message });
  }
};

// ✅ Get single menu with its items
export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('items');
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get menu', error: error.message });
  }
};

// ✅ Add item to a menu
export const addItemToMenu = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || price == null) {
      return res.status(400).json({ message: 'Name, description, and price are required' });
    }

    const item = new Item({ name, description, price });
    await item.save();

    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    menu.items.push(item._id);
    await menu.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item', error: error.message });
  }
};

// ✅ Update an existing menu
export const updateMenu = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updated = await Menu.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update menu', error: error.message });
  }
};

// ✅ Delete a menu
export const deleteMenu = async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete menu', error: error.message });
  }
};

// ✅ Delete a specific item from a menu
export const deleteItemFromMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    menu.items = menu.items.filter(
      (itemId) => itemId.toString() !== req.params.itemId
    );
    await menu.save();

    await Item.findByIdAndDelete(req.params.itemId);

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error: error.message });
  }
};
