import type { Meta, StoryObj } from '@storybook/react';
import { EmergeText } from '..';
import { useTrail } from '@react-spring/web';
import React, { useEffect } from 'react';
import config from '../../common/constants/spring-config';

const meta: Meta<typeof EmergeText> = {
    title: 'Components/ProgressiveText/Emerge',
    component: EmergeText,
    args: {
        direction: 'horizental',
        children: 'test测试'
    },
    argTypes: {
        children: {
            description: '所需展示文字',
            control: 'text',
        },
        direction: {
            description: '动画执行方向',
            control: 'select',
            options: ['vertical', 'horizental']
        },
        trail: {
            description: 'react-spring useTrail 返回，动画相关参数外置便于外部组件管理',
            control: false
        }
    }
};

export default meta;

type Story = StoryObj<typeof EmergeText>;

export const Emerge: Story = {
    render: (args) => {
        const [trail, api] = useTrail<{
            opacity: number,
            transform: number,
        }>(args.children.length,
            () => ({
                opacity: 0,
                transform: 1,
                config: config.wobbly(true)
            }), [])
    
        useEffect(() => {
            api.start({
                opacity: 1,
                transform: 0,
            })
        })
    
        return <EmergeText {...args} trail={trail}>
            {args.children}
        </EmergeText>
    }
};