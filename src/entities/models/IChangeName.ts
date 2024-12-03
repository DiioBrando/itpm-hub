export interface IChangeName {
    _id: string;
    name: string;
    updateNameFn: (_id: string, name: string) => void;
}