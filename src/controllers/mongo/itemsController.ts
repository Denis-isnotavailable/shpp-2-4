import { Request, Response } from 'express';
import UserMongo from '../../models/modelMongo';

export const getItems = async (req: Request, res: Response) => {
    try {  
        const login = req.session.login;        

        if (!login) {
            res.status(403).json({ error: "forbidden" });
        } else {
            const user = await UserMongo.findOne({ login });
    
            res.status(200).json({ status: 'success', items: user?.items || [] });
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ status: 'error'});
    }
}

export const addItem = async (req: Request, res: Response) => {
    try {
        const login = req.session.login;        
        const { text } = req.body;

        if (!login) {
            res.status(403).json({ error: "forbidden" });
        } else if (!text) {
            res.status(404).json({ status: 'error', message: "Text Not found" });
        } else {
            const id = Math.random().toString();
            await UserMongo.findOneAndUpdate(
                { login },
                { $push: { items: { id, text, checked: false } } },
                { new: true }
            );
    
            res.status(201).json({ id });
        }

    } catch (e) {
        res.status(404).json({ status: 'error', message: "Not found" });
        console.error(e);
    }
};

export const removeItem = async (req: Request, res: Response) => {
    try {
        const login = req.session.login;
        const { id } = req.body;

        if (!login) {
            res.status(403).json({ error: "forbidden" });
        } else if (!id) {
            res.status(404).json({ status: 'error', message: "ID Not found" });
        } else {
            await UserMongo.findOneAndUpdate(
                { login, "items.id": id },
                { $pull: { items: { id } } }
            );
        
            res.status(200).json({ status: 'success', ok: true });
        }

    } catch (e) {
        res.status(404).json({ status: 'error', message: "Not found" });
        console.error(e);
    }
};

export const editItem = async (req: Request, res: Response) => {
    try {        
        const login = req.session.login;
        const item = req.body;

        if (!login) {
            res.status(403).json({ error: "forbidden" });
        } else if (!item) {
            res.status(404).json({ status: 'error', message: "Item Not found" });
        } else {
            await UserMongo.findOneAndUpdate(
                { login, "items.id": item.id },
                { $set: { "items.$": item } }
            );
        
            res.status(200).json({ status: 'success', ok: true });
        }

    } catch (e) {
        res.status(404).json({ status: 'error', message: "Not found" });
        console.error(e);
    }
};