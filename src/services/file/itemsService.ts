import fs from 'fs';
import { Item, User } from 'models/modelFile';

const path: string = 'src/db/items.json';

export const getUserByLoginService = async (login: string) => {
    const users = JSON.parse(fs.readFileSync(path, 'utf8'));    
    
    const user = users.find((user: User) => user.login === login);

    return user;
}

export const getAllItemsService = async (login: string) => { 
    const user = await getUserByLoginService(login); 
    const items = user?.items;
    
    return items;
}

export const addItemService = async (login: string, text: string) => { 
    const users = JSON.parse(fs.readFileSync(path, 'utf8'));
    const indexUser = users.findIndex((user: User) => user.login === login);
    
    const id = Math.random().toString();
    const itemToAdd = { text, checked: false, id };

    users[indexUser].items.push(itemToAdd);
    fs.writeFileSync(path, JSON.stringify(users), "utf-8");
    
    return itemToAdd;    
}

export const deleteItemService = async (login: string, itemId: string) => {
    const users = JSON.parse(fs.readFileSync(path, 'utf8'));
    const indexUser = users.findIndex((user: User) => user.login === login);   
    const i = users[indexUser].items.findIndex((item: Item) => item.id === itemId);

    if (i === -1) {
        return null;
    }

    users[indexUser].items.splice(i, 1);
    fs.writeFileSync(path, JSON.stringify(users), "utf-8");
    
    return users;
}

export const editItemService = async (login: string, item: Item) => {
    const users = JSON.parse(fs.readFileSync(path, 'utf8'));
    const indexUser = users.findIndex((user: User) => user.login === login);   
    const i = users[indexUser].items.findIndex((i: Item) => i.id === item.id);

    if (i === -1) {
        return null;
    }

    users[indexUser].items.splice(i, 1, {...item});
    fs.writeFileSync(path, JSON.stringify(users), "utf-8");
    
    return users;
}