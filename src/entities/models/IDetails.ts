import React from 'react';

export interface ISummary {
    divStyle?: string;
    firstSpan?: string;
    secondSpan?: string;
}

export interface IStyleDetails {
    summary?: ISummary;
    details?: string;
    ulStyle?: string;
    liStyle?: string;
    liNoneProjectStyle?: string;
    inputStyle?: string;
}


export interface IDetails {
    dataProjects: string[] | undefined;
    summaryText: string;
    children?: React.ReactNode;
    styleDetails?: IStyleDetails;
}