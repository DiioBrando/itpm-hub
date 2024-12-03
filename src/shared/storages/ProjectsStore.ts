import { create } from 'zustand';
import { IProjects } from '../../entities/models/IProjects.ts';


export const useProjectsStore = create((set, get) => ({
    myProjects: [] as IProjects[],
    subProjects: [] as IProjects[],

}));