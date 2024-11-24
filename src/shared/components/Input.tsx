import React from 'react';
import {IInput} from "../../entities/models/IInput.ts";

export const Input: React.FC<IInput> = ({ input }) => {
    return (
        <input
            ref={input.refObj}
            type={input.type ?? 'text'}
            name={input.name ?? ''}
            value={input.value}
            onChange={input.onChangeInput}
            className={
                (input.style ?? '')
            }
            placeholder={input.placeholder ?? ''}
        />
    );
};
