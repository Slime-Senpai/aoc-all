fn main() {
    const INPUT: &str = include_str!("../inputs/day01_input.txt");
    let mut nb_zero = 0;
    let mut curr: i32 = 50;
    INPUT.lines().map(|x| {
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
    }).for_each(|x| {
        curr = (curr + x).rem_euclid(100);
        if curr == 0 {
            nb_zero += 1;
        }
    });

    println!("{}", nb_zero);
}
