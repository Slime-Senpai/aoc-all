# aoc22
My solutions to the 2022's edition of [Advent of Code](https://adventofcode.com).

## Special Challenge
I'll try to solve the problems using only "one line" of javascript code, meaning no semicolon nor space return allowed.

Most of it is made directly in Firefox's browser devtools. The console is a powerful testing tool!

Day 7 update: Firefox team, please make the one line parsing longer, stopping after a while is unfair to my challenge :'(

After struggling with some of the harder challenges, I'll allow myself to use window variables (but they can't be set beforehand).

This code is not made to be proper nor human readable, but mostly a fun challenge for me. Don't expect it to be performant or beautiful!

Day 11 update: Time to stop this madness. It takes too much time and I've been abusing the Array(X).fill().forEach() to do multi line in a single line. As this is no longer a proper way to do this challenge I'll just continue with regular JS code sadly. It was still fun for 10 days. And who knows, maybe later days will see some oneliners.

## Day 1
### Part 1
This was done at work during a project build. After a friend found it funny that I was using one liners, it started the whole special rules chaos
### Part 2
Kinda straightforward, nothing to really comment here
## Day 2
### Part 1
There is no need to make something smart when there is only a few cases to cover. I manually calculated all of the cases
### Part 2
This made me notice that for X, Y, Z, all A, B and C combination sum to 15, the B doesn't change and you get all numbers 1 through 9. Pretty fun
## Day 3
### Part 1
I could have just added a "-" character on my alphabet string instead of doing + 1, but it works anyway
### Part 2
I derped a bit on something so this took way longer than it should have
## Day 4
### Part 1
The challenges start to be a bit tricky, but overall are still pretty straightforward
### Part 2
Might seem harder than part 1, but just need to focus on what conditions satisfy the thing we need
## Day 5
### Part 1
First real trouble of this run
### Part 2
We just need to remove the .reverse() for this part
## Day 6
### Part 1
Pretty simple day overall, a nice break of pace from the last one
### Part 2
Just change some numbers
## Day 7
### Part 1
This code is actually bugged, but worked for the day because the last chain of directories doesn't have a directory with less than 100000
### Part 2
A bit of changes were needed, but overall the hardest was to realize part 1 was glitched and fix that
## Day 8
### Part 1
Working with arrays again urghhhhh
### Part 2
So much trouble to find the right solution on this one URGHHH
## Day 9
### Part 1
I'm starting to abuse Array(X).fill().forEach to get multi lines in the one liner... Maybe I should stop using one liners...
### Part 2
I struggled because I had to change my logic quite a bit for the movement
## Day 10
### Part 1
Was kinda fun to work with, and not as hard as last one so a good breather
### Part 2
Very fun part, you actually have to read the output string yourself which is always fun
## Day 11+
See Files
