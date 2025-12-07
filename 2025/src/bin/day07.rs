pub fn main() {
    const INPUT: &str = include_str!("../inputs/day07_input.txt");

    println!("Day 7");
    let before_part1 = std::time::Instant::now();
    println!("Part 1: {}", part1(INPUT));
    println!("Elapsed: {:?}", before_part1.elapsed());
    let before_part2 = std::time::Instant::now();
    println!("Part 2: {}", part2(INPUT));
    println!("Elapsed: {:?}", before_part2.elapsed());
}

#[derive(PartialEq, Debug, Clone, Copy)]
enum Tile {
    None,
    Splitter,
    Start,
    Beam
}

fn parse_map(input: &str) -> Vec<Vec<Tile>> {
    input.lines().map(|x|
        x.chars().map(|c| {
            let tile = match c {
                'S' => Tile::Start,
                '^' => Tile::Splitter,
                '|' => Tile::Beam,
                '.' => Tile::None,
                _ => Tile::None
            };

            tile
        }).collect::<Vec<_>>())
    .collect::<Vec<_>>()
}

fn find_start(map: &Vec<Vec<Tile>>) -> usize {
    let mut start_y = None;
    for (idx, line) in map[0].iter().enumerate() {
        if *line == Tile::Start {
            start_y = Some(idx);
            break;
        }
    }

    if start_y.is_none() {
        panic!("No start found");
    }

    start_y.unwrap()
}

fn print_map(map: &Vec<Vec<Tile>>) {
    for line in map {
        for tile in line {
            match tile {
                Tile::Beam => print!("|"),
                Tile::Splitter => print!("^"),
                Tile::Start => print!("S"),
                Tile::None => print!(".")
            }
        }
        println!();
    }
}

fn part1(input: &str) -> u64 {
    let map = parse_map(input);

    let mut beams = vec![find_start(&map)];

    let mut nb_split = 0;
    let mut new_map: Vec<Vec<Tile>> = vec![];
    for line in map {
        let mut new_beams = vec![];
        for beam in beams.iter() {
            if line[*beam] == Tile::Splitter {
                let mut has_split = false;
                if !new_beams.contains(&(beam + 1)) {
                    has_split = true;
                new_beams.push(beam + 1);
                }
                if !new_beams.contains(&(beam - 1)) {
                    has_split = true;
                new_beams.push(beam - 1);
                }

                if has_split {
                    nb_split += 1;
                }
            } else {
                new_beams.push(*beam);
            }
        }

        new_map.push(line.clone().iter().enumerate().map(|(idx, x)| {
            if new_beams.contains(&idx) { Tile::Beam } else { *x }
        }).collect());

        beams = new_beams;
    }

    // print_map(&new_map);

    nb_split
}

fn part2(input: &str) -> u64 {
    let map = parse_map(input);

    let mut beams = vec![(find_start(&map), 1)];

    for line in map {
        let mut new_beams = vec![];
        for (beam, nb_timeline) in beams.iter() {
            if line[*beam] == Tile::Splitter {
                let index_before = new_beams.iter().position(|(b, _)| *b == *beam - 1);
                let index_after = new_beams.iter().position(|(b, _)| *b == *beam + 1);

                if index_before.is_none() {
                    new_beams.push((*beam - 1, *nb_timeline));
                } else {
                    let idx = index_before.unwrap();
                    let (b, t) = new_beams[idx];
                    new_beams[idx] = (b, t + *nb_timeline);
                }

                if index_after.is_none() {
                    new_beams.push((*beam + 1, *nb_timeline));
                } else {
                    let idx = index_after.unwrap();
                    let (b, t) = new_beams[idx];
                    new_beams[idx] = (b, t + *nb_timeline);
                }
            } else {
                new_beams.push((*beam, *nb_timeline));
            }
        }

        beams = new_beams;
    }

    beams.iter().map(|(_, t)| t).sum()
}

#[test]
pub fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day07_example.txt");

    assert_eq!(part1(EXAMPLE), 21, "The value should match");
}

#[test]
pub fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day07_example.txt");

    assert_eq!(part2(EXAMPLE), 40, "The value should match");
}
