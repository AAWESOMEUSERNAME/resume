import type { Meta, StoryObj } from '@storybook/react';
import { StepwiseProgressiveCard } from '..';

const meta: Meta<typeof StepwiseProgressiveCard> = {
    title: 'Components/ProgressiveCard/Stepwise',
    component: StepwiseProgressiveCard,
    decorators: [],
    args: {
        title: 'Title',
        content: 'test testtest test \r\n testtesttesttesttesttesttesttesttesttesttesttest',
        textAlign: 'left',
        showTitle: false,
        showContent: false
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
        showTitle: {
            control: 'boolean'
        },
        showContent: {
            control: 'boolean'
        }
    }
};

export default meta;

type Story = StoryObj<typeof StepwiseProgressiveCard>;

export const Stepwise: Story = {
    render: (args) => <StepwiseProgressiveCard {...args} />
};