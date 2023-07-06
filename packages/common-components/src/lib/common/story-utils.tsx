import { StoryObj } from "@storybook/react";
import React from "react"

export const decorators = {
    scrallable: (Story: React.FC) => <div style={{
        width: '50vw',
        height: '300vh',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Story />
    </div>
}