// import { config as originConfig } from '@react-spring/web'

const config = {
    wobbly: (clamp: boolean) => ({
        tension: 500,
        friction: 20,
        clamp
    }),
}

export default config