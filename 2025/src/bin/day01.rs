pub fn main() {
    const INPUT: &str = include_str!("../inputs/day01_input.txt");

    println!("Day 1");
    let before_part1 = std::time::Instant::now();
    println!("Part 1: {}", part1(&INPUT));
    println!("Elapsed: {:?}", before_part1.elapsed());
    let before_part2 = std::time::Instant::now();
    println!("Part 2: {}", part2(&INPUT));
    println!("Elapsed: {:?}", before_part2.elapsed());
}

fn parse_input(input: &str) -> Vec<i32> {
    return input.lines().map(|x| {
        let num = x[1 ..].parse::<i32>().unwrap();
        match x.chars().nth(0).unwrap() {
            'L' => {
                return -num
            },
            'R' => {
                return num
            },
            _ => panic!()
        }
    }).collect();
}

fn part1(input: &str) -> i32 {
    let mut nb_zero = 0;
    let mut curr: i32 = 50;
    parse_input(input).into_iter().for_each(|x| {
        curr = (curr + x).rem_euclid(100);
        if curr == 0 {
            nb_zero += 1;
        }
    });

    return nb_zero;
}

fn part2(input: &str) -> i32 {
    let mut nb_zero = 0;
    let mut curr: i32 = 50;
    parse_input(input).into_iter().for_each(|x| {
        if x > 99 || x < -99 {
            nb_zero += x.abs() / 100;
        }

        let new = curr + (x % 100);

        if curr == 0 || new > 100 || new < 0 {
            nb_zero += 1;
        }

        curr = new.rem_euclid(100);
    });

    return nb_zero;
}

#[test]
pub fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day01_example.txt");

    assert_eq!(part1(EXAMPLE), 3, "There should be 3 zeros for the part1 example");
}

#[test]
pub fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day01_example.txt");

    assert_eq!(part2(EXAMPLE), 6, "There should be 6 zeros for the part2 example");
}