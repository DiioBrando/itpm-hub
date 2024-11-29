import { IProjects } from './IProjects.ts';
import React from 'react';

export interface IDetails {
    dataProjects: IProjects[];
    summaryText: string;
    children?: React.ReactNode;
}