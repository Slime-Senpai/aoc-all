fn main() {
    const INPUT: &str = include_str!("../inputs/day03_input.txt");

    let before_part1 = std::time::Instant::now();
    println!("Part 1: {}", part1(INPUT));
    println!("Elapsed: {:?}", before_part1.elapsed());
    let before_part2 = std::time::Instant::now();
    println!("Part 2: {}", part2(INPUT));
    println!("Elapsed: {:?}", before_part2.elapsed());
}

fn part1(input: &str) -> u64 {
    input.lines().map(|x| {
        let digits: Vec<_> = x.chars().map(|x| x.to_digit(10).unwrap()).collect();

        let mut max = 0;

        for i in 0..digits.len() - 1 {
            let current: u32 = digits[i];

            let digits_left = &digits[i+1..];

            let max_of_digits_left = digits_left.iter().max().unwrap();

            let number = (current.to_string() + &*max_of_digits_left.to_string()).parse().unwrap();

            if number > max {
                max = number;
            }
        }

        return max;
    }).fold(0, |x1, x2| {
        x1 + x2
    })
}

fn part2(input: &str) -> u64 {
    input.lines().map(|x| {
        let digits: Vec<u8> = x.chars().map(|x| x.to_digit(10).unwrap() as u8).collect();

        let mut current_digits: Vec<u8> = vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (i, &current) in digits.iter().enumerate() {
            let mut found_idx = 13;
            for (j, &current_digit) in current_digits.iter().enumerate() {
                if current > current_digit && i < digits.len() - 11 + j {
                    found_idx = j;
                    break;
                }
            }

            if found_idx != 13 {
                current_digits[found_idx] = current;
                for j in found_idx + 1..current_digits.len() {
                    current_digits[j] = 0;
                }
            }
        }

        let number = current_digits.iter().map(|x| x.to_string()).collect::<Vec<String>>().join("").parse::<u64>().unwrap();

        return number;
    }).fold(0, |x1, x2| {
        x1 + x2
    })
}

#[test]
fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day03_example.txt");

    assert_eq!(part1(EXAMPLE), 357, "The value should match");
}

#[test]
fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day03_example.txt");

    assert_eq!(part2(EXAMPLE), 3121910778619, "The value should match");
}