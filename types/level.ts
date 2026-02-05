export interface Level {
    // reward action
    number: number;
    reward: RewardType;
}

type RewardType = 'Life' | 'Shuriken' | 'None';

export const levels: readonly Level[] = [
    {
        number: 1,
        reward: 'None',
    },
    {
        number: 2, 
        reward: 'Shuriken',
    },
    {
        number: 3,
        reward: 'Life',
    },
    {
        number: 4,
        reward: 'None',
    },
    {
        number: 5,
        reward: 'Shuriken',
    },
    {
        number: 6,
        reward: 'Life',
    },
    {
        number: 7,
        reward: 'Shuriken',
    },
    {
        number: 8,
        reward: 'None',
    },
    {
        number: 9,
        reward: 'Life',
    },
    {
        number: 10,
        reward: 'None',
    },
    {
        number: 11,
        reward: 'None',
    },
    {
        number: 12,
        reward: 'None',
    },
];