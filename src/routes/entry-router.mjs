import { Router } from 'express';
const router = Router();
import { getAllEntries, getEntryById, updateEntryById, deleteEntryById } from '../controllers/entry-controller.mjs';

router.get('/', getAllEntries);
router.get('/:id', getEntryById);
router.put('/:id', updateEntryById);
router.delete('/:id', deleteEntryById);

export default router;
