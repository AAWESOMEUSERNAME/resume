import type { Meta, StoryObj } from '@storybook/react';
import { TypeLikeText, TypeLikeTextProps } from '..';
import { useTrail,config as originConfig,easings } from '@react-spring/web';
import React, { useEffect } from 'react';
import config from '../../common/constants/spring-config';

const meta: Meta<typeof TypeLikeText> = {
    title: 'Components/ProgressiveText/TypeLike',
    component: TypeLikeText,
    args: {
        children: 'test测试',
        show: false
    },
    argTypes: {
        children: {
            description: '所需展示文字',
            control: 'text',
        },
        show: {
            control: 'boolean'
        }
    }
};

export default meta;

type Story = StoryObj<typeof TypeLikeText>;

export const TypeLike: Story = {
    render: (args: TypeLikeTextProps) => {

        return <TypeLikeText {...args} >
            {args.children}
        </TypeLikeText>
    }
};