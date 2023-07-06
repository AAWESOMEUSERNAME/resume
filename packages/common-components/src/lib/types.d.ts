declare type Direction = 'vertical' | 'horizental'
declare type ExactDirection = 'left' | 'right' | 'top' | 'bottom'

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}