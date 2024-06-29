import fs from 'fs';
import { User } from 'models/modelFile';
import { getUserByLoginService } from './itemsService';

const path: string = 'src/db/items.json';

export const loginService = async (login: string) => {    
    return await getUserByLoginService(login);
}

export const registerService = async (login: string, pass: string) => {
    const newUser: User = { login, pass, items: [] };
    const users = JSON.parse(fs.readFileSync(path, 'utf8'));

    const isExist = users.some((user: User) => user.login === login);

    if (isExist) throw new Error("Such an User is already exists") 

    users.push(newUser);
    fs.writeFileSync(path, JSON.stringify(users), "utf-8");
}