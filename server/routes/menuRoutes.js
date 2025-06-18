import express from 'express';
import {
  createMenu,
  getMenus,
  getMenuById,
  addItemToMenu,
  updateMenu,
  deleteMenu,
  deleteItemFromMenu
} from '../controllers/menuController.js';

const router = express.Router();

// @route   POST /api/menus
// @desc    Create a new menu
router.post('/', createMenu);

// @route   GET /api/menus
// @desc    Get all menus
router.get('/', getMenus);

// @route   GET /api/menus/:id
// @desc    Get a single menu by ID (including items)
router.get('/:id', getMenuById);

// @route   PUT /api/menus/:id
// @desc    Update a menu
router.put('/:id', updateMenu);

// @route   DELETE /api/menus/:id
// @desc    Delete a menu
router.delete('/:id', deleteMenu);

// @route   POST /api/menus/:id/items
// @desc    Add a new item to a specific menu
router.post('/:id/items', addItemToMenu);

// @route   DELETE /api/menus/:id/items/:itemId
// @desc    Delete a specific item from a menu
router.delete('/:id/items/:itemId', deleteItemFromMenu);

export default router;
