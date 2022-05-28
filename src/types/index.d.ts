export interface Application {
    id: string;
    name: string,
    imgUrl: string,
    descrip: string,
    status: 'active' | 'ended' | 'inactive',
    views: number,
}