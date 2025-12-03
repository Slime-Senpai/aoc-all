pub fn main() {
    const INPUT: &str = include_str!("../inputs/day02_input.txt");

    println!("Day 2");
    let before_part1 = std::time::Instant::now();
    println!("Part 1: {}", part1(INPUT));
    println!("Elapsed: {:?}", before_part1.elapsed());
    let before_part2 = std::time::Instant::now();
    println!("Part 2: {}", part2(INPUT));
    println!("Elapsed: {:?}", before_part2.elapsed());
}

fn part1(input: &str) -> u64 {
    input.split(',').map(|x| {

        let tuple: Vec<_> = x.split('-').collect();

        let min_str = tuple[0];
        let max_str = tuple[1];

        let min = min_str.parse::<u64>().unwrap();
        let max = max_str.parse::<u64>().unwrap();

        let index_of_half_min = min_str.len() / 2;

        let mut num = if index_of_half_min != 0 { min_str[0..index_of_half_min].parse::<u64>().unwrap() } else { 0 };

        let mut acc = 0;

        loop {
            let current = num.to_string().repeat(2).parse::<u64>().unwrap();

            if current < min {
                num += 1;
                continue;
            }

            if current > max {
                break;
            }

            acc += current;
            num += 1;
        }

        return acc;
    }).fold(0, |x1, x2| {
        x1 + x2
    })
}

fn part2(input: &str) -> u64 {
    input.split(',').map(|x| {
        let tuple: Vec<_> = x.split('-').collect();

        let min = tuple[0].parse::<u64>().unwrap();
        let max = tuple[1].parse::<u64>().unwrap();

        let mut acc = 0;

        for i in min..=max {
            let i_str = i.to_string();

            for j in 1..i_str.len() {
                let pattern = &i_str[0..j];

                let nb_repeat = i_str.len() / pattern.len();

                if pattern.repeat(nb_repeat) == i_str {
                    acc += i;

                    break;
                }
            }
        }

        return acc;
    }).fold(0, |x1, x2| {
        x1 + x2
    })
}

#[test]
pub fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day02_example.txt");

    assert_eq!(part1(EXAMPLE), 1227775554, "The value should match");
}

#[test]
pub fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day02_example.txt");

    assert_eq!(part2(EXAMPLE), 4174379265, "The value should match");
}