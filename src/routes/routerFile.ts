import express from 'express';
import { getItems, addItem, removeItem, editItem } from 'controllers/file/itemsController';
import { login, logout, register } from 'controllers/file/authController';


const routerFile: express.Router = express.Router();

routerFile.get('/items', getItems);
routerFile.post('/items', addItem);
routerFile.put('/items', editItem);
routerFile.delete('/items', removeItem);
routerFile.post('/login', login);
routerFile.post('/logout', logout);
routerFile.post('/register', register);

export default routerFile;