import * as React from 'react';

type Props = {
    condition: boolean;
    className?: string;
    onClick?: () => void
};

export default class If extends React.Component<Props> {
    render() {
        const { condition, className, onClick, children } = this.props;

        if (!condition) {
            return <noscript/>;
        }
        return (
            <div className={className} onClick={onClick}>
                {children}
            </div>
        );
    }
}