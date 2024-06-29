import { Request, Response } from 'express';
import UserMongo from '../../models/modelMongo';

// Register
export const register = async (req: Request, res: Response) => {
    try {       
        const { login, pass } = req.body;

        if (!login || !pass) {
            res.status(401).json({ error: 'Enter Login and password' });
            return;
        }
        
        const user = await UserMongo.findOne({ login });

        if (user) {
            res.status(400).send({ error: `User with login '${login}' already exist` });
        } else {
            await UserMongo.create({ login, pass, items: [] })

            req.session.login = login;
            res.status(200).json({ ok: true });
        }

    } catch (e) {
        res.status(500).json({ status: 'error'});;
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { login, pass } = req.body;

        if (!login || !pass) {
            res.status(401).json({ error: 'Enter Login and password' });
            return;
        }

        const user = await UserMongo.findOne({ login });

        if (!user) {
            res.status(401).json({ error: 'User not found' });
        } else if (user.pass !== pass) {
            res.status(401).json({ error: 'Incorrect password' });
        } else {
            req.session.login = login;
            res.status(200).json({ ok: true });
        }

    } catch (e) {
        res.status(500).json({ status: 'error'});;
    }
};

// Logout
export const logout = async (req: Request, res: Response) => {
    try {
        req.session.destroy(() => {})
        res.status(200).json({ ok: true });

    } catch (e) {
        res.status(500).json({ status: 'error'});;
    }
};