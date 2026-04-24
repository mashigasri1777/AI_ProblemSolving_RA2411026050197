import itertools
import re

def word_to_number(word, mapping):
    return int("".join(str(mapping[ch]) for ch in word))

def solve_cryptarithm(puzzle):
    puzzle = puzzle.replace(" ", "").upper()

    if "=" in puzzle:
        left, result = puzzle.split("=")
    else:
        parts = puzzle.split("+")
        left = "+".join(parts[:-1])
        result = parts[-1]

    words = left.split("+")
    all_words = words + [result]

    letters = sorted(set("".join(all_words)))
    if len(letters) > 10:
        return None, "More than 10 unique letters, so no valid digit mapping is possible."

    leading_letters = {word[0] for word in all_words}

    digits = range(10)

    for perm in itertools.permutations(digits, len(letters)):
        mapping = dict(zip(letters, perm))

        if any(mapping[ch] == 0 for ch in leading_letters):
            continue

        word_values = [word_to_number(word, mapping) for word in words]
        result_value = word_to_number(result, mapping)

        if sum(word_values) == result_value:
            return {
                "mapping": mapping,
                "words": words,
                "word_values": word_values,
                "result": result,
                "result_value": result_value
            }, None

    return None, "No solution found."

def display_solution(solution):
    print("\nSolution Found")
    print("-" * 40)
    print("Letter to Digit Mapping:")
    for k, v in sorted(solution["mapping"].items()):
        print(f"{k} = {v}")

    print("\nComputed Result:")
    for word, value in zip(solution["words"], solution["word_values"]):
        print(f"{word} = {value}")
    print("-" * 20)
    print(f'{solution["result"]} = {solution["result_value"]}')

def main():
    print("Crypt Arithmetic Puzzle Solver")
    print("Example input: SEND+MORE=MONEY")
    print("You can also enter like: SEND MORE MONEY")

    user_input = input("\nEnter puzzle: ").strip()

    if " " in user_input and "=" not in user_input and "+" not in user_input:
        parts = user_input.upper().split()
        if len(parts) >= 3:
            user_input = "+".join(parts[:-1]) + "=" + parts[-1]

    if not re.match(r'^[A-Za-z+= ]+$', user_input):
        print("Invalid input. Use only letters, +, =, and spaces.")
        return

    solution, error = solve_cryptarithm(user_input)

    if error:
        print(error)
    else:
        display_solution(solution)

if __name__ == "__main__":
    main()
