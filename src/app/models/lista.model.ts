import { ListaItem } from './lista-item.model';

export class Lista {
    public id: number;
    public created_at: Date;
    public finish: boolean;
    public finished_at: Date;
    public items: Array<ListaItem>;

    constructor(
        public title: string,
    ) {
        this.items = [];
        this.finish = false;
        this.finished_at = null;
        this.created_at = new Date();
        this.id = new Date().getTime();
    }
}