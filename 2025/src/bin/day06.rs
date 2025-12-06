pub fn main() {
    const INPUT: &str = include_str!("../inputs/day06_input.txt");

    println!("Day 6");
    let before_part1 = std::time::Instant::now();
    println!("Part 1: {}", part1(INPUT));
    println!("Elapsed: {:?}", before_part1.elapsed());
    let before_part2 = std::time::Instant::now();
    println!("Part 2: {}", part2(INPUT));
    println!("Elapsed: {:?}", before_part2.elapsed());
}

fn parse_part1(input: &str) -> (Vec<Vec<u64>>, Vec<&str>) {
    let mut numbers_and_operators = input.lines().map(|x| x.trim()).collect::<Vec<_>>();

    let operators = parse_operators(numbers_and_operators.pop().unwrap());

    let numbers = numbers_and_operators.iter().map(|x| {
        x.trim().split(' ').filter(|x| x.trim().len() > 0).map(|n| n.trim().parse::<u64>().unwrap()).collect::<Vec<_>>()
    }).collect::<Vec<_>>();

    (numbers, operators)
}

fn parse_part2(input: &str) -> (Vec<Vec<u64>>, Vec<&str>) {
    let mut lines = input.lines().collect::<Vec<_>>();

    let operators = parse_operators(lines.pop().unwrap());

    let mut current: Vec<u64> = vec![];
    let mut numbers = vec![];
    // Every line should be the same length
    for i in 0..lines[0].len() {
        let mut end_num = String::new();


        for line in &lines {
            end_num.push_str(&line[i..=i]);
        }

        if end_num.trim().len() == 0 && current.len() > 0 {
            numbers.push(current);
            current = vec![];
        } else {
            current.push(end_num.trim().parse::<u64>().unwrap());
        }
    }

    if current.len() > 0 {
    numbers.push(current);
    }

    (numbers, operators)
}

fn parse_operators(line: &str) -> Vec<&str> {
    line.split(' ').map(|x| x.trim()).filter(|x| x.trim().len() > 0).collect::<Vec<_>>()
}

fn part1(input: &str) -> u64 {
    let (numbers, operators) = parse_part1(input);

    let mut grand_total = 0;
    for (idx, operator) in operators.iter().enumerate() {
        let mut small_total = if *operator == "+" { 0 } else { 1 };

        for i in 0..numbers.len() {
            let number = numbers[i][idx];

            if *operator == "+" {
                small_total += number;
            } else {
                small_total *= number;
            }
        }

        grand_total += small_total;
    }

    grand_total
}

fn part2(input: &str) -> u64 {
    let (numbers, operators) = parse_part2(input);

    let mut grand_total = 0;
    for (idx, operator) in operators.iter().enumerate() {
        let mut small_total = if *operator == "+" { 0 } else { 1 };

        for number in &numbers[idx] {
            if *operator == "+" {
                small_total += number;
            } else {
                small_total *= number;
            }
        }

        grand_total += small_total;
    }

    grand_total
}

#[test]
pub fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day06_example.txt");

    assert_eq!(part1(EXAMPLE), 4277556, "The value should match");
}

#[test]
pub fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day06_example.txt");

    assert_eq!(part2(EXAMPLE), 3263827, "The value should match");
}
