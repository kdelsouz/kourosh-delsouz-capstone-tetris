export default function createTetromino(type) {

    if (type === 't') {
        return {
            grid: [
                ['t', 't', 't'],
                [0, 't', 0],
                [0, 0, 0],
            ],
            type: type
        };

    } else if (type === 'o') {
        return {
            grid: [
                ['o', 'o'],
                ['o', 'o'],
            ],
            type: type
        };

    } else if (type === 'l') {
        return {
            grid: [
                [0, 'l', 0],
                [0, 'l', 0],
                [0, 'l', 'l'],
            ],
            type: type
        };

    } else if (type === 'j') {
        return {
            grid: [
                [0, 'j', 0],
                [0, 'j', 0],
                ['j', 'j', 0],
            ],
            type: type
        };


    } else if (type === 'i') {
        return {
            grid: [
                [0, 'i', 0, 0],
                [0, 'i', 0, 0],
                [0, 'i', 0, 0],
                [0, 'i', 0, 0],
            ],
            type: type
        };

    } else if (type === 's') {
        return {
            grid: [
                [0, 's', 's'],
                ['s', 's', 0],
                [0, 0, 0],
            ],
            type: type
        };

    } else if (type === 'z') {
        return {
            grid: [
                ['z', 'z', 0],
                [0, 'z', 'z'],
                [0, 0, 0],
            ],
            type: type
        };
    }
    return createTetromino;
}