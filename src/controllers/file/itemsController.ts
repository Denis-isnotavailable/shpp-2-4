import { Request, Response } from 'express';
import { Item } from 'models/modelFile';
import { addItemService, deleteItemService, editItemService, getAllItemsService } from 'services/file/itemsService';

// GET ALL
export const getItems = async (req: Request, res: Response) => {
    try {
        const login = req.session.login;        

        if (!login) {
            res.status(403).json({ error: "forbidden" });
        } else {
            const items = await getAllItemsService(login);
    
            res.status(200).json({ status: 'success', items });
        }        

    } catch (e) {
        res.status(500).json({ status: 'error'});
    }
};

// ADD ITEM
export const addItem = async (req: Request, res: Response) => {
    try {
        const login = req.session.login;        
        const { text } = req.body;

        if (!login) {
            res.status(403).json({ error: "forbidden" });
        } else if (!text) {
            res.status(404).json({ status: 'error', message: "Text Not found" });
        } else {
            const itemToAdd = await addItemService(login, text);
    
            res.status(201).json({id: itemToAdd.id });
        }

    } catch (e) {
        res.status(404).json({ status: 'error', message: "Not found" });
        console.error(e);
    }
};

// DELETE ITEM
export const removeItem = async (req: Request, res: Response) => {
    try {
        const login = req.session.login;
        const { id } = req.body;

        if (!login) {
            res.status(403).json({ error: "forbidden" });
        } else if (!id) {
            res.status(404).json({ status: 'error', message: "ID Not found" });
        } else {
            const items = await deleteItemService(login, id);
    
            if (!items) {
                res.status(404).json({ status: 'error', message: "Item Not found"})
            }
        
            res.status(200).json({ status: 'success', ok: true });
        }

    } catch (e) {
        res.status(404).json({ status: 'error', message: "Not found" });
        console.error(e);
    }
};

// EDIT ITEM
export const editItem = async (req: Request, res: Response) => {
    try {        
        const login = req.session.login;
        const item: Item = req.body;

        if (!login) {
            res.status(403).json({ error: "forbidden" });
        } else if (!item) {
            res.status(404).json({ status: 'error', message: "Item Not found" });
        } else {
            const items = await editItemService(login, item);    

            if (!items) {
                res.status(404).json({ status: 'error', message: "Not found"})
            }
        
            res.status(200).json({ status: 'success', ok: true });
        }

    } catch (e) {
        res.status(404).json({ status: 'error', message: "Not found" });
        console.error(e);
    }
};