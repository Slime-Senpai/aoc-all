fn main() {
    const INPUT: &str = include_str!("../inputs/day01_input.txt");

    println!("{}", get_nb_times_was_zero(&INPUT));
    println!("{}", get_times_seen_zero(&INPUT));
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

fn get_nb_times_was_zero(input: &str) -> i32 {
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

fn get_times_seen_zero(input: &str) -> i32 {
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
fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day01_example.txt");

    assert_eq!(get_nb_times_was_zero(EXAMPLE), 3, "There should be 3 zeros for the part1 example");
}

#[test]
fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day01_example.txt");

    assert_eq!(get_times_seen_zero(EXAMPLE), 6, "There should be 6 zeros for the part2 example");
}