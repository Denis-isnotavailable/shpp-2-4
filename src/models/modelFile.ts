export type Item = {
    id: string,
    text: string,
    checked: boolean
}

export type User = {    
    login: string,
    pass: string,
    items: Item[] | []
}