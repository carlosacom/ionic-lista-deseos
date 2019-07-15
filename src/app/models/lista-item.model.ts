export class ListaItem {
    public completado: boolean;
    constructor(
        public desc: string
    ) {
        this.completado = false;
    }
}