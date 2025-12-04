pub fn main() {
    const INPUT: &str = include_str!("../inputs/day04_input.txt");

    println!("Day 4");
    let before_part1 = std::time::Instant::now();
    println!("Part 1: {}", part1(INPUT));
    println!("Elapsed: {:?}", before_part1.elapsed());
    let before_part2 = std::time::Instant::now();
    println!("Part 2: {}", part2(INPUT));
    println!("Elapsed: {:?}", before_part2.elapsed());
}


#[derive(PartialEq, Debug, Clone)]
enum Material {
    Paper,
    Air
}

impl From<char> for Material {
    fn from(c: char) -> Self {
        match c {
            '@' => Material::Paper,
            '.' => Material::Air,
            _ => panic!("Invalid character for Material"),
        }
    }
}

fn get_count(input: &str) -> Vec<Vec<i32>> {
    let map = input.lines().map(|x| x.chars().map(|x| Material::from(x)).collect()).collect::<Vec<Vec<Material>>>();
    let mut count = vec![vec![0; map[0].len()]; map.len()];

    for i in 0..map.len() {
        for j in 0..map[i].len() {
            if map[i][j] == Material::Paper {
                for t in (if i != 0 { i - 1 } else { i })..map[i].len().min(i + 2) {
                    for s in (if j != 0 { j - 1 } else { j })..map.len().min(j + 2) {
                        if map[t][s] == Material::Paper {
                            count[t][s] += 1;
                        }
                    }
                }
            }
        }
    }

    count
}

fn sum_accessible(count: &Vec<Vec<i32>>) -> u64 {
    count.iter().map(|x| x.iter().filter(|&&y| y <= 4 && y != 0).count() as u64).sum()
}

fn part1(input: &str) -> u64 {
    sum_accessible(&get_count(input))
}

fn part2(input: &str) -> u64 {
    let mut count = get_count(input).clone();

    let mut acc = 0;

    loop {
        let sum = sum_accessible(&count);

        if sum == 0 {
            break;
        }

        acc += sum;

        let mut new_count = count.clone();
        for i in 0..count.len() {
            for j in 0..count[i].len() {
                if count[i][j] <= 4 && count[i][j] != 0 {
                    for t in (if i != 0 { i - 1 } else { i })..count[i].len().min(i + 2) {
                        for s in (if j != 0 { j - 1 } else { j })..count.len().min(j + 2) {
                            if new_count[t][s] != 0 {
                                new_count[t][s] -= 1;
                            }
                        }
                    }
                    new_count[i][j] = 0;
                }
            }
        }

        count = new_count;
    }

    acc
}

#[test]
pub fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day04_example.txt");

    assert_eq!(part1(EXAMPLE), 13, "The value should match");
}

#[test]
pub fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day04_example.txt");

    assert_eq!(part2(EXAMPLE), 43, "The value should match");
}