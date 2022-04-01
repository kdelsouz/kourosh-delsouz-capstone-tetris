export default function createTetrominoes(type) {
    
    if (type === 'T') {
        return [
            ['t', 't', 't'],
            [0, 't', 0],
            [0, 0, 0],
        ];

    } else if (type === 'O') {
        return [
            ['o', 'o'],
            ['o', 'o'],
        ];

    } else if (type === 'L') {
        return [
            [0, 'l', 0],
            [0, 'l', 0],
            [0, 'l', 'l'],
        ];

    } else if (type === 'J') {
        return [
            [0, 'j', 0],
            [0, 'j', 0],
            ['j', 'j', 0],
        ];

    } else if (type === 'I') {
        return [
            [0, 'i', 0, 0],
            [0, 'i', 0, 0],
            [0, 'i', 0, 0],
            [0, 'i', 0, 0],
        ];

    } else if (type === 'S') {
        return [
            [0, 's', 's'],
            ['s', 's', 0],
            [0, 0, 0],
        ];
        
    } else if (type === 'Z') {
        return [
            ['z', 'z', 0],
            [0, 'z', 'z'],
            [0, 0, 0],
        ];
    }
    return createTetrominoes;
}