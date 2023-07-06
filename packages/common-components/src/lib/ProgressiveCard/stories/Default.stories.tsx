import type { Meta, StoryObj } from '@storybook/react';
import { ProgressiveCard } from '..';
import { useEffect } from 'react';
import config from '../../common/constants/spring-config';
import { useSpring, useTrail } from '@react-spring/web';

const meta: Meta<typeof ProgressiveCard> = {
    title: 'Components/ProgressiveCard/Default',
    component: ProgressiveCard,
    decorators: [],
    args: {
        title: 'Title',
        content: 'test testtest test \r\n testtesttesttesttesttesttesttesttesttesttesttest',
        textAlign: 'left'
    },
    argTypes: {
        title: {
            control: 'text'
        },
        content: {
            control: 'text'
        },
        containerCls: {
            control: 'text'
        },
        textAlign: {
            description: '文字对齐方向',
            control: 'select',
            options: ['left', 'right']
        },
        titleSpring: {
            control: false
        },
        contentSpring: {
            control: false
        }
    }
};

export default meta;

type Story = StoryObj<typeof ProgressiveCard>;

const from = {
    transform: -1,
    opacity: 0,
}
const to = {
    transform: 0,
    opacity: 1
}

export const Default: Story = {
    render: (args) => {

        const [contentSpring, contentRef] = useSpring<{
            transform: number,
            opacity: number
        }>(() => ({
            ...from,
            config: config.wobbly(true)
        }), [])

        const [titleSpring, titleRef] = useTrail<{
            transform: number,
            opacity: number
        }>(args.title.length, () => ({
            ...from,
            config: config.wobbly(true)
        }), [])

        useEffect(() => {
            titleRef.start(to)
            window.setTimeout(() => {
                contentRef.start(to)
            }, 300)
        })

        return <ProgressiveCard {...args} titleSpring={titleSpring} contentSpring={contentSpring} />
    }
};