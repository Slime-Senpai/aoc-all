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
        if x > 99 || x < -99 {
            nb_zero += x.abs() / 100;
        }

        let new = curr + (x % 100);

        if curr == 0 || new > 100 || new < 0 {
            nb_zero += 1;
        }

        curr = new.rem_euclid(100);
    });

    println!("{}", nb_zero);
}
