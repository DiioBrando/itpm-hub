import { FC } from 'react';
import { ISetting } from '../../entities/models/ISetting.ts';

export const Button: FC<ISetting> = ({setting}) => {
    const renderImage = () => {
        const {image} = setting;

        return image?.imagePath ? (
            <Image
                width={image?.imagePath.width}
                height={image?.imagePath.height}
                className={image?.imagePath.style}
                src={`/icons/${image?.imagePath.src}.${image?.imagePath.formatPicture}`}
                alt={image?.imagePath.alt ?? ''}
            />
        ) : (
            <div className={image?.svgComponent?.style ?? ''}>
                {image?.svgComponent?.image ?? ''}
            </div>
        );
    }


    return (
        <button
            value={setting.buttonValue}
            onClick={setting.onClickButton ?? (() => {
            })}
            onChange={setting.onChangeButton ?? (() => {
            })}
            className={ (setting.buttonStyle ?? '') + ' hover:bg-gray-300' }
        >
            <span className={setting.textStyle ?? ''}>
                {setting.textValue ?? ''}
            </span>
            { renderImage() }
        </button>
    )
}