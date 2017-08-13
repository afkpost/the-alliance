declare module 'react-svg-inline' {
    type Props = {
        svg: string,
        className?: string,
        classSuffix?: string,
        component?: string | (() => {}),
        fill?: string,
        cleanup?: boolean | 
            ('title'|'desc'|'comment'
            |'defs'|'width'|'height'
            |'fill'|'sketchMSShapeGroup'|'sketchMSPage'|'sketchMSLayerGroup')[]
    };
    export default class extends React.Component<Props> { }
}