pub fn main() {
    const INPUT: &str = include_str!("../inputs/day05_input.txt");

    println!("Day 5");
    let before_part1 = std::time::Instant::now();
    println!("Part 1: {}", part1(INPUT));
    println!("Elapsed: {:?}", before_part1.elapsed());
    let before_part2 = std::time::Instant::now();
    println!("Part 2: {}", part2(INPUT));
    println!("Elapsed: {:?}", before_part2.elapsed());
}

fn part1(input: &str) -> u64 {
    let split: Vec<_> = input.split("\n\n").collect();

    let ranges = split[0].lines().map(|x| {
        let split: Vec<_> = x.split("-").collect();
        let start = split[0].parse::<u64>().unwrap();
        let end = split[1].parse::<u64>().unwrap();

        start..=end
    });

    let mut acc = 0;

    split[1].lines().for_each(|x| {
        let number = x.parse::<u64>().unwrap();

        for range in ranges.clone() {
            if range.contains(&number) {
                acc += 1;
                break;
            }
        }
    });

    acc
}

fn part2(input: &str) -> u64 {
    let split: Vec<_> = input.split("\n\n").collect();

    let mut ranges: Vec<Vec<_>> = split[0]
        .lines()
        .map(|x| {
            let split: Vec<_> = x.split("-").collect();
            let start = split[0].parse::<u64>().unwrap();
            let end = split[1].parse::<u64>().unwrap();

            return vec![start, end];
        })
        .collect();

    ranges.sort_by(|a, b| a[0].cmp(&b[0]));

    let mut acc = 0;
    let mut last_max = 0;

    ranges.iter().for_each(|x| {
        if x[0] <= last_max {
            if x[1] > last_max {
                acc += x[1] - last_max;
            }
        } else {
            acc += x[1] - x[0] + 1;
        }

        last_max = x[1].max(last_max);
    });

    acc
}

#[test]
pub fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day05_example.txt");

    assert_eq!(part1(EXAMPLE), 3, "The value should match");
}

#[test]
pub fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day05_example.txt");

    assert_eq!(part2(EXAMPLE), 14, "The value should match");
}
