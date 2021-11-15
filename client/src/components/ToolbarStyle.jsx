import { Children, cloneElement, isValidElement } from "react";

export default function ToolbarStyle({ children, ...props }) {

    const style = {
        margin: '0.5rem 0.75rem 0.5rem 0.75rem',
        display: 'flex',
        alignItems: 'center',

    }

    const styledChildren = Children.map(children, child => {
        if (isValidElement(child))
            return cloneElement(child, { style: style, ...props })

        return child;
    });
    return (
        <>
            {styledChildren}
        </>
    )
}