import { Request, Response } from 'express';
import { loginService, registerService } from 'services/file/authService';

// Register
export const register = async (req: Request, res: Response) => {
    try {       
        const { login, pass } = req.body;

        if (!login || !pass) {
            res.status(401).json({ error: 'Enter Login and password' });
            return;
        }

        await registerService(login, pass);

        req.session.login = login;
        res.status(200).json({ ok: true });

    } catch (e) {
        res.status(500).json({ status: 'error'});;
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { login, pass } = req.body;

        if (!login || !pass) {
            res.status(401).json({ error: 'Enter Login and password' });
            return;
        }

        const user = await loginService(login);

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