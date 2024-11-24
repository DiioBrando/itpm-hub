import React from 'react';

export interface IImageSetting {
    svgComponent?: {
        image?: React.ReactNode;
        style?: string;
    };
    imagePath?: {
        src?: string;
        formatPicture?: string;
        width?: number;
        height?: number;
        style?: string;
        alt?: string;
    };
}

export interface IButtonSetting {
    textStyle?: string;
    textValue?: string;
    buttonValue?: string;
    onClickButton?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => void;
    onChangeButton?: () => void;
    image?: IImageSetting;
    buttonStyle?: string;
}

export interface ISetting {
    setting: IButtonSetting;
}
