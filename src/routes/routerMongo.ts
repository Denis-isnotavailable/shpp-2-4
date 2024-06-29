import express from 'express';
import { getItems, addItem, removeItem, editItem } from 'controllers/mongo/itemsController';
import { login, logout, register } from 'controllers/mongo/authController';


const routerMongo: express.Router = express.Router();

routerMongo.get('/items', getItems);
routerMongo.post('/items', addItem);
routerMongo.put('/items', editItem);
routerMongo.delete('/items', removeItem);
routerMongo.post('/register', register);
routerMongo.post('/login', login);
routerMongo.post('/logout', logout);


routerMongo.post('/', (req, res) => {
    
    switch (req.query.action) {        
        case 'getItems': {
            getItems(req, res)
            break;
        }
        case 'createItem': {
            addItem(req, res)
            break;
        }
        case 'deleteItem': {
            removeItem(req, res)
            break;
        }        
        case 'editItem': {
            editItem(req, res)
            break;
        }
        case 'register': {
            register(req, res)
            break;
        }
        case 'login': {
            login(req, res)
            break;
        }
        case 'logout': {
            logout(req, res)
            break;
        }        
        default: res.status(400).json({ error: 'Forbidden request' })
    }
});

export default routerMongo;