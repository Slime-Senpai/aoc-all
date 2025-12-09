use std::collections::HashSet;

pub fn main() {
    const INPUT: &str = include_str!("../inputs/day08_input.txt");

    println!("Day 8");
    let before_part1 = std::time::Instant::now();
    println!("Part 1: {}", part1(INPUT, 1000));
    println!("Elapsed: {:?}", before_part1.elapsed());
    let before_part2 = std::time::Instant::now();
    println!("Part 2: {}", part2(INPUT));
    println!("Elapsed: {:?}", before_part2.elapsed());
}

#[derive(Clone, PartialEq, Debug)]
struct JunctionBox {
    x: i64,
    y: i64,
    z: i64,
    idx: usize,
}

impl JunctionBox {
    fn distance(&self, other: &JunctionBox) -> u64 {
        ((self.x - other.x).pow(2) + (self.y - other.y).pow(2) + (self.z - other.z).pow(2)) as u64
    }

}

fn parse(input: &str) -> Vec<JunctionBox> {
    input.lines().into_iter().enumerate().map(|(idx, x)| {
        let nb = x.split(",").map(|n| n.parse::<i64>().unwrap()).collect::<Vec<_>>();

        JunctionBox { x: nb[0], y: nb[1], z: nb[2], idx }
    }).collect::<Vec<_>>()
}

fn get_couples(junction_boxes: &Vec<JunctionBox>) -> Vec<(&JunctionBox, &JunctionBox)> {
    let mut couples: Vec<(&JunctionBox, &JunctionBox)> = vec![];
    for i in 0..junction_boxes.len() - 1 {
        for j in i + 1..junction_boxes.len() {
            let junction_box = &junction_boxes[i];
            let second_box = &junction_boxes[j];
            couples.push((junction_box, second_box));
        }
    }

    couples.sort_by(|a, b| a.0.distance(&a.1).cmp(&b.0.distance(&b.1)));

    couples
}

fn merge_junctions(box1: &JunctionBox, box2: &JunctionBox, circuits: &mut Vec<HashSet<usize>>) {
    let circuit1_idx = circuits.iter().position(|x| x.contains(&box1.idx));
    let circuit2_idx = circuits.iter().position(|x| x.contains(&box2.idx));

    if let Some(idx) = circuit1_idx {
        if let Some(idx2) = circuit2_idx {
            if idx == idx2 { return; }
            let elements_to_add: HashSet<usize> = circuits[idx2].clone();
            circuits[idx].extend(elements_to_add);
            circuits.remove(idx2);
        }
    } else {
        panic!("No circuit found for box1 {} or box2 {}", box1.idx, box2.idx);
    }
}

fn part1(input: &str, nb_link: usize) -> u64 {
    let junction_boxes = parse(input);

    let couples = get_couples(&junction_boxes);

    let mut circuits: Vec<HashSet<usize>> = vec![];

    for junction_box in &junction_boxes {
        circuits.push(HashSet::from([junction_box.idx]));
    }

    for i in 0..nb_link {
        let (box1, box2) = couples[i];

        merge_junctions(box1, box2, &mut circuits);
    }

    circuits.sort_by(|a, b| a.len().cmp(&b.len()));

    circuits[circuits.len() - 3..].iter().fold(1, |a, b| a * b.len()) as u64
}

fn part2(input: &str) -> u64 {
    let junction_boxes = parse(input);

    let couples = get_couples(&junction_boxes);

    let mut circuits: Vec<HashSet<usize>> = vec![];

    for junction_box in &junction_boxes {
        circuits.push(HashSet::from([junction_box.idx]));
    }

    let mut last_couple: Option<(&JunctionBox, &JunctionBox)> = None;
    for i in 0..couples.len() {
        let (box1, box2) = couples[i];

        merge_junctions(box1, box2, &mut circuits);

        if circuits.len() == 1 {
            last_couple = Some((box1, box2));
            break;
        }
    }

    if last_couple.is_none() {
        panic!("No last couple found");
    }

    (last_couple.unwrap().0.x * last_couple.unwrap().1.x) as u64
}

#[test]
pub fn test_part1() {
    const EXAMPLE: &str = include_str!("../inputs/day08_example.txt");

    assert_eq!(part1(EXAMPLE, 10), 40, "The value should match");
}

#[test]
pub fn test_part2() {
    const EXAMPLE: &str = include_str!("../inputs/day08_example.txt");

    assert_eq!(part2(EXAMPLE), 25272, "The value should match");
}
