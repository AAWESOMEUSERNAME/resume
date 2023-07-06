import type { Meta, StoryObj } from '@storybook/react';
import ProgressiveContainer from '.';
import styles from './index.module.scss'
import { decorators } from '../common/story-utils';
import { useSpring } from '@react-spring/web';
import config from '../common/constants/spring-config';
import { useEffect } from 'react';

const meta: Meta<typeof ProgressiveContainer> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Components/ProgressiveContainer',
    component: ProgressiveContainer,
    decorators: [],
    args: {
        direction: 'vertical'
    },
    argTypes: {
        springValue: {
            control: false
        },
        direction: {
            description: '动画执行方向',
            control: 'select',
            options: ['vertical', 'horizental']
        },
        containerCls: {
            control: { type: 'text' }
        }
    }
};

export default meta;

type Story = StoryObj<typeof ProgressiveContainer>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: (args) => {
        const [props, api] = useSpring(() => ({
            transform: 1,
            opacity: 0,
            config: config.wobbly(true)
        }))

        useEffect(() => {
            api.start({
                transform: 0,
                opacity: 1
            })
        })

        return <ProgressiveContainer {...args} springValue={props}>
            <div style={{ height: '3em', background: 'yellow' }}>test</div>
        </ProgressiveContainer>
    }
};